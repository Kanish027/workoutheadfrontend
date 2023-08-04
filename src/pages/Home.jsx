import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {

  const [isLoading, setIsLoading] = useState(true)
  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch("https://workouthead-4svf.onrender.com/api/workouts");
      const json = await response.json();

      if (response.ok) {
        dispatch({type:'SET_WORKOUTS', payload: json})
        setIsLoading(false);
      }
    };
    fetchWorkout();
  },[dispatch]);

  return (
    <div className="home">
      { isLoading && <div style={{margin: '22px', fontWeight: '500'}}>Loading...</div> }
      <div className="workouts">
        {workouts && workouts.map((workout) => <WorkoutDetails key={workout._id} workout={workout} />)}
      </div>
    </div>
  );
};

export default Home;
