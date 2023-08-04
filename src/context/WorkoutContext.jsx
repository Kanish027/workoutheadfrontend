import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const WorkoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT": 
      return {
        workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
      };
      case "UPDATE_WORKOUT":
        const updatedWorkout = action.payload;
        if (!updatedWorkout || !updatedWorkout._id) {
          console.error("Invalid updated workout object");
          return state; 
        }
        const updatedWorkouts = state.workouts.map((workout) =>
          workout._id === updatedWorkout._id ? updatedWorkout : workout
        );
        return {
          ...state,
          workouts: updatedWorkouts,
        };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WorkoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
