const findReclamaoByName = require('./findReclamaoByName.repository');

module.exports = async ({ model, reclamou, name }) => {
  const reclamao = await findReclamaoByName({ model, name });
  if (!reclamao) return { error: `Reclamao ${name} does not exist` };

  const { _id, reclamacoes } = reclamao;
  const verifyReclamou = parseInt(reclamou || 1);
  const addReclamacoes = reclamacoes + verifyReclamou;
  await model.findByIdAndUpdate(_id, { reclamou: addReclamacoes })
  return verifyReclamou;
};
