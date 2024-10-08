import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { isLogin } from "../Reduxwork/UserSlice"
import { useState } from "react"

const Login_Page = () => {

  const nav= useNavigate()

  const dispatch=useDispatch()
  const [name,Setname]=useState("")
  const [password,Setpassword]=useState("")

  const data={
    name,password
  }
  
  return (
    <div >
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100 ">
        <div className="container  vh-75 p-5 border shadow" style={{ borderRadius: '20px', width: '40%' }}>
          <div>
            <label className="form-label">Enter Username: </label>
            <div>
              <input type="text" className="form-control" onChange={(e) => { Setname(e.target.value) }}></input>
            </div>
          </div>
          <div className="mt-3 mb-4">
            <label className="form-label">Enter Password: </label>
            <div>
              <input type="text" className="form-control" onChange={(e) => { Setpassword(e.target.value) }}></input>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button className="btn btn-outline-success w-50" onClick={()=>{dispatch(isLogin(data)) }}>Login</button>

          </div>
          <div className="d-flex justify-content-end pt-2">
            <p onClick={() => { nav(`/signup`) }} style={{ cursor: 'pointer', color: 'blue' }}>Don't have an account ? Register</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login_Page