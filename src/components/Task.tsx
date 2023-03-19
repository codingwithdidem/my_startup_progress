import React, { FC } from "react";
import { BsCheck } from "react-icons/bs";
import { HiOutlineXMark } from "react-icons/hi2";
import type { Task } from "../types";
import { removeTask } from "@/features/tracker/trackerSlice";
import { useAppDispatch } from "@/app/hooks";

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
  const dispatch = useAppDispatch();

  const onRemoveTask = (taskId: string) => {
    dispatch(removeTask({ phaseId, taskId }));
  };

  return (
    <div className="group flex items-center">
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

        <div
          className={`text-gray-100/70 text-md font-semibold
          ${task.isCompleted && "line-through opacity-50"}
        `}
        >
          {task.name}
        </div>
      </button>
      <HiOutlineXMark
        className="opacity-0 group-hover:opacity-100 cursor-pointer transition duration-300 ease-in-out text-red-400/100 ml-2"
        size={16}
        onClick={() => onRemoveTask(task.id)}
      />
    </div>
  );
};

export default Task;
