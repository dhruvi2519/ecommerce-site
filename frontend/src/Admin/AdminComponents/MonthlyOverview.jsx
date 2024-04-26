import React from "react";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import CurrencyRupeeSharpIcon from "@mui/icons-material/CurrencyRupeeSharp";
import CategorySharpIcon from "@mui/icons-material/CategorySharp";
import TimelineSharpIcon from "@mui/icons-material/TimelineSharp";
import AssignmentIndSharpIcon from "@mui/icons-material/AssignmentIndSharp";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
const salesData = [
  {
    stats: "245k",
    title: "sales",
    color: "#EDC126",
    icon: <TimelineSharpIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "12.5k",
    title: "Customer",
    color: "#22CB5C",
    icon: <AssignmentIndSharpIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "24.5k",
    title: "Products",
    color: "#DE4839",
    icon: <CategorySharpIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "2.5k",
    title: "Revenue",
    color: "#12B0E8",
    icon: <CurrencyRupeeSharpIcon sx={{ fontSize: "1.75rem" }} />,
  },
];
const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: "white",
            backgroundColor: `${item.color}`,
          }}
        >
          {item.icon}
        </Avatar>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const MonthlyOverview = () => {
  return (
    <Card sx={{ position: "relative", bgcolor: "#242B2E", color: "white" }}>
      <CardHeader
        size="small"
        title="Monthly Overview"
        action={
          <IconButton>
            <MoreVertSharpIcon />
          </IconButton>
        }
        subheader={
          <Typography variant="body2">
            <Box
              component="span"
              sx={{ fontWeight: 600, color: "white", mx: 2 }}
            >
              Total 48.5% growth
            </Box>
            This Month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 4.5,
            lineHeight: "2rem !important",
          },
        }}
      />

      <CardContent sx={{ pt: (theme) => `${theme.spacing(1)} !important` }}>
        <Grid container spacing={[5.0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MonthlyOverview;
