import React, { useState } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import { addDishData } from "../apicalls/dishApi";

const AddDishes = () => {
  const [dishname, setDishName] = useState("");
  const [price, setPrice] = useState("");
  const [selecteddishtype, setselecteddishtype] = useState("");
  const [category, setCategory] = useState("");
  const [dishImage, setdishImage] = useState(null);

  const submitForm = async (event) => {
    event.preventDefault();
    const dishData = new FormData(event.target);
    const reqDishData = Object.fromEntries(dishData.entries());

    console.log("DATA", reqDishData);
    try {
      const res = await addDishData(reqDishData);
      alert("Dish Added Successfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center mt-3" style={{ minHeight: "90vh" }}>
      <Card className="shadow-lg p-2 border-0 rounded" style={{ width: "50%", maxWidth: "600px" }}>
        <Card.Body>
          <h2 className="text-center text-primary fw-bold mb-3">🍽️ Add New Dish</h2>
          <Form onSubmit={submitForm}>
            {/* Dish Name */}
            <Form.Group className="mb-3">
              <Form.Label>Dish Name:</Form.Label>
              <Form.Control type="text" name="DishName" placeholder="Enter dish name" required 
                onChange={(e) => setDishName(e.target.value)} 
              />
            </Form.Group>

            {/* Dish Price */}
            <Form.Group className="mb-3">
              <Form.Label>Dish Price:</Form.Label>
              <Form.Control type="number" name="Price" placeholder="Enter price" required 
                onChange={(e) => setPrice(e.target.value)} 
              />
            </Form.Group>

            {/* Dish Type */}
            <Form.Group className="mb-3">
              <Form.Label>Dish Type:</Form.Label>
              <div className="d-flex gap-4">
                <Form.Check type="radio" value="veg" name="DishType" label="Veg" 
                  onChange={(e) => setselecteddishtype(e.target.value)} 
                />
                <Form.Check type="radio" value="non-veg" name="DishType" label="Non-Veg" 
                  onChange={(e) => setselecteddishtype(e.target.value)} 
                />
              </div>
            </Form.Group>

            {/* Dish Category */}
            <Form.Group className="mb-3">
              <Form.Label>Dish Category:</Form.Label>
              <Form.Select name="Category" required 
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                <option value="Chinese">Chinese</option>
                <option value="Maharashtrian">Maharashtrian</option>
                <option value="South Indian">South Indian</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Italian">Italian</option>
              </Form.Select>
            </Form.Group>

            {/* Upload Dish Image */}
            <Form.Group className="mb-3">
              <Form.Label>Upload Dish Image:</Form.Label>
              <Form.Control type="file" name="image" required 
                onChange={(e) => setdishImage(e.target.files[0])} 
              />
            </Form.Group>

            {/* Submit Button */}
            <div className="text-center">
              <Button type="submit" className="w-50 fw-bold" variant="primary">
                ➕ Add Dish
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddDishes;
