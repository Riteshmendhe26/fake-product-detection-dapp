// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductAuth {
    struct Product {
        uint id;
        address manufacturer;
        string name;
        string details;
    }
    mapping(uint => Product) public products;
    uint public nextId = 1;

    event ProductAdded(uint id, address manufacturer, string name);

    function addProduct(string memory name, string memory details) public {
        products[nextId] = Product(nextId, msg.sender, name, details);
        emit ProductAdded(nextId, msg.sender, name);
        nextId++;
    }

    function verifyProduct(uint id) public view returns (string memory, string memory, address) {
        Product memory product = products[id];
        require(product.id != 0, "Product does not exist");
        return (product.name, product.details, product.manufacturer);
    }
}