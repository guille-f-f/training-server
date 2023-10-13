export const logout = (_req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0) });
    return res.json({ message: "Logout sucessfully." });
  } catch (err) {
    res.status(500).json({ message: "Error on the server." });
  }
};
