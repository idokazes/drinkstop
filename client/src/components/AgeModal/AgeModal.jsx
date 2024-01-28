import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { CategoriesSelect } from "../CategoriesSelect/CategoriesSelect";
import { useEffect, useState } from "react";
import { api } from "../../utilities/api";

export function AgeModal() {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const didVerifyAge = sessionStorage.getItem("age");

    if (!didVerifyAge) {
      handleShow();
    }
  }, []);

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        show={showModal}
        centered={true}
        backdrop={true}
        backdropClassName="blur"
      >
        <div className="bg-color">
          <Modal.Header>
            <Modal.Title className="drinkstop-text">
              Are you 18 or older?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Drink Stop is a website that sells alcohol. You must be 18 or
              older to use this website.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="dark"
              type="submit"
              onClick={() => {
                sessionStorage.setItem("age", true);
                handleClose();
              }}
            >
              I'm 18 or older
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}
