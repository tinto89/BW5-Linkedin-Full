import React, { useEffect, useState } from "react";

// Importo gli stili di react-bootstrap
import { Button, Card, Modal } from "react-bootstrap";

// Importo il componente utilizzato
import "./ProfileDetails.css";

// Importo il Link dal router-dom, su App.js dichiarato le Routes
import { Link } from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";

export default function ProfileDetails({
  data,
  apiUrl,
  setReload,
  isOwnProfile,
}) {
  // Come parametro viene passata la props "data" dal componente ProfilePage per passargli i dati del JSON in pagina

  // Funzioni utilizzate per chiudere/aprire la finestra modale
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    title: "",
    area: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    if (data) {
      setInputs({
        name: data.name,
        surname: data.surname,
        title: data.title,
        area: data.area,
        bio: data.bio,
        image: data.image,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files) {
      // Se il campo è "image", aggiorna con il file selezionato
      setInputs((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      // Altrimenti, aggiorna i campi con il valore normale
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Esegue la PUT per modificare il profilo
  const modifyProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      for (const key in inputs) {
        if (inputs[key]) {
          // Se è un file, lo aggiungiamo come tale
          if (key === "image" && inputs[key] instanceof File) {
            formData.append(key, inputs[key]);
          } else {
            formData.append(key, inputs[key]);
          }
        }
      }

      const response = await fetch(apiUrl + data._id, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        console.log("Profilo aggiornato con successo");
        handleClose();
        setReload(true);
      } else {
        console.error("Errore nell'aggiornamento");
      }
    } catch (error) {
      console.error("Errore durante la richiesta PUT", error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <label>Nome</label>
          <input
            name="name"
            value={inputs.name}
            type="text"
            placeholder="Nome"
            onChange={handleChange}
          />

          <label>Cognome</label>
          <input
            name="surname"
            value={inputs.surname}
            type="text"
            placeholder="Cognome"
            onChange={handleChange}
          />

          <label>Titolo di lavoro</label>
          <input
            name="title"
            value={inputs.title}
            type="text"
            placeholder="Titolo di lavoro"
            onChange={handleChange}
          />

          <label>Area Geografica</label>
          <input
            name="area"
            value={inputs.area}
            type="text"
            placeholder="Area Geografica"
            onChange={handleChange}
          />

          <label>Biografia</label>
          <input
            name="bio"
            value={inputs.bio}
            type="text"
            placeholder="Biografia"
            onChange={handleChange}
          />

          <label>Immagine Profilo</label>
          <input name="image" type="file" onChange={handleChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary" onClick={modifyProfile}>
            Modifica
          </Button>
        </Modal.Footer>
      </Modal>
      <Card className="shadow profile-card mt-5">
        <Card.Img
          variant="top"
          src="https://i.pinimg.com/originals/2d/e8/82/2de882cd4f3992ada3d609e3a183f7a4.jpg"
          alt="Background"
          className="profile-card-header"
        />
        <img
          src={data.image}
          alt="Avatar"
          className="rounded-circle border avatar-image"
        />
        <Card.Body className="mt-5">
          <Card.Title className="mb-2">
            {data.name} {data.surname}
          </Card.Title>
          <Card.Subtitle className="text-muted mb-2">
            {data.title}
          </Card.Subtitle>
          <Card.Text>
            {data.area} -
            <Link className="mx-1 text-decoration-none">
              Informazioni di contatto
            </Link>
          </Card.Text>
          <Card.Text>{data.bio} </Card.Text>

          <Button className="mb-2">Disponibile per</Button>
          <Button variant="outline-primary" className="mb-2 mx-2">
            Aggiungi sezione del profilo
          </Button>

          <SignedIn>
            {isOwnProfile && (
              <Button className="mb-2" onClick={handleShow}>
                Modifica Profilo
                <i className="bi bi-pencil mx-2"></i>
              </Button>
            )}
          </SignedIn>
          <Button variant="outline-secondary" className="mb-2 mx-2">
            Risorse
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
