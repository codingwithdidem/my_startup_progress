import React, { useEffect } from "react";
import { NextPage } from "next";
import { useState } from "react";
import Confetti from "@/components/Confetti";
import CongratsModal from "@/components/CongratsModal";
import Tracker from "@/components/Tracker";
import { useRandomFact } from "@/hooks/useRandomFact";
import { selectPhases } from "@/features/tracker/trackerSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Panel from "@/components/Panel";

type HomePageProps = {};

const HomePage: NextPage<HomePageProps> = () => {
  const dispatch = useAppDispatch();
  const phases = useAppSelector(selectPhases);
  const { fact, getFact } = useRandomFact();

  const [showConfetti, setShowConfetti] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);

  const isAllPhasesCompleted =
    phases.length > 0 &&
    phases.every((p) => p.tasks.length > 0) &&
    phases.every((p) => p.tasks.every((t) => t.isCompleted));

  useEffect(() => {
    if (isAllPhasesCompleted) {
      getFact();
      setShowConfetti(true);
    }
  }, [phases, isAllPhasesCompleted, getFact]);

  const onConfettiComplete = () => {
    setShowConfetti(false);
    setShowCongratsModal(true);
  };

  return (
    <main className="w-full grid grid-cols-1 md:grid-cols-2 gap-14 px-10 py-10">
      <Panel />
      <Tracker />

      {showConfetti && <Confetti onConfettiComplete={onConfettiComplete} />}
      {showCongratsModal && (
        <CongratsModal
          open={showCongratsModal}
          randomFact={fact}
          onClose={() => setShowCongratsModal(false)}
        />
      )}
    </main>
  );
};

export default HomePage;
