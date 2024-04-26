import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, register } from "../../State/Auth/Action";
import { registerSeller } from "../../State/Seller/Action";

const SellerRegistration = ({ modalType, setModalType }) => {
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
      shopname: data.get("shopname"),
      phoneno: data.get("phoneno"),

    };

    dispatch(registerSeller(userData));
    console.log("userData", userData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {" "}
            Seller Registration
          </h1>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstname"
              name="firstname"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="shopname"
              name="shopname"
              label="Shop Name"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phoneno"
              name="phoneno"
              label="Phone No"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              className="w-full bg-[#9155FD] text-white"
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="py-3 flex items-center">
        <p>if you have already account?</p>
        <Button
          onClick={() => setModalType("SellerLogin")}
          className="ml-5"
          size="small"
        >
          Login
        </Button>
      </div>
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
    </div>
  );
};

export default SellerRegistration;
