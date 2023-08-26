
import React, {useState, useEffect} from 'react';
import {  Typography, Paper } from '@mui/material';
import axios from 'axios';
import './App.css';
import Coin from './Coin';
//https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false
function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [response, setResponse] = useState('');
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )
    .then(res => {
      setCoins(res.data);
      console.log(res.data);
    }).catch(error => alert('api error'));
  });
  const handleChange = e => {
    setSearch(e.target.value)
  }
  const filteredCoins = coins
  .filter(coin => coin.name.toLowerCase().includes(search.toLowerCase())
  )
  
  
  
  const callGpt3API = async () => {
    const prompt = `can you tell me about how crytocurrencies are performing given this data: ${coins}`;
    const requestBody = {
      prompt,
      max_tokens: 5,
    };
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.APIkey}`,
          },
        }
      );

      setResponse(response.data.choices[0].text);
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };
  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <button onClick={callGpt3API}>How is the market doing?</button>
        <h1 className='coin-text'>
          
          <div>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
      <form>
            <input type="text" placeholder="Search" className="coin-input" onChange={handleChange}/>
          </form>
        </h1>
      </div>
      <Paper elevation={6} sx={{ p: 2, mb: 2 }} >
      <div className='coin-row'>
        <div className='coin'>
          <Typography variant="h5" component="h2">
            Coin Name
          </Typography>
        </div>
        <div className='coin-data'>
          <Typography variant="h6" className='coinprice'>
            Price
          </Typography>
          <Typography variant="body1" className='coin-volume'>
            Volume
          </Typography>
          <Typography variant="body1">
            Change
          </Typography>
          <Typography variant="body2" className='coin-marketcap'>
            Market Cap
          </Typography>
        </div>
      </div>
    </Paper>
      {filteredCoins.map(coin =>{
        return (
          <Coin key={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} marketcap={coin.market_cap} price={coin.current_price} priceChange={coin.price_change_percentage_24h} volume={coin.total_volume}/>
        )
      })}
    </div>
  );
}

export default App;
