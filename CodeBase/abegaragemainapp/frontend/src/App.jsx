// Import react
import React from "react";
// Import the Routes and Route components from react-router
import { Routes, Route } from "react-router";
// Import the page components
import Home from "./markup/pages/Home";
import Login from "./markup/pages/Login";
import AddEmployee from "./markup/pages/AddEmployee";
import Unauthorized from "./markup/pages/Unauthorized";
import About from "./markup/pages/About";
import Contact from "./markup/pages/Contact";
import Services from "./markup/pages/Services";
// Import the Orders and Customers components
import Orders from "./markup/pages/admin/Orders";
import Customers from "./markup/pages/admin/Customers";
// Import the Employees component
import Employees from "./markup/pages/admin/Employees";

// Import the css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

// Import the custom css file
import "./assets/styles/custom.css";

// Import the Header component
import Header from "./markup/components/Header/Header";
// Import the Footer component
import Footer from "./markup/components/Footer/Footer";

// Import the PrivateAuthRoute component
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import DeleteEmployee from "./markup/components/Admin/Delete/DeleteEmployee";
import DashBoard from "./markup/pages/DashBoard";
import AddCustomerPage from "./markup/pages/admin/AddCustomerPage";
import Service from "./markup/pages/admin/Service";
import AddVehiclePage from "./markup/pages/admin/AddVehiclePage";

import CustomerUpdatePage from "./markup/pages/admin/CustomerUpdatePage";
import CustomerProfile from "./markup/pages/admin/CustomerProfile";
import DeleteService from "./markup/components/Admin/Delete/DeleteService";
// import AddServiceForm from "./markup/components/Admin/AddServiceForm/AddServiceForm";
import ServiceUpdatePage from "./markup/pages/admin/ServiceUpdatePage";

function App() {
	return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Services" element={<Services />} />
        {/* // Add the Dashboard Route  */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <DashBoard />
            </PrivateAuthRoute>
          }
        />
        {/* // Add the Orders Route  */}
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />
        {/* // Add the Customers Route  */}
        <Route
          path="/admin/customer/:customerId"
          element={<CustomerUpdatePage />}
        />
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />
        {/* // Add the AddCustomerPage Route  */}
        <Route
          path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddCustomerPage />
            </PrivateAuthRoute>
          }
        />
        {/* // Add the Employees Route  */}
        <Route path="/admin/employees" element={<Employees />} />
        <Route path="/admin/employee/:id" element={<DeleteEmployee />} />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-vehicle"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddVehiclePage />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customer/profile/:customerId"
          element={
            <PrivateAuthRoute roles={[3]}>
              <CustomerProfile />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/Services"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Service />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/services/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <DeleteService />
            </PrivateAuthRoute>
          }
        />

        {/* Add the route for ServiceUpdatePage */}
        <Route
          path="/admin/services/update/:serviceId"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <ServiceUpdatePage />
            </PrivateAuthRoute>
          }
        />

        {/* 
        Customers (/admin/customers) - managers and admins
        Orders (/admin/orders) - Can be accessed by all employees
        Add employee (/admin/add-employee) - admins only 
            - Admin: 3 
            - Manager: 2 
            - Employee: 1 
        */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
