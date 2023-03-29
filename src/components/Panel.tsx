import React, { FC } from "react";
import AddPhaseForm from "./AddPhaseForm";
import AddTaskForm from "./AddTaskForm";
import Button from "./Button";
import { resetTracker } from "@/features/tracker/trackerSlice";
import { useAppDispatch } from "@/app/hooks";

type PanelProps = {};

const Panel: FC<PanelProps> = () => {
  const dispatch = useAppDispatch();

  const onResetTracker = () => {
    dispatch(resetTracker());
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold -tracking-tight">
        Startup progress tracker
      </h1>
      <p className="mt-2 text-gray-400">
        Keep track of your startup progress with this simple tool.
      </p>

      <div className="mt-10">
        <AddPhaseForm />
        <AddTaskForm />
        <Button intent="primary" size="small" onClick={onResetTracker}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Panel;
