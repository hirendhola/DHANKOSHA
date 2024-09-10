import bs58 from "bs58";
import { Keypair, Connection, SystemProgram, Transaction, sendAndConfirmTransaction, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js'

export const SendSol = async (key, receiver, sol) => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
  const payer = Keypair.fromSecretKey(bs58.decode(key))

  try {
    const createTransaction = async () => {
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: payer.publicKey,
          toPubkey: receiver,
          lamports: sol * LAMPORTS_PER_SOL,
        })
      )

      const txid = await sendAndConfirmTransaction(connection, tx, [payer])
      console.log("success txid: ", txid)
    }

    await createTransaction()

    return true
  } catch (error) {
    console.log(error.message)
    return false
  }

}