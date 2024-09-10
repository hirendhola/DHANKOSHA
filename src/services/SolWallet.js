import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
// import { HDNodeWallet, Wallet } from "ethers";


export const CreateNewMnemonic = () => {
  const mnemonic = generateMnemonic()
  const seed = mnemonicToSeedSync(mnemonic);
  return [mnemonic, seed];
}

//print solana add
export const SOL_createKeyPair = (seed, index) => {
  const path = `m/44'/501'/${index}'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const keyPair = Keypair.fromSecretKey(secret)
  const extractedPrivateKey = keyPair.secretKey;
  const extractedPrivateKeyBase58 = bs58.encode(extractedPrivateKey);
  return [keyPair.publicKey.toBase58(), extractedPrivateKeyBase58, secret]
}

// export const  ETH_createKeyPair = (seed, index) => {
//   const path = `m/44'/60'/${index}'/0'`;
//   const hdNode = HDNodeWallet.fromSeed(seed)
//   const child = hdNode.derivePath(path);
//   const wallet = getEthereumWallet(child.privateKey)
//   console.log("----------------------------------------------------------------------------------");
//   console.log("ETHEREUM public key:", wallet.address);
//   console.log("ETHEREUM public key:", wallet.privateKey);
// }


// function getEthereumWallet(privateKey) {
//   let wallet;
//   try {
//     wallet = new Wallet(privateKey);
//   } catch {
//     throw new Error("Invalid Ethereum private key");
//   }
//   return wallet;
// }