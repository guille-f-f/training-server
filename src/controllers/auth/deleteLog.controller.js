import logModel from "../../models/log.model.js"

export const deleteLog = async (req, res) => {
    try {
        console.log("DELETE REQUEST")
        await logModel.findByIdAndDelete(req.params.id);
        console.log("DELETE REQUEST output")

        res.json({message: "User delete sucessfully."})
    } catch (err) {
        res.status(500).json("Error on the server.")
    }
}