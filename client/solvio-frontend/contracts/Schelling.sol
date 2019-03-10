pragma solidity ^0.5.0;

import "./ReviewController.sol";

contract Schelling {

    uint constant commitPeriod = 3 days;
    uint constant duration = 5 days;
    uint constant amount = 30000000000000000;

    struct Commit {
        bytes32 blinded;
        uint deposit;
        uint8 value;
    }

    ReviewController controller;

    mapping(bytes32 => mapping( address => Commit)) public commits;
    mapping(bytes32 => uint) public creationDate;
    mapping(bytes32 => uint) public pot;
    mapping(bytes32 => uint) public votes;

    function setup(ReviewController _controller) external {
        require(address(controller) == address(0), "already setup");
        controller = _controller;
    }

    function commit(bytes32 id, bytes32 blinded) public payable {
        require(controller.disputes(id) != address(0), "review must be in dispute");

        if (creationDate[id] == 0) {
            creationDate[id] = now;
        }
        
        // Schelling game lasts for commitPeriod days
        require(now < creationDate[id] + commitPeriod, "Too late");
        
        commits[id][msg.sender] = Commit({
            blinded: blinded,
            deposit: msg.value,
            // Hasn't been revealed
            value: 2
        });
    }

    function reveal(bytes32 id, bytes32 random, uint8 value) external {
        // Can only reveal in schelling period
        require(now < creationDate[id] + duration, "too late");

        // Can only reveal after commit period
        require(now > creationDate[id] + commitPeriod, "too early");

        // Hash must be commited value
        require(keccak256(abi.encodePacked(random, value)) == commits[id][msg.sender].blinded);

        // Vote must be 0 or 1
        require(value == 0 || value == 1, "invalid vote");

        // Reset commited value
        commits[id][msg.sender].blinded = 0;

        // Turn value from 2 to 0 or 1
        commits[id][msg.sender].value = value;

        // Increase pot by user's deposit
        pot[id] += commits[id][msg.sender].deposit;

        // Add deposit to votes' pot
        votes[id] += commits[id][msg.sender].deposit * value;
    }

    function withdraw(bytes32 id) external {

        // Can only withdraw after duration
        require(now > creationDate[id] + duration, "Too early");

        // See if deposits add up to 1 / 2
        bool winningSide = votes[id] > pot[id] / 2;

        // Resolve dispute
        if (controller.disputes(id) != address(0)) {
            controller.resolveDispute(id, winningSide);
        }

        // Did you vote correctly?
        if (commits[id][msg.sender].value == (winningSide ? 1 : 0)) {
            // You voted correctly

            // Get deposit
            uint depositValue = commits[id][msg.sender].deposit;

            // Null commit
            commits[id][msg.sender] = Commit(0, 0, 0);

            // Calculate sendValue
            uint share = (depositValue / (winningSide ? votes[id] : (pot[id] - votes[id])));
            uint sendValue = share * (pot[id] + amount);

            // Send 
            msg.sender.transfer(sendValue);
        }
    }
}
