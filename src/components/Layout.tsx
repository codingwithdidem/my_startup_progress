import React, { FC } from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: FC<LayoutProps> = (props) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      {props.children}
    </div>
  );
};

export default Layout;
