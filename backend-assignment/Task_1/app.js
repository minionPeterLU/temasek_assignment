const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();
const port = 8000;

app.use(cors({
    origin: "*",
}),bodyParser.json(),express());

function mapFiat(input,output) {
    const responseData = input.data?.data;
    output.BTC = responseData?.rates?.BTC;
    output.DOGE = responseData?.rates?.DOGE;
    output.ETH = responseData?.rates?.ETH;
    return output;
}

function mapCrypto(input,output) {
    const responseData = input.data?.data;
    output.USD = responseData?.rates?.USD;
    output.SGD = responseData?.rates?.SGD;
    output.EUR = responseData?.rates?.EUR;
    return output;
}

// Define a route for the POST API
app.post('/rates', async (req, res) => {
    try {
        const inputData = req.body;
        const inputValue = inputData?.base;
        if(inputValue === "fiat"){
            const USD_url = 'https://api.coinbase.com/v2/exchange-rates?currency=USD';
            const SGD_url = 'https://api.coinbase.com/v2/exchange-rates?currency=SGD';
            const EUR_url = 'https://api.coinbase.com/v2/exchange-rates?currency=EUR';
            const USD_obj = {};
            const SGD_obj = {};
            const EUR_obj = {};
            const fiat_obj = {};

            const responseUSD = await axios.get(USD_url);
            fiat_obj.USD = mapFiat(responseUSD, USD_obj);
            const responseSGD = await axios.get(SGD_url);
            fiat_obj.SGD = mapFiat(responseSGD, SGD_obj);
            const responseEUR = await axios.get(EUR_url);
            fiat_obj.EUR = mapFiat(responseEUR, EUR_obj);

            res.status(201).json(fiat_obj);
            
        } else if (inputData?.base === "crypto") {
            const BTC_url = 'https://api.coinbase.com/v2/exchange-rates?currency=BTC';
            const DOGE_url = 'https://api.coinbase.com/v2/exchange-rates?currency=DOGE';
            const ETH_url = 'https://api.coinbase.com/v2/exchange-rates?currency=ETH';
            const BTC_obj = {};
            const DOGE_obj = {};
            const ETH_obj = {};
            const crypto_obj = {};

            const responseBTC = await axios.get(BTC_url);
            crypto_obj.BTC = mapCrypto(responseBTC, BTC_obj);
            const responseDOGE = await axios.get(DOGE_url);
            crypto_obj.DOGE = mapCrypto(responseDOGE, DOGE_obj);
            const responseETH = await axios.get(ETH_url);
            crypto_obj.ETH = mapCrypto(responseETH, ETH_obj);

            res.status(201).json(crypto_obj);
        } else {
            res.status(201).json("Invalid base value! Please use 'fiat' or 'crypto' only!");
        }
    } catch(error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});