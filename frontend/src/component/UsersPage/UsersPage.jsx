import React from "react";

// Importo gli stili di react-bootstrap
import { Col, Image, Row, Container } from "react-bootstrap";

// Importo il Link dal router-dom, su App.js dichiarato le Routes
import { Link } from "react-router-dom";

export default function UsersPage() {
  // ID univoci dei nostri "account"
  const usersID = {
    jessica: "678eabe5cdece8b744bca96e",
    carmine: "678ead95cdece8b744bca972",
    gabriele: "678ead26cdece8b744bca971",
    andrei: "678eae11cdece8b744bca974",
    simone: "678eae16cdece8b744bca975",
  };

  return (
    <Container className="mt-5 pt-2">
      <Row className="text-center mt-5 g-5 fw-bold">
        <Col xs={12} md={6}>
          {/* Viene passato l'ID associato a Jessica */}
          <Link to={`/profile/${usersID.jessica}`}>
            <Image src="/images/jessica.png" className="w-50" />
          </Link>
          <p className="mt-4">Jessica Fraino</p>
        </Col>

        <Col xs={12} md={6}>
          {/* Viene passato l'ID associato ad Andrei */}
          <Link to={`/profile/${usersID.andrei}`}>
            <Image src="/images/andrei.png" className="w-50" />
          </Link>
          <p className="mt-4">Plescan Andrei Leonard</p>
        </Col>

        <Col xs={12} md={6}>
          {/* Viene passato l'ID associato a Gabriele */}
          <Link to={`/profile/${usersID.gabriele}`}>
            <Image src="/images/gabriele.png" className="w-50" />
          </Link>
          <p className="mt-4">Gabriele Aloi</p>
        </Col>

        <Col xs={12} md={6}>
          {/* Viene passato l'ID associato a Carmine */}
          <Link to={`/profile/${usersID.carmine}`}>
            <Image src="/images/carmine.png" className="w-50" />
          </Link>
          <p className="mt-4">Carmine Berardi</p>
        </Col>
        <Col xs={12} md={6}>
          {/* Viene passato l'ID associato a Simone */}
          <Link to={`/profile/${usersID.simone}`}>
            <Image src="/images/simone.png" className="w-50" />
          </Link>
          <p className="mt-4">Simone Di Sciullo</p>
        </Col>
      </Row>
    </Container>
  );
}
