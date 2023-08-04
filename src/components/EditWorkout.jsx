import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const EditWorkout = ({ workout, id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setIsUpdating(true);

    const workout = { title, load, reps };

    const response = await fetch("https://workouthead-4svf.onrender.com/api/workouts/" + id, {
      method: "PATCH",
      body: JSON.stringify(workout),
      headers: {
        "content-type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setIsUpdating(false)
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      console.log("Workout UPDATED", json);
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
      handleClose();
      window.location.reload()
    }
  };

  return (
    <>
      <BiEdit
        className="me-4"
        style={{ fontSize: "22px", color: "#333", cursor: "pointer" }}
        onClick={handleShow}
      />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={handleUpdate}>
          <Modal.Header className='d-flex justify-content-center'>
            <Modal.Title className="d-flex text-center">Update Workout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label>Exercise Title: </label>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : '' }
              />
            </div>
            <div>
              <label>Load (in kg): </label>
              <input
                type="number"
                min={1}
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : '' }
              />
            </div>
            <div>
              <label>Reps: </label>
              <input
                type="number"
                min={1}
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : '' }
              />
            </div>
            <div>{error && <div className="error">{error}</div>}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            {!isUpdating &&
              <Button className="btn-grad" type="submit">
              Update
            </Button>
            }
            {isUpdating && 
              <Button className="btn-grad" type="submit">
              Updating...
            </Button>
            }
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditWorkout;
