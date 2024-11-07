import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, network } from "hardhat";
import {
  expandTo18Decimals,
  expandTo6Decimals,
} from "../test/utilities/utilities";
import{PanoverseStake, PanoverseRewards, ING, PANO} from "../typechain-types";

function sleep(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

 const parcel =  { "seller": "0x09750BD8F6cFFA43745ABBB4A910812F0b0dFd16", "tokenId": 1, "maxCarbonUnits": 1000, "pricePerCarbonUnit": 100, "timePeriod": 1692340330, "tokenURI": "Sample", "signature": "0xe0b630746034e23423eba49063b58976e63d9acd9dabeb0c8f676fde6f1d601c5bb3423fbaa1362082b4b0091d9ebc757498fc754cd1ce6bf12e88a91fd3f3ed1b" } 

async function main() {
    const stake = await ethers.getContractFactory("PanoverseStake");
    // const reward = await ethers.getContractFactory("PanoverseRewards");

    const Stake = await stake.deploy();
    await sleep(2000);
    // const Reward = await reward.deploy();
    // await sleep(2000);
  
    console.log("Stake- "+Stake.address);
    // console.log("Reward- ",Reward.address);
}  

main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
}) ;


/* PANO - 0x98a06054a5bb4C9E86bf71D0Ec545f050452DdAd
Stake- 0xf9411f7EF44be0e27EAE65a4b7239A0784c660e4
Reward-  0x5E54fe272A68A555483661C5Cd7F3BdcDDFfFA77 */