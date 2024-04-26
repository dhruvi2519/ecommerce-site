import React from "react";
import { Button, Card, CardContent, Typography, styled } from "@mui/material";
import MonthlySalesTableAndChart from "./MonthlySalesTableAndChart";
import MonthlyProductionChart from "./MonthlyProductionChart";
import CustomerTable from "./CustomerTable";
import SellerTable from "./SellerTable";
import SellerPieChart from "./MonthlyProductionChart";

const TriangleImg = styled("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});

const TrophyImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  margin: 20,
});

const ChartContainer = styled("div")({
  width: "300%", // Adjusted width to fit both charts
  border: "1px solid #ccc",
  padding: 20,
});

const Achievement = () => {
  return (
    <>
      <Card
        sx={{ position: "relative", bgcolor: "#242B2E", color: "white", mb: 2 }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ letterSpacing: "2px" }}>
            Ethnic Plus
          </Typography>
          <br />
          <Typography variant="body2">Congratulations</Typography>
          <Typography variant="h5" sx={{ my: 1.3 }}>
            420.8K
          </Typography>
          <Button size="small" variant="contained">
            View Sales
          </Button>
          <TriangleImg src="" />
          <TrophyImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHkT67l99qcpmWmnOqoK9G6buJWafzA5l6sT4Q6dvqN09rQMpz5YCFoyIP5rXR6pk_7_w&usqp=CAU" />
        </CardContent>
      </Card>
      <Container>
        <ChartContainer>
          <CustomerTable />
        </ChartContainer>
        <ChartContainer>
          <SellerTable />
        </ChartContainer>
        <ChartContainer>
          <SellerPieChart />
        </ChartContainer>
      </Container>
    </>
  );
};

export default Achievement;
