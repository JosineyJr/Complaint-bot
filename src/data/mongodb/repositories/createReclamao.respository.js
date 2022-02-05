const findReclamaoByName = require('./findReclamaoByName.repository');

module.exports = async ({ model, createReclamaoDTO }) => {
  const reclamao = await findReclamaoByName({ model, name: createReclamaoDTO.nome });
  if (reclamao) {
    return { error: `Reclamao ${createReclamaoDTO.nome} already exists` };
  }
  const createdReclamao = new model(createReclamaoDTO);

  return createdReclamao.save();
};
