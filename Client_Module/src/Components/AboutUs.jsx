import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./AboutUs.css";

const chefs = [
  {
    name: "👨‍🍳 Chef Arjun Deshmukh",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC2hZWCtspx6bgpsAFr1zTYVIv6JZgL95Xig&s",
    description: "A master of traditional Maharashtrian flavors, Chef Arjun specializes in, Puran Poli, and authentic Konkani seafood dishes."
  },
  {
    name: "👨‍🍳  Chef Ravi Iyer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcb1Ostd4UflKyzFk7bzPf9R5IWn0jMHv2KefaICjiCk0V8v-QV_jifOExCaD-mBnBU8&usqp=CAU",
    description: "Bringing the essence of Tamil Nadu and Karnataka to your plate, Chef Ravi is an expert in Dosas, Idlis, and rich Chettinad curries."
  },
  {
    name: "👩‍🍳 Chef Meera Sharma",
    image: "https://i0.wp.com/grehlakshmi.com/wp-content/uploads/2021/09/92-4-700x347-1.jpg",
    description: "Known for her bold flavors, Chef Meera crafts delicious Butter Chicken, Dal Makhani, and Amritsari Kulchas with authentic spices."
  }
];

const AboutUs = () => {
  return (
    <div className="about-us-section">
      <Container>
        
            <h1>About Us</h1>
        {/* Restaurant Highlights */}
        <Row className="justify-content-center text-center mb-5">
          <Col  className="highlight-box">
            <h3>🌟 Our Story</h3>
            <p>Established in 2005, Gourmet Delights has been serving exceptional dishes crafted by world-class chefs.</p>
          </Col>
          <Col  className="highlight-box">
            <h3>🍷 Unique Experience</h3>
            <p>We believe in a **fine-dining experience**, where food is an art and every bite is a delight.</p>
          </Col>
          <Col  className="highlight-box">
            <h3>🌍 Global Cuisine</h3>
            <p>From Italian pasta to Japanese sushi, we bring flavors from around the world to your table.</p>
          </Col>
        </Row>

        {/* Master Chefs - Compact Section */}
        <h2 className="text-center section-title-small">👨‍🍳 Meet Our Master Chefs</h2>
        <Row className="justify-content-center">
          {chefs.map((chef, index) => (
            <Col key={index} md={3} sm={6} xs={12} className="mb-3">
              <Card className="chef-card">
                <Card.Img variant="top" src={chef.image} alt={chef.name} className="chef-img" />
                <Card.Body className="text-center p-2">
                  <Card.Title className="chef-name">{chef.name}</Card.Title>
                  <Card.Text className="chef-description">{chef.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
