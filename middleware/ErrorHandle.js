export const errorHandler = (err, req, res, next) => {
    console.log("Error in middleware ==> ", err)
    
    return res.status(500).send({
        success: false,
        message: err.message || "Internal Server Error"
    })
}
