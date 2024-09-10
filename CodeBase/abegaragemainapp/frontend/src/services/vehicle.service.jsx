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

export { createVehicle };
