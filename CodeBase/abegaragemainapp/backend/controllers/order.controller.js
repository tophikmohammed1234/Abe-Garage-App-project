const orderService = require("../services/order.service");

async function addOrder(req, res) {
  try {
    const orderData = req.body;

    // Ensure required fields are valid
    if (
      !orderData.employee_id ||
      !orderData.customer_id ||
      !orderData.vehicle_id ||
      !orderData.order_total_price ||
      typeof orderData.order_status === "undefined" || // Ensure order_status is provided
      !orderData.services ||
      !Array.isArray(orderData.services) ||
      orderData.services.length === 0 ||
      !orderData.services.every(
        (service) =>
          service.service_id && service.service_completed !== undefined
      )
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message:
          "Please provide all required fields and ensure services are correctly formatted.",
      });
    }

    // Insert order into the database
    const order = await orderService.addNewOrder(orderData);

    if (!order || !order.order_id) {
      return res.status(400).json({
        error: "Failed to add the order!",
      });
    }

    // Insert order status
    const statusResult = await orderService.addOrderStatus(
      order.order_id,
      orderData.order_status
    );

    return res.status(201).json({
      message: "Order created successfully",
      order_id: order.order_id,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      // error: "Internal Server Error",
      error: "register-success",
      // message: error.message || "An unexpected error occurred.",
    });
  }

}


module.exports = { addOrder };
