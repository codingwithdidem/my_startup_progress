import React from "react";
import { NextPage } from "next";
import type { Phase, Task } from "../types";
import { useState } from "react";
import { BsCheck } from "react-icons/bs";
import { HiOutlineLockClosed } from "react-icons/hi2";

type HomePageProps = {};

const HomePage: NextPage<HomePageProps> = (props) => {
  const [phases, setPhases] = useState<Phase[]>([
    {
      id: "foundation",
      name: "Foundation",
      order: 1,
      tasks: [
        {
          id: "foundation-1",
          name: "Create a business plan",
          isCompleted: false,
        },
        {
          id: "foundation-2",
          name: "Create a pitch deck",
          isCompleted: false,
        },
      ],
    },
    {
      id: "discovery",
      name: "Discovery",
      order: 2,
      tasks: [
        {
          id: "discovery-1",
          name: "Validate your idea",
          isCompleted: false,
        },
        {
          id: "discovery-2",
          name: "Create a prototype",
          isCompleted: false,
        },
      ],
    },
    {
      id: "delivery",
      name: "Delivery",
      order: 3,
      tasks: [
        {
          id: "delivery-1",
          name: "Build your product",
          isCompleted: false,
        },
      ],
    },
  ]);

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
    const phasesBefore = phases.filter((p) => p.order < phase.order);
    if (phasesBefore.length === 0) {
      return true;
    }

    return phasesBefore.every((p) => p.tasks.every((t) => t.isCompleted));
  };

  return (
    <main className="">
      <div className="w-full max-w-sm border border-gray-100/10  rounded-lg px-10 py-6">
        <h1 className="text-3xl font-semibold">My Startup Progress</h1>

        <div className="mt-4 flex flex-col">
          {phases
            .sort((a, b) => a.order - b.order)
            .map((phase, idx) => (
              <div
                key={phase.id}
                className={`flex flex-col space-y-4 pt-8 first:pt-0 ${
                  !isPhaseUnlocked(phase) && "opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100/10 rounded-full mr-2 flex items-center justify-center flex-none">
                    {idx + 1}
                  </div>
                  <div className="text-gray-100/50 text-lg font-semibold">
                    {phase.name}
                  </div>
                  {!isPhaseUnlocked(phase) && (
                    <HiOutlineLockClosed
                      className="text-gray-100/50 ml-2"
                      size={20}
                    />
                  )}
                </div>
                {phase.tasks.map((task) => (
                  <button
                    key={task.id}
                    className="flex items-center space-x-4 disabled:cursor-not-allowed"
                    onClick={() => toggleTaskCompleted(phase.id, task.id)}
                    disabled={!isPhaseUnlocked(phase)}
                  >
                    <span className="w-6 h-6 flex items-center justify-center">
                      {task.isCompleted ? (
                        <BsCheck className="text-green-500" size={20} />
                      ) : (
                        <div className="w-2 h-2 bg-gray-100/10 rounded-full" />
                      )}
                    </span>

                    <div className="text-gray-100/70 text-md font-semibold">
                      {task.name}
                    </div>
                  </button>
                ))}
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
