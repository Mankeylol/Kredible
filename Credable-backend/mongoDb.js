import { MongoClient} from "mongodb";


async function main (){

    const uri = "mongodb+srv://mankeylol:Mankeylol%401@cluster0.8j1n24j.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client);
    } catch (error) {
        console.error(error)
    } finally {
        await client.close()
    }
}

main().catch(console.error)

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databses :")

    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`)
    })
}