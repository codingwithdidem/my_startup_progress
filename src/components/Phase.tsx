import React, { FC } from "react";
import Task from "./Task";
import type { Phase } from "../types";
import { HiOutlineLockClosed, HiOutlineXMark } from "react-icons/hi2";
import { MdDragIndicator } from "react-icons/md";
import {
  getIsPhaseUnlocked,
  removePhase,
  toggleTaskCompleted,
} from "@/features/tracker/trackerSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useMotionValue } from "framer-motion";

type PhaseProps = {
  idx: number;
  phase: Phase;
};

const Phase: FC<PhaseProps> = ({ idx, phase }) => {
  const dispatch = useAppDispatch();
  const isPhaseUnlocked = useAppSelector((state) =>
    getIsPhaseUnlocked(state, phase)
  );

  const y = useMotionValue(0);

  const onToggleTaskCompleted = (phaseId: string, taskId: string) => {
    if (!phase || !isPhaseUnlocked) {
      return;
    }

    dispatch(toggleTaskCompleted({ phaseId, taskId }));
  };

  const onRemovePhase = (phaseId: string) => {
    dispatch(removePhase(phaseId));
  };

  return (
    <div
      className={`flex flex-col space-y-4 pt-8 first:pt-0 select-none ${
        !isPhaseUnlocked && "opacity-50 cursor-not-allowed"
      }
      `}
    >
      <div className="group flex items-center">
        <MdDragIndicator
          className="text-gray-100/50 mr-2 cursor-grab active:cursor-grabbing reorder-handle"
          size={20}
        />
        <div className="w-8 h-8 bg-gray-100/10 rounded-full mr-2 flex items-center justify-center flex-none">
          {idx + 1}
        </div>
        <div className="text-gray-100/50 text-lg font-semibold">
          {phase.name}
        </div>
        {!isPhaseUnlocked && (
          <HiOutlineLockClosed className="text-gray-100/50 ml-2" size={20} />
        )}

        <HiOutlineXMark
          className="opacity-0 group-hover:opacity-100 cursor-pointer transition duration-300 ease-in-out text-red-400/100 ml-2"
          size={16}
          onClick={() => onRemovePhase(phase.id)}
        />
      </div>
      {phase.tasks.map((task) => (
        <Task
          key={task.id}
          phaseId={phase.id}
          task={task}
          toggleTaskCompleted={onToggleTaskCompleted}
          disabled={!isPhaseUnlocked}
        />
      ))}
    </div>
  );
};

export default Phase;
