// import the login service
const loginService = require("../services/login.service");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

async function logIn(req, res, next) {
  try {
    console.log(req.body);
    const employeeData = req.body;

    const employee = await loginService.logIn(employeeData);

    if (!employee.status === "fail") {
      res.status(401).json({
        status: employee.status,
        message: employee.message,
      });
      console.log(employee.message);
    } else {
    }

    const payload = {
      employee_id: employee.data.employee_id,
      employee_email: employee.data.employee_email,
      employee_role: employee.data.company_role_id,
      employee_first_name: employee.data.employee_first_name,
    };
    //  JWT Implementation
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "24h",
    });

    const sendBack = {
      employee_token: token,
    };
    res.status(200).json({
      status: "success",
      message: "Employee logged in successfully",
      data: sendBack,
    });
  } catch (error) {
    res.status(500).json({
      status: " Internal Server Error",
      message: "unexpected server error",
    });
  }
}
module.exports = {
  logIn,
};
