// Importo gli hooks di react
import React, { useState, useEffect } from "react";

// Importo gli stili di react-bootstrap
import { Card, Container, Button, Row, Col } from "react-bootstrap";

const Aside = () => {
  // useState utilizzato per prendere tutti gli utenti dall'endpoint `/api/users` tramite la "get"
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect utilizzato per montare la "get" in pagina una volta sola
  useEffect(() => {
    fetchUsers();
  }, []);

  // Blocco if per il Loading degli utenti
  if (loading) {
    return <p>Loading...</p>;
  }

  // Se il flag `showAll` è vero, assegna tutti gli utenti (array `users`) a `displayedUsers`.
  // Altrimenti, assegna solo i primi 5 utenti dall'array utilizzando il metodo `slice`.
  const displayedUsers = showAll ? users : users.slice(0, 5);

  return (
    <aside className="mt-5 pt-2">
      <h6>Altri profili per te</h6>
      <Container
        className="m-2 mt-3"
        style={{ height: "650px", position: "relative" }}
      >
        <Row
          className="g-0"
          style={{
            height: "calc(100% - 65px)", // Dedica lo spazio per il bottone in fondo
            paddingRight: "10px", // Per evitare che compaia una scrollbar orizzontale
            overflowY: "auto", // Permette di scrollare solo la parte delle card
          }}
        >
          {displayedUsers.map((user) => (
            <Col key={user._id} sm={12} className="mb-1">
              <Card
                className="d-flex flex-row flex-wrap border-0"
                style={{ width: "100%" }}
              >
                <Col
                  md={4}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Card.Img
                    src={user.image}
                    alt={`${user.name} ${user.surname}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                    className="img-fluid rounded-circle"
                  />
                </Col>
                <Col md={8}>
                  <Card.Body className="p-0">
                    <Card.Title style={{ fontSize: "13px" }}>
                      {user.name} {user.surname}
                    </Card.Title>
                    <Card.Text className="mb-1" style={{ fontSize: "12px" }}>
                      {user.title || ""}
                    </Card.Text>
                    <Button variant="primary" size="sm">
                      Collegati
                    </Button>
                  </Card.Body>
                </Col>
              </Card>
              <hr style={{ border: "1px solid #ddd", margin: "10px 0" }} />
            </Col>
          ))}
        </Row>
        {/* Bottone "Mostra tutto" */}
        {!showAll && users.length > 5 && (
          <div
            className="d-flex justify-content-center"
            style={{
              position: "absolute",
              bottom: "10px",
              width: "100%",
              paddingBottom: "10px",
            }}
          >
            <Button
              variant="outline-primary"
              size="lg"
              onClick={() => setShowAll(true)}
              style={{
                fontSize: "15px",
              }}
            >
              Mostra tutto
            </Button>
          </div>
        )}
      </Container>
    </aside>
  );
};

export default Aside;
