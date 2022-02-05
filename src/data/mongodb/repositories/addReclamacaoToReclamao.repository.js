const findReclamaoByName = require('./findReclamaoByName.repository');

module.exports = async ({ model, reclamou, name }) => {
  const { _id, reclamacoes } = await findReclamaoByName({ model, name });
  const verifyReclamou = parseInt(reclamou || 1);
  const addReclamacoes = reclamacoes + verifyReclamou;

  return model.findByIdAndUpdate(_id, { reclamou: addReclamacoes });
};
