import styled from "@emotion/styled";
import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const SellerAchivement = () => {
  const TrinagleImg = styled("img")({
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
  return (
    <Card
      className=""
      sx={{ position: "relative", bgcolor: "#242B2E", color: "white" }}
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
        <TrinagleImg src=""></TrinagleImg>
        <TrophyImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHkT67l99qcpmWmnOqoK9G6buJWafzA5l6sT4Q6dvqN09rQMpz5YCFoyIP5rXR6pk_7_w&usqp=CAU"></TrophyImg>
      </CardContent>
    </Card>
  );
};

export default SellerAchivement;
