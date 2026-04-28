import { Sequelize } from 'sequelize';

const db = new Sequelize('employee_salary_db', 'root', '1234', {
    host: "localhost",
    dialect: "mysql"
});

db.authenticate()
    .then(() => console.log(' DATABASE CONNECTED SUCCESSFULLY'))
    .catch(err => console.error(' DATABASE CONNECTION FAILED:', err));


export default db;