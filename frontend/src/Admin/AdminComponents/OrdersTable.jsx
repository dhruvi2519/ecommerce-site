import React, { useEffect } from "react";
import { getAllOrders } from "../../State/Order/Action";
import { useDispatch, useSelector } from "react-redux";
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

const OrdersTable = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const renderOrderData = (orderData) => {
    console.log("orderData", orderData);
    return orderData.map((orderItem) => (
      <TableRow key={orderItem._id}>
        <TableCell align="left">
          <img
            src={orderItem?.imageUrl}
            alt="Product Image"
            style={{
              height: "80px",
              width: "80px",
              borderRadius: "4px",
            }}
          />
        </TableCell>
        <TableCell align="left">{orderItem?.brand}</TableCell>
        <TableCell align="left">{orderItem?.category}</TableCell>
        <TableCell align="left">{orderItem?.price?.$numberDecimal}</TableCell>
        <TableCell align="left">
          {orderItem?.discountedPrice?.$numberDecimal}
        </TableCell>
        <TableCell align="left">{orderItem?.quantity}</TableCell>
        <TableCell align="left">Pending</TableCell> {/* Static status row */}
      </TableRow>
    ));
  };

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="Orders"></CardHeader>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Store Name</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Discounted Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Status</TableCell>{" "}
                {/* Status column header */}
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log("order", order)}
              {order?.map((orderItem) => (
                <React.Fragment key={orderItem._id}>
                  {renderOrderData(orderItem.orderData)}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrdersTable;
