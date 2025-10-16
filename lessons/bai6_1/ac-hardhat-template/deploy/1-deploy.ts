import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("====================");
  console.log("Deploying MyToken on:", hre.network.name);
  console.log("====================");

  const deployment = await deploy("MyToken", {
    contract: "MyToken",
    from: deployer,
    args: [],
    log: true,
  });

  console.log("MyToken deployed at:", deployment.address);
};

func.tags = ["deploy"];
export default func;
