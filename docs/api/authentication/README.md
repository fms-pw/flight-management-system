### 📌 **Signup API**

**Endpoint:**  
`POST http://127.0.0.1:3000/api/v1/auth/signup`

**Description:**  
Registers a new user with the provided personal, contact, and address details.

---

### 🔐 **Headers**

```
Content-Type: application/json
```

---

### 📤 **Request Body**

```json
{
  "firstName": "Kailash",
  "lastName": "Parihar",
  "email": "kailashparihar@gmail.com",
  "mobileNumber": "9649352595",
  "dateOfBirth": "1999-05-20",
  "gender": "male",
  "password": "Kailash@123!",
  "role": "admin",
  "address": {
    "street": "Sojat City",
    "city": "Sojat",
    "district": "Pali",
    "state": "Rajasthan",
    "pincode": "306104",
    "country": "india"
  }
}
```

```json
{
  "firstName": "Jakir",
  "lastName": "Khan",
  "email": "jakirkhan@gmail.com",
  "mobileNumber": "7568868215",
  "dateOfBirth": "2001-05-20",
  "gender": "male",
  "password": "Jakir@123!",
  "address": {
    "street": "Neemrana",
    "city": "Kotputli",
    "district": "Behror",
    "state": "Rajasthan",
    "pincode": "301705",
    "country": "india"
  }
}
```

```json
{
  "firstName": "Mayank",
  "lastName": "Yadav",
  "email": "mayankyadav@gmail.com",
  "mobileNumber": "9829930497",
  "dateOfBirth": "2000-05-20",
  "gender": "male",
  "password": "Mayank@123!",
  "address": {
    "street": "Khatoo",
    "city": "Sikar",
    "district": "Sikar",
    "state": "Rajasthan",
    "pincode": "332602",
    "country": "india"
  }
}
```

```json
{
  "firstName": "Tanya",
  "lastName": "Tiwari",
  "email": "tanyatiwari@gmail.com",
  "mobileNumber": "9670206780",
  "dateOfBirth": "1999-05-20",
  "gender": "female",
  "password": "Tanya@123!",
  "address": {
    "street": "Gomti Nagar",
    "city": "Alambagh",
    "district": "Lucknow",
    "state": "Uttar Pradesh",
    "pincode": "226005",
    "country": "india"
  }
}
```

```json
{
  "firstName": "Laxmi",
  "lastName": "Yadav",
  "email": "laxmiyadav@gmail.com",
  "mobileNumber": "8887737125",
  "dateOfBirth": "1998-05-20",
  "gender": "female",
  "password": "Laxmi@123!",
  "address": {
    "street": "laxmi Nagar",
    "city": "Amethi",
    "district": "Sultanpur",
    "state": "Uttar Pradesh",
    "pincode": "227405",
    "country": "india"
  }
}
```

### ✅ **Success Response**

**Status:** `201 Created`

```json
{
  "status": "success",
  "message": "Congratulation! Tanya Tiwari Your account has been successfully created.",
  "UserId": "6859a9f8422b910d6c567e5d"
}
```

---

### ❌ **Error Responses**

**Status:** `400 Bad Request`

```json
{
  "status": "failed",
  "message": "An account already exists with this email example@gmail.com and mobile number 9876543210"
}
```

```json
{
  "status": "failed",
  "message": "An account already exists with this email example@gmail.com"
}
```

```json
{
  "status": "failed",
  "message": "An account already exists with this mobile number 9876543210"
}
```

**Status:** `500 Internal Server Error`

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

### 🔑 **Login API**

**Endpoint:**  
`POST http://127.0.0.1:3000/api/v1/auth/login`

**Description:**  
Logs in a user using either email or mobile number and password.

---

### 🔐 **Headers**

```
Content-Type: application/json
```

---

### 📤 **Request Body**

**Note:** Provide either `email` or `mobileNumber` (not both).

```json
{
  "email": "example@gmail.com",
  "password": "Password"
}
```

```json
{
  "mobileNumber": "9876543210",
  "password": "Password"
}
```

---

### ✅ **Success Response**

**Status:** `200 OK`

```json
{
  "status": "success",
  "message": "Welcome back, Laxmi Yadav! You have logged in successfully."
}
```

---

### ❌ **Error Responses**

**Status:** `400 Bad Request`

```json
{
  "message": "Please provide either email or mobile number, not both."
}
```

```json
{
  "message": "Password is required."
}
```

**Status:** `401 Unauthorized`

```json
{
  "message": "User not found!"
}
```

```json
{
  "message": "Invalid Password"
}
```

**Status:** `500 Internal Server Error`

```json
{
  "status": "Something went wrong",
  "error": "Error",
  "message": "Detailed error message"
}
```
