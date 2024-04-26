import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getAllSellers } from "../../State/Seller/Action";

const SellerTable = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((store) => store);

  console.log("seller...", seller);

  /* const handleProductDelete = (productId) => {
      dispatch(deleteProduct(productId));
    }; */

  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);
  console.log("seller action", seller);
  return (
    <div className="p-5 ">
      <Card className="mt-2">
        <CardHeader title="Seller"></CardHeader>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">firstname</TableCell>
                <TableCell align="left">lastname</TableCell>
                <TableCell align="left">email</TableCell>
                {/* <TableCell align="left">Address</TableCell> */}
                <TableCell align="left">Phone no</TableCell>
                <TableCell align="left">Shop Name</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {seller?.seller?.data?.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" scope="row">
                    {item?.firstname}
                  </TableCell>

                  <TableCell align="left">{item?.lastname}</TableCell>
                  <TableCell align="left">{item?.email}</TableCell>
                  {/* <TableCell align="left">{item?.address}</TableCell> */}
                  <TableCell align="left">{item?.phoneno}</TableCell>
                  <TableCell align="left">{item?.shopname}</TableCell>

                  <TableCell>
                    <Button
                      // onClick={() => handleProductDelete(item._id)}
                      variant="outlined"
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default SellerTable;
