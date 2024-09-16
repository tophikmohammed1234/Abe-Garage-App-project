async function deleteOrder(orderId) {
  try {
    // Delete associated order_services first
    await conn.query("DELETE FROM order_services WHERE order_id = ?", [
      orderId,
    ]);

    // Then delete the order itself
    await conn.query("DELETE FROM orders WHERE order_id = ?", [orderId]);

    return true;
  } catch (err) {
    console.error("Error deleting order:", err);
    throw new Error("Failed to delete order");
  }
}

// Export the deleteOrder function for use in other files

module.exports = {
  deleteOrder,
};
