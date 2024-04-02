//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract PanoverseDAO is Initializable, Ownable, EIP712Upgradeable {

    IERC20 public token;

    address public admin;

    uint256 public totalRounds;

    error notAdmin(address _msgSender, address _admin);

    error noActiveRound(uint256 _currentRound, bool _isActive);

    error previousActiveRound(uint256 _currentRound, bool _isActive);

    error proposalNotApproved(uint256 _currentRound, uint256 _proposalNumber, bool _isApproved);

    error votingPending(uint256 _currentRound, uint256 _proposalNumber, uint256 _startTime);

    error proposalEnded(uint256 _currentRound, uint256 _proposalNumber, uint256 _endTime);

    error invalidBalance(uint256 _requiredBalance, uint256 _currentBalance);

    event proposalSubmitted(uint256 roundNumber, address owner, uint256 proposalNumber);

    modifier onlyAdmin() {
        if(msg.sender!=admin) {
            revert notAdmin(msg.sender, admin);
        }
        _;
    }

    struct Round {
        bool isActive;
        uint totalProposals;
        uint[] proposalsPassed;
        uint startTime;
        uint endTime;
        mapping(uint => Proposal) proposalDetails;
    }

    struct Proposal {
        address proposer;
        bool isApproved;
        string details;
        uint8 voteYes;
        uint8 voteNo;
    }

    struct VotingReceipt {
        uint256 roundNumber;
        uint256 proposalNumber;
        bool vote;
    }

    struct VoteRecord { 
        uint256 roundNumber;
        uint256 proposalNumber;
        address voter;
        bool vote;
        bytes signature;
    }

    struct VoterRecord {
        uint256 participationNumber;
        mapping(uint256 => VotingReceipt) voteDetails;
    }

    mapping(uint256 => Round) roundDetails;
    
    mapping(address => VoterRecord) voterRec;

    function roundState(uint roundNumber, bool _activity) external onlyAdmin {
        roundDetails[roundNumber].isActive = _activity;
    }

    function startNewRound(uint256 _startTime, uint256 _endTime) external onlyAdmin {
        if(roundDetails[totalRounds].isActive) {
            revert previousActiveRound(totalRounds,true);
        }
        totalRounds++;
        roundDetails[totalRounds].startTime = _startTime;
        roundDetails[totalRounds].endTime = _endTime;
        roundDetails[totalRounds].isActive = true;
    }

    function createProposal(string memory _details) external returns(uint proposalNumber){
        if(!(token.balanceOf(msg.sender)>=1000000000000000000000)) {
            revert invalidBalance(1000000000000000000000, token.balanceOf(msg.sender));
        }
        if(!roundDetails[totalRounds].isActive) {
          revert noActiveRound(totalRounds,false);
        }
        roundDetails[totalRounds].totalProposals++;
        Proposal storage proposal = roundDetails[totalRounds].proposalDetails[roundDetails[totalRounds].totalProposals];
        proposal.proposer = msg.sender;
        proposal.details = _details;
        emit proposalSubmitted(totalRounds, msg.sender, roundDetails[totalRounds].totalProposals);
        return roundDetails[totalRounds].totalProposals;
    }

    function approveProposal(uint256 _roundNumber, uint256 _proposalNumber, bool _approve) external onlyAdmin{
        roundDetails[_roundNumber].proposalDetails[_proposalNumber].isApproved = _approve;
    }

    function hashVote(VoteRecord memory vote) internal view returns(bytes32) {
        return _hashTypedDataV4(keccak256(abi.encode(keccak256(
            "VoteRecord(uint256 roundNumber,uint256 proposalNumber,address voter,bool vote)"
        ),
        vote.roundNumber,
        vote.proposalNumber,
        vote.voter,
        vote.vote
        )
        )
      );
    }

    function verifyVote(VoteRecord memory vote) public view returns(address, bool) {
        bytes32 digest = hashVote(vote);
        address voter = ECDSAUpgradeable.recover(digest,vote.signature);
        if(vote.voter==voter && IERC20(token).balanceOf(voter)>0){
            return(voter,true);
        } else {
            return(voter,false);
        }
    }

    // function vote(uint256 _round, uint256 _proposal, bool _voteRecord) external {
    //     if(!roundDetails[_round].isActive) {
    //       revert noActiveRound(_round,false);
    //     }
    //     if(!(token.balanceOf(msg.sender)>=1000000000000000000000)) {
    //         revert invalidBalance(1000000000000000000000, token.balanceOf(msg.sender));
    //     }
    //     Proposal storage proposal = roundDetails[_round].proposalDetails[_proposal];
    //     if(!proposal.isApproved) {
    //         revert proposalNotApproved(_round, _proposal, false);
    //     }
    //     if(block.timestamp<proposal.startTime) {
    //         revert votingPending(_round, _proposal, proposal.startTime);
    //     }
    //     if(block.timestamp>proposal.endTime) {
    //         revert proposalEnded(_round, _proposal, proposal.endTime);
    //     }
    //     if(_voteRecord) {
    //     roundDetails[_round].proposalDetails[_proposal].voteYes += 1; }
    //     else {
    //     roundDetails[_round].proposalDetails[_proposal].voteNo += 1;    
    //     }
    //     voterRec[msg.sender].participationNumber++;
    //     VotingReceipt storage voteReciept = voterRec[msg.sender].voteDetails[voterRec[msg.sender].participationNumber];
    //     voteReciept.vote = _voteRecord;
    //     voteReciept.proposalNumber = _proposal;
    //     voteReciept.roundNumber = _round;
    // } 

    function declareResult(uint256 _round) external {
        uint totalProposals = roundDetails[_round].totalProposals;
        uint256[] memory passed;
        uint256 j = 0;
        for(uint i = 1; i<=totalProposals; i++) {
            Proposal storage proposal = roundDetails[_round].proposalDetails[i];
            if(proposal.voteYes > proposal.voteNo) {
                passed[j] = i;
            }
            j++;
        }
        roundDetails[_round].proposalsPassed = passed;
    }

}