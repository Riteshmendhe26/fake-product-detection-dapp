// migrations/1_deploy_contracts.js
const ProductAuth = artifacts.require("ProductAuth");

module.exports = function (deployer) {
  deployer.deploy(ProductAuth);
};
