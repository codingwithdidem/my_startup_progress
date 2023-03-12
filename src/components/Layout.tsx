import React, { FC } from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: FC<LayoutProps> = (props) => {
  return (
    <div className="relative h-screen max-w-7xl mx-auto">
      <div className="rounded-full absolute -top-10 -left-28 w-[350px] h-[400px] bg-radial-gradient filter blur-3xl opacity-10 z-0 pointer-events-none" />
      {props.children}
    </div>
  );
};

export default Layout;
