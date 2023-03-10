import React, { FC } from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: FC<LayoutProps> = (props) => {
  return <div className="bg-brand-background h-screen w-full">Layout</div>;
};

export default Layout;
