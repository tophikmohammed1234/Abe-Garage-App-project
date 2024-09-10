import React, { useEffect, useState } from "react";
import customerService from "../../../../../services/customer.service";
import { useAuth } from "../../../../../Context/AuthContext";
import { FaRegEdit } from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const customersData = await customerService.getAllCustomers(token);
        const data = await customersData.json();
        setCustomers(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadCustomers();
  }, [token]);

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchTerm = searchQuery.toLowerCase();

    return (
      customer.customer_first_name.toLowerCase().includes(searchTerm) ||
      customer.customer_last_name.toLowerCase().includes(searchTerm) ||
      customer.customer_email.toLowerCase().includes(searchTerm) ||
      customer.customer_phone_number.toLowerCase().includes(searchTerm)
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    filteredCustomers.length
  );
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="my-5">
      <div className="contact-title mb-4">
        <h2>Customers</h2>
      </div>
      <div className="d-flex">
        <input
          type="text"
          className="d-flex w-75 mx-auto my-4 border border-5 border-secondary rounded text-dark"
          placeholder="Search for a customer by first name, last name, Email, or Phone"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <SearchIcon color="black" size={30} className="my-auto" />{" "} */}
      </div>
      <div>
        {customers.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Active</th>
                  <th>Edit</th>
                  <th>link</th>
                </tr>
              </thead>
              <tbody>
                {currentCustomers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.customer_first_name}</td>
                    <td>{customer.customer_last_name}</td>
                    <td>{customer.customer_email}</td>
                    <td>{customer.customer_phone_number}</td>
                    <td>
                      {new Date(customer.customer_added_date)
                        .toLocaleString("en-US", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          timeZoneName: "short",
                        })
                        .replace(",", "")
                        .replace(" ", " | ")
                        .replace("AM", "")
                        .replace("PM", "")
                        .replace(" GMT+3", "")}
                    </td>
                    <td>{customer.active_customer_status ? "Yes" : "No"}</td>
                    <td>
                      <FaRegEdit size={20} />
                    </td>
                    <td>link</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination controls */}
            <nav
              aria-label="Page navigation example"
              className="d-flex justify-content-center align-items-center my-5 w-100"
            >
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {/* Loop to generate page number buttons */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </>
        ) : (
          <div>No customer data available.</div>
        )}
      </div>
    </div>
  );
};

export default CustomersList;
