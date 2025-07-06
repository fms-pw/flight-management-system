## **Flights' components Apis**

**Base url:` http://127.0.0.1:3000/api/v1/fli_comp/`**

**Description**
To add Airport, flight seat,route,schedule

---

---

**1. `POST http://127.0.0.1:3000/api/v1/fli_comp/createAirport`**

### **Headers**

```
Content-Type: application/json
```

---

### **Request Body**

````json
{
    "name": "Indira Gandhi International Airport",
    "code": "DEL",
    "city": "New Delhi",
    "country": "India"
}

  > Note: it can be array of json objects too.
  ### ✅ **Success Response**

**Status:** `201 Created`

```json
{ "success":true,"message": "Airports inserted successfully", "data": result}


### ❌ **Error Responses**
**Status:** `400 Bad Request`

```json
{"success":false, "message": "Please provide complete airport data." }

**Status:** `409 Bad Request`

```json
{"success":false, "message": "Duplicate airport code" }

**Status:** `500 Internal Server Error`

```json
<<<<<<< HEAD:docs/api/fli_comp-api.md
{"success":false," message": "Server error", "error": "error message" }
=======
{" message": "Server error", "error": "error message" }
>>>>>>> feature/kailash-auth:docs/api/airports/README.md
````

**2. `POST http://127.0.0.1:3000/api/v1/fli_comp/createRoute`**

### **Headers**

```
Content-Type: application/json
```

---

### **Request Body**

````json
{
    "origin": "685c1711a65a4e12fb43e4bd",  // DEL - New Delhi
    "destination": "685c1711a65a4e12fb43e4be",  // BOM - Mumbai
    "routeCode": "DEL-BOM",
    "distance": 1400,
    "duration": "2h 15m"
  },

  > Note: it can be array of json objects too.
  ### ✅ **Success Response**

**Status:** `201 Created`

```json
{ "success":true,"message":"Schedules created successfully", "data": result}


### ❌ **Error Responses**
**Status:** `400 Bad Request`

```json
{"success":false, "message": "Please provide complete schedule data." }


**Status:** `500 Internal Server Error`

```json
<<<<<<< HEAD:docs/api/fli_comp-api.md
{"success":false," message": "Server error", "error": "error message" }
````

**3. `POST http://127.0.0.1:3000/api/v1/fli_comp/createSchedule`**
=======
{" message": "Server error", "error": "error message" }
````

**4. `POST http://127.0.0.1:3000/api/v1/fli_comp/createSeat`**
>>>>>>> feature/kailash-auth:docs/api/airports/README.md

### **Headers**

```
Content-Type: application/json
```

---

### **Request Body**

````json
<<<<<<< HEAD:docs/api/fli_comp-api.md

 {
    "flightId": "685c2d0ee794f0a07ece5577",
    "routeId": "685c17e6a65a4e12fb43e4ca",
    "departureTime": "2025-07-01T06:00:00.000Z",
    "arrivalTime": "2025-07-01T07:50:00.000Z",
    "duration": "1h 50m",
    "isRecurring": true,
    "days": "Daily"
  }
  > Note: it can be array of json objects too.
  ### ✅ **Success Response**

**Status:** `201 Created`

```json
{ "success":true,"message":"schedule created successfully", "data": result}


### ❌ **Error Responses**
**Status:** `400 Bad Request`

```json
{"success":false, "message": "Please provide complete schedule data." }


**Status:** `500 Internal Server Error`

```json
{"success":false," message": "Server error", "error": "error message" }
````

**4. `POST http://127.0.0.1:3000/api/v1/fli_comp/createSeat`**

### **Headers**

```
Content-Type: application/json
```

---

### **Request Body**

````json

=======

>>>>>>> feature/kailash-auth:docs/api/airports/README.md
{
    "number": "1A",
    "Class": "First",
    "seatType": "window"
  }
  > Note: it can be array of json objects too.
  ### ✅ **Success Response**

**Status:** `201 Created`

```json
{ "success":true,"message":"Seats created successfully", "data": result}


### ❌ **Error Responses**
**Status:** `400 Bad Request`

```json
{"success":false, "message": "Please provide complete seat data." }


**Status:** `500 Internal Server Error`

```json
<<<<<<< HEAD:docs/api/fli_comp-api.md
{"success":false," message": "Server error", "error": "error message" }
=======
{" message": "Server error", "error": "error message" }
>>>>>>> feature/kailash-auth:docs/api/airports/README.md
````
