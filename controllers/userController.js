import { User } from "../models/User.js"

export const createUser = async (req, res, next) => {
    try {
        const { name, email, phone, photoUrl, role } = req.body
        console.debug("Creating user ==> ", req.body)

        if (!name || !email || !phone) {
            return res.status(400).send({
                success: false,
                message: "Please provide all required fields"
            })
        }

        const existingUser = await User.findOne({ $or: [{ email }, { phone }] })
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: "User already exists with this email or phone"
            })
        }
        const user = await User.create({ name, email, phone, photoUrl, role })

        console.debug("User created successfully ==> ", user)

        return res.status(201).send({
            success: true,
            message: "User created successfully",
            data: user
        })

    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params
        console.debug("Getting user by id ==> ", id)

        const user = await User.findById(id)

        console.debug("User found ==> ", user)

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).send({
            success: true,
            message: "User found",
            data: user
        })
    } catch (error) {
        next(error)
    }
}
export const getUserByMail = async (req, res, next) => {
    try {
        const { mail } = req.params
        console.debug("Getting user by mail ==> ", req.body)

        const user = await User.findOne({ email: mail })

        console.debug("User found ==> ", user)

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).send({
            success: true,
            message: "User found",
            data: user._id
        })
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params
        console.debug("Updating user by id ==> ", id)

        const { name, email, phone, photoUrl, role } = req.body

        const user = await User.findByIdAndUpdate(id, { name, email, phone, photoUrl, role }, { new: true })

        console.debug("User updated successfully ==> ", user)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "User updated successfully",
            data: user
        })
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        console.debug("Deleting user by id ==> ", id)

        const user = await User.findByIdAndDelete(id)

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "User deleted successfully",
            data: user
        })
    } catch (error) {
        next(error)
    }
}

export const searchUser = async (req, res, next) => {
    try {
        const searchTerm = req.query.search || ""
        const limit = parseInt(req.query.limit) || 10
        const page = parseInt(req.query.page) || 1

        console.debug("Searching user by name ==> ", searchTerm)
        const skip = (page - 1) * limit
        const searchQuery = searchTerm
            ? { $text: { $search: searchTerm } }
            : {}

        console.debug("Search query ==> ", searchQuery)

        const [users, totalDocs] = await Promise.all([User.find(searchQuery).limit(limit).skip(skip), User.countDocuments(searchQuery)])

        console.debug("Users after searching ==> ", users)
        console.debug("Total number of docs ==> ", totalDocs)

        return res.status(201).send({
            success: true,
            message: "Users fetched successfully",
            data: {
                users,
                pagination: {
                    totalPage: Math.ceil(totalDocs / limit),
                    page,
                    limit,
                    hasMore: totalDocs > skip + users.length
                }
            }
        })

    } catch (error) {
        console.error("Error searching user ==> ", error)
        next(error)
    }
}
