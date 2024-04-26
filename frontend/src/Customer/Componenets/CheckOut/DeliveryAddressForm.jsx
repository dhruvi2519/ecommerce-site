import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { addAddress } from "../../../State/Cart/Action";
import AddressCard from "../AddressCard/AddressCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL, api } from "../../../config/apiConfig";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [addressData, setAddressData] = useState({
    firstname: "",
    lastname: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    mobile: "",
    user: localStorage.getItem("userId"),
  });
  // console.log("User Id is ", addressData.userId);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(addressData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      dispatch(addAddress(addressData)).then(() => {
        toast.success("Address added successfully!");
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add address");
    }

    console.log("addressData", addressData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddressData((prevAddressData) => ({
      ...prevAddressData,
      [name]: value,
    }));
  };

  return (
    <div>
      <ToastContainer />
      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shadow-md p-5">
            <AddressCard />
          </Box>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstname"
                    name="firstname"
                    label="First Name"
                    fullWidth
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    id="streetAddress"
                    name="streetAddress"
                    label="Address"
                    fullWidth
                    autoComplete="street-address"
                    multiline
                    rows={4}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="address-level2"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    autoComplete="address-level1"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zipCode"
                    name="zipCode"
                    label="Zip/Postal code"
                    fullWidth
                    autoComplete="postal-code"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="mobile"
                    name="mobile"
                    label="Mobile"
                    fullWidth
                    autoComplete="tel"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                sx={{ py: 1.5, mt: 2, bgcolor: "pink" }}
                size="large"
                variant="contained"
                type="submit"
                className="text-black-600"
              >
                Deliver Here
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
