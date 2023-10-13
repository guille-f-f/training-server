import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, "Date is required."],
    // unique: true,
  },
  works: {
    type: String,
    required: [true, "Works is required"],
  },
  duration: {
    type: String,
    default: "undefined",
  },
  pace: {
    type: String,
    default: "undefined",
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
  trainings: [trainingSchema],
});

trainingPlanSchema.methods.addTraining = async function (training) {
  const existingTraining = this.trainings.find(
    (t) => t.date === training.date
  );
  
  if (existingTraining) {
    throw new Error("Date must be unique within the plan.");
  }

  this.trainings.push(training);
  await this.save();
};

export default mongoose.model("TrainingPlan", trainingPlanSchema);
