// Import the query function from the db.config.js file
const employeeService = require("../services/employee.service");
const conn = require("../config/db.config");
const bcrypt = require("bcrypt");

// A function to check if employee exists in the database
async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ?";
  const [rows] = await conn.query(query, [email]);
  return rows.length > 0;
}

// A function to update an employee
async function updateEmployee(employee) {
  let updatedFields = {};
  let updatedEmployee = {};

  try {
    const original_employee_data = await employeeService.getEmployeeById(
      employee.employee_id
    );
    if (!employee.employee_id) {
      throw new Error("Original id is required");
    }

    // Retrieve the employee_id using the original id
    const selectQuery =
      "SELECT employee_id FROM employee WHERE employee_id = ?";
    const [existingEmployee] = await conn.query(selectQuery, [
      employee.employee_id,
    ]);

    if (!existingEmployee || existingEmployee.length === 0) {
      throw new Error("Employee not found");
    }

    const employee_id = existingEmployee.employee_id;

    updatedFields.employee_email = employee.employee_email;

    updatedFields.active_employee = employee.active_employee;

    updatedFields.employee_first_name = employee.employee_first_name;

    updatedFields.employee_last_name = employee.employee_last_name;

    updatedFields.employee_phone = employee.employee_phone;

    updatedFields.company_role_id = employee.company_role_id;

    // console.log(employee.employee_password);
    // console.log(original_employee_data[0].employee_password_hashed);
    // Handle password update
    if (
      employee.employee_password &&
      employee.employee_password !==
        original_employee_data[0].employee_password_hashed
    ) {
      // If the provided password is different from the original hashed password, hash the new password
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(
        employee.employee_password,
        salt
      );
      updatedFields.employee_password_hashed = hashedPassword;
    } else {
      updatedFields.employee_password_hashed =
        original_employee_data[0].employee_password_hashed;
    }

    // Update the employee table
    const updateEmployeeQuery = `
      UPDATE employee 
      SET employee_email = COALESCE(?, employee_email), 
          active_employee = COALESCE(?, active_employee) 
      WHERE employee_id = ?`;

    await conn.query(updateEmployeeQuery, [
      updatedFields.employee_email,
      updatedFields.active_employee,
      employee_id,
    ]);

    // Update the employee_info table
    const updateInfoQuery = `
      UPDATE employee_info 
      SET employee_first_name = COALESCE(?, employee_first_name), 
          employee_last_name = COALESCE(?, employee_last_name), 
          employee_phone = COALESCE(?, employee_phone) 
      WHERE employee_id = ?`;

    await conn.query(updateInfoQuery, [
      updatedFields.employee_first_name,
      updatedFields.employee_last_name,
      updatedFields.employee_phone,
      employee_id,
    ]);

    // Update the employee password if it exists in updatedFields

    if (updatedFields.employee_password_hashed) {
      const updatePasswordQuery = `
        UPDATE employee_pass 
        SET employee_password_hashed = ? 
        WHERE employee_id = ?`;

      await conn.query(updatePasswordQuery, [
        updatedFields.employee_password_hashed,
        employee_id,
      ]);
    }

    // Update the employee role
    if (
      employee.company_role_id &&
      employee.company_role_id !== original_employee_data[0].company_role_id
    ) {
      const updateRoleQuery = `
        UPDATE employee_role 
        SET company_role_id = ? 
        WHERE employee_id = ?`;

      await conn.query(updateRoleQuery, [
        updatedFields.company_role_id,
        employee_id,
      ]);
    }

    // Return the updated fields
    updatedEmployee = { ...updatedFields, employee_id };
  } catch (err) {
    console.error("Update failed:", err.message);
  }

  return updatedEmployee;
}

module.exports = {
  checkIfEmployeeExists,
  updateEmployee,
};
