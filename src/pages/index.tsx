import React, { useEffect } from "react";
import { NextPage } from "next";
import type { Phase as PhaseType, Task } from "../types";
import { useState, useRef } from "react";
import Phase from "@/components/Phase";
import Button from "@/components/Button";
import Confetti from "@/components/Confetti";
import CongratsModal from "@/components/CongratsModal";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

type PhaseFormType = {
  phaseName: string;
};

type TaskFormType = {
  phaseId: string;
  taskName: string;
};

type HomePageProps = {};

const HomePage: NextPage<HomePageProps> = (props) => {
  const [isInitialised, setIsInitialised] = useState(false);
  const {
    register,
    reset,
    handleSubmit: handlePhaseFormSubmit,
    formState: { errors },
  } = useForm<PhaseFormType>();

  const {
    register: registerTask,
    reset: resetTask,
    handleSubmit: handleTaskFormSubmit,
  } = useForm<TaskFormType>();

  const [showConfetti, setShowConfetti] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [phases, setPhases] = useState<PhaseType[]>([]);
  const [randomFact, setRandomFact] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && isInitialised) {
      localStorage.setItem("phases", JSON.stringify(phases));
    }
  }, [phases, isInitialised]);

  const isAllPhasesCompleted =
    phases.length > 0 &&
    phases.some((p) => p.tasks.length > 0) &&
    phases.every((p) => p.tasks.every((t) => t.isCompleted));

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const phases = localStorage.getItem("phases");

        if (phases) {
          setPhases(JSON.parse(phases));
        }
      } catch (error) {
        setPhases([]);
      }
      setIsInitialised(true);
    }
  }, []);

  useEffect(() => {
    if (isAllPhasesCompleted) {
      // Fetch a random fact from the API
      fetch("https://uselessfacts.jsph.pl/api/v2/facts/random")
        .then((response) => response.json())
        .then((data) => {
          setRandomFact(data.text);
        });

      setShowConfetti(true);
    }
  }, [phases, isAllPhasesCompleted]);

  const toggleTaskCompleted = (phaseId: string, taskId: string) => {
    const phase = phases.find((p) => p.id === phaseId);

    if (!phase || !isPhaseUnlocked(phase)) {
      return;
    }

    const newPhases = phases.map((phase) => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          tasks: phase.tasks.map((task) => {
            if (task.id === taskId) {
              return {
                ...task,
                isCompleted: !task.isCompleted,
              };
            }

            return task;
          }),
        };
      }

      return phase;
    });

    setPhases(newPhases);
  };

  const isPhaseUnlocked = (phase: Phase) => {
    const phaseIndex = phases.findIndex((p) => p.id === phase.id);
    const phasesBefore = phases.slice(0, phaseIndex);

    if (phasesBefore.length === 0) {
      return true;
    }

    return phasesBefore.every((p) => p.tasks.every((t) => t.isCompleted));
  };

  const onConfettiComplete = () => {
    setShowConfetti(false);
    setShowCongratsModal(true);
  };

  const onPhaseFormSubmit: SubmitHandler<PhaseFormType> = (data) => {
    const newPhase: PhaseType = {
      id: uuidv4(),
      name: data.phaseName,
      tasks: [],
    };

    setPhases([...phases, newPhase]);

    reset();
  };

  const onTaskFormSubmit: SubmitHandler<TaskFormType> = (data) => {
    const phaseId = data.phaseId;
    const phase = phases.find((p) => p.id === phaseId);

    if (!phase) {
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      name: data.taskName,
      isCompleted: false,
    };

    const newPhases = phases.map((phase) => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          tasks: [...phase.tasks, newTask],
        };
      }

      return phase;
    });

    setPhases(newPhases);

    resetTask();
  };

  const resetTracker = () => {
    setPhases([]);
  };

  return (
    <main className="w-full grid grid-cols-1 md:grid-cols-2 gap-14 px-10 py-10">
      {/* Form */}
      <div>
        <h1 className="text-2xl font-semibold -tracking-tight">
          Startup progress tracker
        </h1>
        <p className="mt-2 text-gray-400">
          Keep track of your startup progress with this simple tool.
        </p>

        <div className="mt-10">
          <form
            className="flex flex-col"
            onSubmit={handlePhaseFormSubmit(onPhaseFormSubmit)}
          >
            <div className="flex flex-col items-start mb-4 gap-2">
              <label
                htmlFor="phase-name"
                className="text-sm font-semibold text-gray-400 cursor-pointer"
              >
                Phase name
              </label>
              <input
                id="phase-name"
                className="w-full px-4 py-2 rounded-md border border-gray-100/10 bg-brand-background-400 text-gray-50"
                type="text"
                placeholder="e.g. Discovery"
                {...register("phaseName", {
                  required: true,
                  validate: (value) =>
                    value.trim().length > 0 || "Phase name cannot be empty",
                })}
              />
              {errors.phaseName && (
                <span className="text-sm text-red-500">
                  {errors.phaseName.message}
                </span>
              )}
            </div>
            <Button intent="secondary" size="small" type="submit">
              Add phase
            </Button>
          </form>

          <hr className="h-px my-10 border-0 bg-gradient-to-r from-transparent via-gray-900 to-transparent" />

          <form
            className="flex flex-col"
            onSubmit={handleTaskFormSubmit(onTaskFormSubmit)}
          >
            <div className="flex flex-col items-start mb-4 gap-2">
              <label
                htmlFor="phase"
                className="text-sm font-semibold text-gray-400 cursor-pointer"
              >
                Phase
              </label>
              <select
                id="phase"
                className="w-full px-4 py-2 rounded-md border border-gray-100/10 bg-brand-background-400 text-gray-50"
                {...registerTask("phaseId", {
                  required: true,
                })}
              >
                <option value="">Select a phase</option>
                {phases.map((phase) => (
                  <option key={phase.id} value={phase.id}>
                    {phase.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start mb-4 gap-2">
              <label
                htmlFor="task-name"
                className="text-sm font-semibold text-gray-400 cursor-pointer"
              >
                Task name
              </label>
              <input
                id="task-name"
                className="w-full px-4 py-2 rounded-md border border-gray-100/10 bg-brand-background-400 text-gray-50"
                type="text"
                placeholder="e.g. Create a pitch deck"
                {...registerTask("taskName", {
                  required: true,
                  validate: (value) =>
                    value.trim().length > 0 || "Task name cannot be empty",
                })}
              />
            </div>
            <Button intent="secondary" size="small" type="submit">
              Add task
            </Button>
          </form>

          <hr className="h-px my-10 border-0 bg-gradient-to-r from-transparent via-gray-900 to-transparent" />

          <Button intent="primary" size="small" onClick={resetTracker}>
            Reset
          </Button>
        </div>
      </div>

      {/* TrackerView */}
      <div>
        <div className="w-full border border-gray-100/10 bg-brand-background-400 rounded-lg px-10 py-10">
          <div className="flex flex-col">
            {phases.map((phase, idx) => (
              <Phase
                idx={idx}
                key={phase.id}
                phase={phase}
                isUnlocked={isPhaseUnlocked(phase)}
                toggleTaskCompleted={toggleTaskCompleted}
              />
            ))}
          </div>
        </div>
      </div>

      {showConfetti && <Confetti onConfettiComplete={onConfettiComplete} />}

      {showCongratsModal && (
        <CongratsModal
          open={showCongratsModal}
          randomFact={randomFact}
          onClose={() => setShowCongratsModal(false)}
        />
      )}
    </main>
  );
};

export default HomePage;
