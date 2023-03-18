import React, { FC } from "react";
import type { Phase as PhaseType } from "../types";
import Phase from "./Phase";
import { Reorder, useDragControls } from "framer-motion";
import { MdDragIndicator } from "react-icons/md";
import NoDataView from "./NoDataView";

type TrackerProps = {
  phases: PhaseType[];
  isPhaseUnlocked: (phase: PhaseType) => boolean;
  toggleTaskCompleted: (phaseId: string, taskId: string) => void;
  removePhase: (phaseId: string) => void;
  removeTask: (phaseId: string, taskId: string) => void;
  onReorderPhases: (phases: PhaseType[]) => void;
};

const Tracker: FC<TrackerProps> = ({
  phases,
  isPhaseUnlocked,
  toggleTaskCompleted,
  removePhase,
  removeTask,
  onReorderPhases,
}) => {
  const dragControls = useDragControls();

  const noData = phases.length === 0;

  return (
    <div className="w-full h-full border border-gray-100/10 bg-brand-background-400 rounded-lg px-10 py-10">
      {noData && <NoDataView />}
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
                removeTask={removeTask}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
};

export default Tracker;
