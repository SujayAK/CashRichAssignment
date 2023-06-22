const express = require('express');
const cors = require('cors');
const axios = require('axios');
const API_KEY="29366e8f-d165-48fb-94c2-e36c5b79d456";
const app = express();
const port = process.env.PORT ||3000;


app.use(cors());

app.get('/api/prices', (req, res) => {
  const symbols = req.query.symbols;
  //console.log(symbols);

  if (symbols==='') {
    res.status(400).json({ error: 'Symbols parameter is required' });
  
  }

  const URL = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols}`;

  axios.get(URL, {
      headers: {
        'X-CMC_PRO_API_KEY':API_KEY,
      },
    }).then(response => {
      res.json(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data from the server' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
