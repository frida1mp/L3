# BookingManager

## Overview
The Car Application is our web application that provides the user with all our cars available for the customers to rent. 

As it is currently during development and has no percistent data apart from localStorage we will list all the goals and requirements for the finished product see issues. 

### To contribute to the project
- Fork the repository
- Create a feature branch
- Ensure all tests pass
- Open a pull request for review

#### Initialize the application
- To start the application run: npm run dev

#### Prerequisites
Before you run the application make sure to meet the following requirements:

- **Node.js**, Version 14 or later is required to run this project. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**  The Node package manager is bundled with Node.js. Ensure it is installed by running:
  ```bash
  npm -v
  ```
- Browser For testing the app, you can use any modern web browser (Chrome, Firefox, etc.).
- Vite: This project uses Vite as a build tool. It will be automatically installed when you run:
```bash
npm install
```
- ESLint: For code linting, ESLint is included as a development dependency to maintain code quality. You can run the linter with:
```bash
npm run lint
```
- Jest
- Babel

###  Bug report

See issues in repository. 

### Design
![class diagram](./images/umlClass.jpeg)
### CI/CD Flow
#### Linting: Code is linted on every push using ESLint.

#### Testing: Unit tests are run using Jest.

This project uses Jest as the testing framework for unit tests. Jest is a delightful JavaScript testing framework that focuses on simplicity. It provides a robust and user-friendly environment for testing JavaScript code, including asynchronous functions.

##### Prerequisites

Ensure you have the following installed before running the tests:

- Node.js (version 14 or higher)
- npm (Node package manager)


Run the test using: npm test

##### Writing Tests

- Location: Create your test files in the __tests__ directory or in the same directory as the module you are testing, using the naming convention *.test.js.

- Structure: Each test file should import the module to be tested and Jest's testing functions. Here's an example of a basic test structure:

![Getting Started](./images/scrnsht2.png)

- Mocking Dependencies: In your tests, you may need to mock dependencies to isolate the code being tested. Jest provides a powerful mocking system to simulate the behavior of modules and functions. Use jest.fn() to create mock functions and control their return values.

#### Docker Build: A Docker image is built automatically and tested in a containerized environment.

#### Deployment: 
The application is deployed through Netlify