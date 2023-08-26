import React from 'react';
import { Avatar, Typography, Paper } from '@mui/material';
import'./Coin.css'


const Coin = ({ name, image, symbol, price, volume, priceChange, marketcap }) => {
  return (
    <Paper elevation={6} sx={{ p: 2, mb: 2 }} >
      <div className='coin-row'>
        <div className='coin'>
          <Avatar alt="crypto" src={image} />
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
        </div>
        <div className='coin-data'>
          <Typography variant="h6" className='coinprice'>
            ${price}
          </Typography>
          <Typography variant="body1" className='coin-volume'>
            ${volume.toLocaleString()}
          </Typography>
          <Typography variant="body1" className={priceChange < 0 ? 'coin-percent red' : 'coin-percent green'}>
            {priceChange.toFixed(2)}%
          </Typography>
          <Typography variant="body2" className='coin-marketcap'>
             ${marketcap.toLocaleString()}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};


export default Coin;
