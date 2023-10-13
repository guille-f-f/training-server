import trainingModel from "../../models/training.model.js"

export const deletePlan = async (req, res) => {
    try {
        await trainingModel.findByIdAndDelete(req.params.idPlan);
        res.json({ message:"Delete plan sucessfully."})
    } catch (err) {
        res.status(500).json({message: "Error on the server."})
    }
}