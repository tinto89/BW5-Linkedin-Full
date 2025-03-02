import React from "react";

//Importo lo stile CSS
import "./Footer.css";

// Importo gli stili di react-bootstrap
import { Container, Card } from "react-bootstrap";

// Importo il Link dal router-dom, su App.js dichiarato le Routes
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <footer className="ms-0 ps-0 fw-semibold" style={{ fontSize: "12px" }}>
        <div className="row">
          <div className="col-6 col-md-2 mb-3">
            <ul
              className="nav flex-column align-items-start w-100"
              style={{ textAlign: "left" }}
            >
              <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-body-secondary">
                  Informazioni
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-body-secondary">
                  Informativa sulla community professionale
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-body-secondary">
                  Privacy e condizioni
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-body-secondary">
                  Sales Solutions
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-body-secondary">
                  Centro sicurezza
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <ul
              className="nav flex-column align-items-start w-100"
              style={{ textAlign: "left" }}
            >
              <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-body-secondary">
                  Accessibilità
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-body-secondary">
                  Carriera
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-body-secondary">
                  Opzioni per gli annunci pubblicitari
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-body-secondary">Mobile</Link>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <ul
              className="nav flex-column align-items-start w-100"
              style={{ textAlign: "left" }}
            >
              <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-body-secondary">
                  Talent Solutions
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-body-secondary">
                  Soluzioni di marketing
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-body-secondary">
                  Pubblicità
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0 text-body-secondary">
                  Piccole imprese
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 mb-3">
            <p>Seleziona lingua</p>
            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
              <Card
                body
                className="language-card w-100 d-flex justify-content-center align-items-center"
              >
                <p className="mb-auto">Italiano</p>
              </Card>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p>LinkedIn Corporation © 2024</p>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
