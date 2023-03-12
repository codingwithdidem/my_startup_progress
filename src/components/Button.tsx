import React, { FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva("button", {
  variants: {
    intent: {
      primary: [
        "bg-brand-primary",
        "hover:shadow-brand-primary/30, hover:shadow-glow-primary",
      ],
      secondary: [
        "bg-brand-secondary",
        " hover:shadow-brand-secondary/30, hover:shadow-glow-secondary",
      ],
    },
    size: {
      small: ["text-sm"],
      medium: ["text-base"],
    },
    block: {
      true: ["w-full"],
    },
  },
  compoundVariants: [{ intent: "primary", size: "medium", class: "uppercase" }],
  defaultVariants: {
    intent: "primary",
    size: "medium",
    block: false,
  },
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  children,
  intent,
  size,
  block,
  ...props
}) => {
  return (
    <button
      className={button({
        intent,
        size,
        block,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
