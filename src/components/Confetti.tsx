/* eslint-disable react/display-name */
import React, { FC, forwardRef } from "react";
import Lottie from "lottie-react";
import confettiAnimation from "../animations/confetti.json";

type ConfettiProps = {
  onConfettiComplete?: () => void;
};

const Confetti: FC<ConfettiProps> = ({ onConfettiComplete }) => {
  return (
    <div className="fixed w-full h-full inset-0 z-10">
      <Lottie
        animationData={confettiAnimation}
        autoPlay={false}
        loop={false}
        onComplete={onConfettiComplete}
      />
    </div>
  );
};

export default Confetti;
