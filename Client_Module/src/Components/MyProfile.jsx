import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLogout } from '../Reduxwork/UserSlice'
const MyProfile = () => {

  const dispatch = useDispatch();

  const { userdata } = useSelector((state) => state.user)

  return (
    <div className='container-fluid d-flex align-items-center justify-content-center '>
      <div className=' w-75 border mt-5 mb-3'>
        <div className='border w-100' style={{ height: "30vh", backgroundColor: "gray" }}>
          <img src={userdata.Photo} style={{ height: "30vh", width: "20%", marginTop: "60px", marginLeft: "10% " }} />
        </div>

        <div className='p-4 '>
          <div style={{ marginTop: "10%" }}>
            <p style={{ fontSize: "18px" }}> Name : <span>{userdata.Name}</span></p>
          </div>


          <div className='border-top mt-5'>
            <h3 className='border w-25 mb-2 p-1' style={{ position: "relative", top: "-17px", left: "35%", textAlign: "center", backgroundColor: "white", color: "gray" }}> Contact </h3>
            <div >
              <p> Phone : <span>{userdata.Mobile}</span></p>
              <p> Email : <span>{userdata.Email}</span></p>  



            </div>
          </div>

          <div className='border-top mt-5'>
            <h3 className='border w-25 mb-2 p-1' style={{ position: "relative", top: "-17px", left: "35%", textAlign: "center", backgroundColor: "white", color: "gray" }}> Address </h3>

            <p> Address : <span>{userdata.Address}</span></p>
            <p> City : <span>{userdata.City}</span></p>
            <p> State : <span>{userdata.State}</span></p>
            <p> Pincode : <span>{userdata.Pincode}</span></p>
          </div>

          <div className='d-flex justify-content-evenly'>

            <button className='btn btn-outline-primary'onClick={()=>{dispatch(isLogout())}}> Logout </button>
            <button className='btn btn-outline-warning'> Update Profile </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile