const db = require("../config/db.config");

async function addCustomer(customerData) {
  const insertCustomerIdentifierQuery = `
        INSERT INTO customer_identifier 
        (customer_email, customer_phone_number, customer_hash, customer_added_date) 
        VALUES (?, ?, ?, ?)`;

  const insertCustomerInfoQuery = `
        INSERT INTO customer_info 
        (customer_id, customer_first_name, customer_last_name, active_customer_status) 
        VALUES (?, ?, ?, ?)`;

  const {
    customer_first_name,
    customer_last_name,
    customer_email,
    customer_phone_number,
    active_customer_status,
    customer_hash,
    customer_added_date,
  } = customerData;

  const connection = await db.pool.getConnection();
  try {
    await connection.beginTransaction();

    const [resultIdentifier] = await connection.query(
      insertCustomerIdentifierQuery,
      [
        customer_email,
        customer_phone_number,
        customer_hash,
        customer_added_date,
      ]
    );

    const customer_id = resultIdentifier.insertId;

    await connection.query(insertCustomerInfoQuery, [
      customer_id,
      customer_first_name,
      customer_last_name,
      active_customer_status,
    ]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    await connection.release();
  }
}

// a function to get all customers
async function getAllCustomers() {
  const connection = await db.pool.getConnection();
  try {
    const query =
      "SELECT * FROM customer_info JOIN customer_identifier ON customer_info.customer_id = customer_identifier.customer_id ORDER BY customer_info.customer_id DESC";
    const [rows] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  } finally {
    connection.release();
  }
}


async function getCustomerById(customer_id) {
  const query = `SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id = ?`;
  const rows = await db.query(query, [customer_id]);
  return rows;
}

module.exports = { addCustomer, getAllCustomers, getCustomerById };

