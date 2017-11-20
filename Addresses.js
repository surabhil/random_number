const fetch = require('node-fetch');
const getWeb3 = require('./getWeb3')
const AddressesContract = require('./build/contracts/Addresses.json')
//const contract = require('truffle-contract')
const endpoint = "http://localhost:8545";

const connectAddresses = async() => {
var fs = require('fs');
var file = "./build/contracts/Addresses.json";
var result = JSON.parse(fs.readFileSync(file));
const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var abi = [{"constant":true,"inputs":[],"name":"getNumberOfAddresses","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addresses_","type":"address[]"}],"name":"addAddresses","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"}];
var contractAddress = "0x0d8f81fd2d3963e474268aa3fff461c5718b47a6";
var contract = web3.eth.contract(abi).at(contractAddress);
const Accounts = web3.eth.accounts;
web3.eth.defaultAccount=Accounts[0];
// contract.addAddresses([0x4413e02613db4ac472b85923260624b1b8957f34,],function (error, result){ 
//     if(!error){
//         console.log(result);
//             } else{
//         console.log(error);
//                 }});
var x = contract.getNumberOfAddresses().toString(10);
console.log(x)
const randomnumber = fetch('http://localhost:3000/random-number?min='+0+'&max='+x).then(function(res){return res.text()});
}


const addAddresses = async() => {
	connectAddresses.addAddresses(Accounts);	
}

const getAddress = async(index) => {
	connectAddresses.getAddress(index);
}
      

module.exports = {connectAddresses, addAddresses, getAddress}
