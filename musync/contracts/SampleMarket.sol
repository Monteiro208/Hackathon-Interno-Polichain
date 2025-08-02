// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SampleMarket {
    struct Sample {
        address payable uploader;
        uint256 price;
        string  cid;
        bool    exists;
    }

    uint256 public constant FEE_BP = 500; // 5%
    address public immutable treasury;
    mapping(uint256 => Sample) public samples;
    mapping(address => mapping(uint256 => bool)) public bought;

    constructor(address _treasury) {
        treasury = _treasury;
    }

    function addSample(uint256 id, string calldata cid, uint256 price) external {
        require(!samples[id].exists, "id taken");
        samples[id] = Sample(payable(msg.sender), price, cid, true);
    }

    function buy(uint256 id) external payable {
        Sample storage s = samples[id];
        require(s.exists, "not found");
        require(msg.value == s.price, "wrong price");
        require(!bought[msg.sender][id], "already bought");

        uint256 fee = (msg.value * FEE_BP) / 10000;
        s.uploader.transfer(msg.value - fee);
        payable(treasury).transfer(fee);
        bought[msg.sender][id] = true;
    }

    function canDownload(address user, uint256 id) external view returns (bool) {
        return bought[user][id];
    }
}
