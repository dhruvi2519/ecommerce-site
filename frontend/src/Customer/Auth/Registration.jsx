import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../State/Auth/Action";
const Registration = ({ modalType, setModalType }) => {
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
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(register(userData));
    console.log("userData", userData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="flex justify-center">
          <div class="p-4">
            <h1 class="text-3xl font-bold text-gray-800">Registration</h1>
          </div>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={10} sm={6}>
            <TextField
              required
              id="firstname"
              name="firstname"
              label="First Name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastname"
              name="lastname"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
            />
          </Grid>
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
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center flax-col items-center">
        <div className="py-3 flex items-center">
          <p>
            Login as User
            <Button
              onClick={() => setModalType("login")}
              className="ml-5"
              size="small"
            >
              Login
            </Button>
          </p>
        </div>
        <br />
        <br />
        <div className="py-3 flex items-center">
          <p>
            Login as Seller
            <Button
              onClick={() => setModalType("SellerRegister")}
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

export default Registration;
