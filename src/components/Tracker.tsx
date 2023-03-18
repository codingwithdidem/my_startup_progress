import React, { FC } from "react";
import type { Phase as PhaseType } from "../types";
import Phase from "./Phase";
import { Reorder, useDragControls } from "framer-motion";
import { MdDragIndicator } from "react-icons/md";

type TrackerProps = {
  phases: PhaseType[];
  isPhaseUnlocked: (phase: PhaseType) => boolean;
  toggleTaskCompleted: (phaseId: string, taskId: string) => void;
  removePhase: (phaseId: string) => void;
  onReorderPhases: (phases: PhaseType[]) => void;
};

const Tracker: FC<TrackerProps> = ({
  phases,
  isPhaseUnlocked,
  toggleTaskCompleted,
  removePhase,
  onReorderPhases,
}) => {
  const dragControls = useDragControls();
  return (
    <div className="w-full border border-gray-100/10 bg-brand-background-400 rounded-lg px-10 py-10">
      <div className="flex flex-col">
        <Reorder.Group axis="y" values={phases} onReorder={onReorderPhases}>
          {phases.map((phase, idx) => (
            <Reorder.Item
              key={phase.id}
              value={phase}
              className="mb-10"
              dragControls={dragControls}
            >
              <Phase
                idx={idx}
                key={phase.id}
                phase={phase}
                isUnlocked={isPhaseUnlocked(phase)}
                toggleTaskCompleted={toggleTaskCompleted}
                removePhase={removePhase}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
};

export default Tracker;
