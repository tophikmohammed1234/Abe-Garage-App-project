// Import from the env
const api_url = import.meta.env.VITE_API_URL;

// A function to send post request to create a new employee
const createOrder = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/order`, requestOptions);
  return response;
};

// get orders by customer id
const getOrdersByCustomerId = async (token, order_id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/api/order/customer/${order_id}`,
    requestOptions
  );
  return response;
};

export { createOrder };

export default {
  getOrdersByCustomerId,
};
