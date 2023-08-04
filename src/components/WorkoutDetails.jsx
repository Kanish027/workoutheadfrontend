import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { formatDistanceToNow } from 'date-fns'
import EditWorkout from './EditWorkout'
import DeleteWorkout from './DeleteWorkout'

const WorkoutDetails = ({workout}) => {

  const { dispatch } = useWorkoutsContext()

  const  id  = workout._id;
 
  const handleDelete = async() => {

    const response = await fetch('/api/workouts/' + id, {
        method: 'DELETE'
    })
    const json = await response.json()
    if(response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json});
    }
  }

  return (
    <div className='workout-details d-flex justify-content-between'>
      <div>
      <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Number of Reps: </strong>{workout.reps}</p>
        <p>{formatDistanceToNow( new Date(workout.createdAt), { addSuffix: true } )}</p>
      </div>
      <div className='d-flex align-items-center me-4'>
        <EditWorkout id={ id } workout={ workout }/>
        <DeleteWorkout workout={workout} handleDelete={handleDelete} />
      </div>
    </div>
  )
}

export default WorkoutDetails