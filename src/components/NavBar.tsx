import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import logo from "../assets/logo.png";
import Button from "../components/Button";

const Navbar = (): JSX.Element => {
  const { logout } = useAuth();
  return (
    <nav className="font-sans flex flex-col items-center text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow w-full">
      <div className="mb-2 sm:mb-0">
        <Link
          to="/"
          className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
        >
          <img className="w-16 m-auto" src={logo} alt="Logo" />
        </Link>
      </div>
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </nav>
  );
};

export default Navbar;
