// import axios from "axios";

// // Import from environment variables
// const api_url = import.meta.env.VITE_API_URL;

// const addService = async (formData) => {
//   try {
//     const response = await axios.post(`${api_url}/api/services`, formData, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data; // Return response data directly
//   } catch (error) {
//     console.error("Error adding service:", error);
//     throw new Error(
//       "There was a problem adding the service. Please try again."
//     );
//   }
// };

// export default { addService };
// Import from the env
// const api_url = import.meta.env.VITE_API_URL;

// // A function to send a POST request to create a new customer
// const addService = async (formData, loggedInEmployeeToken) => {
// 	const requestOptions = {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			"x-access-token": loggedInEmployeeToken,
// 		},
// 		body: JSON.stringify(formData),
// 	};
// 	const response = await fetch(`${api_url}/api/services`, requestOptions);
// 	return response; // Return the raw response for further handling
// };

// // Export the addService function
// const addService = {
// 	addService,
// };
// export default addService;
// Import from the env
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

// Export the addService function
const serviceService = {
  addService,
};
export default serviceService;
