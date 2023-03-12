import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import type { Phase as PhaseType, Task } from "../types";
import Button from "./Button";
import Divider from "./Divider";

type TaskFormType = {
  phaseId: string;
  taskName: string;
};

type AddTaskFormProps = {
  phases: PhaseType[];
  onTaskAdded: (phaseId: string, task: Task) => void;
};

const AddTaskForm: FC<AddTaskFormProps> = ({ phases, onTaskAdded }) => {
  const {
    register: registerTask,
    reset: resetTask,
    handleSubmit: handleTaskFormSubmit,
  } = useForm<TaskFormType>();

  const onTaskFormSubmit: SubmitHandler<TaskFormType> = (data) => {
    const phaseId = data.phaseId;
    const phase = phases.find((p) => p.id === phaseId);

    if (!phase) {
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      name: data.taskName,
      isCompleted: false,
    };

    onTaskAdded(phaseId, newTask);

    resetTask();
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={handleTaskFormSubmit(onTaskFormSubmit)}
    >
      <div className="flex flex-col items-start mb-4 gap-2">
        <label
          htmlFor="phase"
          className="text-sm font-semibold text-gray-400 cursor-pointer"
        >
          Phase
        </label>
        <select
          id="phase"
          className="w-full px-4 py-2 rounded-md border border-gray-100/10 bg-brand-background-400 text-gray-50"
          {...registerTask("phaseId", {
            required: true,
          })}
        >
          <option value="">Select a phase</option>
          {phases.map((phase) => (
            <option key={phase.id} value={phase.id}>
              {phase.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col items-start mb-4 gap-2">
        <label
          htmlFor="task-name"
          className="text-sm font-semibold text-gray-400 cursor-pointer"
        >
          Task name
        </label>
        <input
          id="task-name"
          className="w-full px-4 py-2 rounded-md border border-gray-100/10 bg-brand-background-400 text-gray-50"
          type="text"
          placeholder="e.g. Create a pitch deck"
          {...registerTask("taskName", {
            required: true,
            validate: (value) =>
              value.trim().length > 0 || "Task name cannot be empty",
          })}
        />
      </div>
      <Button intent="secondary" size="small" type="submit">
        Add task
      </Button>
      <Divider />
    </form>
  );
};

export default AddTaskForm;
