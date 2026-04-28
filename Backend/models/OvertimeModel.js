import { Sequelize } from "sequelize";
import db from "../config/Database.js"
import DataPegawai from "./DataPegawaiModel.js";

const { DataTypes } = Sequelize

const Overtime = db.define('overtime', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hours: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    }

},
    {
        freezeTableName: true
    }
)

DataPegawai.hasMany(Overtime, { 
    foreignKey: 'userId', 
    sourceKey: 'id_pegawai' 
});

Overtime.belongsTo(DataPegawai, { 
    foreignKey: 'userId', 
    targetKey: 'id_pegawai' 
});


export default Overtime;

