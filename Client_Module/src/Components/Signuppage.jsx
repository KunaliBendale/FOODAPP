// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { isRegister } from '../Reduxwork/UserSlice'
// import axios from 'axios'
// import { registerCustomer } from '../apicalls/CustomerApi'


// const Signuppage = () => {
//     const nav = useNavigate()
//     const dispatch = useDispatch()

//     const [Name, Setname] = useState("")
//     const [Email, Setemail] = useState("")
//     const [Mobile, Setmobile] = useState("")
//     const [Address, Setaddress] = useState("")
//     const [City, Setcity] = useState("")
//     const [State, Setstate] = useState("")
//     const [Pincode, Setpincode] = useState("")
//     const [Password, Setpassword] = useState("")
//     const [image, Setimage] = useState(null);


//     const submitForm = async (event) => {
//         const Customerdata = new FormData(event.target);
//         const reqcustomerdata = Object.fromEntries(Customerdata.entries())

//         try {
//             let response = await registerCustomer(reqcustomerdata)
//             console.log(response);
//             dispatch(isRegister(response.data));
//             nav(`/login`);
//         } catch (error) {
//             console.log(error);

//         }
//     }

//     return (
//         <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100  " style={{ marginTop: "100px" }}>
//             <div style={{ marginTop: "12%" }}>
//                 <h2>Registration form</h2>
//             </div>
//             <form onSubmit={(e) => {
//                 e.preventDefault()
//                 submitForm(e)
//             }} className="container mt-2 vh-75 p-5 border shadow mb-3" style={{ borderRadius: '20px', width: '50%' }}>
//                 <div>
//                     <label className="form-label">Enter Your Name: </label>
//                     <div>
//                         <input type="text" name='Name' className="form-control mb-3" onChange={(e) => { Setname(e.target.value) }}></input>
//                     </div>
//                 </div>

//                 <div>
//                     <label className="form-label">Enter Email: </label>
//                     <div>
//                         <input type="text" name='Email' className="form-control mb-3" onChange={(e) => { Setemail(e.target.value) }}></input>
//                     </div>
//                 </div>

//                 <div>
//                     <label className="form-label">Enter Mobile No.: </label>
//                     <div>
//                         <input type="text" name='Mobile' className="form-control mb-3" onChange={(e) => { Setmobile(e.target.value) }}></input>
//                     </div>
//                 </div>

//                 <div>
//                     <label className="form-label">Enter Address: </label>
//                     <div>
//                         <input type="text" name='Address' className="form-control mb-3" onChange={(e) => { Setaddress(e.target.value) }}></input>
//                     </div>
//                 </div>

//                 <div>
//                     <label className="form-label">Enter City: </label>
//                     <div>
//                         <input type="text" name='City' className="form-control mb-3" onChange={(e) => { Setcity(e.target.value) }}></input>
//                     </div>
//                 </div>

//                 <div>
//                     <label className="form-label">Enter State: </label>
//                     <div>
//                         <input type="text" name='State' className="form-control" onChange={(e) => { Setstate(e.target.value) }}></input>
//                     </div>
//                 </div>

//                 <div>
//                     <label className="form-label">Enter Pincode: </label>
//                     <div>
//                         <input type="number" name='Pincode' className="form-control" onChange={(e) => { Setpincode(e.target.value) }}></input>
//                     </div>
//                 </div>


//                 <div>
//                     <label className="form-label">Enter Password: </label>
//                     <div>
//                         <input type="text" name='Password' className="form-control" onChange={(e) => { Setpassword(e.target.value) }}></input>
//                     </div>
//                 </div>

//                 <div>
//                     <label className="form-label"> Profile Image: </label>
//                     <div>
//                         <input type="file" name='image' className="form-control" onChange={(e) => { Setimage(e.target.files[0]) }}></input>
//                     </div>
//                 </div>


//                 <div className="d-flex justify-content-center mt-4  ">
//                     <button className="btn btn-outline-success w-50" type='submit' >Register</button>

//                 </div>
//             </form>
//         </div>
//     )
// }

// export default Signuppage

// // dispatch(isRegister(data));


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isRegister } from "../Reduxwork/UserSlice";
import { registerCustomer } from "../apicalls/CustomerApi";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

const Signuppage = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [Name, Setname] = useState("");
  const [Email, Setemail] = useState("");
  const [Mobile, Setmobile] = useState("");
  const [Address, Setaddress] = useState("");
  const [City, Setcity] = useState("");
  const [State, Setstate] = useState("");
  const [Pincode, Setpincode] = useState("");
  const [Password, Setpassword] = useState("");
  const [image, Setimage] = useState(null);

  const submitForm = async (event) => {
    const Customerdata = new FormData(event.target);
    const reqcustomerdata = Object.fromEntries(Customerdata.entries());

    try {
        console.log(reqcustomerdata);
      let response = await registerCustomer(reqcustomerdata);
      console.log(response);
      dispatch(isRegister(response.data));
      nav(`/login`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg w-50">
        <h2 className="text-center text-primary">Registration Form</h2>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm(e);
          }}
        >
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Enter Your Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="Name"
                  placeholder="Full Name"
                  onChange={(e) => Setname(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Enter Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  placeholder="Email Address"
                  onChange={(e) => Setemail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Enter Mobile No.:</Form.Label>
                <Form.Control
                  type="text"
                  name="Mobile"
                  placeholder="Mobile Number"
                  onChange={(e) => Setmobile(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Enter Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="Password"
                  placeholder="Password"
                  onChange={(e) => Setpassword(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Enter Address:</Form.Label>
            <Form.Control
              type="text"
              name="Address"
              placeholder="Street Address"
              onChange={(e) => Setaddress(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>City:</Form.Label>
                <Form.Control
                  type="text"
                  name="City"
                  placeholder="City"
                  onChange={(e) => Setcity(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>State:</Form.Label>
                <Form.Control
                  type="text"
                  name="State"
                  placeholder="State"
                  onChange={(e) => Setstate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Pincode:</Form.Label>
                <Form.Control
                  type="number"
                  name="Pincode"
                  placeholder="Pincode"
                  onChange={(e) => Setpincode(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Profile Image:</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={(e) => Setimage(e.target.files[0])}
            />
          </Form.Group>

          <div className="text-center mt-4">
            <Button variant="success" type="submit" className="w-50">
              Register
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Signuppage;
