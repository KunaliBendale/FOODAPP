import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { isRegister, setUser } from '../Reduxwork/UserSlice'
import axios from 'axios'
const Signuppage = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()

    const [Name, Setname] = useState("")
    const [Email, Setemail] = useState("")
    const [Mobile, Setmobile] = useState("")
    const [Address, Setaddress] = useState("")
    const [City, Setcity] = useState("")
    const [State, Setstate] = useState("")
    const [Pincode, Setpincode] = useState("")
    const [Password, Setpassword] = useState("")
    const [image, Setimage] = useState(null);


    const submitForm = async (event) => {
        const Customerdata = new FormData(event.target);
        const reqcustomerdata = Object.fromEntries(Customerdata.entries())
        console.log(reqcustomerdata);

        try {
            const result = await axios.post("http://localhost:8080/api/register",
                reqcustomerdata, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            });
            
            dispatch(isRegister(result.data.data));
            nav(`/login`);



        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100  " style={{ marginTop: "100px" }}>
            <div style={{ marginTop: "12%" }}>
                <h2>Registration form</h2>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                submitForm(e)
            }} className="container mt-2 vh-75 p-5 border shadow mb-3" style={{ borderRadius: '20px', width: '50%' }}>
                <div>
                    <label className="form-label">Enter Your Name: </label>
                    <div>
                        <input type="text" name='Name' className="form-control mb-3" onChange={(e) => { Setname(e.target.value) }}></input>
                    </div>
                </div>

                <div>
                    <label className="form-label">Enter Email: </label>
                    <div>
                        <input type="text" name='Email' className="form-control mb-3" onChange={(e) => { Setemail(e.target.value) }}></input>
                    </div>
                </div>

                <div>
                    <label className="form-label">Enter Mobile No.: </label>
                    <div>
                        <input type="text" name='Mobile' className="form-control mb-3" onChange={(e) => { Setmobile(e.target.value) }}></input>
                    </div>
                </div>

                <div>
                    <label className="form-label">Enter Address: </label>
                    <div>
                        <input type="text" name='Address' className="form-control mb-3" onChange={(e) => { Setaddress(e.target.value) }}></input>
                    </div>
                </div>

                <div>
                    <label className="form-label">Enter City: </label>
                    <div>
                        <input type="text" name='City' className="form-control mb-3" onChange={(e) => { Setcity(e.target.value) }}></input>
                    </div>
                </div>

                <div>
                    <label className="form-label">Enter State: </label>
                    <div>
                        <input type="text" name='State' className="form-control" onChange={(e) => { Setstate(e.target.value) }}></input>
                    </div>
                </div>

                <div>
                    <label className="form-label">Enter Pincode: </label>
                    <div>
                        <input type="number" name='Pincode' className="form-control" onChange={(e) => { Setpincode(e.target.value) }}></input>
                    </div>
                </div>


                <div>
                    <label className="form-label">Enter Password: </label>
                    <div>
                        <input type="text" name='Password' className="form-control" onChange={(e) => { Setpassword(e.target.value) }}></input>
                    </div>
                </div>

                <div>
                    <label className="form-label"> Profile Image: </label>
                    <div>
                        <input type="file" name='image' className="form-control" onChange={(e) => { Setimage(e.target.files[0]) }}></input>
                    </div>
                </div>


                <div className="d-flex justify-content-center mt-4  ">
                    <button className="btn btn-outline-success w-50" type='submit' >Register</button>

                </div>
            </form>
        </div>
    )
}

export default Signuppage

// dispatch(isRegister(data));