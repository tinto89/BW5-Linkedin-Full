// Importo gli hooks di react
import React, { useEffect, useState } from "react";

// Importo gli stili di react-bootstrap
import { Container, Row, Col, Button, Modal } from "react-bootstrap";

// Importo lo stile CSS
import "./Experience.css";
import { SignedIn } from "@clerk/clerk-react";

export default function Experience({
  experience,
  id,
  setReload,
  isOwnProfile,
}) {
  // Funzioni utilizzate per la finestra modale
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ENDPOINT per la PUT (update)
  const API_EXP_PUT_URL = `http://localhost:3001/api/users/${id}/experiences/`;

  const [inputs, setInputs] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    area: "",
  });

  // Verifica se l'oggetto `experience` è definito (non nullo o non undefined).
  // Se `experience` esiste, aggiorna lo stato `inputs` con le proprietà rilevanti di `experience`.
  // - Utilizza `.slice(0, 10)` per limitare le date (startDate e endDate) al formato "YYYY-MM-DD".
  useEffect(() => {
    if (experience) {
      setInputs({
        role: experience.role,
        company: experience.company,
        startDate: experience.startDate?.slice(0, 10),
        endDate: experience.endDate?.slice(0, 10),
        description: experience.description,
        area: experience.area,
      });
    }
  }, [experience]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Esegue la PUT dell'esperienza specifica
  const modifyExp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_EXP_PUT_URL + experience._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (response.ok) {
        console.log("Esperienza aggiornata con successo");
        handleClose();
        setReload(true);
      } else {
        console.error("Errore nell'aggiornamento");
      }
    } catch (error) {
      console.error("Errore durante la richiesta PUT", error);
    }
  };

  // Validazione per la cancellazione dell'esperienza
  const handleDelete = (selected) => {
    const confirmDelete = window.confirm(
      "Sei sicuro di voler eliminare questa esperienza?"
    );

    if (confirmDelete) {
      deleteExp(selected);
    } else {
      console.log("Eliminazione annullata.");
    }
  };

  // DELETE creata per eliminare le esperienze specifiche
  const deleteExp = async (selectedId) => {
    try {
      const response = await fetch(API_EXP_PUT_URL + selectedId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Esperienza eliminata con successo");
        setReload(true);
      } else {
        console.error("Errore nell'eliminazione dell'esperienza");
      }
    } catch (error) {
      console.error("Errore durante la richiesta DELETE", error);
    }
  };

  // Funzione per formattare le date
  const formatDate = (dateString) => {
    if (!dateString) return "Presente";
    const date = new Date(dateString); // Converte la stringa in un oggetto Date
    return date.toLocaleDateString("it-IT", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }); // Formatta anno, mese e giorno
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica esperienza</Modal.Title>
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
          <Button type="submit" variant="primary" onClick={modifyExp}>
            Modifica
          </Button>
        </Modal.Footer>
      </Modal>
      <Container className="container-experience shadow mb-2">
        <Row>
          <Col className="mt-2">
            <h4>{experience.company}</h4>
            <p>
              {formatDate(experience.startDate)} -{" "}
              {formatDate(experience.endDate)}
            </p>
            <p>{experience.area}</p>
            <p>
              <strong>{experience.role}</strong>
            </p>
            <p>{experience.description}</p>
          </Col>
          <Col className="d-flex flex-column align-items-end justify-content-end">
            <SignedIn>
              {isOwnProfile && (
                <>
                  <Button className="mb-2" onClick={handleShow}>
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(experience._id)}
                  >
                    <i className="bi bi-x"></i>
                  </Button>
                </>
              )}
            </SignedIn>
          </Col>
        </Row>
      </Container>
    </>
  );
}
