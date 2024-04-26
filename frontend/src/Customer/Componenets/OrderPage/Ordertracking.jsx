import { StepLabel, Stepper, Step } from '@mui/material';
import React from 'react';

const steps = [
  "Placed",
  "Order Confirmed",
  "Shipped",
  "Out For Delivery",
  "Delivered"
];

const Ordertracking = () => {
  const [activeStep] = React.useState(0);

  return (
    <div className='w-full'>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel sx={{ color: "#9155fd", fontSize: "44px" }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default Ordertracking;
