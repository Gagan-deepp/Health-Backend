<div align="center">

# 🏥 Health-Backend

[![Node.js](https://img.shields.io/badge/Node.js-16.20.1-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

A robust REST API service for managing healthcare operations, built with Node.js and MongoDB.

[Features](#features) •
[Installation](#installation) •
[API Reference](#api-endpoints) •
[Tech Stack](#tech-stack)

</div>

---

## ✨ Features

🏥 **Healthcare Management**
- Complete doctor profile management
- Patient records system
- Appointment scheduling and tracking

🛠️ **Technical Features**
- RESTful API architecture
- MongoDB integration with Mongoose
- Advanced error handling
- Search functionality
- CORS enabled

## 🚀 Tech Stack

- **Runtime**: `Node.js (≥ 16.20.1)`
- **Framework**: `Express.js (v5.1.0)`
- **Database**: `MongoDB with Mongoose`
- **Tools**: `CORS`, `dotenv`, `nodemon`

## 📦 Installation

1️⃣ **Clone the repository**
```bash
git clone <repository-url>
cd health-backend
```

2️⃣ **Install dependencies**
```bash
npm install
```

3️⃣ **Environment Setup**

Create `.env` file in root directory:
```env
PORT=8000
URI=<your-mongodb-connection-string>
```

4️⃣ **Start Development Server**
```bash
npm run dev
```

## 🔌 API Endpoints

### 👨‍⚕️ Doctors

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/doctor/create` | Create doctor |
| `GET`  | `/api/v1/doctor/:id` | Get doctor by ID |
| `GET`  | `/api/v1/doctor` | Search doctors |
| `PUT`  | `/api/v1/doctor/:id` | Update doctor |
| `DELETE` | `/api/v1/doctor/:id` | Delete doctor |

### 👤 Users/Patients

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/user/create` | Create user |
| `GET`  | `/api/v1/user/:id` | Get user by ID |
| `GET`  | `/api/v1/user` | Search users |
| `PUT`  | `/api/v1/user/:id` | Update user |
| `DELETE` | `/api/v1/user/:id` | Delete user |

### 📅 Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/appointment/create` | Create appointment |
| `GET`  | `/api/v1/appointment/:id` | Get appointment |
| `PUT`  | `/api/v1/appointment/:id` | Update appointment |
| `DELETE` | `/api/v1/appointment/:id` | Delete appointment |

## 📊 Data Models

<details>
<summary><strong>👨‍⚕️ Doctor Model</strong></summary>

```javascript
{
  name: String,          // Required
  email: String,         // Required, Unique
  phone: String,         // Required, Unique
  photoUrl: String,
  role: String,          // ['patient', 'doctor']
  review: [{
    user: ObjectId,
    rating: Number,      // 1-5
    content: String
  }],
  appointment: [ObjectId]
}
```
</details>

<details>
<summary><strong>👤 User Model</strong></summary>

```javascript
{
  name: String,          // Required
  email: String,         // Required, Unique
  phone: String,         // Required, Unique
  role: String,          // ['patient', 'doctor']
  photoUrl: String
}
```
</details>

<details>
<summary><strong>📅 Appointment Model</strong></summary>

```javascript
{
  doctor: ObjectId,      // Reference to Doctor
  patient: ObjectId,     // Reference to User
  appointmentDateTime: Date,
  createdAt: Date,
  updatedAt: Date
}
```
</details>

## 🛡️ Error Handling

The API implements comprehensive error handling for:
- 🔄 MongoDB operations
- ✅ Data validation
- 🔑 Authentication
- 🌐 Server errors

## 💻 Development

Run with hot-reload:
```bash
npm run dev
```

## 📄 License

This project is licensed under the ISC License.

---

<div align="center">

Made with ❤️ for better healthcare management

</div>

