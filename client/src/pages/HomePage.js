import React, { useState } from "react";
import { Container, Card, Button, Modal } from "react-bootstrap";
import CreateRoomModal from "./CreateRoomModal.js";

export default function HomePage({ gameID, setGameID }) {
  const [modalOpen, setModalOpen] = useState(false);

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div id="main-container">
      <Container
        className="align-items-center justify-content-center d-flex"
        style={{ height: "100vh", width: "100vw" }}
      >
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Der Dümmste Fliegt</Card.Title>
            <Card.Text>
              Erstelle einen neuen Raum für das Spiel "Der Dümmste Fliegt".
            </Card.Text>
            <Button onClick={() => setModalOpen(true)}>
              Neuen Raum erstellen
            </Button>
          </Card.Body>
        </Card>
      </Container>
      <Modal show={modalOpen} onHide={closeModal}>
        <CreateRoomModal
          closeModal={closeModal}
          isCreator={true}
        />
      </Modal>
    </div>
  )
}
