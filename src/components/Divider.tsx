import React, { FC } from "react";

type DividerProps = {};

const Divider: FC<DividerProps> = (props) => {
  return (
    <hr className="h-px my-10 border-0 bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
  );
};

export default Divider;
