// import trainingPlanModel from "../../models/training.model.js";
// import logModel from "../../models/log.model.js";

// export const getPlainById = async (req, res) => {
//   try {
//     const plain = await trainingPlanModel.findById(req.params.id);
//     if (!plain) return res.status(400).json({ message: "Plain undefined." });

//     const userFound = await logModel.findById(req.log.id);

//     if (userFound.role !== "ADMIN_ROLE") {
//       plain.trainings = plain.trainings.filter(
//         (training) => training.visibility
//       );
//     }

//     res.json(plain);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error on the server.", error: err });
//   }
// };

import trainingPlanModel from "../../models/training.model.js";
import logModel from "../../models/log.model.js";

export const getPlanById = async (req, res) => {
  try {
    // Buscar el plan de entrenamiento por ID
    const plan = await trainingPlanModel.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found." });
    }

    // Buscar al usuario por ID
    const userFound = await logModel.findById(req.log.id);
    if (!userFound) {
      return res.status(404).json({ message: "User not found." });
    }

    // Filtrar entrenamientos si el usuario no es administrador
    if (userFound.role !== "ADMIN_ROLE") {
      plan.trainings = plan.trainings.filter(training => training.visibility);
    }

    // Devolver el plan (filtrado si es necesario)
    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error.", error: err.message });
  }
};
