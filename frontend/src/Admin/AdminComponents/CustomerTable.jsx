import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, getUser } from "../../State/Auth/Action";
import {
  Avatar,
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

const CustomerTable = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  console.log("auth...", auth);

  /* const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  }; */

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="p-5 ">
      <Card className="mt-2">
        <CardHeader title="All Customers"></CardHeader>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">firstname</TableCell>
                <TableCell align="left">lastname</TableCell>
                <TableCell align="left">email</TableCell>
                {/* <TableCell align="left">Address</TableCell> */}
                {/* <TableCell align="left">Phone no</TableCell> */}
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auth?.users?.data?.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" scope="row">
                    {item?.firstname}
                  </TableCell>

                  <TableCell align="left">{item?.lastname}</TableCell>
                  <TableCell align="left">{item?.email}</TableCell>
                  <TableCell align="left">{item?.quantity}</TableCell>
                  {/* <TableCell align="left">{item?.lastname}</TableCell> */}

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
export default CustomerTable;
