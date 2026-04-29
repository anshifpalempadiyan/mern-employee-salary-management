import DataPegawai from "../models/DataPegawaiModel.js"
import Overtime from "../models/OvertimeModel.js"
import { Op, where } from "sequelize"



export const createOvertime = async (req, res) => {
    const { userId, date, hours, reason } = req.body

    if (!userId || !date || !hours || !reason)
        return res.status(400).json({ msg: "All fields are required" });

    if (hours < 1 || hours > 6)
        return res.status(400).json({ msg: "Overtime hours must be between 1 and 6" });

    if (reason.length < 10)
        return res.status(400).json({ msg: "Reason must be at least 10 characters long" });


    const today = new Date()
    const entryDate = new Date(date)
    const diffTime = today - entryDate
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (entryDate > today)
        return res.status(400).json({ msg: "Date cannot be in the future" });

    if (diffDays > 7)
        return res.status(400).json({ msg: "Late entries (more than 7 days) are not allowed" });


    try {

        const workerExists = await DataPegawai.findOne({
            where: { id_pegawai: userId }
        });
        if (!workerExists) {
            return res.status(404).json({ msg: "Worker does not exist in the system" });
        }

        const duplicateEntry = await Overtime.findOne({
            where: { 
                userId: userId, 
                date: date 
            }
        });
        if (duplicateEntry) {
            return res.status(400).json({ msg: "An overtime entry already exists for this worker on this date" });
        }

        const startOfMonth = new Date(entryDate.getFullYear(), entryDate.getMonth(), 1)
        const endOfMonth = new Date(entryDate.getFullYear(), entryDate.getMonth() + 1, 0)

        const currentMonthlyTotal = await Overtime.sum('hours', {
            where: {
                userId: userId,
                date: { [Op.between]: [startOfMonth, endOfMonth] }
            }
        }) || 0

        if (currentMonthlyTotal + parseInt(hours) > 60) {
            return res.status(400).json({ msg: `Monthly limit exceeded! Current total : ${currentMonthlyTotal} hours. Entry rejected.` })
        }

        await Overtime.create({ userId, date, hours, reason })
        res.status(201).json({ msg: "Overtime entry saved successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getOvertimes = async (req, res) => {
    try {
        const response = await Overtime.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}