const fetch = require('node-fetch');
const getWeb3 = require('./getWeb3')
const AddressesContract = require('./build/contracts/Addresses.json')
var express = require('express');
var app = express();

exports.handler = (event, context, callback) => {
    getContractAddress().then(address => {
            const body = {
                "randomaddress": {
                    address: price
                }
            }
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(body)
            })
        })
        .catch(function(error) {
            console.log(error);
        })
}

app.get('/contractAddress', function(req, res) {
    var fs = require('fs');
    var file = "./build/contracts/Addresses.json";
    var result = JSON.parse(fs.readFileSync(file));
    const Web3 = require('web3');
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    var abi = [{
        "constant": true,
        "inputs": [],
        "name": "getNumberOfAddresses",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "addresses_",
            "type": "address[]"
        }],
        "name": "addAddresses",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{
            "name": "i",
            "type": "uint256"
        }],
        "name": "getAddress",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "type": "function"
    }];
    var contractAddress = "0x5999bb6f2b8a04dc7781f5db58ad6fe906bb642d";
    
    var contract = web3.eth.contract(abi).at(contractAddress);
    const Accounts = web3.eth.accounts;
    web3.eth.defaultAccount = Accounts[0];
    var x = contract.getNumberOfAddresses().toString(10);
    var x = (parseInt(x) - 1).toString(10);
    const randomnumber = fetch('http://localhost:3000/random-number?min=' + 0 + '&max=' + x).then(function(res) {
        return res.text()
    });
    randomnumber.then(data => {
        console.log(parseInt(data));
        return contract.getAddress(parseInt(data));
    }).then(datax => {
        res.send(datax);
    })
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

app.get('/random-number', function(req, res) {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    if (!req.query.min) {
        return res.send({
            "status": "error",
            "message": "missing minimum value"
        });
    } else if (!req.query.max) {
        return res.send({
            "status": "error",
            "message": "missing maximum value"
        });
    } else {
        var random = getRandomInt(req.query.min, req.query.max);
        res.status = function status(code) {
            this.statusCode = code;
            return this;
        };
        res.type('text/plain');
        res.send(random.toString());
    }
});