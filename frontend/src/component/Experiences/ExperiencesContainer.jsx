// Importo gli hooks di react
import React, { useEffect, useState } from "react";

// Importo i stili di react-bootstrap
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

// Importo il componente utilizzato
import Experience from "./Experience";
import { SignedIn } from "@clerk/clerk-react";

const ExperiencesContainer = ({ id, isOwnProfile }) => {
  // useState utilizzato per prendere le esperienze dall'endpoint /id/experiences, id = utente specifico dato dalla UsersPage
  const [experiences, setExperiences] = useState([]);

  // useState utilizzati per mostrare il Loading in pagina mentre aspetta che la fetch concluda
  const [loading, setLoading] = useState(true);

  // useState utilizzato per ricaricare la pagina ogni volta che la "GET" viene modificata
  const [reload, setReload] = useState(false);

  // Funzioni utilizzate per chiudere/aprire la finestra modale
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useState utilizzato per passargli i valori iniziali all POST con la struttura che vuole il JSON
  const [inputs, setInputs] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    area: "",
  });

  // ENDPOINT delle esperienze
  const API_EXP_URL = `http://localhost:3001/api/users/${id}/experiences`;

  // READ, per mostrare in pagina le esperienze dell'utente specifico
  const getExperiences = async () => {
    try {
      const response = await fetch(API_EXP_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Errore nel recuperare le esperienze");
      }
      const data = await response.json();
      setExperiences(data.experiences);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setReload(false);
    }
  };

  // CREATE, per passargli le esperienze al JSON dell'utente specifico
  const postExperience = async () => {
    try {
      const response = await fetch(API_EXP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs), // "inputs" gli viene passato perchè contiente la struttura che il JSON accetta
      });
      if (!response.ok) {
        throw new Error("Errore nell'aggiunta dell'esperienza");
      }
      setReload(true);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect caricare la "GET" ogni volta che il valore di [reload] cambia
  useEffect(() => {
    getExperiences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  // Funzione handleChange che prendere i valori attuali della finestra modale
  const handleChange = (e) => {
    const { name, value } = e.target;

    // aggiunge nuove "EXP" senza sovrascivere quelle vecchie
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Funzione handleSubmit che esegue la POST, chiiude la finestra modale e resetta i campi di input
  const handleSubmit = async (e) => {
    e.preventDefault();
    await postExperience();
    setShow(false);
    setInputs({
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      area: "",
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi esperienza</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <label>Qualifica</label>
          <input
            name="role"
            value={inputs.role}
            type="text"
            placeholder="Posizione lavorativa"
            onChange={handleChange}
          />

          <label>Azienda</label>
          <input
            name="company"
            value={inputs.company}
            type="text"
            placeholder="Esempio: Microsoft"
            onChange={handleChange}
          />

          <label>Data di inizio</label>
          <input
            name="startDate"
            value={inputs.startDate}
            type="text"
            placeholder="AAAA-MM-GG"
            onChange={handleChange}
          />

          <label>Data di fine</label>
          <input
            name="endDate"
            value={inputs.endDate}
            type="text"
            placeholder="AAAA-MM-GG"
            onChange={handleChange}
          />

          <label>Descrizione</label>
          <input
            name="description"
            value={inputs.description}
            type="text"
            placeholder="Descrizione"
            onChange={handleChange}
          />

          <label>Località</label>
          <input
            name="area"
            value={inputs.area}
            type="text"
            placeholder="Esempio: Roma, Italia"
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>

      <Container className="p-0">
        <Row>
          <Col>
            <Col className="d-flex justify-content-between align-items-center">
              <h5 className="m-3">Esperienze Lavorative</h5>
              <SignedIn>
                {isOwnProfile && (
                  <Button className="mx-4" type="button" onClick={handleShow}>
                    <i className="bi bi-plus"></i>
                  </Button>
                )}
              </SignedIn>
            </Col>
            {experiences.map((experience) => (
              <Experience
                setReload={setReload}
                id={id}
                key={experience._id}
                experience={experience}
                isOwnProfile={isOwnProfile}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ExperiencesContainer;
