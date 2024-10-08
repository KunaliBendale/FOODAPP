import React from 'react'
import { useSelector } from 'react-redux'
const Cart = () => {
  const { cart } = useSelector((state) => state.cart)


  return (
    <div>
      {
        cart.map((dish) => {
          return (
            <div className="card me-3 " style={{ width: '20%' }}>
              <div className="Image-div card-header  " style={{ height: '55%', cursor: 'pointer' }} >
                <img src={dish.Image} width={200}></img>
              </div>

              <div className='card-body '>
                <h5>{dish.DishName}</h5>
                <p>Price : &#8377; {dish.Price} /-</p>
                <span>{dish.IsAvailable}</span>

              </div>

              <div className='card-footer'>

                <button className='btn btn-outline-primary w-100 mb-2' onClick={() => { dispatch(addItem(dish)) }} >Add To Cart</button>
                {/* <button className='btn btn-outline-danger w-100 '><MdDeleteForever /> Remove Item</button> */}
              </div>
            </div>



          )

        })}
    </div>
  )
}

export default Cart