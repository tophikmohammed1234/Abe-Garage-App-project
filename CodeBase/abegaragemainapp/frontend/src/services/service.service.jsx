const api_url = import.meta.env.VITE_API_URL;

// A function to send a POST request to create a new service
const addService = async (formData, loggedInEmployeeToken) => {
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": loggedInEmployeeToken,
		},
		body: JSON.stringify(formData),
	};
	const response = await fetch(`${api_url}/api/services`, requestOptions);
	return response; // Return the raw response for further handling
};

const getServiceById = async (token, id) => {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};

	try {
		const response = await fetch(
			`${api_url}/api/services/${id}`,
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

const DeleteService = async (token, id) => {
	const requestOptions = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};
	console.log(requestOptions);
	const response = await fetch(`${api_url}/api/services/${id}`, requestOptions);

	// Parse the JSON response to get the full employee info
	const data = await response.json();
	return data;
};



// A function to send get request to get all services 
const getService = async (token) => {
  // console.log(token);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/services`, requestOptions);
  return response;
};

// Export the addService function
const serviceService = {

	addService,
	getServiceById,
	DeleteService,
  getService,
};
export default serviceService;
