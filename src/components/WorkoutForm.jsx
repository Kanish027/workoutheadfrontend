import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();

    setIsPending(true);

    const workout = { title, load, reps }

    const response = await fetch('https://workouthead-4svf.onrender.com/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'content-type': 'application/json'
      }
    })

    const json = await response.json();

    if(!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields)
    }

    if(response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      console.log('New Workout Added', json);
      dispatch({type: 'CREATE_WORKOUT', payload: json})
      handleClose()
      setIsPending(false)
    }
  }

  return (
    <>
      <Button className='btn-grad'  onClick={handleShow}>
        Add Workout
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header className='d-flex justify-content-center'>
            <Modal.Title >Add New Workout</Modal.Title>
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
            {!isPending &&
              <Button className='btn-grad' type="submit" >
              Add
            </Button>
            }
            {
              isPending &&
              <Button className='btn-grad' type="submit">
              Adding...
            </Button>
            }
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default WorkoutForm