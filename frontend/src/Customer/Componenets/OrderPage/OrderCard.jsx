import React from 'react';
import { Grid } from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';
const OrderCard = () => {
  const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/account/order/${5}`)} className='mt-7 p-5 shadow-md shadow-gray-500 hover:shadow-2xl border '>
   <Grid container spacing={2} sx={{justifyContent:"space-between"}}>
    <Grid item xs={6}>
    <div className='flex cursor-pointer'>
       
     <img className='w-[5rem] h-[5rem] object-cover object-top '  src="https://www.ethnicplus.in/media/catalog/product/cache/77b9a44d9276879ccdde931a01149182/5/3/5377_1_.jpg" alt=""></img>
      <div className='ml-5 space-y-2 '>
      <p className=' '>  Slim Mid Rise Black Sari</p>
        <p className='opacity-50 text-xs font-semibold'>Size : M </p>
         <p className='opacity-50 text-xs font-semibold'> color:Orange</p>
      </div>
    </div>

    </Grid>
    <Grid item xs={2}>
    <p>
      ₹1099
    </p>

    </Grid>
    <Grid item xs={4}>
  { true &&  <div> <p>
  <AdjustIcon sx={{width:"15px",height:"15px"}} className='text-green-700 mr-2 text-sm'></AdjustIcon>
    <span>
      Delivered on March 03
    </span>

   
    </p>
    <p className='text-xs'>
      Your Item Has Been Delivered
    </p>
    </div>}
   { false && <p>
      <span>
       Expected Delivery on March 03
      </span>
    </p>}

    </Grid>
   </Grid>
    </div>
  );
};

export default OrderCard;
