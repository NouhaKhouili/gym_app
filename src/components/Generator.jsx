import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils/swoldier";
import Button from "./Button";

function Header(props) {
  const { index, title, description } = props;
  return (
    <div
      className="flex flex-col gap-4
    ">
      <div className="flex items-center justify-center gap-2 ">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-400">
          {index}{" "}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl"> {title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description} </p>
    </div>
  );
}

export default function Generator(props) {
  const {
    muscles,
    setMuscles,
    poison,
    setPoison,
    goals,
    setGoals,
    updateWorkout,
  } = props;
  //let showModal = false;
  const [showModal, setShowModal] = useState(false);
  function toggleModal() {
    setShowModal(!showModal);
  }

  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }

    if (muscles.length > 2) {
      return;
    }

    if (poison !== "individual") {
      setMuscles([muscleGroup]);
      setShowModal(false);
      return;
    }

    setMuscles([...muscles, muscleGroup]);
    if (muscles.length === 2) {
      setShowModal(false);
    }
  }

  return (
    <div>
      <SectionWrapper
        header={"generate your workout"}
        title={["It's ", "Huge ", " o'clock"]}>
        <Header
          index={"01"}
          title={"Pick your poison"}
          description={"Select the workout you wish to endure."}
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.keys(WORKOUTS).map((type, typeIndex) => {
            return (
              <button
                onClick={() => {
                  setMuscles([]);
                  setPoison(type);
                }}
                className={
                  "bg-slate-950 px-4 border border-blue-400 duration-200 hover:border-blue-600 py-3 rounded-lg" +
                  (type === poison ? " border-blue-600" : " border-blue-400")
                }
                key={typeIndex}>
                {" "}
                <p className=" capitalize">{type}</p>
              </button>
            );
          })}
        </div>

        <Header
          index={"02"}
          title={"Lock on targets"}
          description={
            "Select the muscles judged for annihilation.ish to endure."
          }
        />
        <div className=" bg-slate-950 p-3 border border-solid border-blue-400 rounded-lg flex flex-col">
          <button
            onClick={toggleModal}
            className=" relative flex items-center justify-center p-3">
            <p className=" capitalize">
              {muscles.length == 0
                ? `Select muscle groups`
                : muscles.join("   ")}
            </p>
            <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2"></i>
          </button>
          {showModal && (
            <div className=" bg-slate-950 z-10 flex flex-col px-3 pb-3 items-center justify-center">
              {(poison === "individual"
                ? WORKOUTS[poison]
                : Object.keys(WORKOUTS[poison])
              ).map((muscleGroup, muscleGroupIndex) => (
                <button
                  onClick={() => {
                    updateMuscles(muscleGroup);
                  }}
                  className={
                    " hover:text-blue-400 duration-200" +
                    (muscles.includes(muscleGroup) ? " text-blue-400" : "")
                  }
                  key={muscleGroupIndex}>
                  <p className="capitalize">{muscleGroup}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <Header
          index={"03"}
          title={"Become Juggernaut"}
          description={"Select your ultimate objective."}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
          {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
            return (
              <button
                onClick={() => {
                  setGoals(scheme);
                }}
                className={
                  "bg-slate-950 border px-4 border-blue-400 duration-200 hover:border-blue-600 py-3 rounded-lg" +
                  (scheme === goals ? " border-blue-600" : " border-blue-400")
                }
                key={schemeIndex}>
                {" "}
                <p className=" capitalize">{scheme}</p>
              </button>
            );
          })}
        </div>
      </SectionWrapper>
      <Button func={updateWorkout} text="Formulate"></Button>
    </div>
  );
}
