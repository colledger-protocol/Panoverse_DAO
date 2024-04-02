import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, network } from "hardhat";
import {
  expandTo18Decimals,
  expandTo6Decimals,
} from "../test/utilities/utilities";
import {CarbonExchange,ZeroCarbonCredit,ZeroCarbonUnitToken,IdentityFactory, IdentityRegistry, Identity, ClaimTopicsRegistry, TrustedIssuersRegistry,IdentityRegistryStorage} from "../typechain-types";

function sleep(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

async function main() {
    const idfactory = await ethers.getContractFactory("IdentityFactory");
    const identity = await ethers.getContractFactory("Identity");
    const identityRegistry = await ethers.getContractFactory("IdentityRegistry");
    const identityRegistryStorage = await ethers.getContractFactory("IdentityRegistryStorage");
    const claimsTopicsRegistry = await ethers.getContractFactory("ClaimTopicsRegistry");
    const trustedIssuersRegistry = await ethers.getContractFactory("TrustedIssuersRegistry");
    

    const IdentityFactorys = await idfactory.deploy();
    await sleep(2000);
    // const Identitys = await identity.deploy();
    // await sleep(2000);
    // const IdentityRegistrys = await identityRegistry.deploy();
    // await sleep(2000);
    // const IDStorage = await identityRegistryStorage.deploy();
    // await sleep(2000);
    // const Claims = await claimsTopicsRegistry.deploy();
    // await sleep(2000);
    // const Trust = await trustedIssuersRegistry.deploy();
    // await sleep(2000);

    // const identityRegistryAttach = identityRegistry.attach(IdentityRegistrys.address);

    // await identityRegistryAttach.addAgent(IdentityFactorys.address);
    // console.log("Success");


    console.log("IDFactory Address- "+IdentityFactorys.address);
    // console.log("Identity Address- "+Identitys.address);
    // console.log("Registry Address- "+IdentityRegistrys.address);
    // console.log("IDStorage Address- "+IDStorage.address);
    // console.log("Claims Address- "+Claims.address);
    // console.log("Trust Address- "+Trust.address);


}  

main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
}) ;

// IDFactory Address- 0x4263eF23F1D2d2DE562557fa7e8974caaEE4E1B0
// Identity Address- 0xfe32b102e5c9D25E52cF868B6ed55091A349f0e0
// Registry Address- 0x8B4C52eeA3ECc1E4875E6966F6c22C5c3474d4e0
// IDStorage Address- 0xD31c7ad1e30088c6f366B6287020C232E8675E8B
// Claims Address- 0xC0E545e6D99D185c6e08CddBB57636eedd4fEd29
// Trust Address- 0x766868d9b2dfA8672458dF1cc5b63669a057636c

// Sepolia - 

// IDFactory Address- 0xCE94CA963f6EF1E154c5414C193560dcd14495e1
// Identity Address- 0x47a7359cA5e37e156A403f0a14A8ED6f13b3763e
// Registry Address- 0xe143BFd36e125A03234D8c5C4BffC35B15b8b075
// IDStorage Address- 0x6EE49A1d43A1E670C5BeDb5904F2C692f15E23aC
// Claims Address- 0xc1B98075f47246d79A8D0196A3675f536d29d90D
// Trust Address- 0xE359Cd6b7e1989bA64dE2B59cB892Df5D24De877


// Polygon Mainnet - 

// IDFactory Address- 0xF5d1B56B29DE32C75bBc96794a31377fB0921768
// Identity Address- 0xCC611f3e32fC46A813529f56F9F2adDa49a22421
// Registry Address- 0x603f1EA65f7F5980AD83CECF8bF59110a9E0Ebfa
// IDStorage Address- 0x62C84d90041b67B30620A58eAA4491e4fDDe5B8d
// Claims Address- 0x76ed8D26d68045f59838B02732d03832AEe572c3
// Trust Address- 0x7eD78331c2977B875e8F9ae4819F14E5B510e11d


// Mumbai test 

// IDFactory Address- 0x649f481F0D79F5049e1a213DDeb0320049497101
// Identity Address- 0xEaA5Ab426Cf5316B639fb401D04A77BCB2AA59b9
// Registry Address- 0x0f068bff6BFe207B9De7dd18c6Ea9D28a1Aa20Fd
// IDStorage Address- 0x5d87387634568b115c4E10304AE16D7C1d0E2b56
// Claims Address- 0x054B36D05772f5Dfc50ee4109C48aAEAdc0D8F2A
// Trust Address- 0x3Bf86532637B0cBc0bc9797c83BaA523C4fe12b8



// SEPOLIA NEW

// IDFactory Address- 0x909cDE441449b58616eb1f97590b51C06A50FbF3
// Identity Address- 0x2771E2228aDF1d9043dcCb87CF951B97E10B0Ca9
// Registry Address- 0x9633B6d80876749c2944470EBfBFe609a6d5f07D
// IDStorage Address- 0xfB7E9EB0eADe4d52e2E685C7C389AA5b79b2E025
// Claims Address- 0x420C5743d175Ba880c95847029425383CCA110A7
// Trust Address- 0x6BeA1bf41f45d53e4ba0b00F35e47B5535c3243c