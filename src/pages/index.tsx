import React from "react";
import { NextPage } from "next";
import type { Phase as PhaseType } from "../types";
import { useState } from "react";
import Phase from "@/components/Phase";
import Button from "@/components/Button";

type HomePageProps = {};

const HomePage: NextPage<HomePageProps> = (props) => {
  const [phases, setPhases] = useState<PhaseType[]>([
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
    <main className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-10">
      {/* Form */}
      <div>
        <h1 className="text-2xl font-semibold -tracking-tight">
          Startup progress tracker
        </h1>
        <p className="mt-2 text-gray-400">
          Keep track of your startup progress with this simple tool.
        </p>

        <div className="mt-10">
          <form className="flex flex-col">
            <div className="flex flex-col mb-4 gap-2">
              <label className="text-sm font-semibold text-gray-400">
                Phase name
              </label>
              <input
                className="px-4 py-2 rounded-md border border-gray-100/10 bg-brand-background-400 text-gray-50"
                type="text"
                placeholder="e.g. Discovery"
              />
            </div>
            <Button intent="secondary" size="small">
              Add phase
            </Button>
          </form>

          <hr className="my-10 border-gray-100/10" />

          <form className="flex flex-col">
            <div className="flex flex-col mb-4 gap-2">
              <label className="text-sm font-semibold text-gray-400">
                Task name
              </label>
              <input
                className="px-4 py-2 rounded-md border border-gray-100/10 bg-brand-background-400 text-gray-50"
                type="text"
                placeholder="e.g. Create a pitch deck"
              />
            </div>
            <Button intent="secondary" size="small">
              Add task
            </Button>
          </form>
        </div>
      </div>

      {/* View */}
      <div>
        <div className="w-full border border-gray-100/10 bg-brand-background-400 rounded-lg px-10 py-10">
          <div className="flex flex-col">
            {phases
              .sort((a, b) => a.order - b.order)
              .map((phase, idx) => (
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
    </main>
  );
};

export default HomePage;
