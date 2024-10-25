# Testing

## To run test

- Make sure dependencies are installed (node, Jest and Babel)
- Run with: npm test

*** 

## TC1

### TC1.1 View all products

* Use case: UC1 User enters the application.
* Scenario: All products are displayed with name, price, description and an image.

Precondition:

### Test steps

* Enter application

### Expected
All products are displayed

***

### TC1.2 Add new booking

* Use case: UC2 Validates a new booking is added.
* Scenario: The UI is correctly displayed and booking is added to the system.
The main scenario of UC2 is tested where a new booking is made and added to the system.
Precondition:

### Test steps

* Click "create new booking"
- Fill in name and email
- Click "next"
- Choose car and date
- Click "done"


### Expected
Booking is added with the correct data and a confirmation is displayed to the user showing the booking information.

***

### TC1.3 Add new booking with missing user info

* Use case: UC3 Displays error message prompting input.
* Scenario: UI is displayed with prompt to input.
The main scenario of UC1 is tested where booking is attempted with missing user data.

### Test steps

* Click "create new booking"
- Fill in name and leave email empty
- Click "next"

### Expected
An alert popup is displayed prompting the user to input both fields of information. 

### TC1.4 Gets all bookings

* Use case: UC3 Retrieves all bookings connected to the user.
* Scenario: Should show all bookings.
The main scenario of UC1 is tested where all bookings are retrieved.
Precondition:

### Test steps

- Click "view bookings"
- Fill in email made with booking
- Click "Find bookings"

### Expected
Booking/bookings are displayed 

*** 

| Test      | UC1 (View all products) | UC2 (Add new booking) | UC3 (Add new booking with missing user info) | UC3 (Gets all bookings) |
| --------- | ---- | ---- |----| ----|                 
| TC1.1     | 1/OK              | 0                      | 0                      |
| TC1.2     | 0.                | 1/OK                   | 0                      |
| TC1.3     | 0                 | 0                      | 1/OK                   | 0                  |
| TC1.4     | 0                 | 0                      | 0                  | 1/OK                   |
| COVERAGE & SUCCESS| 1/OK    | 1/OK    | 1/OK | 1/OK |

### Comment

All tests passed.