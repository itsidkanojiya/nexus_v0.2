import { RiLogoutCircleRLine } from "react-icons/ri";
import "./logoutButton.css";
import useAuth from "../../hooks/useAuth";

const LogoutButton = () => {
  const { logout } = useAuth();
  return (
    <button
      onClick={() => logout()}
      className="text-sm bg-red-600 p-1.5 font-semibold text-white rounded-full hover:bg-rose-800 active:scale-90 transition-all duration-200 ease-linear"
    >
      <RiLogoutCircleRLine className=" text-xl" />
    </button>
  );
};

export default LogoutButton;
