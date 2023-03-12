import React, { FC } from "react";
import type { Phase as PhaseType } from "../types";
import Phase from "./Phase";
type TrackerProps = {
  phases: PhaseType[];
  isPhaseUnlocked: (phase: PhaseType) => boolean;
  toggleTaskCompleted: (phaseId: string, taskId: string) => void;
};

const Tracker: FC<TrackerProps> = ({
  phases,
  isPhaseUnlocked,
  toggleTaskCompleted,
}) => {
  return (
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
  );
};

export default Tracker;
