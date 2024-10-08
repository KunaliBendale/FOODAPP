import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { isRegister } from '../Reduxwork/UserSlice'

const Signuppage = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()

    const [name, Setname] = useState("")
    const [email, Setemail] = useState("")
    const [mobile, Setmobile] = useState("")
    const [password, Setpassword] = useState("")

    const data = {
        name, email, mobile, password
    }
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100 ">
            <div className="container  vh-75 p-5 border shadow " style={{ borderRadius: '20px', width: '40%' }}>
                <div>
                    <label className="form-label">Enter Your Name: </label>
                    <div>
                        <input type="text" className="form-control" onChange={(e) => { Setname(e.target.value) }}></input>
                    </div>
                </div>

                <div>
                    <label className="form-label">Enter Mobile No.: </label>
                    <div>
                        <input type="text" className="form-control" onChange={(e) => { Setmobile(e.target.value) }}></input>
                    </div>
                </div>

                <div>
                    <label className="form-label">Enter Email: </label>
                    <div>
                        <input type="text" className="form-control" onChange={(e) => { Setemail(e.target.value) }}></input>
                    </div>
                </div>

                <div>
                    <label className="form-label">Enter Password: </label>
                    <div>
                        <input type="text" className="form-control" onChange={(e) => { Setpassword(e.target.value) }}></input>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-4  ">
                    <button className="btn btn-outline-success w-50" onClick={() => {dispatch(isRegister(data)); nav(`/login`) }}>Register</button>

                </div>
            </div>
        </div>
    )
}

export default Signuppage