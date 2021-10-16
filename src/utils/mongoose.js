import {connect,connection} from 'mongoose'

const conn = {
    isConnected: false
}

export async function dbConnect(){
    //Checa si ya existe la conexion, si conn.isConnected == true no conectara nuevamente
    if(conn.isConnected) return;

    const db = await connect(process.env.MONGODB_URL);
    conn.isConnected = db.connections[0].readyState ; //1 si el estado es conectado
    console.log(db.connection.db.databaseName); //Nombre de la base de datos
}

connection.on("connected",() => {
    console.log('MongoDB connected')
})

connection.on("error",(err) => {
    console.log(err)
})