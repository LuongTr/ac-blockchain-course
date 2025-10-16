import { ethers } from "hardhat";
import { MyNFT } from "../typechain";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  const myNFT: MyNFT = await ethers.getContract("MyNFT");
  const contractAddress = await myNFT.getAddress();

  console.log("Contract Address:", contractAddress);
  console.log("Etherscan:", `https://sepolia.etherscan.io/address/${contractAddress}\n`);

  // Contract instance có signer để send transaction (mint)
  const writeContract = await ethers.getContractAt("MyNFT", contractAddress, deployer);

  // Contract instance chỉ đọc dữ liệu
  const readContract = await ethers.getContractAt("MyNFT", contractAddress);

  // Xem nextTokenId hiện tại
  const beforeId = await readContract.nextTokenId();
  console.log("========== BEFORE MINT ==========");
  console.log("Next Token ID:", beforeId.toString());

  // Mint 1 NFT mới
  console.log("\n🚀 Minting new NFT...");
  const tx = await writeContract.mint(deployer.address);
  await tx.wait();
  console.log("Minted!");

  // Xem nextTokenId sau mint
  const afterId = await readContract.nextTokenId();
  console.log("\n========== AFTER MINT ==========");
  console.log("Next Token ID:", afterId.toString());

  // Token ID vừa mint = afterId - 1
  const mintedTokenId = afterId - 1n;
  const owner = await readContract.ownerOf(mintedTokenId);

  console.log(`ownerOf(${mintedTokenId}):`, owner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
