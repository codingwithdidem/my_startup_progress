import React, { useEffect } from "react";
import { NextPage } from "next";
import type { Phase as PhaseType } from "../types";
import { useState } from "react";
import Phase from "@/components/Phase";
import Button from "@/components/Button";
import Confetti from "@/components/Confetti";
import CongratsModal from "@/components/CongratsModal";
import Tracker from "@/components/Tracker";
import AddPhaseForm from "@/components/AddPhaseForm";
import AddTaskForm from "@/components/AddTaskForm";
import { useRandomFact } from "@/hooks/useRandomFact";

type HomePageProps = {};

const HomePage: NextPage<HomePageProps> = (props) => {
  const { fact, getFact } = useRandomFact();

  const [isInitialised, setIsInitialised] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [phases, setPhases] = useState<PhaseType[]>([]);

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
      getFact();
      setShowConfetti(true);
    }
  }, [phases, isAllPhasesCompleted, getFact]);

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

  const removePhase = (phaseId: string) => {
    const newPhases = phases.filter((phase) => phase.id !== phaseId);
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

  const resetTracker = () => {
    setPhases([]);
  };

  return (
    <main className="w-full grid grid-cols-1 md:grid-cols-2 gap-14 px-10 py-10">
      <div>
        <h1 className="text-2xl font-semibold -tracking-tight">
          Startup progress tracker
        </h1>
        <p className="mt-2 text-gray-400">
          Keep track of your startup progress with this simple tool.
        </p>

        <div className="mt-10">
          <AddPhaseForm
            onPhaseAdded={(phase) => setPhases([...phases, phase])}
          />
          <AddTaskForm
            phases={phases}
            onTaskAdded={(phaseId, newTask) => {
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
            }}
          />
          <Button intent="primary" size="small" onClick={resetTracker}>
            Reset
          </Button>
        </div>
      </div>

      <Tracker
        phases={phases}
        isPhaseUnlocked={isPhaseUnlocked}
        toggleTaskCompleted={toggleTaskCompleted}
        removePhase={removePhase}
        onReorderPhases={(newPhases) => setPhases(newPhases)}
      />

      {showConfetti && <Confetti onConfettiComplete={onConfettiComplete} />}
      {showCongratsModal && (
        <CongratsModal
          open={showCongratsModal}
          randomFact={fact}
          onClose={() => setShowCongratsModal(false)}
        />
      )}
    </main>
  );
};

export default HomePage;
