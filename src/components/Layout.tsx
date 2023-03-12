import React, { FC } from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: FC<LayoutProps> = (props) => {
  return (
    <div className="relative h-screen">
      <div className="rounded-full absolute top-0 left-0 w-[350px] h-[400px] bg-radial-gradient filter blur-3xl opacity-10 z-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto">{props.children}</div>
    </div>
  );
};

export default Layout;
