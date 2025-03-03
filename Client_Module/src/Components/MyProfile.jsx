import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const MyProfile = () => {
  const { userdata } = useSelector((state) => state.user);
  
  // State for modals
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // State for form fields
  const [profileData, setProfileData] = useState({
    Name: userdata.Name,
    Mobile: userdata.Mobile,
    Address: userdata.Address,
    City: userdata.City,
    State: userdata.State,
    Pincode: userdata.Pincode,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // Handle Profile Update
  const handleProfileUpdate = async () => {
    try {
      await axios.post("http://localhost:5000/api/updateProfile", {
        CustomerId: userdata._id,
        ...profileData,
      });
      alert("Profile updated successfully!");
      setShowProfileModal(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };

  // Handle Password Update
  const handlePasswordUpdate = async () => {
    try {
      console.log(userdata.Email);
      await axios.post("http://localhost:5000/api/updatePassword", {
        Email: userdata.Email,
        ...passwordData,
      });
      alert("Password updated successfully!");
      setShowPasswordModal(false);
    } catch (error) {
      console.error(error.message);
      alert("Failed to update password.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg w-75">
        {/* Profile Header */}
        <div className="position-relative text-center bg-dark text-white p-5">
          <img
            src={userdata.Photo}
            className="rounded-circle shadow"
            style={{
              height: "120px",
              width: "120px",
              objectFit: "cover",
              border: "4px solid white",
              position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            alt="Profile"
          />
        </div>

        {/* Profile Details */}
        <div className="card-body text-center mt-4">
          <h4 className="fw-bold">{userdata.Name}</h4>
          <p className="text-muted">{userdata.Email}</p>

          {/* Contact Information */}
          <div className="border-top mt-4 pt-3">
            <h5 className="fw-bold text-primary">📞 Contact</h5>
            <p>Phone: <strong>{userdata.Mobile}</strong></p>
          </div>

          {/* Address Information */}
          <div className="border-top mt-4 pt-3">
            <h5 className="fw-bold text-primary">📍 Address</h5>
            <p>{userdata.Address}, {userdata.City}, {userdata.State} - {userdata.Pincode}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 d-flex justify-content-center gap-3">
            {/* <button className="btn btn-outline-warning px-4" onClick={() => setShowProfileModal(true)}>
              Update Profile
            </button> */}
            <button className="btn btn-outline-warning px-4" onClick={() => setShowPasswordModal(true)}>
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {/* <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={profileData.Name} onChange={(e) => setProfileData({ ...profileData, Name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text" value={profileData.Mobile} onChange={(e) => setProfileData({ ...profileData, Mobile: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" value={profileData.Address} onChange={(e) => setProfileData({ ...profileData, Address: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" value={profileData.City} onChange={(e) => setProfileData({ ...profileData, City: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" value={profileData.State} onChange={(e) => setProfileData({ ...profileData, State: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Pincode</Form.Label>
              <Form.Control type="text" value={profileData.Pincode} onChange={(e) => setProfileData({ ...profileData, Pincode: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfileModal(false)}>Cancel</Button>
          <Button variant="warning" onClick={handleProfileUpdate}>Update</Button>
        </Modal.Footer>
      </Modal> */}


      {/* Update Password Modal */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="password" value={passwordData.oldPassword} onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handlePasswordUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default MyProfile;
