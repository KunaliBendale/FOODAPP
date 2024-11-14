import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { isLogin } from "../Reduxwork/UserSlice"
import { useState } from "react"
import axios from "axios"
import { loginCustomer } from "../apicalls/CustomerApi"


const Login_Page = () => {

  const nav = useNavigate()

  const dispatch = useDispatch()
  const [Email, Setemail] = useState("")
  const [Password, Setpassword] = useState("")

  const submitForm = async (event) => {

    const Customerdata = new FormData(event.target);
    const reqcustomerdata = Object.fromEntries(Customerdata.entries())

    try {
      let response = await loginCustomer(reqcustomerdata)

      dispatch(isLogin(response.data))
      nav('/');

    } catch (error) {
      alert("please login")
      console.log(error)
    }
  }

  
  return (

    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 mt-5 ">
      <form onSubmit={(e) => {
        e.preventDefault()
        submitForm(e)
      }} className="container  vh-75 p-5 border shadow" style={{ borderRadius: '20px', width: '40%' }}>
        <div>
          <label className="form-label">Enter Email: </label>
          <div>
            <input type="email" name="Email" className="form-control" onChange={(e) => { Setemail(e.target.value) }}></input>
          </div>
        </div>
        <div className="mt-3 mb-4">
          <label className="form-label">Enter Password: </label>
          <div>
            <input type="password" name="Password" className="form-control" onChange={(e) => { Setpassword(e.target.value) }}></input>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-success w-50" >Login</button>

        </div>
        <div className="d-flex justify-content-end pt-2">
          <p onClick={() => { nav(`/signup`) }} style={{ cursor: 'pointer', color: 'blue' }}>Don't have an account ? Register</p>
        </div>
      </form>
    </div>

  )
}

export default Login_Page