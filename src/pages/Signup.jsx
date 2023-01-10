import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import { registerUser } from "../redux/reducers/userreducer";
import "../styles/pages/authentication.scss";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = (e) => {
    e.preventDefault();
    dispatch(registerUser({ fName, lName, email, password }));
    navigate("/");
  };

  return (
    <div className="authentication">
      <Button
        variant="text"
        className="go_back"
        onClick={() => navigate("/login")}
      >
        <ArrowBackRounded />
        <span>Go to Login</span>
      </Button>

      <form onSubmit={createUser}>
        <div className="value_input">
          <span>First Name</span>

          <TextField
            type="text"
            required
            variant="outlined"
            value={fName}
            className="text_field"
            onChange={(e) => setFName(e.target.value)}
          />
        </div>

        <div className="value_input">
          <span>Last Name</span>

          <TextField
            type="text"
            required
            variant="outlined"
            value={lName}
            className="text_field"
            onChange={(e) => setLName(e.target.value)}
          />
        </div>

        <div className="value_input">
          <span>Email</span>

          <TextField
            type="email"
            required
            variant="outlined"
            value={email}
            className="text_field"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="value_input">
          <span>Password</span>

          <TextField
            type="password"
            required
            variant="outlined"
            value={password}
            className="text_field"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" variant="contained" className="submit_btn">
          Signup
        </Button>
      </form>
    </div>
  );
}

export default Signup;
