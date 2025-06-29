## **Flight Apis**

**Base url:` http://127.0.0.1:3000/api/v1/flights/`**

**Description**
To add new flights, to update existing flights, to get a flight by id, to get all flights.

---


---
**1. `POST http://127.0.0.1:3000/api/v1/flights/createFlight`**
###  **Headers**

```
Content-Type: application/json
```
---

###  **Request Body**

```json
{
    "flightNumber": "AI101",
    "airline": "Air India",
    "aircraftType": "Boeing 787",
    "route": "685c17e6a65a4e12fb43e4c8",
    
    "Status": "scheduled"
  }

  > Note: it can be array of json objects too.
  ### ✅ **Success Response**

**Status:** `201 Created`

```json
{"success":true, "message": "Flights are inserted successfully", "data": result}


### ❌ **Error Responses**

**Status:** `409 Bad Request`

```json
{"success":false, "message": "Duplicate flight code" }

**Status:** `500 Internal Server Error`

```json
{"success":false," message": "Server error", "error": "error message" }
```

---
---
**2. `PUT http://127.0.0.1:3000/api/v1/flights/updateFlight/:id`**
---
###  **Headers**

```
Content-Type: application/json
```
###  **Request Body**

```json
{
    "flightNumber": "AI101",
    "success":true,"airline": "Air India",
    "aircraftType": "Boeing 787",
    "route": "685c17e6a65a4e12fb43e4c8",
    
    "Status": "scheduled"
  }

 
  ### ✅ **Success Response**

**Status:** `200 Updated`

```json
{"success":true, "message": "Flight updated", "data": result}


### ❌ **Error Responses**

**Status:** `404 Bad Request`

```json
{"success":false, "message": "Flight not found" }

**Status:** `500 Internal Server Error`

```json
{"success":false," message": "Server error", "error": "error message" }
```

---
**3. `DELETE http://127.0.0.1:3000/api/v1/flights/deleteFlight/:id`**
---

 
  ### ✅ **Success Response**

**Status:** `200 deleted`

```json
{"success":true, "message": "Flight deleted", }


### ❌ **Error Responses**

**Status:** `404 Bad Request`

```json
{"success":false, "message": "Flight not found" }

**Status:** `500 Internal Server Error`

```json
{"success":false," message": "Server error", "error": "error message" }
```

---
---
**4. `GET http://127.0.0.1:3000/api/v1/flights/getAFlight/:id`**
---

 
  ### ✅ **Success Response**

**Status:** `200 Fetched`

```json
{"success":true, "message": "Flight fetched", "data": flight }


### ❌ **Error Responses**

**Status:** `404 Bad Request`

```json
{"success":false, "message": "Flight not found" }

**Status:** `500 Internal Server Error`

```json
{"success":false," message": "Server error", "error": "error message" }
```

---
---
**5. `GET http://127.0.0.1:3000/api/v1/flights/getAllFlights`**
---

 
  ### ✅ **Success Response**

**Status:** `200 Fetched`

```json
{"success":true, "message": "Flights fetched", "data": flights }


### ❌ **Error Responses**


**Status:** `500 Internal Server Error`

```json
{"success":false," message": "Server error", "error": "error message" }
```

---