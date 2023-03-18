import React, { FC } from "react";

type NoDataViewProps = {
  children?: React.ReactNode;
};

const NoDataView: FC<NoDataViewProps> = (props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-semibold text-gray-100/50">
        There is no progress to show yet.
      </h2>
      <p className="text-gray-100/50 mt-2">Add a new phase to get started.</p>
    </div>
  );
};

export default NoDataView;
