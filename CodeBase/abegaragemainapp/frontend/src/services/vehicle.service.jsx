const api_url = "http://localhost:8000"; // Your backend API URL

// Create a new vehicle
const createVehicle = async (formData, loggedInEmployeeToken) => {
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": loggedInEmployeeToken, // Use token for authentication
		},
		body: JSON.stringify(formData), // Pass vehicle details
	};
	const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
	return response;
};

//get vehicle by id
const getVehicleByCustomerId = async (token, id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await fetch(
      `${api_url}/api/vehicle/${id}`,
      requestOptions
    );

    if (!response.ok) {
      return { error: `Service not found, status: ${response.status}` };
    }

    return await response.json();
  } catch (error) {
    return { error: "Failed to fetch service data" };
  }
};
export { createVehicle, getVehicleByCustomerId };
