import React from "react";
import { Avatar, Rating } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const ProductReviewCard = () => {
    return (
        <div>
            <Grid container spacing={2} gap={3}>
                <Grid item>
                    <Box>
                        <Avatar className="text-white" sx={{ width: 56, height: 54, bgcolor: "#9155fd" }}>D</Avatar>
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <div className="space-y-2">
                        <div>
                            <p className="font-semibold text-lg">Dhruvi</p>
                            <p className="opacity-70">June 25, 2024</p>
                        </div>
                        <Rating value={4.5} name='half-rating' readOnly precision={.5} />
                        <p >Good product, nice quality</p>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default ProductReviewCard;
