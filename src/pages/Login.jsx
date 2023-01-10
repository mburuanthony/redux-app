import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import { userLogin } from "../redux/reducers/userreducer";
import "../styles/pages/authentication.scss";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();

    dispatch(userLogin({ email, password }));
    navigate("/");
  };

  return (
    <div className="authentication">
      <Button variant="text" className="go_back" onClick={() => navigate(-1)}>
        <ArrowBackRounded />
        <span>Go Back</span>
      </Button>

      <form onSubmit={loginUser}>
        <div className="value_input">
          <span>Email</span>

          <TextField
            type="email"
            required
            variant="outlined"
            className="text_field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="value_input">
          <span>Password</span>

          <TextField
            type="password"
            required
            variant="outlined"
            className="text_field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" variant="contained" className="submit_btn">
          Log In
        </Button>
      </form>
    </div>
  );
}

export default Login;
