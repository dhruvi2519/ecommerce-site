import React, { useEffect } from "react";
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
import { getOrdersByUserID } from "../../../State/Order/Action";

const Order = () => {
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getOrdersByUserID(userId));
  }, [dispatch]);

  {
    console.log("orderData++++", order);
  }
  return (
    <div className="p-5">
      <Card className="mt-5">
        <CardHeader title="My Orders" />
        <TableContainer component={Paper}>
          <Table
            aria-label="simple table"
            style={{ borderCollapse: "collapse" }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Order ID</TableCell>
                <TableCell align="left">Order Date</TableCell>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    Loading...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    Error: {error.message}
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {order &&
                    order.map((item) => (
                      <React.Fragment key={item._id}>
                        {item.orderData.map((orderItem, index) => (
                          <TableRow key={orderItem._id}>
                            {index === 0 && (
                              <>
                                <TableCell
                                  align="left"
                                  rowSpan={item.orderData.length}
                                >
                                  {item._id}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  rowSpan={item.orderData.length}
                                >
                                  {item.orderDate}
                                </TableCell>
                              </>
                            )}
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
                            <TableCell align="left">
                              {orderItem?.brand}
                            </TableCell>
                            <TableCell align="left">
                              {orderItem?.price?.$numberDecimal}
                            </TableCell>
                            <TableCell align="left">
                              {orderItem?.quantity}
                            </TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default Order;
