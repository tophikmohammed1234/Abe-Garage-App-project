const customerService = require("../services/customer.service");

async function addCustomer(req, res) {
  try {
    const {
      customer_first_name,
      customer_last_name,
      customer_email,
      customer_phone_number,
      active_customer_status,
      customer_hash,
      customer_added_date,
    } = req.body;

    if (
      !customer_first_name ||
      !customer_last_name ||
      !customer_email ||
      !customer_phone_number ||
      !active_customer_status ||
      !customer_hash ||
      !customer_added_date
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    await customerService.addCustomer(req.body);

    res.status(201).json({
      message: "Customer created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// a function to get all customers
async function getAllCustomers(req, res) {
  try {
    const customers = await customerService.getAllCustomers();

    return res.status(200).json({
      message: "Customers retrieved successfully",
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// export all the functions
module.exports = {
  addCustomer,
  getAllCustomers,
};
