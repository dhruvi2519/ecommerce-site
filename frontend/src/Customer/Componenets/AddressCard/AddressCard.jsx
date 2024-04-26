import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { fetchAddresses, selectAddress } from "../../../State/Cart/Action";
import { useNavigate } from "react-router-dom";

const AddressCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addresses } = useSelector((store) => store.cart);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelectAddress = (addressId) => {
    setSelectedAddress(addressId);
    dispatch(selectAddress(addressId));
    console.log("selectedAddress", addressId);
    navigate(`/checkout?step=3`);
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("userId address", userId);
    dispatch(fetchAddresses(userId));
  }, [dispatch]);
  return (
    <div
      className="space-y-5"
      style={{ marginLeft: "24px", marginTop: "10px", padding: "5px" }}
    >
      {/* {console.log("addesses", addresses)} */}
      {Array.isArray(addresses) &&
        addresses.map((address) => (
          <Box
            key={address._id}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
              marginleft: "10px",
              backgroundColor:
                selectedAddress === address.id ? "pink" : "inherit",
            }}
          >
            <div key={address._id}>
              <label>
                <input
                  style={{ marginRight: "5px" }}
                  type="radio"
                  value={address}
                  checked={selectedAddress === address}
                  onClick={() => {
                    handleSelectAddress(address);
                  }}
                />
                {address.streetAddress}, {address.city}
              </label>
            </div>
          </Box>
        ))}
    </div>
  );
};

export default AddressCard;
