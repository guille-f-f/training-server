import Log from "../../models/log.model.js";

export const updateUser = async (req, res) => {
  try {
    const { role } = req.log;

    console.log(req.body);

    if (role === "ADMIN_ROLE") {
      const logFound = await Log.findByIdAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      )
      return res.json(logFound);
    }
    res
      .status(400)
      .json({ message: "The user does not have administrator permissions." });
  } catch (error) {
    console.log(error);
  }
};
