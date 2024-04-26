import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
import { loginSeller } from "../../State/Seller/Action";

const Sellerlogin = ({ handleClose, setModalType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seller } = useSelector((store) => store);

  /* useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch]); */

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    dispatch(loginSeller(userData))
      .then(() => {
        console.log("Hey please check this");
        navigate("/seller"); // Redirect after successful
        window.location.reload();
      })
      .catch((error) => {
        console.error("Login failed:", error);
        // Handle login failure (e.g., display error message)
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div className="p-4 flex flex-row items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">Seller Login</h1>
            <button onClick={handleClose}>x</button>
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
          <p>if you have no account?</p>
          <Button
            onClick={() => setModalType("SellerRegister")}
            className="ml-5"
            size="small"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sellerlogin;
