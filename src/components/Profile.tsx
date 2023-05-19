import {
  logoutFunc,
  selectIsAuthenticated,
  logout,
} from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const logoutHandler = async () => {
    dispatch(logout());
    logoutFunc();
    navigate("/");
    console.log("logout clicked");
  };
  return (
    <div>
      <h1>Profile</h1>
      {isAuthenticated && <button onClick={logoutHandler}>Logout</button>}
    </div>
  );
};

export default Profile;
