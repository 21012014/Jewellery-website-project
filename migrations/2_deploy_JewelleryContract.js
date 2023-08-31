// JavaScript to deploy smart contract Migrations.sol

var jewel = artifacts.require("JewelleryContract");

module.exports = function(deployer) {
    deployer.deploy(jewel);
}