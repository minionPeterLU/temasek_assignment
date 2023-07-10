const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 8000;
const oneHrInMilSec = 36000000;
const fait = "fait";
const crypto = "crypto";

app.use(cors({
    origin: "*",
}),bodyParser.json(),express());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ljn@920506',
    database: 'exchange_rate'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function mapFiat(input,output) {
    output.BTC = input?.BTC;
    output.DOGE = input?.DOGE;
    output.ETH = input?.ETH;
    return output;
}

function mapCrypto(input,output) {
    output.USD = input?.USD;
    output.SGD = input?.SGD;
    output.EUR = input?.EUR;
    return output;
}

function executeQuery(query) {
    return new Promise((resolve, reject) => {
      connection.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
}

async function loadDataFromDB(sqlQuery, currentTime, baseType){
    const result = await executeQuery(sqlQuery);
    const output = {};
    // check if get data from DB
    if(result && result.length > 0){
        console.log("load Data from DB result: ", result);
        const timeDiff = currentTime - result[0].timestamp;
        // check the time since last update
        if(timeDiff < oneHrInMilSec){
            console.log("Time Diff from lastUpdate to present: ", timeDiff);
            result.map((row) => {
                if(baseType === fait) {
                    output[row.currency] = mapFiat(row, {});
                } else if (baseType === crypto) {
                    output[row.currency] = mapCrypto(row, {});
                }
            });
        } 
    }
    return output;
}

function storeDataIntoDB(sql, currency,timestamp, val_1, val_2, val_3) {
    connection.query(sql,[currency,timestamp,val_1,val_2,val_3], function (error) {
        if(error){  
            console.log("Oops! An error occured", error);
            return;
        }
        console.log("1 record inserted");
    });
}

// Define a route for the POST API
app.post('/rates', async (req, res) => {
    try {
        const inputData = req.body;
        const inputValue = inputData?.base;
        const exchangeURL = 'https://api.coinbase.com/v2/exchange-rates?currency=';
        const currentTime = new Date().getTime();

        if(inputValue === "fiat"){
            const USD = 'USD';
            const SGD = 'SGD';
            const EUR = 'EUR';
            const sqlQuery = `SELECT fiat_currency as currency, fiat_timestamp as timestamp, btc_val as BTC, doge_val as DOGE, eth_val as ETH
                        FROM fiat_exchange
                        WHERE fiat_timestamp = (SELECT MAX(fiat_timestamp) AS "lastUpdate" FROM fiat_exchange)`;

            const fiat_obj = await loadDataFromDB(sqlQuery, currentTime, fait);
            console.log("Load DBdata and map to fiat_obj: ", fiat_obj);

            if(isEmpty(fiat_obj)){
                console.log("Fetch latest data from API");
                const responseUSD = await axios.get(exchangeURL+USD);
                fiat_obj.USD = mapFiat(responseUSD.data?.data?.rates, {});            
                const responseSGD = await axios.get(exchangeURL+SGD);
                fiat_obj.SGD = mapFiat(responseSGD.data?.data?.rates, {});
                const responseEUR = await axios.get(exchangeURL+EUR);
                fiat_obj.EUR = mapFiat(responseEUR.data?.data?.rates, {});
                const sqlStoreQuery = `INSERT INTO fiat_exchange(fiat_currency,fiat_timestamp,btc_val,doge_val,eth_val) VALUES (?,?,?,?,?)`;
                storeDataIntoDB(sqlStoreQuery, USD,currentTime, fiat_obj.USD.BTC,fiat_obj.USD.DOGE,fiat_obj.USD.ETH);
                storeDataIntoDB(sqlStoreQuery, SGD,currentTime, fiat_obj.SGD.BTC,fiat_obj.SGD.DOGE,fiat_obj.SGD.ETH);
                storeDataIntoDB(sqlStoreQuery, EUR,currentTime, fiat_obj.EUR.BTC,fiat_obj.EUR.DOGE,fiat_obj.EUR.ETH);
            } 

            res.status(201).json(fiat_obj);
            
        } else if (inputData?.base === "crypto") {
            const BTC = 'BTC';
            const DOGE = 'DOGE';
            const ETH = 'ETH';
            const sqlQuery = `SELECT crypto_currency as currency, crypto_timestamp as timestamp, usd_val as USD, sgd_val as SGD, eur_val as EUR
                                FROM crypto_exchange    
                                WHERE crypto_timestamp = (SELECT MAX(crypto_timestamp) AS "lastUpdate" FROM crypto_exchange)`;

            const crypto_obj = await loadDataFromDB(sqlQuery, currentTime, crypto);
            console.log("Load DBdata and map to crypto_obj: ", crypto_obj);

            if(isEmpty(crypto_obj)){
                console.log("Fetch latest data from API");
                const responseBTC = await axios.get(exchangeURL+BTC);
                crypto_obj.BTC = mapCrypto(responseBTC.data?.data?.rates, {});
                const responseDOGE = await axios.get(exchangeURL+DOGE);
                crypto_obj.DOGE = mapCrypto(responseDOGE.data?.data?.rates, {});
                const responseETH = await axios.get(exchangeURL+ETH);
                crypto_obj.ETH = mapCrypto(responseETH.data?.data?.rates, {});
                const sqlStoreQuery = `INSERT INTO crypto_exchange(crypto_currency,crypto_timestamp,usd_val,sgd_val,eur_val) VALUES (?,?,?,?,?)`;
                storeDataIntoDB(sqlStoreQuery, BTC, currentTime, crypto_obj.BTC.USD,crypto_obj.BTC.SGD,crypto_obj.BTC.EUR);
                storeDataIntoDB(sqlStoreQuery, DOGE, currentTime, crypto_obj.DOGE.USD,crypto_obj.DOGE.SGD,crypto_obj.DOGE.EUR);
                storeDataIntoDB(sqlStoreQuery, ETH, currentTime, crypto_obj.ETH.USD,crypto_obj.ETH.SGD,crypto_obj.ETH.EUR);
            }

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