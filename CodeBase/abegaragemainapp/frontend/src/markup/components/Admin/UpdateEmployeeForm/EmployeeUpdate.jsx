import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import employeeService from "../../../../services/employee.service";
// import { useAuth } from "../../../../Context/AuthContext";

const EmployeeUpdate = ({
  show,
  handleClose,
  selectedEmployee,
  loggedInEmployeeToken,
}) => {
  const [employee_email, setEmail] = useState(selectedEmployee.employee_email);
  //inetialize by defaul value
  const [employee_first_name, setFirstName] = useState(
    selectedEmployee.employee_first_name
  );
  const [employee_last_name, setLastName] = useState(
    selectedEmployee.employee_last_name
  );
  const [employee_phone, setPhoneNumber] = useState(
    selectedEmployee.employee_phone
  );
  const [employee_password, setPassword] = useState();
  const [active_employee, setActive_employee] = useState(
    selectedEmployee.active_employee
  );
  const [company_role_id, setCompany_role_id] = useState(
    selectedEmployee.company_role_id
  );
  const [employee_id, setEmployee_id] = useState(selectedEmployee.employee_id);

  // Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [lastNameRequired, setLastNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [UseOldPassword, setUseOldPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  // Create a variable to hold the user's token
  // Destructure the auth hook and get the token
  // console.log(employee_first_name);
  // console.log(employee_id);

  const handleSaveChanges = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // const { employee } = useAuth();
    //   if (employee && employee.employee_token) {
    //     loggedInEmployeeToken = employee.employee_token;
    //   }
    // Handle client side validations
    let valid = true; // Flag
    // First name is required
    if (!employee_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }
    // Last name is required
    if (!employee_last_name) {
      setLastNameRequired("Last name is required");
      valid = false;
    } else {
      setLastNameRequired("");
    }
    // Phone number is required
    if (!employee_phone) {
      setPhoneError("Phone number is required");
      valid = false;
    } else {
      setPhoneError("");
    }
    //Role is required
    if (!company_role_id) {
      setRoleError("Role is required");
      valid = false;
    } else {
      setRoleError("");
    }
    // Email is required
    if (!employee_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid email format");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }
    // Password has to be at least 6 characters long
    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }
    if (isChecked) {
      setPassword(selectedEmployee.employee_password_hashed);
    }
    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }
    const formData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id,
      employee_id,
    };

    // Pass the form data to the service
    const updatedEmployee = employeeService.updateEmployee(
      formData,
      loggedInEmployeeToken
    );
    updatedEmployee
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error);
        } else {
          // Handle successful response
          setSuccess(true);
          setServerError("");
          // Redirect to the employees page after 2 seconds
          // For now, just redirect to the home page
          setTimeout(() => {
            // window.location.href = '/admin/employees';
            window.location.href = "/admin/employees";
            // handleClose();
          }, 1000);
        }
      })
      // Handle Catch
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });

    // Close the modal
    console.log(employee_password);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
     
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
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
                // style={{ width: "70%" }}
                defaultValue={selectedEmployee.employee_first_name}
                onChange={(e) => setFirstName(e.target.value)}
                // style={firstNameRequired &&  ( {{ border: "1px solid red" }}) }
                // style={firstNameRequired ? { border: "1px solid red" } : {}}
                // Add onChange handlers as needed
                style={{
                  width: "70%",
                  ...(firstNameRequired ? { border: "1px solid red" } : {}),
                }}
              />
            </Form.Group>
            {/* style={{ border: "1px solid green" }} */}
            <Form.Group
              className="mb-3 d-flex justify-content-between"
              controlId="formLastName"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                style={{
                  width: "70%",
                  ...(lastNameRequired ? { border: "1px solid red" } : {}),
                }}
                defaultValue={selectedEmployee.employee_last_name}
                onChange={(e) => setLastName(e.target.value)}
                // Add onChange handlers as needed
              />
            </Form.Group>
            {/* justifyContent space-between */}
            <Form.Group
              className="mb-3 d-flex justify-content-between"
              controlId="formEmail"
            >
              <Form.Label>
                <p>Email address</p>
              </Form.Label>
              <Form.Control
                // alling to the end
                // className="d-flex justify-content-end"
                style={{
                  width: "70%",
                  ...(emailError ? { border: "1px solid red" } : {}),
                }}
                type="email"
                defaultValue={selectedEmployee.employee_email}
                onChange={(e) => setEmail(e.target.value)}
                // Add onChange handlers as needed
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex justify-content-between"
              controlId="formPhone"
            >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                style={{
                  width: "70%",
                  ...(phoneError ? { border: "1px solid red" } : {}),
                }}
                defaultValue={selectedEmployee.employee_phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
                // Add onChange handlers as needed
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex  " controlId="formRole">
              <Form.Select
                aria-lable="Default select example"
                value={company_role_id}
                onChange={(e) => setCompany_role_id(e.target.value)}
              >
                <option>Select The Company Role</option>
                <option value={1}>Employee</option>
                <option value={2}>Manager</option>
                <option value={3}>Admin</option>
              </Form.Select>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedEmployee.company_role_id}
                onChange={(e) => setCompany_role_id(e.target.value)}
                // Add onChange handlers as needed
              />
            </Form.Group> */}
            {/* Add more form fields as necessary */}
            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Password</Form.Label>
              <Form.Check
                type="checkbox"
                checked={isChecked}
                label="Use old password"
                onChange={() => setIsChecked(!isChecked)}
              />
              <Form.Control
                type="text"
                // defaultValue={UseOldPassword}
                disabled={isChecked}
                onChange={(e) => setPassword(e.target.value)}
                // Add onChange handlers as needed
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeUpdate;
