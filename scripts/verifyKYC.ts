const Hre = require("hardhat");

async function main() {


    await Hre.run("verify:verify", {
      //Deployed contract Factory address
      address: "0xC8d9e09b233D53c310c9068BD0aAA00aE610c6cF",
      //Path of your main contract.
      contract: "contracts/KYC Module/IdentityFactory.sol:IdentityFactory",
    });

    // await Hre.run("verify:verify", {
    //   //Deployed contract Factory address
    //   address: "0x2771E2228aDF1d9043dcCb87CF951B97E10B0Ca9",
    //   //Path of your main contract.
    //   contract: "contracts/KYC Module/Identity.sol:Identity",
    // });

    // await Hre.run("verify:verify", {
    //   //Deployed contract Marketplace address
    //   address: "0x9633B6d80876749c2944470EBfBFe609a6d5f07D",
    //   //Path of your main contract.
    //   contract: "contracts/KYC Module/registry/IdentityRegistry.sol:IdentityRegistry",
    // });

    // await Hre.run("verify:verify", {
    //   //Deployed contract Marketplace address
    //   address: "0xfB7E9EB0eADe4d52e2E685C7C389AA5b79b2E025",
    //   //Path of your main contract.
    //   contract: "contracts/KYC Module/registry/IdentityRegistryStorage.sol:IdentityRegistryStorage",
    // });

    // await Hre.run("verify:verify", {
    //   //Deployed contract Marketplace address
    //   address: "0x420C5743d175Ba880c95847029425383CCA110A7",
    //   //Path of your main contract.
    //   contract: "contracts/KYC Module/registry/ClaimTopicsRegistry.sol:ClaimTopicsRegistry",
    // });

    // await Hre.run("verify:verify",{
    //   //Deployed contract MarketPlace proxy
    //   address: "0x6BeA1bf41f45d53e4ba0b00F35e47B5535c3243c",
    //   //Path of your main contract.
    //   contract: "contracts/KYC Module/registry/TrustedIssuersRegistry.sol:TrustedIssuersRegistry"
    // });


}
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});