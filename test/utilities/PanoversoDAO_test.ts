import { PANO__factory } from './../../typechain-types/factories/contracts/Pano.sol/PANO__factory';
import { PanoverseDAO__factory } from './../../typechain-types/factories/contracts/PanoverseDAO__factory';
import { ethers } from "hardhat";
import { PANO, PanoverseDAO } from "../../typechain-types";
import { PanoverseDAO__factory } from "../../typechain-types";
import helper from "../../utils/helper";
import { expect } from 'chai';


describe ("PanoverseDAO", function (){
    let panoDAO : PanoverseDAO;
 //   let panoDAO_factory : PanoverseDAO__factory
    let pano : PANO;
    let owner: any;
    let signer: any;

    let signers : any;
    let signer_0 : any ;
    let signer_1 : any ;
    let signer_2 : any ;
    let signer_3 : any ;
    let signer_4 : any ;
    let signer_5 : any ;
    let signer_6 : any ;
    let signer_7 : any ;
    let signer_8 : any ;
    let signer_9 : any ;
    let signer_10 : any ;
    let signer_11 : any ;
    let signer_12 : any ;
    let signer_13 : any ;
    let signer_14 : any ;
    let signer_15 : any ;
    let signer_16 : any ;
    let signer_17 : any ;
    let signer_18 : any ;
    let signer_19 : any ;
    let signer_20 : any ;

beforeEach(async () =>{
    signer = await ethers.getSigners();
    (owner = signer[0]),
    (signer_0 =  signer[1]),
    (signer_1 =  signer[2]),
    (signer_2 =  signer[3]),
    (signer_3 =  signer[4]),
    (signer_4 =  signer[5]),
    (signer_5 =  signer[6]),
    (signer_6 =  signer[7]),
    (signer_7 =  signer[8]),
    // (signer_9 =  signer[10]),
    // (signer_10 =  signer[11]),
    // (signer_4 =  signer[5]),
    // (signer_5 =  signer[6]),



    panoDAO = await new PanoverseDAO__factory(owner).deploy();
   
    pano = await new PANO__factory(owner).deploy();

  
    await panoDAO.connect(owner).init(owner.address);

   


})


it(" + Contract is deployed properly", async()=>{

    console.log("Panoverse DAO Contract", await panoDAO.address);
    console.log("Panoverse Token Contract", await pano.address);

});



it(" + Create Proposal : User can create proposal " , async ()=>{
    await panoDAO.connect(owner).startNewRound(1709451971, 1712180771);
    await panoDAO.connect(signer_0).createProposal("Change the colour of Backgroud");
    let getProposalNumber = await panoDAO.getProposalNumber(1);
    expect(getProposalNumber).to.be.equal(1);

})

it(" + Create Proposal : Multiple users can create multiple proposals " , async () =>{
    await panoDAO.connect(owner).startNewRound(1709451971, 1712180771);
    await panoDAO.connect(signer_0).createProposal("Change the colour of Backgroud");
    await panoDAO.connect(signer_1).createProposal("Change Sell tax to 2%");
    await panoDAO.connect(signer_2).createProposal("Improve the UI");
    await panoDAO.connect(signer_3).createProposal("Introduction of Blacklisting");

    let getProposalNumber = await panoDAO.getProposalNumber(1);
    expect(getProposalNumber).to.be.equal(4);
});



it(" + Verify Vote: It should verify ", async()=>{
    await panoDAO.connect(owner).startNewRound(1709451971, 1709451981);

  
    await panoDAO.connect(signer_0).createProposal("Change the colour of Backgroud");
    await panoDAO.connect(signer_1).createProposal("Change Sell tax to 2%");
    await panoDAO.connect(signer_2).createProposal("Change Buy  tax to 2%");
   
   
    
    const helperClass_1 = new helper({
        
        _contract : panoDAO,
        _signer : signer_3,

    });
    
    const helperClass_2 = new helper({
        
        _contract : panoDAO,
        _signer : signer_4,

    });

   
    let voterRecord_1 = await helperClass_1.createHashVote(
     1, //Round Number
     1, //Proposal Number
     signer_3.address,
     true
    );

  
    let voterRecord_2 = await helperClass_2.createHashVote(
    1, //Round Number
    1, //Proposal Number
    signer_4.address,
    true
    );

   
    let voterRecord_3 = await helperClass_1.createHashVote(
        1, //Round Number
        2, //Proposal Number
        signer_3.address,
        false
       );

       let voterRecord_4 = await helperClass_2.createHashVote(
        1, //Round Number
        2, //Proposal Number
        signer_4.address,
        false
       );


     
       let voterRecord_5 = await helperClass_1.createHashVote(
        1, //Round Number
        3, //Proposal Number
        signer_3.address,
        true
       );

       let voterRecord_6 = await helperClass_2.createHashVote(
        1, //Round Number
        3, //Proposal Number
        signer_4.address,
        true
       );


    let voteRecords = [voterRecord_1, voterRecord_2,voterRecord_3, voterRecord_4, voterRecord_5, voterRecord_6];

   
    await panoDAO.connect(owner).approveProposal(1,1,true);
    
    await panoDAO.connect(owner).submitVotes(1,1, voteRecords);
   
    let proposal = await panoDAO.getPassedProposals(1);
    
    // let proposalArray = [1,0,0]
   
    expect(proposal[0]).to.be.equal(1);

})

it(" + Round state : Admin should update the round state" , async () =>{
    await panoDAO.connect(owner).roundState(3,true);
    await panoDAO.connect(owner).roundState(5,false);

    let roundstate_details_1 = (await panoDAO.roundDetails(3)).isActive;
    let roundstate_details_2 = (await panoDAO.roundDetails(5)).isActive;

    expect((roundstate_details_1)).to.be.equal(true);
    expect((roundstate_details_2)).to.be.equal(false);
    
});

it(" + verifyVote : the signer should be a valid voter" , async ()=>{
    const helperClass_1 = new helper({
        
        _contract : panoDAO,
        _signer : signer_3,

    });
    
   
    let voterRecord_1 = await helperClass_1.createHashVote(
     1, //Round Number
     1, //Proposal Number
     signer_3.address,
     true
    );

    let voterSign = await panoDAO.verifyVote(voterRecord_1)
    expect(await voterSign[0]).to.be.equal(signer_3.address);


});

it(" + startNewRound : Admin should be able start a new round" , async () =>{

    await panoDAO.connect(owner).startNewRound(1709451971, 1909451981);



});

it(" + getProposalNumber : it should return correct proposal number " , async () =>{
    await panoDAO.connect(owner).startNewRound(1709451971, 1709451981);

    await panoDAO.connect(signer_0).createProposal("Change the colour of Backgroud");
    await panoDAO.connect(signer_1).createProposal("Change Sell tax to 2%");
    await panoDAO.connect(signer_2).createProposal("Change Buy  tax to 2%");

    let proposal_number = await panoDAO.getProposalNumber(1);
    await expect(proposal_number).to.be.equal(3);


})

it(" + approve proposal : the admin should be able to approve proposal" , async () =>{

    await panoDAO.connect(owner).startNewRound(1709451971, 1709451981);

    await panoDAO.connect(signer_0).createProposal("Change the colour of Backgroud");
    await panoDAO.connect(signer_1).createProposal("Change Sell tax to 2%");
    await panoDAO.connect(signer_2).createProposal("Change Buy  tax to 8%");

    await panoDAO.connect(owner).approveProposal(1,2,true);
    await panoDAO.connect(owner).approveProposal(1,3,false);

    let isApproved = await panoDAO.isApprovedProposal(1,2);
    expect (isApproved).to.be.equal(true) ;

    let isNotApproved = await panoDAO.isApprovedProposal(1,3);
    expect (isNotApproved).to.be.equal(false) ;

});


it(" + getPassedProposal : it should show all the passed proposals" , async () =>{

    await panoDAO.connect(owner).startNewRound(1709451971, 1709451981);

  
    await panoDAO.connect(signer_0).createProposal("Change the colour of Backgroud");
    await panoDAO.connect(signer_1).createProposal("Change Sell tax to 2%");
    await panoDAO.connect(signer_2).createProposal("Change Buy  tax to 2%");

    await panoDAO.connect(owner).approveProposal(1,1,true);
    // await panoDAO.connect(owner).approveProposal(1,1,t);
   
   
    
    const helperClass_1 = new helper({
        
        _contract : panoDAO,
        _signer : signer_3,

    });
    
    const helperClass_2 = new helper({
        
        _contract : panoDAO,
        _signer : signer_4,

    });

    const helperClass_3 = new helper({
        _contract : panoDAO,
        _signer : signer_5

    });

    const helperClass_4 = new helper({
        _contract : panoDAO,
        _signer : signer_6

    });

    const helperClass_5 = new helper({
        _contract : panoDAO,
        _signer : signer_7

    });

   
    let voterRecord_1 = await helperClass_1.createHashVote(
     1, //Round Number
     1, //Proposal Number
     signer_3.address,
     true
    );

  
    let voterRecord_2 = await helperClass_2.createHashVote(
    1, //Round Number
    1, //Proposal Number
    signer_4.address,
    true
    );

   
    let voterRecord_3 = await helperClass_1.createHashVote(
        1, //Round Number
        2, //Proposal Number
        signer_3.address,
        false
       );

       let voterRecord_4 = await helperClass_2.createHashVote(
        1, //Round Number
        2, //Proposal Number
        signer_4.address,
        false
       );


     
       let voterRecord_5 = await helperClass_1.createHashVote(
        1, //Round Number
        3, //Proposal Number
        signer_3.address,
        true
       );

       let voterRecord_6 = await helperClass_2.createHashVote(
        1, //Round Number
        3, //Proposal Number
        signer_4.address,
        true
       );

       let voterRecord_7 = await helperClass_3 .createHashVote(
        1, //round
        3, //propsal number
        signer_5.address,
        false
       )

       let voterRecord_8 = await helperClass_4.createHashVote(
        1, //round
        3, //propsal number
        signer_6.address,
        false
       )


       let voterRecord_9 = await helperClass_5.createHashVote(
        1, //round
        3, //propsal number
        signer_7.address,
        false
       )



    let voteRecords = [voterRecord_1, voterRecord_2,voterRecord_3, voterRecord_4, voterRecord_5, voterRecord_6, voterRecord_7, voterRecord_8, voterRecord_9];

   
    
    await panoDAO.connect(owner).submitVotes(1,1, voteRecords);
   
    let proposal = await panoDAO.getPassedProposals(1);
    
    expect(proposal[0]).to.be.equal(1);


})

it(" - it should revert if voter already voted" , async ()=>{


    await panoDAO.connect(owner).startNewRound(1709451971, 1709451981);

  
    await panoDAO.connect(signer_0).createProposal("Change the colour of Backgroud");
    await panoDAO.connect(signer_1).createProposal("Change Sell tax to 2%");
    await panoDAO.connect(signer_2).createProposal("Change Buy  tax to 2%");

    await panoDAO.connect(owner).approveProposal(1,1,true);
    // await panoDAO.connect(owner).approveProposal(1,1,t);
   
   
    
    const helperClass_1 = new helper({
        
        _contract : panoDAO,
        _signer : signer_3,

    });
    
    const helperClass_2 = new helper({
        
        _contract : panoDAO,
        _signer : signer_4,

    });


    let voterRecord_1 = await helperClass_1.createHashVote(
        1, //Round Number
        1, //Proposal Number
        signer_3.address,
        true
       );
   
     
       let voterRecord_2 = await helperClass_2.createHashVote(
       1, //Round Number
       1, //Proposal Number
       signer_4.address,
       true
       );
   
       let voterRecord_3 = await helperClass_1.createHashVote(
        1, //Round Number
        1, //Proposal Number
        signer_3.address,
        false
       );

       let voterRecord = [voterRecord_1,voterRecord_2,voterRecord_3]

       await expect(panoDAO.submitVotes(1,1,voterRecord)).to.be.revertedWithCustomError(panoDAO,"alreadyVoted");



})



it(" - OnlyAdmin : it should revert if message.sender is not the admin", async () =>{
   await expect (panoDAO.connect(signer_0).startNewRound(1709451971, 1712180771)).to.be.revertedWithCustomError(panoDAO,"notAdmin");
});

it(" - Round state : Only Admin should be able to change the round state", async()=>{
    await expect (panoDAO.connect(signer_0).roundState(2, true)).to.be.revertedWithCustomError(panoDAO,"notAdmin");
});



it(" - startNewRound :  Only Admin should start a new round" , async () =>{
    await expect(panoDAO.connect(signer_0).startNewRound(1709451971, 1909451981)).to.be.revertedWithCustomError(panoDAO,"notAdmin");


    
});

it(" - it should not start another new round if previous round is active" , async () =>{

    const startTime = Math.floor(Date.now() / 1000) + 100; // Set a future start time
    const endTime = startTime + 600; // Set an end time 600 seconds after start time
  
    await panoDAO.startNewRound(startTime, endTime);
  
   
    const newStartTime = endTime + 10; // Set a new start time after previous round ends
    const newEndTime = newStartTime + 600;
  
  
    await expect(panoDAO.startNewRound(newStartTime, newEndTime)).to.be.revertedWithCustomError(panoDAO,"previousActiveRound");
});

it(" -  createProposal : It should revert if creating a proposal without an active round", async ()=>{
    await panoDAO.connect(owner).roundState(1,false);
    let roundstate_details_1 = (await panoDAO.roundDetails(1)).isActive;
    expect(roundstate_details_1).to.equal(false);

    const details = "Proposal details";
   
    await expect(panoDAO.createProposal(details)).to.be.revertedWithCustomError(panoDAO,"noActiveRound");
  });


it(" - verifyVote : it should return false if the signer is not a valid voter" , async () =>{

    const helperClass_1 = new helper({
        
        _contract : panoDAO,
        _signer : signer_4,

    });
    
   
    let voterRecord_1 = await helperClass_1.createHashVote(
     1, //Round Number
     1, //Proposal Number
     signer_3.address,
     true
    );

    let voterSign = await panoDAO.verifyVote(voterRecord_1)
    expect(await voterSign[1]).to.be.equal(false);


});

it(" - submitvotes : it  should revert if the votes are being submitted before the round endtime", async ()=>{

    await panoDAO.connect(owner).startNewRound(1709451971, 1909451981);

  
    await panoDAO.connect(signer_0).createProposal("Change the colour of Backgroud");
    await panoDAO.connect(signer_1).createProposal("Change Sell tax to 2%");
    await panoDAO.connect(signer_2).createProposal("Change Buy  tax to 2%");
   
   
    
    const helperClass_1 = new helper({
        
        _contract : panoDAO,
        _signer : signer_3,

    });
    
    const helperClass_2 = new helper({
        
        _contract : panoDAO,
        _signer : signer_4,

    });

   
    let voterRecord_1 = await helperClass_1.createHashVote(
     1, //Round Number
     1, //Proposal Number
     signer_3.address,
     true
    );

    let voterRecord_2 = await helperClass_2.createHashVote(
    1, //Round Number
    1, //Proposal Number
    signer_4.address,
    true
    );

   
    let voterRecord_3 = await helperClass_1.createHashVote(
        1, //Round Number
        2, //Proposal Number
        signer_3.address,
        false
       );

       let voterRecord_4 = await helperClass_2.createHashVote(
        1, //Round Number
        2, //Proposal Number
        signer_4.address,
        false
       );


     
       let voterRecord_5 = await helperClass_1.createHashVote(
        1, //Round Number
        3, //Proposal Number
        signer_3.address,
        true
       );

       let voterRecord_6 = await helperClass_2.createHashVote(
        1, //Round Number
        3, //Proposal Number
        signer_4.address,
        true
       );


    let voteRecords = [voterRecord_1, voterRecord_2,voterRecord_3, voterRecord_4, voterRecord_5, voterRecord_6];

   
    await panoDAO.connect(owner).approveProposal(1,1,true);
    
    await expect(panoDAO.connect(owner).submitVotes(1,1, voteRecords)).to.be.revertedWithCustomError(panoDAO, "roundnotEnded");
 
});


it(" - it should revert if proposal is not approved " , async ()=>{

    await panoDAO.connect(owner).startNewRound(1709451971, 1709451972);
    
    await panoDAO.connect(signer_0).createProposal("Change the colour of Backgroud");
    await panoDAO.connect(signer_1).createProposal("Change the sell tax %");
    await panoDAO.connect(signer_2).createProposal("Change the buy tax %");

    await panoDAO.connect(owner).approveProposal(1,1,true);
    await panoDAO.connect(owner).approveProposal(1,2,false);

    
    const helperClass_1 = new helper({
        
        _contract : panoDAO,
        _signer : signer_3,

    });
    
    const helperClass_2 = new helper({
        
        _contract : panoDAO,
        _signer : signer_4,

    });

   
    let voterRecord_1 = await helperClass_1.createHashVote(
     1, //Round Number
     2, //Proposal Number
     signer_3.address,
     true
    );

   
    let voterRecord_2 = await helperClass_2.createHashVote(
    1, //Round Number
    2, //Proposal Number
    signer_4.address,
    true
    );

    let voterRecords = [voterRecord_1,voterRecord_2];
    

    await expect(panoDAO.submitVotes(1,2, voterRecords)).to.be.revertedWithCustomError(panoDAO,"proposalNotApproved");






    
   
});


it(" - submitvote : invalid voter should not submit vote" , async ()=>{


    await panoDAO.connect(owner).startNewRound(1709451971, 1709451972);
    
    await panoDAO.connect(signer_0).createProposal("Change the colour of Backgroud");
    await panoDAO.connect(signer_1).createProposal("Change the sell tax %");
    await panoDAO.connect(signer_2).createProposal("Change the buy tax %");

    await panoDAO.connect(owner).approveProposal(1,1,true);
    await panoDAO.connect(owner).approveProposal(1,2,false);

    
    const helperClass_1 = new helper({
        
        _contract : panoDAO,
        _signer : signer_3,

    });
    
    const helperClass_2 = new helper({
        
        _contract : panoDAO,
        _signer : signer_4,

    });

   
    let voterRecord_1 = await helperClass_1.createHashVote(
     1, //Round Number
     1, //Proposal Number
     signer_4.address,
     true
    );

    let voterRecord_2 = await helperClass_2.createHashVote(
    1, //Round Number
    1, //Proposal Number
    signer_4.address,
    true
    );

    let voterRecords = [voterRecord_1,voterRecord_2];
   

    await expect(panoDAO.submitVotes(1,1, voterRecords)).to.be.revertedWithCustomError(panoDAO,"invalidVoter");


})


it(" - it should revert if round number is invalid" ,async ()=>{

    await panoDAO.connect(owner).startNewRound(1709451971, 1709451972);
    
    await panoDAO.connect(signer_0).createProposal("Change the colour of Backgroud");
    await panoDAO.connect(signer_1).createProposal("Change the sell tax %");
    await panoDAO.connect(signer_2).createProposal("Change the buy tax %");

    await panoDAO.connect(owner).approveProposal(1,1,true);
    await panoDAO.connect(owner).approveProposal(1,2,false);

    
    const helperClass_1 = new helper({
        
        _contract : panoDAO,
        _signer : signer_3,

    });
    
    const helperClass_2 = new helper({
        
        _contract : panoDAO,
        _signer : signer_4,

    });

   
    let voterRecord_1 = await helperClass_1.createHashVote(
     5, //Round Number
     1, //Proposal Number
     signer_3.address,
     true
    );

    
    let voterRecord_2 = await helperClass_2.createHashVote(
    4, //Round Number
    1, //Proposal Number
    signer_4.address,
    true
    );

    let voterRecords = [voterRecord_1,voterRecord_2];
   

    await expect(panoDAO.submitVotes(1,1, voterRecords)).to.be.revertedWithCustomError(panoDAO,"invalidRound");

})







})


