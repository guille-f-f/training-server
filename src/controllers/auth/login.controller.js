import logModel from "../../models/log.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../../utils/jwt.js";

export const login = async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { email, password } = req.body;

    // Buscar usuario
    const userFound = await logModel
      .findOne({ email })
      .populate("trainingPlan")
      .populate("workouts");

    if (!userFound)
      return res.status(400).json({ message: ["Invalid credentials."] });

    // Validar password
    const passwordValidate = await bcrypt.compare(password, userFound.password);
    if (!passwordValidate)
      return res.status(400).json({ message: ["Invalid credentials."] });

    // Establecer token en cookies
    const token = await createAccessToken({
      id: userFound._id,
      role: userFound.role,
    });
    res.cookie("token", token, {
      sameSite: "none", // debido a que la cookie no está en el mismo dominio
      secure: true,
      httpOnly: false,
      maxAge: 90000,
    });
    
    res.json({
      userFound,
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      trainingPlan: userFound.trainingPlan,
      createAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "err.message" });
  }
};
