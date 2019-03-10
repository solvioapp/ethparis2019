pragma solidity ^0.5.0;

interface ReviewController{

}

contract Schelling{

struct Commit {
        bytes32 blinded;
        uint deposit;
	uint8 value;
}

address controller;

mapping(bytes32 => mapping(address=>Commit)) public commits;
mapping(bytes32=>uint) public creationDate;
mapping(bytes32=>uint) public pot;
mapping(bytes32=>uint) public votes;

function setup(address cont) external {
	require(controller==address(0));
	controller=cont;
}

function commit(bytes32 id, bytes32 blinded) public payable {
	require(controller.disputes[id]!=address(0));
	if(creationDate[id]==0){
		creationDate[id]=now;
	}
	require(now < creationDate[id] + 2 days);
	commits[id][msg.sender]=Commit({
		blinded: blinded,
		deposit: msg.value,
		value:2
	});
}

function reveal(bytes32 id, bytes32 random, uint8 value) external{
	require(now < creationDate[id] + 3 days);
	require(now > creationDate[id] + 2 days);
	require(keccak(random, value)==commits[id][msg.sender].blinded);
	require(value==0 || value==1);
	commits[id][msg.sender].blinded=0;
	commits[id][msg.sender].value=value;
	pot[id]+=commits[id][msg.sender].deposit;
	votes[id]+=commits[id][msg.sender].deposit*value;
}

function withdraw(bytes32 id) external{
	require(now > creationDate[id] + 3 days);
	bool winner=votes[id]>pot[id]/2;
	if(controller.disputes[id]!=address(0)){
		controller.resolveDispute(id, winner);
	}
	require((commits[id][msg.sender].value==1 && winner) || (commits[id][msg.sender].value==0 && !winner));		
	uint sendValue=commits[id][msg.sender].deposit;
	commits[id][msg.sender].deposit=0;
	//TODO: Add money coming from controller
	msg.sender.transfer((sendValue/(winner?votes[id]:(pot[id]-votes[id])))*pot[id]);
}

}
