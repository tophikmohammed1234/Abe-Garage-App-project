const orderService = require("../services/orderService");

async function deleteOrder(req, res, next) {
  try {
    const orderId = req.params.id;

    // Delete the order
    await orderService.deleteOrder(orderId);

    return res.status(200).json({
      message: "Order deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while deleting the order.",
    });
  }
}

// Export the deleteOrder function for use in other files.
module.exports = {
  deleteOrder,
};
