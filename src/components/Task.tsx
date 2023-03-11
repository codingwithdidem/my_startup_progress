import React, { FC } from "react";
import { BsCheck } from "react-icons/bs";
import type { Task } from "../types";

type TaskProps = {
  phaseId: string;
  task: Task;
  disabled: boolean;
  toggleTaskCompleted: (phaseId: string, taskId: string) => void;
};

const Task: FC<TaskProps> = ({
  phaseId,
  task,
  disabled,
  toggleTaskCompleted,
}) => {
  return (
    <button
      key={task.id}
      className="flex items-center space-x-4 disabled:cursor-not-allowed"
      onClick={() => toggleTaskCompleted(phaseId, task.id)}
      disabled={disabled}
    >
      <span className="w-6 h-6 flex items-center justify-center">
        {task.isCompleted ? (
          <BsCheck className="text-green-500" size={20} />
        ) : (
          <div className="w-2 h-2 bg-gray-100/10 rounded-full" />
        )}
      </span>

      <div className="text-gray-100/70 text-md font-semibold">{task.name}</div>
    </button>
  );
};

export default Task;
