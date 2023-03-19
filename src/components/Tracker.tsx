import React, { FC } from "react";
import type { Phase as PhaseType } from "../types";
import Phase from "./Phase";
import { Reorder, useDragControls } from "framer-motion";
import NoDataView from "./NoDataView";
import {
  selectPhases,
  setPhases,
  toggleTaskCompleted,
} from "@/features/tracker/trackerSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

type TrackerProps = {};

const Tracker: FC<TrackerProps> = () => {
  const dispatch = useAppDispatch();
  const dragControls = useDragControls();

  const phases = useAppSelector(selectPhases);

  const onToggleTaskCompleted = (phaseId: string, taskId: string) => {
    const phase = phases.find((p) => p.id === phaseId);

    if (!phase || !isPhaseUnlocked(phase)) {
      return;
    }

    dispatch(toggleTaskCompleted({ phaseId, taskId }));
  };

  const isPhaseUnlocked = (phase: Phase) => {
    const phaseIndex = phases.findIndex((p) => p.id === phase.id);
    const phasesBefore = phases.slice(0, phaseIndex);

    if (phasesBefore.length === 0) {
      return true;
    }

    return phasesBefore.every((p) => p.tasks.every((t) => t.isCompleted));
  };

  const onReorderPhases = (phases: PhaseType[]) => {
    dispatch(setPhases(phases));
  };

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
                toggleTaskCompleted={onToggleTaskCompleted}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
};

export default Tracker;
