import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "NOMBRE DEL EJERCICIO",
  },
  repetition: {
    type: String,
    default: "1",
  },
  description: {
    type: String,
    default: "Descripción no proporcionada",
  },
});

exerciseSchema.pre('save', function(next) {
  if (this.title === "") {
    this.title = "NOMBRE DEL EJERCICIO";
  }
  if (this.repetition === "") {
    this.repetition = "1";
  }
  if (this.description === "") {
    this.description = "Descripción no proporcionada";
  }
  next();
});

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "EJEMPLO DE EJERCICIO",
  },
  repetition: {
    type: String,
    default: "1",
  },
  description: {
    type: String,
    default: "Descripción no proporcionada",
  },
  exercises: [exerciseSchema],
});

workoutSchema.pre('save', function(next) {
  if (this.title === "") {
    this.title = "EJEMPLO DE EJERCICIO";
  }
  if (this.repetition === "") {
    this.repetition = "1";
  }
  if (this.description === "") {
    this.description = "Descripción no proporcionada";
  }
  next();
});

export default mongoose.model("Workout", workoutSchema);
