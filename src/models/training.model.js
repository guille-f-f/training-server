import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
  day: {
    type: String,
  },
  date: {
    type: String,
    // required: [true, "Date is required."],
    // unique: true,
  },
  works: {
    type: String,
    // required: [true, "Works is required"],
  },
  duration: {
    type: String,
    default: "undefined",
  },
  pace: {
    type: String,
    default: "undefined",
  },
  note: {
    type: String,
    default: "No hay notas disponibles"
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const trainingPlanSchema = new mongoose.Schema({
  level: {
    type: String,
    required: [true, "Level date is required."],
    unique: true,
  },
  month: {
    type: String,
  },
  week: {
    type: String,
  },
  trainings: [trainingSchema],
});

trainingPlanSchema.methods.addTraining = async function (training) {
  const existingTraining = this.trainings.find((t) => t.date === training.date);

  if (existingTraining) {
    throw new Error("Date must be unique within the plan.");
  }

  this.trainings.push(training);
  await this.save();
};

export default mongoose.model("TrainingPlan", trainingPlanSchema);
