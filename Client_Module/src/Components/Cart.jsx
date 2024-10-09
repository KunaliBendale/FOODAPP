import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { increaseqty,decreaseqty, removeItem } from '../Reduxwork/Cartslice'
const Cart = () => {
  const { cart } = useSelector((state) => state.cart)
  const dispatch=useDispatch()
  console.log(cart);
  return (
    <div className='d-flex'>
      {
        cart.map((dish) => {
          return (
           
            <div className="card m-5" style={{ width: '20%' }}>
              <div className="Image-div card-header  " style={{ height: '55%', cursor: 'pointer' }} >
               
                <img src={dish.Image} width={200}></img>
              </div>

              <div className='card-body '>
                <h5>{dish.DishName}</h5>
                <p>Price : &#8377; {dish.Price} /-</p>
                <span>{dish.IsAvailable?"Available":"Not Available"}</span>
              </div>

              <div className='card-footer'>

                <button className='btn btn-outline-primary w-100 mb-2'>Order Now</button>

                <div className='d-flex justify-content-around align-items-center '>
                <button className='btn btn-secondary w-25' onClick={() => { dispatch(increaseqty(dish._id)) }}> + </button>
                  <span > {dish.quantity} </span>
                  <button className='btn btn-secondary w-25' onClick={() => { dispatch(decreaseqty(dish._id))}}> - </button>
                </div>
                <button className='btn btn-outline-warning w-100 mt-3' onClick={()=>{dispatch(removeItem(dish._id))}}> Remove</button>

                {/* <button className='btn btn-outline-danger w-100 '><MdDeleteForever /> Remove Item</button> */}
              </div>
            </div>



          )

        })}
    </div>
  )
}

export default Cart