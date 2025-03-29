import { ReactNode } from "react";
import Navbar from "../../organism/navbar/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

export default MainLayout;
