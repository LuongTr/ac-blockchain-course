import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("========================================");
  console.log("Deploying MyMintableToken on:", hre.network.name);
  console.log("========================================");

  const deployment = await deploy("MyMintableToken", {
    contract: "MyMintableToken",
    from: deployer,
    args: [],
    log: true,
  });

  const token = await ethers.getContractAt("MyMintableToken", deployment.address, await ethers.getSigner(deployer));

  console.log("=====Minting 1000 tokens for deployer=====");
  const amount = 1000n * 10n ** 18n;
  const tx = await token.mint(deployer, amount);
  await tx.wait();

  const balance = await token.balanceOf(deployer);
  console.log("Deployer Balance:", balance.toString());

  console.log("MyMintableToken deployed at:", deployment.address);

};

func.tags = ["MyMintableToken"];
export default func;
