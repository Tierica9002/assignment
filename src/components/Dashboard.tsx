import { Link } from "react-router-dom";
import Navbar from "./NavBar";

interface DashboardProps {
  children: React.ReactNode;
}
const Dashboard = ({ children }: DashboardProps): JSX.Element => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Dashboard;
