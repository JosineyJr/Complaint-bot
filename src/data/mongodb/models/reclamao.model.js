const { Schema } = require('mongoose');

module.exports = async ({ connection }) => {
  const reclamaoSchema = new Schema({ nome: { type: String, required: true, unique: true }, reclamou: { type: Number, default: 0 } }, { timestamps: true });

  return connection.model('ReclamaoModel', reclamaoSchema);
};
