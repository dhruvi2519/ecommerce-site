import React from 'react';
import AddressCard from '../AddressCard/AddressCard';
import Ordertracking from './Ordertracking';
import { Grid ,Box } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const OrderDetails = () => {

    return (

        <div className='px-5 lg:px-20'>
            <div>
                <h1 className='font-bold text-xl py'>Delivery Address</h1>
                <AddressCard />
            </div>

         
            <div className='py-20'>
                <Ordertracking activeStep={3} />
            </div>


            <Grid className="space-y-5" container >

            {[1,1,1,1,1].map((item)=>  <Grid item container className='shadow-xl rounded-md p-5 border' sx={{ alignItems: "center", justifyContent: 'space-between' }}>
                    <Grid item xs={6}>
                        <div className='flex items-center space-x-4'>
                            <img className='w-[5rem] h-[5rem] object-cover object-top shadow-black ml-5' src="https://www.ethnicplus.in/media/catalog/product/cache/77b9a44d9276879ccdde931a01149182/r/n/rnc-myt-113_2_.jpg" alt="" />
                           
                           <div className='space-y-2 ml-5'>
                                <p className='font-semibold'>Slim Mid Rise Black Sari </p>
                                <p className='space-x-5 oopacity-50 text-xs font-semibold'>
                                <span>Color : Pink </span>
                                <span> Size : M</span></p>
                                <p>Seller : Lianaria</p>
                                <p>₹1099</p>
                            </div>
                           
                        </div>

                    </Grid>

                    <Grid item>
                            <Box sx={{color:deepPurple[500]}}>
                            <StarBorderIcon sx={{fontSize:"3rem"}}  className='px-2 text-2xl'>

                            </StarBorderIcon>
                            <span>
                                Rate & Review Product
                            </span>

                            </Box>
                    </Grid>
                </Grid>
)}
              
            </Grid>
        </div>
    );
};

export default OrderDetails;
