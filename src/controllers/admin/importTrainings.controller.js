import planModel from "../../models/training.model.js";
import { sortDates } from "../../utils/sortDate.js";

export const importTrainings = async (req, res) => {
  const { currentPlanId, sourcePlanId } = req.params;

  try {
    // Encontrar el plan actual
    const currentPlan = await planModel.findById(currentPlanId);
    if (!currentPlan) {
      throw new Error(`Current plan with ID ${currentPlanId} not found`);
    }

    // Encontrar el plan de origen
    const sourcePlan = await planModel.findById(sourcePlanId);
    if (!sourcePlan) {
      throw new Error(`Source plan with ID ${sourcePlanId} not found`);
    }

    // Validar que sourcePlan.trainings es un arreglo
    if (!Array.isArray(sourcePlan.trainings)) {
      throw new Error("Source plan trainings is not an array or is undefined");
    }

    // Crear un conjunto de fechas existentes en el plan actual
    const existingDates = new Set(currentPlan.trainings.map((t) => t.date));
    console.log("Existing Dates:", existingDates); // Log de depuración

    // Filtrar entrenamientos del plan de origen que no están en el plan actual
    const newTrainings = sourcePlan.trainings.filter((t) => {
      console.log("Checking training date:", t.date); // Log de depuración
      return !existingDates.has(t.date);
    });
    console.log("New Trainings:", newTrainings); // Log de depuración

    // Añadir los nuevos entrenamientos al plan actual de manera individual para evitar problemas con subdocumentos
    newTrainings.forEach((newTraining) => {
      currentPlan.trainings.push(newTraining.toObject());
    });

    sortDates(currentPlan.trainings);

    // Guardar el plan actualizado
    await currentPlan.save();

    res.status(200).json(currentPlan);
  } catch (error) {
    console.error("Error during import:", error); // Log de depuración
    res.status(400).json({ error: error.message });
  }
};
