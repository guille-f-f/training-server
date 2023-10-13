import logModel from "../../models/log.model.js";

export const getUserById = async (req, res) => {
    try {
        const logFound = await logModel.findById(req.params.id).populate("trainingPlan");
        console.log(logFound)
        console.log(123456)
        res.json(logFound)
} catch (err) {
        res.status(500).json({message: "User not found, error on the server"})
    }
}