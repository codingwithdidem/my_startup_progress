import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Phase, Task } from "@/types";
import { readFromLocalStorage } from "@/utils/storage";

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
    fetchPhases: (state) => {
      state.phases = readFromLocalStorage();
    },
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
  fetchPhases,
  setPhases,
  addPhase,
  removePhase,
  addTask,
  removeTask,
  resetTracker,
  toggleTaskCompleted,
} = trackerSlice.actions;

export const selectPhases = (state: RootState) => state.tracker.phases;

export default trackerSlice.reducer;
