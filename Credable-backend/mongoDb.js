import dotenv from 'dotenv'

dotenv.config()

export const uri = process.env.URI 

export async function addDoc(client, data) {
   const result = await client.db("credit_score").collection("wallets").insertOne(data)
   console.log(result.insertedId)
}