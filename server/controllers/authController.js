const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const users = await userModel.findByUsername(username);

  if (!users || users.length === 0) {
    return res.status(401).json({ error: "Credenziali non valide" });
  }

  const user = users[0];

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: "Credenziali non valide" });

  req.session.userId = user.id;
  res.json({ message: "Login effettuato con successo" });
};
