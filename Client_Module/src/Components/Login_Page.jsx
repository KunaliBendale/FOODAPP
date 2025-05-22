import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLogin } from "../Reduxwork/UserSlice";
import { useState } from "react";
import { loginCustomer } from "../apicalls/CustomerApi";
import axios from "axios";
import { Container, Form, Button, Card, Alert, Modal  } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login_Page = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [Email, Setemail] = useState("");
  const [Password, Setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Login Function
  const submitForm = async (event) => {
    event.preventDefault();
    const Customerdata = new FormData(event.target);
    const reqcustomerdata = Object.fromEntries(Customerdata.entries());

    try {
      let response = await loginCustomer(reqcustomerdata);
      let customerToken = {
        ...response.data.custData,
        token: response.data.token,
      };

      dispatch(isLogin(customerToken));
      nav("/");
    } catch (error) {
      setErrorMessage("Invalid login credentials, please try again.");
    }
  };

  // Send OTP for Password Reset
  const sendOtp = async () => {
    try {
      console.log("email",modalEmail);
      const response = await axios.post("http://localhost:5000/api/sendOtp", { Email: modalEmail });
      if (response.data.success) {
        setOtpSent(true);
        setOtpError("");
      } else {
        setOtpError("User not found. Please enter a valid email.");
      }
    } catch (error) {
      setOtpError("Error sending OTP. Try again.");
    }
  };

  // Reset Password
  const resetPassword = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/resetPassword", {
        Email: modalEmail,
        otp,
        newPassword,
      });

      if (response.data.success) {
        alert("Password reset successfully! You can now log in.");
        setShowModal(false);
      } else {
        setOtpError(response.data.message || "Invalid OTP or expired.");
      }
    } catch (error) {
      setOtpError("Error resetting password. Try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg w-50">
        <h2 className="text-center text-primary">Login</h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={submitForm}>
          <Form.Group className="mb-3">
            <Form.Label>Enter Email:</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              placeholder="Email Address"
              onChange={(e) => Setemail(e.target.value)}
            />
          </Form.Group>

           <Form.Group className="mb-4" style={{ position: "relative" }}>
            <Form.Label>Enter Password:</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="Password"
              placeholder="Password"
              value={Password}
              onChange={(e) => Setpassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
               style={{
                position: "absolute",
                top: "65%",
                right: "12px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "1.3rem",
                color: "#555",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </Form.Group>

          <div className="text-center">
            <Button variant="success" type="submit" className="w-50">
              Login
            </Button>
          </div>

          <div className="text-center pt-3">
            <p
              onClick={() => nav(`/signup`)}
              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
              className="fw-bold"
            >
              Don't have an account? Register
            </p>
          </div>

          <div className="text-center pt-2">
            <p
              onClick={() => setShowModal(true)}
              style={{ cursor: "pointer", color: "red", textDecoration: "underline" }}
              className="fw-bold"
            >
              Forgot Password?
            </p>
          </div>
        </Form>
      </Card>

      {/* Forgot Password Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!otpSent ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Enter Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setModalEmail(e.target.value)}
                />
              </Form.Group>
              {otpError && <Alert variant="danger">{otpError}</Alert>}
              <Button variant="primary" onClick={sendOtp}>
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Enter OTP:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>

               <Form.Group className="mb-3" style={{ position: "relative" }}>
                <Form.Label>New Password:</Form.Label>
                <Form.Control
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{
                    position: "absolute",
                    top: "65%",
                    right: "12px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "1.3rem",
                    color: "#555",
                  }}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </Form.Group>

              {otpError && <Alert variant="danger">{otpError}</Alert>}
              <Button variant="success" onClick={resetPassword}>
                Reset Password
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Login_Page;
