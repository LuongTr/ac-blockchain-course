import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("====================");
  console.log("Deploying MyToken on:", hre.network.name);
  console.log("====================");

  const deployment = await deploy("MyNFT", {
    contract: "MyNFT",
    from: deployer,
    args: [],
    log: true,
  });

  const nft = await ethers.getContractAt("MyNFT", deployment.address);

  // Mint 1 NFT cho deployer
  const tx = await nft.mint(deployer);
  await tx.wait();

  // Kiểm tra ownerOf(0)
  const owner = await nft.ownerOf(0);
  console.log("NFT #0 owner:", owner);
  console.log("MyNFT deployed at:", deployment.address);
};

func.tags = ["deploy"];
export default func;
