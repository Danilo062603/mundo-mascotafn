const Cita = require('../models/Cita');

// GET
exports.getCitas = async (req, res) => {
  try {
    const citas = await Cita.find();
    res.json(citas);
  } catch (error) {
    res.status(500).json(error);
  }
};

// POST
exports.crearCita = async (req, res) => {
  try {
    const nueva = new Cita(req.body);
    await nueva.save();

    res.json({ mensaje: "✅ Cita guardada" });
  } catch (error) {
    res.status(500).json(error);
  }
};