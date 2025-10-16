import { ethers } from "hardhat";
import { MyToken } from "../typechain";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  const mytoken: MyToken = await ethers.getContract("MyToken");
  const contractAddress = await mytoken.getAddress();
  console.log("Contract Address:", contractAddress);
  console.log("Etherscan:", `https://sepolia.etherscan.io/address/${contractAddress}\n`);
  console.log("Deployer Address:", deployer.address);

  // Contract instance có signer để send transaction (mint)
  const writeContract = await ethers.getContractAt("MyToken", contractAddress, deployer);

  // Contract instance chỉ đọc dữ liệu
  const readContract = await ethers.getContractAt("MyToken", contractAddress);

  console.log("========== TOKEN INFO ==========");
  console.log("Token Name:", await readContract.name());
  console.log("Symbol:", await readContract.symbol());
  console.log("Decimals:", await readContract.decimals());
  console.log("Total Supply:", (await readContract.totalSupply()).toString());
  console.log("Deployer Balance:", (await readContract.balanceOf(deployer.address)).toString());

  // Trước mint
  console.log("\n========== BEFORE MINT ==========");
  console.log("Total Supply:", (await readContract.totalSupply()).toString());
  console.log("Deployer Balance:", (await readContract.balanceOf(deployer.address)).toString());

  // Mint 500 token
  console.log("\n🚀 Minting 500 tokens...");
  const amount = 500n * 10n ** 18n;
  const tx = await writeContract.mint(deployer.address, amount);
  await tx.wait();
  console.log("Minted!");

  // Sau mint
  console.log("\n========== AFTER MINT ==========");
  console.log("Total Supply:", (await readContract.totalSupply()).toString());
  console.log("Deployer Balance:", (await readContract.balanceOf(deployer.address)).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
