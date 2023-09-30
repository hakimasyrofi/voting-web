// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ElectronicVoting {
    struct User {
        uint256 maticUsed;
        mapping(uint256 => bool) votedVotings;
    }

    struct Choice {
        string name;
        uint256 totalVotes;
    }

    struct VotingSystem {
        address creator;
        string votingTitle;
        Choice[] choices;
        uint256 startTime;
        uint256 endTime;
    }

    mapping(address => User) public users;
    mapping(uint256 => VotingSystem) public votings;
    uint256 public totalVotingSystems;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createVotingSystem(string calldata votingTitle, uint256 startTime, uint256 endTime, string[] calldata choiceNames) external {
        uint256 votingId = totalVotingSystems++;
        VotingSystem storage newVoting = votings[votingId];
        newVoting.creator = msg.sender;
        newVoting.votingTitle = votingTitle;
        newVoting.startTime = startTime;
        newVoting.endTime = endTime;

        for (uint256 i = 0; i < choiceNames.length; i++) {
            newVoting.choices.push(Choice(choiceNames[i], 0));
        }
    }

    function voteOnVoting(uint256 votingId, uint256 choiceIndex) external {
        require(votingId < totalVotingSystems, "Invalid voting ID");
        require(!users[msg.sender].votedVotings[votingId], "You have already voted on this voting");

        VotingSystem storage voting = votings[votingId];
        User storage user = users[msg.sender];

        require(choiceIndex < voting.choices.length, "Invalid choice index"); // Memastikan choiceIndex valid

        voting.choices[choiceIndex].totalVotes++;
        user.votedVotings[votingId] = true;
    }

    function getVotingSystem(uint256 votingId) external view returns (
        address creator,
        string memory votingTitle,
        uint256 startTime,
        uint256 endTime,
        Choice[] memory choices
    ) {
        require(votingId < totalVotingSystems, "Invalid voting ID");

        VotingSystem storage voting = votings[votingId];

        return (
            voting.creator,
            voting.votingTitle,
            voting.startTime,
            voting.endTime,
            voting.choices
        );
    }

    function hasVoted(uint256 votingId, address userAddress) external view returns (bool) {
        require(votingId < totalVotingSystems, "Invalid voting ID");
        User storage user = users[userAddress];

        return user.votedVotings[votingId];
    }

}
