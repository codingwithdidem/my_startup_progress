import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Phase, Task } from "@/types";

interface TrackerState {
  phases: Phase[];
}

const initialState: TrackerState = {
  phases: [],
};

export const trackerSlice = createSlice({
  name: "tracker",
  initialState,
  reducers: {
    setPhases: (state, action: PayloadAction<Phase[]>) => {
      state.phases = action.payload;
    },
    addPhase: (state, action: PayloadAction<Phase>) => {
      state.phases.push(action.payload);
    },
    removePhase: (state, action: PayloadAction<string>) => {
      state.phases = state.phases.filter((p) => p.id !== action.payload);
    },
    addTask: (
      state,
      action: PayloadAction<{ phaseId: string; task: Task }>
    ) => {
      const { phaseId, task } = action.payload;
      const phase = state.phases.find((p) => p.id === phaseId);

      if (phase) {
        phase.tasks.push(task);
      }
    },
    removeTask: (
      state,
      action: PayloadAction<{ phaseId: string; taskId: string }>
    ) => {
      const { phaseId, taskId } = action.payload;
      const phase = state.phases.find((p) => p.id === phaseId);

      if (phase) {
        phase.tasks = phase.tasks.filter((t) => t.id !== taskId);
      }
    },
    toggleTaskCompleted: (
      state,
      action: PayloadAction<{ phaseId: string; taskId: string }>
    ) => {
      const { phaseId, taskId } = action.payload;

      const phase = state.phases.find((p) => p.id === phaseId);

      if (phase) {
        phase.tasks = phase.tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              isCompleted: !task.isCompleted,
            };
          }

          return task;
        });
      }
    },
    resetTracker: (state) => {
      state.phases = [];
    },
  },
});

export const {
  setPhases,
  addPhase,
  removePhase,
  addTask,
  removeTask,
  resetTracker,
  toggleTaskCompleted,
} = trackerSlice.actions;

export const getIsPhaseUnlocked = (state: RootState, phase: Phase) => {
  const phaseIndex = state.tracker.phases.findIndex((p) => p.id === phase.id);
  const phasesBefore = state.tracker.phases.slice(0, phaseIndex);

  if (phasesBefore.length === 0) {
    return true;
  }

  return phasesBefore.every((p) => p.tasks.every((t) => t.isCompleted));
};

export const selectPhases = (state: RootState) => state.tracker.phases;

export default trackerSlice.reducer;
