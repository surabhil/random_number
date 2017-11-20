pragma solidity ^0.4.4;

contract Addresses {
    address[] addresses;
    function addAddresses(address[] addresses_) {
        //address[] public addresses = [0x4413e02613db4ac472b85923260624b1b8957f34,0x973a8142a05930df7f164cce7ac9167a9fec0f0a,0xa3adcc69c638d799ef48535bdc3de5e129dd0fa2,0x0a7ddbf3929bcd4178e8b298cdcee698f6f116fa,0x782b177686020c5b8f1dd6b153314b824beb8db3,0xc23c40b50fa82054506fdb73c7812e1adf3882b2,0x0ef4120abf948fd8f122025ce35088517407d9f9,0xb51ad3bf6815132f44382e739d395b1b62eeff4d,0x1e4ada650f9731433073cb4e45576568ee91eb29,0x1ccc769e0a942c7fa07ffa42549c3b200d763b48];
        for (uint i = 0; i < addresses_.length; i++) {
            addresses.push(addresses_[i]);
        }
    }

    function getNumberOfAddresses() constant returns (uint) {
        return addresses.length;
    }

    function getAddress(uint i) constant returns (address) {
        return addresses[i];
    }

}
