## **Flights' components  Apis**

**Base url:` http://127.0.0.1:3000/api/v1/fli_comp/`**

**Description**
To add Airport, flight seat,route,schedule
---
---
**1. `POST http://127.0.0.1:3000/api/v1/fli_comp/createAirport`**
###  **Headers**

```
Content-Type: application/json
```
---

###  **Request Body**

```json
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
{ "message": "Airports inserted successfully", "data": result}


### ❌ **Error Responses**
**Status:** `400 Bad Request`

```json
{ "message": "Please provide complete airport data." }

**Status:** `409 Bad Request`

```json
{ "message": "Duplicate airport code" }

**Status:** `500 Internal Server Error`

```json
{" message": "Server error", "error": "error message" }
```
**2. `POST http://127.0.0.1:3000/api/v1/fli_comp/createRoute`**
###  **Headers**

```
Content-Type: application/json
```
---

###  **Request Body**

```json
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
{ "Schedules created successfully", "data": result}


### ❌ **Error Responses**
**Status:** `400 Bad Request`

```json
{ "message": "Please provide complete schedule data." }


**Status:** `500 Internal Server Error`

```json
{" message": "Server error", "error": "error message" }
```






**4. `POST http://127.0.0.1:3000/api/v1/fli_comp/createSeat`**
###  **Headers**

```
Content-Type: application/json
```
---

###  **Request Body**

```json
 
{
    "number": "1A",
    "Class": "First",
    "seatType": "window"
  }
  > Note: it can be array of json objects too.
  ### ✅ **Success Response**

**Status:** `201 Created`

```json
{ "Seats created successfully", "data": result}


### ❌ **Error Responses**
**Status:** `400 Bad Request`

```json
{ "message": "Please provide complete seat data." }


**Status:** `500 Internal Server Error`

```json
{" message": "Server error", "error": "error message" }
```






