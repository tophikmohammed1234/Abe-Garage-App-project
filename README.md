# Abe Garage App

Abe Garage App is a comprehensive management system designed to streamline operations at a garage. This project includes both frontend and backend functionalities, allowing administrators to manage customers, employees, vehicles, and services effectively.

## Features

- **Customer Management**: Add, update, and manage customer details.
- **Vehicle Management**: Track and manage vehicles associated with customers.
- **Service Management**: Record services offered, manage orders by customer ID, and keep track of orders.
- **Employee Management**: Manage employee information and roles.
- **Authentication**: Secure login for administrators and employees.
- **Admin Dashboard**: Provides a centralized view of all the operations for the garage.

## Tech Stack

- **Frontend**: React, JSX, CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MySQL with `mysql2/promise`
- **Authentication**: Firebase (for authentication)
- **Other Tools**: Axios for API requests, React Router for navigation

## Project Structure

. ├── frontend │
               ├── public │ 
               └── src │ 
                        ├── components │
                        ├── pages │
                        |── services |

. ├── backend │ 
            ├── controllers │
            ├── routes │ 
            |── services |
            ├── db |
            |── README.md


## Setup

To set up the project locally, follow these steps:

1. **Clone the repository:**

   First, clone the repository to your local machine.

   ```bash
   git clone https://github.com/tophikmohammed1234/Abe-Garage-App-project.git
   cd Abe-Garage-App-project
   
2. **Backend Setup:**

  Navigate to the backend directory and install the required dependencies.

   ```bash
  cd backend
  npm install
```
Create a .env file in the backend directory and add the necessary environment variables such as database credentials.

Start the backend server:

 ```bash
  npm start
```

3. **Frontend Setup:**
   
Navigate to the frontend directory and install the dependencies.

```bash

cd ../frontend
npm install
```

Start the frontend development server:

```bash
npm start
```

4. **Set up a MySQL database:**
   
- Set up a MySQL database.
- Update the database configuration in db.config.js.
- Run any necessary migrations or manually create the required tables for customers, employees, vehicles, services, etc.

## Usage

Once both the backend and frontend servers are running, open your browser and navigate to:

```bash
http://localhost:5173
```

-**Log in with your credentials to access the admin dashboard.**
-**Use the features like managing customers, vehicles, services, and employees through the user-friendly dashboard.**

## Contribution

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature-name).
3. Commit your changes (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature/your-feature-name).
5. Open a Pull Request.

Please ensure your code follows the coding standards and is well-documented.




