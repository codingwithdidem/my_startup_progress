import { Phase } from "@/types";

export const readFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const phases = localStorage.getItem("phases");

      if (phases) {
        return JSON.parse(phases);
      }
    } catch (error) {
      return [];
    }
  }
};

export const writeToLocalStorage = (phases: Phase[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("phases", JSON.stringify(phases));
    } catch (error) {
      console.error(error);
    }
  }
};
