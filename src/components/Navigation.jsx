import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { userLogOut } from "../redux/reducers/userreducer";
import logo from "../assets/shopping_cart.png";
import "../styles/components/navigation.scss";

export const Navigation = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state?.user?.isAuthenticated);

  return (
    <div id="navigation">
      <div id="logo">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <h2>Shop | Shop</h2>
      </div>

      {authenticated ? (
        <div className="authenticated">
          <Link to="/history">Order History</Link>
          <Button
            className="btn_log_out"
            onClick={() => dispatch(userLogOut())}
          >
            Log Out
          </Button>
        </div>
      ) : (
        <div className="unauthenticated">
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </div>
      )}
    </div>
  );
};
