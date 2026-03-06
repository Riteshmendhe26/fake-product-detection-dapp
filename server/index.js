const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Most recent web3 versions require `.default`
const Web3 = require('web3');
const web3 = new Web3("http://127.0.0.1:7545");

// Rest of your server code...
const contractJson = require('../build/contracts/ProductAuth.json');
const contractAddress = "0x4F84C1c070B77202AcCDD0c5425bbd7fd2b629c0"; // your actual deploy address
const contract = new web3.eth.Contract(contractJson.abi, contractAddress);

const app = express();
app.use(express.json());
app.use(cors());

// Add Product
app.post('/add-product', async (req, res) => {
    const { name, details, from } = req.body;
    try {
        await contract.methods.addProduct(name, details).send({ from });
        res.send({ status: 'Product added' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Verify Product
app.get('/verify/:id', async (req, res) => {
    try {
        const product = await contract.methods.verifyProduct(req.params.id).call();
        res.send(product);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
