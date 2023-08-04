import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const DeleteWorkout = ({ workout }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [isDeleting, setIsDeleting] = useState(false);

  const { dispatch } = useWorkoutsContext();

  const id = workout._id;

  const handleDelete = async () => {

    setIsDeleting(true);

    const response = await fetch("https://workouthead-4svf.onrender.com/api/workouts/" + id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
      setIsDeleting(false);
      handleClose()
    }
  };
  return (
    <>
      <RiDeleteBin7Fill
        style={{ fontSize: "20px", color: "#333", cursor: "pointer" }}
        onClick={handleShow}
      />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>Are you sure do you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {!isDeleting && 
          <Button
          className="btn-grad_delete"
          onClick={handleDelete}
        >
          Yes! Delete
        </Button>
          }
          {isDeleting &&
          <Button
          className="btn-grad_delete"
          onClick={handleDelete}
        >
          Deleting...
        </Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteWorkout;
