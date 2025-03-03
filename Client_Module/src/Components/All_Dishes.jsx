/*import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FaStar } from "react-icons/fa";
import { addItem } from '../Reduxwork/Cartslice';
import { fetchDishes } from '../apicalls/dishApi.jsx';
import './CSS/AllDishes.css'

const All_Dishes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetchDishes();
      setCards(response.data);
    };
    fetchdata();
  }, []);

  return (
    <Container className="all-dishes-section">
      <h2 className="section-title text-center">🍽️ Explore Our Delicious Dishes</h2>
      <Row className="justify-content-center">
        {cards.map((dish, index) => (
          <Col key={index} lg={3} md={4} sm={6} xs={12} className="mb-4">
            <Card className="dish-card shadow-lg">
              <div className="dish-img-container" onClick={() => navigate('/dishdetails', { state: dish })}>
                <Card.Img variant="top" src={dish.Image} className="dish-image" />
              </div>
              <Card.Body className="text-center">
                <Card.Title className="dish-name">{dish.DishName}</Card.Title>
                <Card.Text className="dish-price">₹{dish.Price}</Card.Text>
                <Card.Text className="dish-rating">
                  <FaStar color="gold" className="me-1" /> {dish.averageratings.toFixed(2)}
                </Card.Text>
                <Button 
                  variant="primary" 
                  className="w-100 add-to-cart-btn"
                  onClick={() => dispatch(addItem(dish, dish.quantity = 1))}
                >
                  Add To Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default All_Dishes;*/


import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import { FaStar } from "react-icons/fa";
import { addItem } from '../Reduxwork/Cartslice';
import { fetchDishes } from '../apicalls/dishApi.jsx';
import "./CSS/AllDishes.css";

const All_Dishes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Maharashtrian");

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetchDishes();
      setDishes(response.data);
    };
    fetchdata();
  }, []);

  // Get unique food categories
  const categories = ["Maharashtrian", "South Indian", "Punjabi", "Chinese", "Italian"];

  // Filter dishes based on selected category
  const filteredDishes = dishes.filter(dish => dish.Category === activeCategory);

  return (
    <Container fluid className="all-dishes-section">
      <h2 className="section-title text-center">🍽️ Explore Our Delicious Dishes</h2>

      {/* Food Category Tabs */}
      <Tabs
        id="food-category-tabs"
        activeKey={activeCategory}
        onSelect={(category) => setActiveCategory(category)}
        className="mb-4 food-tabs"
        fill
      >
        {categories.map((category, index) => (
          <Tab eventKey={category} title={category} key={index}>
            <Row className="justify-content-center">
              {filteredDishes.length > 0 ? (
                filteredDishes.map((dish, index) => (
                  <Col key={index} lg={3} md={4} sm={6} xs={12} className="mb-3">
                    <Card className="dish-card shadow-sm">
                      <div className="dish-img-container" onClick={() => navigate('/dishdetails', { state: dish })}>
                        <Card.Img variant="top" src={dish.Image} className="dish-image" />
                      </div>
                      <Card.Body className="text-center">
                        <Card.Title className="dish-name">{dish.DishName}</Card.Title>
                        <Card.Text className="dish-price">₹{dish.Price}</Card.Text>
                        <Card.Text className="dish-rating">
                          <FaStar color="gold" className="me-1" /> {dish.averageratings.toFixed(2)}
                        </Card.Text>
                        <Button 
                          variant="primary" 
                          className="w-100 add-to-cart-btn"
                          onClick={() => dispatch(addItem(dish, dish.quantity = 1))}
                        >
                          Add To Cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p className="text-center text-muted">No dishes available in this category.</p>
              )}
            </Row>
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

export default All_Dishes;

