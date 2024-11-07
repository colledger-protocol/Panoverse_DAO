const Hre = require("hardhat");

async function main() {

    await Hre.run("verify:verify", {
      address: "0xA4A41fF6baa3139eE4d45816A721476d3B4080B3",
      contract: "contracts/Stake.sol:PanoverseStake"
    });

    // await Hre.run("verify:verify",{
    //   address: "0x5E54fe272A68A555483661C5Cd7F3BdcDDFfFA77",
    //   contract: "contracts/Rewards.sol:PanoverseRewards"
    // });

}
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});