import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { getUser, login } from "../../State/Auth/Action";

const LoginForm = ({ handleClose, setModalType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const res = dispatch(login(userData));

    console.log("userData", userData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="flex justify-center">
          <div class="p-4 flex flex-row items-center justify-between">
            <h1 class="text-3xl font-bold text-gray-800">Login</h1>
            <button
              style={{
                position: "absolute",
                top: "10px", // Adjust this value to set the distance from the top
                right: "10px", // Adjust this value to set the distance from the left
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
              }}
              onClick={handleClose}
            >
              X
            </button>
          </div>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="new-password"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="submit"
              variant="contained"
              size="medium"
              sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center flax-col items-center">
        <div className="py-3 flex items-center">
          <p>
            Register as User
            <Button
              onClick={() => setModalType("register")}
              className="ml-5"
              size="small"
            >
              Register
            </Button>
          </p>
        </div>
        <br />
        <div className="py-3 flex items-center">
          <p>
            login as Seller
            <Button
              onClick={() => setModalType("SellerLogin")}
              className="ml-5"
              size="small"
            >
              Login
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
