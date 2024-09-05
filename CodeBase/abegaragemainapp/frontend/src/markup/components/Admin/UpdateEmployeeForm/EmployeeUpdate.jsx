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
  const [employee_email, setEmail] = useState(selectedEmployee.employee_email);
  const [employee_first_name, setFirstName] = useState(
    selectedEmployee.employee_first_name
  );
  const [employee_last_name, setLastName] = useState(
    selectedEmployee.employee_last_name
  );
  const [employee_phone, setPhoneNumber] = useState(
    selectedEmployee.employee_phone
  );
  const [employee_password, setPassword] = useState("");
  const [active_employee, setActive_employee] = useState(
    selectedEmployee.active_employee
  );
  const [company_role_id, setCompany_role_id] = useState(
    selectedEmployee.company_role_id
  );
  const [employee_id] = useState(selectedEmployee.employee_id);

  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [lastNameRequired, setLastNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = (e) => {
    e.preventDefault();

    let valid = true;
    // Validate fields
    if (!employee_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }

    if (!employee_last_name) {
      setLastNameRequired("Last name is required");
      valid = false;
    } else {
      setLastNameRequired("");
    }

    if (!employee_phone) {
      setPhoneError("Phone number is required");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!company_role_id) {
      setRoleError("Role is required");
      valid = false;
    } else {
      setRoleError("");
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!employee_email || !emailRegex.test(employee_email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!isChecked && (!employee_password || employee_password.length < 6)) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }
    
    
    if (!valid) {
      return;
    }
    setIsLoading(true);
    const formData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password: isChecked
        ? selectedEmployee.employee_password_hashed
        : employee_password,
      active_employee,
      company_role_id,
      employee_id,
    };

    employeeService
      .updateEmployee(formData, loggedInEmployeeToken)
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
      });
  };

  return (
    <Modal show={show} onHide={handleClose} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedEmployee && (
          <Form>
            <Form.Group
              className="mb-3 d-flex justify-content-between"
              controlId="formFirstName"
            >
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={employee_first_name}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  width: "70%",
                  ...(firstNameRequired ? { border: "1px solid red" } : {}),
                }}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex justify-content-between"
              controlId="formLastName"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={employee_last_name}
                onChange={(e) => setLastName(e.target.value)}
                style={{
                  width: "70%",
                  ...(lastNameRequired ? { border: "1px solid red" } : {}),
                }}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex justify-content-between"
              controlId="formEmail"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={employee_email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "70%",
                  ...(emailError ? { border: "1px solid red" } : {}),
                }}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex justify-content-between"
              controlId="formPhone"
            >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={employee_phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{
                  width: "70%",
                  ...(phoneError ? { border: "1px solid red" } : {}),
                }}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex justify-content-between"
              controlId="formRole"
            >
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={company_role_id}
                onChange={(e) => setCompany_role_id(e.target.value)}
                style={{
                  width: "70%",
                  border: "1px solid #ced4da",
                  borderRadius: "5px",
                }}
              >
                <option value="">Select The Company Role</option>
                <option value={1}>Employee</option>
                <option value={2}>Manager</option>
                <option value={3}>Admin</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
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
                style={{
                  width: "70%",
                  ...(passwordError ? { border: "1px solid red" } : {}),
                }}
                type="password"
                disabled={isChecked}
                onChange={(e) => setPassword(e.target.value)}
                value={
                  isChecked
                    ? selectedEmployee.employee_password_hashed
                    : employee_password
                }
              />
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
