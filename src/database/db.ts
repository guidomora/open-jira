import mongoose from "mongoose";


// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting

const mongoConnection = {
    isConnected: 0
}


export const connectDB = async () => {

    if (mongoConnection.isConnected) {
        console.log("ya estabamos conectados");
        // Usamos el return para que no siga una vez conectados
        return
    }

    // si no estamos conectados vamos a revisar las conexiones
    if (mongoose.connections.length > 0) {
        // obtenemos el estado de la primer conexion por eso el [0]
        mongoConnection.isConnected = mongoose.connections[0].readyState;
        // si la conexion es igual a 1 la vamos a usar
        if (mongoConnection.isConnected === 1) {
            console.log("usando conexion anterior");
            return
        }
        // si el estado no es 1 nos desconectamos
        await mongoose.disconnect();
    }

    // Aca iria la cadena de conexion, que vamos a utilizar una variable de
    // entorno (.env)
    await mongoose.connect(process.env.MONGO_URL || "");
    // una vez que nos conectamos lo igualamos a 1 que significa conectados
    mongoConnection.isConnected = 1;
    console.log("Conectado a mongoDB:", process.env.MONGO_URL)
}


export const disconnectDB = async () => {

    // si la variable de node es igual a development no nos desconectamos
    if (process.env.NODE_ENV === "development") return

    // Cualquier conexion que sea diferente de 0 nos desconectamos
    if (mongoConnection.isConnected === 0) return

    await mongoose.disconnect()
    mongoConnection.isConnected = 0;
    console.log("Desconectado de mongo");

}