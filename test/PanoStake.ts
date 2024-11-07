import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { ethers, network } from "hardhat";
import { ING, ING__factory, PANO, PANO__factory, PanoverseRewards, PanoverseRewards__factory, PanoverseStake, PanoverseStake__factory } from "../typechain-types";
import { expandTo18Decimals, 
    expandTo6Decimals } from "./utilities/utilities";
import { expect } from "chai";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("Panoverse Stake Test Cases",()=>{

    let owner: SignerWithAddress;
    let signer: SignerWithAddress[];
    let reward: PanoverseRewards;
    let stake: PanoverseStake;
    let pano: PANO;
    let ing: ING;

    let address1 = "0x0000000000000000000000000000000000000001";
    let address0 = "0x0000000000000000000000000000000000000000"


    beforeEach(async()=>{
        signer = await ethers.getSigners();
        owner = signer[0];
        stake = await new PanoverseStake__factory(owner).deploy();
        reward = await new PanoverseRewards__factory(owner).deploy();
        pano = await new PANO__factory(owner).deploy();
        ing = await new ING__factory(owner).deploy();
        await stake.connect(owner).init(owner.address, pano.address);
        await reward.connect(owner).init(owner.address, ing.address);
        await ing.connect(owner).init(owner.address);
        await stake.connect(owner).stakeSettings(300,1000);
        // await ing.connect(owner).mint(reward.address,expandTo18Decimals(1000000));
    })

it("TestingStake", async()=>{

    console.log("Balance on USDT " + await pano.balanceOf(owner.address));
    await pano.connect(owner).approve(stake.address, expandTo18Decimals(10));
    await stake.connect(owner).stake(300,expandTo6Decimals(1));
    console.log("Stake Details: "+ await stake.getStakeDetails(owner.address,1));    
    const obj = await stake.getStakeDetails(owner.address,1);
    if(obj.rewardBasis>0) {
        await reward.connect(owner).registerStake(owner.address,1,expandTo6Decimals(1),obj.startTime,obj.totalTime,obj.rewardBasis);
    }

    console.log("Stake details on reward contract: "+ await reward.getStakeDetails(owner.address,1));
})

it.only("Stake Forfeit", async()=>{

    console.log("Balance on USDT " + await pano.balanceOf(owner.address));
    await pano.connect(owner).approve(stake.address, expandTo18Decimals(10));
    await stake.connect(owner).stake(300,1000000);
    await stake.connect(owner).stake(300,100566655);
    await stake.connect(owner).stake(300,2323243434);
    console.log("Stake Details: ", await stake.getStakeDetails(owner.address,1)); 
    const obj = await stake.getStakeDetails(owner.address,1);
    if(obj.rewardBasis>0) {
        await reward.connect(owner).registerStake(owner.address,1,expandTo6Decimals(1),obj.startTime,obj.totalTime,obj.rewardBasis);
    }
    
    const obj1 = await stake.getStakeDetails(owner.address,2);
    if(obj1.rewardBasis>0) {
        await reward.connect(owner).registerStake(owner.address,2,expandTo6Decimals(3),obj1.startTime,obj1.totalTime,obj1.rewardBasis);
    }
    
    const obj2 = await stake.getStakeDetails(owner.address,3);
    if(obj2.rewardBasis>0) {
        await reward.connect(owner).registerStake(owner.address,3,expandTo6Decimals(2),obj2.startTime,obj2.totalTime,obj2.rewardBasis);
    }
    console.log("Balance on USDT after stake " + await pano.balanceOf(owner.address));
    // await stake.connect(owner).forfeitPermission(true);
    // await stake.connect(owner).forfeitStake(1);
    // const obj2 = await stake.getStakeDetails(owner.address,1); 
    console.log("Balance on USDT after forfeit: " + await pano.balanceOf(owner.address));
    // if (obj2.stakeForfeited == true) {
    //     await reward.connect(owner).withdrawStake(owner.address,1);
    // // }
    // console.log("Stake Details after forfeit: " + await stake.getStakeDetails(owner.address,1)); 
    console.log("Stake details on reward contract: "+ await reward.getStakeDetails(owner.address,3));
    console.log("Estimated reward: ", await reward.calculateEstimatedReward(owner.address));
})

// it("Claim Rewards", async()=>{

//     console.log("Balance on USDT " + await usdt.balanceOf(owner.address));
//     await usdt.connect(owner).approve(stake.address, expandTo18Decimals(10));
//     await stake.connect(owner).stake(300,expandTo6Decimals(1));
//     console.log("Stake Details: "+ await stake.getStakeDetails(owner.address,1));    
//     const obj = await stake.getStakeDetails(owner.address,1);
//     if(obj.rewardBasis>0) {
//         await reward.connect(owner).registerStake(owner.address,1,expandTo6Decimals(1),obj.startTime,obj.totalTime,obj.rewardBasis);
//     }

//     console.log("Stake details on reward contract: "+ await reward.getStakeDetails(owner.address,1));

//     await network.provider.send("evm_increaseTime", [400]);
//     await network.provider.send("evm_mine");

//     await reward.connect(owner).claimRewards(1);
//     console.log("Balance after reward: " + await ing.balanceOf(owner.address));
    
// })



})