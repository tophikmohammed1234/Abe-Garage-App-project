import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import employeeService from "../../../../services/employee.service";
import BarLoader from "react-spinners/BarLoader";

const EmployeeUpdate = ({
  show,
  handleClose,
  selectedEmployee,
  loggedInEmployeeToken,
}) => {
  // Consolidated form state
  const [formData, setFormData] = useState({
    employee_email: selectedEmployee.employee_email,
    employee_first_name: selectedEmployee.employee_first_name,
    employee_last_name: selectedEmployee.employee_last_name,
    employee_phone: selectedEmployee.employee_phone,
    employee_password: "",
    active_employee: selectedEmployee.active_employee,
    company_role_id: selectedEmployee.company_role_id,
    employee_id: selectedEmployee.employee_id,
  });

  // State for managing errors
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate inputs
  const validate = () => {
    let newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!formData.employee_first_name)
      newErrors.employee_first_name = "First name is required";
    if (!formData.employee_last_name)
      newErrors.employee_last_name = "Last name is required";
    if (!formData.employee_phone)
      newErrors.employee_phone = "Phone number is required";
    if (!formData.company_role_id)
      newErrors.company_role_id = "Role is required";
    if (!formData.employee_email || !emailRegex.test(formData.employee_email)) {
      newErrors.employee_email = "Invalid email format";
    }
    if (
      !isChecked &&
      (!formData.employee_password || formData.employee_password.length < 6)
    ) {
      newErrors.employee_password =
        "Password must be at least 6 characters long";
    }

    return newErrors;
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    const payload = {
      ...formData,
      employee_password: isChecked
        ? selectedEmployee.employee_password_hashed
        : formData.employee_password,
    };

    employeeService
      .updateEmployee(payload, loggedInEmployeeToken)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setServerError(data.error);
        } else {
          setSuccess(true);
          setServerError("");
          setTimeout(() => {
            window.location.href = "/admin/employees";
          }, 1000);
        }
      })
      .catch((error) => {
        const resMessage =
          error.response?.data?.message || error.message || error.toString();
        setServerError(resMessage);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal show={show} onHide={handleClose} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedEmployee && (
          <Form>
            <Form.Group className="mb-3 d-flex justify-content-between">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="employee_first_name"
                value={formData.employee_first_name}
                onChange={handleInputChange}
                style={{
                  width: "70%",
                  border: errors.employee_first_name ? "1px solid red" : "",
                }}
              />
              
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-between">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="employee_last_name"
                value={formData.employee_last_name}
                onChange={handleInputChange}
                style={{
                  width: "70%",
                  border: errors.employee_last_name ? "1px solid red" : "",
                }}
              />
            
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-between">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="employee_email"
                value={formData.employee_email}
                onChange={handleInputChange}
                style={{
                  width: "70%",
                  border: errors.employee_email ? "1px solid red" : "",
                }}
              />
         
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-between">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="employee_phone"
                value={formData.employee_phone}
                onChange={handleInputChange}
                style={{
                  width: "70%",
                  border: errors.employee_phone ? "1px solid red" : "",
                }}
              />
              
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-between">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="company_role_id"
                value={formData.company_role_id}
                onChange={handleInputChange}
                style={{ width: "70%" }}
              >
                <option value="">Select The Company Role</option>
                <option value={1}>Employee</option>
                <option value={2}>Manager</option>
                <option value={3}>Admin</option>
              </Form.Select>
              {errors.company_role_id && (
                <p style={{ color: "red" }}>?</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between">
                <Form.Label>Password</Form.Label>
                <Form.Check
                  type="checkbox"
                  checked={isChecked}
                  label="Use old password"
                  onChange={() => setIsChecked(!isChecked)}
                />
              </div>
              <Form.Control
                type="password"
                name="employee_password"
                value={
                  isChecked
                    ? selectedEmployee.employee_password_hashed
                    : formData.employee_password
                }
                onChange={handleInputChange}
                disabled={isChecked}
                style={{
                  width: "70%",
                  border: errors.employee_password ? "1px solid red" : "",
                }}
              />
              {errors.employee_password && (
                <p style={{ color: "red" }}>{errors.employee_password}</p>
              )}
            </Form.Group>
          </Form>
        )}
        {serverError && <p style={{ color: "red" }}>{serverError}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          style={{ height: "40px" }}
          variant="primary"
          onClick={handleSaveChanges}
        >
          {isLoading ? (
            <BarLoader color="#f9c305" height={5} />
          ) : (
            "Save Changes"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeUpdate;
