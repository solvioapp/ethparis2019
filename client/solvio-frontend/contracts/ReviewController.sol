pragma solidity ^0.5.0;

contract ReviewController {

    // Deposit amount is 0.02 ETH (2.7 usd) = 2 * 10^16
    // Should be below uint(-1)/3 for overflow not to happen
    uint constant amount = 20000000000000000;

    // Challenge period is 3 days
    // After, submitter can withdraw deposit
    uint constant period = 3 days;

    address public arbitrator;

    // mapping (identifier => Review)
    mapping (bytes32 => Review) public reviews;
    // mapping (identifier => disputer)
    mapping (bytes32 => address payable) public disputes;

    struct Review {
        uint timeAdded;
        address payable submitter;
    }

    event NewSubmission(bytes32 identifier, address submitter);
    event NewChallenge(bytes32 identifier, address disputer);
    event NewWithdrawal(bytes32 identifier, address submitter);
    event NewResolution(bytes32 identifier, bool valid);

    constructor (address schelling) public {
        // Assign arbitrator
        arbitrator = schelling;
    }

    function submit(bytes32 identifier) public payable
    {
        // Review must not have been submitted
        require(reviews[identifier].timeAdded == 0, "already added");

        // Transfer amount
        require(msg.value == amount, "0.02 ETH not transferred");

        // Add review
        reviews[identifier] = Review(now, msg.sender);

        emit NewSubmission(identifier, msg.sender);
    }

    function challenge(bytes32 identifier) public payable
    {
        // Get review
        Review memory review = reviews[identifier];

        // Review must have been added
        require(review.timeAdded != 0);

        // Review can be challenged only within period
        require(now < review.timeAdded + period, "Too late");

        // Review musn't already be in dispute
        require(disputes[identifier] != address(0), "Already in dispute");

        // Challenger needs to put up amount
        require(msg.value == amount, "amount not transferred");

        // Create dispute
        disputes[identifier] = msg.sender;

        emit NewChallenge(identifier, msg.sender);
    }

    function withdrawAfterTime(bytes32 identifier) public
    {
        // Get review
        Review memory review = reviews[identifier];

        // Review must not be in dispute
        require(disputes[identifier] == address(0));

        // Deposit can only be withdrawn after period
        // Also takes care of not added reviews
        require(now >= review.timeAdded + period, "Too early");

        // Null reviews to save gas
        reviews[identifier] = Review(0, address(0));

        // Give deposit back
        msg.sender.transfer(amount);

        emit NewWithdrawal(identifier, msg.sender);
    }

    function resolveDispute(bytes32 identifier, bool valid) public
    {
        // Can only be called by arbitrator
        require(msg.sender == arbitrator, "not arbitrator");

        // Review has to be in dispute
        require(disputes[identifier] != address(0), "Review not in dispute");

        if (valid) {
            // Pay arbitrator 1/2 of deposit
            msg.sender.transfer(amount / 2);

            // Pay submitter 3/2 of deposit
            reviews[identifier].submitter.transfer(amount * 3 / 2);
        } else {
            // Pay arbitrator 1/2 of deposit
            msg.sender.transfer(amount / 2);
            
            // Pay challenger 3/2 of deposit
            disputes[identifier].transfer(amount * 3 / 2);
        }

        // Null dispute
        disputes[identifier] = address(0);

        // Null review
        reviews[identifier] = Review(0, address(0));

        emit NewResolution(identifier, valid);
    }
}
