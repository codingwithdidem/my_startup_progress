import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import type { Phase } from "../types";
import Button from "./Button";
import Divider from "./Divider";

type PhaseFormType = {
  phaseName: string;
};

type AddPhaseFormProps = {
  onPhaseAdded: (phase: Phase) => void;
};

const AddPhaseForm: FC<AddPhaseFormProps> = ({ onPhaseAdded }) => {
  const {
    register,
    reset,
    handleSubmit: handlePhaseFormSubmit,
    formState: { errors },
  } = useForm<PhaseFormType>();

  const onPhaseFormSubmit: SubmitHandler<PhaseFormType> = (data) => {
    const newPhase: Phase = {
      id: uuidv4(),
      name: data.phaseName,
      tasks: [],
    };

    onPhaseAdded(newPhase);

    reset();
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={handlePhaseFormSubmit(onPhaseFormSubmit)}
    >
      <div className="flex flex-col items-start mb-4 gap-2">
        <label
          htmlFor="phase-name"
          className="text-sm font-semibold text-gray-400 cursor-pointer"
        >
          Phase name
        </label>
        <input
          id="phase-name"
          className="w-full px-4 py-2 rounded-md border border-gray-100/10 bg-brand-background-400 text-gray-50"
          type="text"
          placeholder="e.g. Discovery"
          {...register("phaseName", {
            required: true,
            validate: (value) =>
              value.trim().length > 0 || "Phase name cannot be empty",
          })}
        />
        {errors.phaseName && (
          <span className="text-sm text-red-500">
            {errors.phaseName.message}
          </span>
        )}
      </div>
      <Button intent="secondary" size="small" type="submit">
        Add phase
      </Button>
      <Divider />
    </form>
  );
};

export default AddPhaseForm;
