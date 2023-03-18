import React, { FC } from "react";
import Task from "./Task";
import type { Phase } from "../types";
import { HiOutlineLockClosed, HiOutlineXMark } from "react-icons/hi2";
import { MdDragIndicator } from "react-icons/md";

type PhaseProps = {
  idx: number;
  phase: Phase;
  isUnlocked: boolean;
  toggleTaskCompleted: (phaseId: string, taskId: string) => void;
  removePhase: (phaseId: string) => void;
};

const Phase: FC<PhaseProps> = ({
  idx,
  phase,
  isUnlocked,
  toggleTaskCompleted,
  removePhase,
}) => {
  return (
    <div
      key={phase.id}
      className={`flex flex-col space-y-4 pt-8 first:pt-0 ${
        !isUnlocked && "opacity-50 cursor-not-allowed"
      }`}
    >
      <div className="group flex items-center">
        <MdDragIndicator className="text-gray-100/50 mr-2" size={20} />
        <div className="w-8 h-8 bg-gray-100/10 rounded-full mr-2 flex items-center justify-center flex-none">
          {idx + 1}
        </div>
        <div className="text-gray-100/50 text-lg font-semibold">
          {phase.name}
        </div>
        {!isUnlocked && (
          <HiOutlineLockClosed className="text-gray-100/50 ml-2" size={20} />
        )}

        <HiOutlineXMark
          className="opacity-0 group-hover:opacity-100 cursor-pointer transition duration-300 ease-in-out text-red-400/100 ml-2"
          size={16}
          onClick={() => removePhase(phase.id)}
        />
      </div>
      {phase.tasks.map((task) => (
        <Task
          key={task.id}
          phaseId={phase.id}
          task={task}
          toggleTaskCompleted={toggleTaskCompleted}
          disabled={!isUnlocked}
        />
      ))}
    </div>
  );
};

export default Phase;
