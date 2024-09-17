const orderService = require("../services/order.service");

async function addOrder(req, res) {
  try {
    const orderData = req.body;
    console.log("Received order data:", orderData);

    // Validate required fields
    if (
      !orderData.employee_id ||
      !orderData.customer_id ||
      !orderData.vehicle_id ||
      !orderData.order_total_price ||
      !orderData.order_status ||
      !orderData.services ||
      !Array.isArray(orderData.services) || // Ensure services is an array
      orderData.services.length === 0 || // Ensure at least one service is provided
      !orderData.services.every(
        (service) =>
          service.service_id && service.service_completed !== undefined
      ) // Ensure all services have required fields
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message:
          "Please provide all required fields and ensure services are correctly formatted.",
      });
    }

    // Create the order
    console.log(orderData.data);
    const order = await orderService.addNewOrder(orderData);

    if (!order || typeof order !== "object" || !order.order_id) {
      return res.status(400).json({
        error: "Failed to add the order!",
      });
    } else {
      return res.status(201).json({
        message: "Order created successfully",
        order_id: order.order_id,
      });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

module.exports = { addOrder };
