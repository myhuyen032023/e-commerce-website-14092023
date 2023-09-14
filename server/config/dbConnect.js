const { default: mongoose} = require("mongoose");
mongoose.set('strictQuery', false);

// Chinh sua lai options cho mongoose connect
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4 // Use IPv4, skip trying IPv6
}
mongoose.Promise = global.Promise;

//Module nay dung de tao connection voi db

const dbConnect = async () => {
    try {
        
        const conn = await mongoose.connect(process.env.MONGODB_URI, options);
        if (conn.connection.readyState === 1) {
            console.log('DB connection is successfully.')
        } else {
            console.log('DB fail to connect...')
        }

    } catch(error) {
        console.log('DB connection is fail');
        throw new Error(error);
    }


}

module.exports = dbConnect;