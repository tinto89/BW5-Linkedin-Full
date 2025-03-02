import React from "react";

// Importa gli stili di react-bootstrap
import {
  Navbar,
  Nav,
  Dropdown,
  Form,
  FormControl,
  Container,
} from "react-bootstrap";

// Importo lo stile esterno CSS
import "./Navbar.css";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function NavBar() {
  return (
    <Navbar bg="light" className="fixed-top">
      <Container>
        <Navbar.Brand href="/">
          <i className="bi bi-linkedin text-primary fs-1"></i>
        </Navbar.Brand>
        <Form className="d-flex align-items-center w-50">
          <FormControl
            type="search"
            placeholder="Cerca"
            className="form-control d-none d-xl-block"
            aria-label="Search"
          />
          <Nav.Item className="d-xl-none mx-3">
            <Nav.Link>
              <i className="bi bi-search fs-4"></i>
              <div className="small d-none d-lg-block">Cerca</div>
            </Nav.Link>
          </Nav.Item>
        </Form>
        <Nav className=" d-flex align-items-center">
          <Nav.Item className="text-center mx-3">
            <Nav.Link href="/">
              <i className="bi bi-house-door fs-4"></i>
              <div className="small d-none d-lg-block">Home</div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="text-center mx-3">
            <Nav.Link>
              <i className="bi bi-people fs-4"></i>
              <div className="small d-none d-lg-block">Rete</div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="text-center mx-3">
            <Nav.Link>
              <i className="bi bi-briefcase fs-4"></i>
              <div className="small d-none d-lg-block">Lavoro</div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="text-center mx-3">
            <Nav.Link>
              <i className="bi bi-chat-dots fs-4"></i>
              <div className="small d-none d-lg-block">Messaggistica</div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="text-center mx-3">
            <Nav.Link>
              <i className="bi bi-bell fs-4"></i>
              <div className="small d-none d-lg-block">Notifiche</div>
            </Nav.Link>
          </Nav.Item>
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <Dropdown className="text-center mx-3 d-none d-md-block">
            <Dropdown.Toggle
              variant="light"
              className="border-0 bg-transparent d-flex flex-column align-items-center"
            >
              <i className="bi bi-grid fs-4"></i>
              <div className="d-flex align-items-center small d-none d-lg-block">
                Per le aziende <i className="bi bi-chevron-down ms-1"></i>
              </div>
            </Dropdown.Toggle>
          </Dropdown>
          <Nav.Item className="text-center mx-3 d-flex flex-column align-items-center d-none d-md-block">
            <Nav.Link className="d-flex flex-column align-items-center">
              <i className="bi bi-star-fill text-warning fs-4"></i>
              <div className="small d-none d-lg-block">Prova Premium</div>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}
