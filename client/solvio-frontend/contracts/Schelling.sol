pragma solidity ^0.5.0;

contract Schelling{
struct Commit {
        bytes32 blinded;
        uint deposit;
        uint8 value;
}

mapping(uint => Commit[]) public commits;
mapping(uint=>uint) public creationDate;

 function commit(uint _id, bytes32 _blinded)
        public
        payable
    {
        commits[_id].push(Commit({
            blinded: _blinded,
            deposit: msg.value,
            value:0
        }));
    }

function submitNew(uint id) external{
        // require();
}

// function challenge()


}