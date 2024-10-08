import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'

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
      const res = await axios.post("http://localhost:8080/api/adddish",
        reqDishData, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      })
      console.log("RES", res);
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div >
      <h1>Add Dishes</h1>
      <div>
      <Form onSubmit={(e) => {
        e.preventDefault()
        submitForm(e)
      }}>
        <Form.Group className='w-25 mt-3'>
          <Form.Label>Add Dish Name : </Form.Label>
          <Form.Control type="text" name="DishName" placeholder="add new dish"
            onChange={
              (e) => setDishName(e.target.value)
            }
          />
        </Form.Group>

        <Form.Group className='w-25  mt-3'>
          <Form.Label>Add Dish Price : </Form.Label>
          <Form.Control type="number" name="Price" placeholder="add dish price"
            onChange={
              (e) => setPrice(e.target.value)
            }
          />
        </Form.Group>

        <Form.Group className='w-25  mt-3'>
          <Form.Label>Add Dish Type : </Form.Label>
          <Form.Check type="radio" value="veg" name='DishType' label='veg'
            onChange={
              (e) => setselecteddishtype(e.target.value)
            }
          />
          <Form.Check type="radio" value="non-veg" name='DishType' label='non-veg'
            onChange={
              (e) => setselecteddishtype(e.target.value)
            } />
        </Form.Group>

        <Form.Group className=' mt-3'>
          <Form.Label>Add Dish Category : </Form.Label>
          <Form.Select className='w-25' name="Category"
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
        <Form.Group className='w-25  mt-3'>
          <Form.Label>Upload Dish Image : </Form.Label>
          <Form.Control onChange={(e) => setdishImage(e.target.files[0])} type="file" name="image" />
        </Form.Group>

        <Button type="submit">
          Add Dish
        </Button>
      </Form>
      </div>
    </div>
  )
}

export default AddDishes