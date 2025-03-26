import dotenv from 'dotenv';
import { Sequelize} from 'sequelize';

dotenv.config({
    path: '../backend/.env'
});


const { DB_NAME,  DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT} = process.env;

console.log(DB_HOST);

const sequelize = new Sequelize(
    DB_NAME, DB_USER, DB_PASSWORD,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: "mysql",
        logging: query => console.log(`SQL Query: ${query}`)
    }
);

try {
    await sequelize.authenticate();
    console.log('Connected successfully.');
} catch (error) {
    console.error('Unable to connect:', error);
}

export default sequelize;