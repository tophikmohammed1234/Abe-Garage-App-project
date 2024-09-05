const updateService = require("../services/update.service");

async function updateEmployee(req, res, next) {
  try {
    // cauch the originnal id on the params
    const employee_id = req.body.employee_id;
    if (!employee_id) {
      return res.status(400).json({ error: "Original email is required" });
    }

    // Update the employee
    const employeeData = req.body;
    const updatedEmployee = await updateService.updateEmployee(employeeData);

    if (!updatedEmployee.employee_id) {
      return res.status(400).json({ error: "Failed to update the employee!" });
    }

    return res
      .status(200)
      .json({ status: "success", employee_id: updatedEmployee.employee_id });
  } catch (err) {
    console.error("Update error:", err.message);
    return res.status(500).json({ error: "Something went wrong!" });
  }
}

module.exports = { updateEmployee };
