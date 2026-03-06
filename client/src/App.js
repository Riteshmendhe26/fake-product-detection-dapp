// client/src/App.js
import React, { useState } from "react";
import Web3 from "web3";
import { QRCodeCanvas } from "qrcode.react";
import contractJson from "./contracts/ProductAuth.json";
import "bootstrap/dist/css/bootstrap.min.css";

const contractAddress = "0x4F84C1c070B77202AcCDD0c5425bbd7fd2b629c0";

function App() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [productId, setProductId] = useState("");
  const [verified, setVerified] = useState(null);

  const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
  const contract = new web3.eth.Contract(contractJson.abi, contractAddress);

  const addProduct = async () => {
  const FROM_ADDRESS = "0xC91141FdD8D3C56208B4C072422089DEBc236B07";
  await contract.methods.addProduct(name, details)
    .send({ from: FROM_ADDRESS, gas: 3000000 });
  
  const newProductId = await contract.methods.nextId().call();
const lastId = Number(newProductId) - 1;
setProductId(String(lastId));
alert("Product Added! Product ID: " + lastId);

};


  const verify = async () => {
    const result = await contract.methods.verifyProduct(productId).call();
    setVerified(result);
  };

  return (
    <div className="container py-5">
      <h1>Fake Product Identification</h1>

      <div className="row mb-5">
        <div className="col-lg-6 mb-4">
          <h3>Add Product</h3>
          <input value={name} onChange={e => setName(e.target.value)}
                 placeholder="Product Name" className="form-control mb-2"/>
          <input value={details} onChange={e => setDetails(e.target.value)}
                 placeholder="Details" className="form-control mb-2"/>
          <button onClick={addProduct} className="btn btn-success w-100">Add Product</button>
        </div>
        <div className="col-lg-6 mb-4">
          <h3>Generate QR</h3>
          {productId && (
      <QRCodeCanvas value={String(productId)} size={256} />
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <h3>Verify Product</h3>
          <input value={productId} onChange={e => setProductId(e.target.value)}
                 placeholder="Enter Product ID" className="form-control mb-2"/>
          <button onClick={verify} className="btn btn-primary w-100">Verify</button>
          {verified && <div className="mt-3 alert alert-info">
            <strong>Name:</strong> {verified[0]}<br/>
            <strong>Details:</strong> {verified[1]}<br/>
            <strong>Manufacturer:</strong> {verified[2]}
          </div>}
        </div>
      </div>
    </div>
  );
}

export default App;
