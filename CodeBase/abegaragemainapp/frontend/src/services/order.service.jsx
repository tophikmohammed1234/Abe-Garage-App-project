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

export { createOrder };
