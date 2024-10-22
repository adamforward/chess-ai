import { ReactNode } from "react";
import BottomNav from "./BottomNav";

type SimpleLayoutProps = {
  children?: ReactNode;
};

const SimpleLayout = ({ children }: SimpleLayoutProps) => {
  return (
    <div className="font-roboto overflow-hidden h-screen w-screen text-slate-200 text-lg flex flex-col items-center bg-zinc-900 justify-center">
      {children}
      <BottomNav />
    </div>
  );
};

export default SimpleLayout;
