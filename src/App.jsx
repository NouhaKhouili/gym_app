import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Hero } from "./components/Hero";
import Generator from "./components/Generator";
import { Workout } from "./components/Workout";
import { generateWorkout } from "./utils/function";

function App() {
  const [workout, setWorkout] = useState(null);
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goals, setGoals] = useState("strenght_power");

  function updateWorkout() {
    if (muscles.length < 1) {
      return;
    }
    let newWorkout = generateWorkout({ poison, muscles, goals });
    console.log(newWorkout);
    setWorkout(newWorkout);
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to bg-slate-950 text-white text-sm sm:text-base">
      <Hero />
      <Generator
        poison={poison}
        setPoison={setPoison}
        goals={goals}
        setGoals={setGoals}
        muscles={muscles}
        setMuscles={setMuscles}
        updateWorkout={updateWorkout}
      />
      {workout && <Workout workout={workout} />}
    </main>
  );
}

export default App;
