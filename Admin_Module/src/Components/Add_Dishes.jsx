import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { addDishData } from '../apicalls/dishApi'

const AddDishes = () => {

  const [dishname, setDishName] = useState(" ")
  const [price, setPrice] = useState(" ")
  const [selecteddishtype, setselecteddishtype] = useState("")
  const [category, setCategory] = useState("")
  const [dishImage, setdishImage] = useState(null)

  const submitForm = async (event) => {

    const dishData = new FormData(event.target)
    const reqDishData = Object.fromEntries(dishData.entries())
    // reqDishData={...reqDishData, "image":event.target.files[0]}
    // reqDishData.image = dishImage;
    console.log("DATA", reqDishData);
    try {
      const res = await addDishData(reqDishData)
      console.log("RES", res);
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div style={{ height: "90vh" }}>
      <h1 style={{ textAlign: "center" }}>Add Dishes</h1>
      <div className=' w-100 d-flex flex-column justify-content-center align-items-center' >
        <Form onSubmit={(e) => {
          e.preventDefault()
          submitForm(e)
        }} className='border w-50 ps-5 ms-5 shadow ' style={{ borderRadius: "20px" }}>
          <Form.Group className='w-75 mt-4 ms-5'>
            <Form.Label> Dish Name : </Form.Label>
            <Form.Control type="text" name="DishName" placeholder="add new dish"
              onChange={
                (e) => setDishName(e.target.value)
              }
            />
          </Form.Group>

          <Form.Group className='w-75  mt-3 ms-5'>
            <Form.Label> Dish Price : </Form.Label>
            <Form.Control type="number" name="Price" placeholder="add dish price"
              onChange={
                (e) => setPrice(e.target.value)
              }
            />
          </Form.Group>

          <Form.Group className='w-75  mt-3 ms-5 d-flex'>
            <Form.Label > Dish Type : </Form.Label>
            <div className='d-flex justify-content-around  w-75 '>
              <Form.Check  type="radio" value="veg" name='DishType' label='veg'
                onChange={
                  (e) => setselecteddishtype(e.target.value)
                }
              />
              <Form.Check type="radio" value="non-veg" name='DishType' label='non-veg'
                onChange={
                  (e) => setselecteddishtype(e.target.value)
                } />
            </div>
          </Form.Group>

          <Form.Group className='w-100 mt-3 ms-5'>
            <Form.Label> Dish Category : </Form.Label>
            <Form.Select className='w-75' name="Category"
              onChange={
                (e) => setCategory(e.target.value)
              }
            >
              <option value="Chinese">Chinese</option>
              <option value="Maharastrian">Maharastrian</option>
              <option value="South Indian">South Indian</option>
              <option value="Punjabi">Punjabi</option>
            </Form.Select>

          </Form.Group>
          <Form.Group className='w-75 ms-5 mt-3'>
            <Form.Label>Upload Dish Image : </Form.Label>
            <Form.Control onChange={(e) => setdishImage(e.target.files[0])} type="file" name="image" />
          </Form.Group>

          <div className='d-flex justify-content-center pe-3'>
            <Button type="submit" className='mt-3 mb-3 w-25'>
              Add Dish
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default AddDishes