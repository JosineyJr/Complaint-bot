module.exports = async ({ model, name }) => {
  const [reclamao] = await model
    .aggregate([
      {
        $match: {
          nome: name,
        },
      },
      {
        $project: {
          name: '$nome',
          reclamacoes: '$reclamou',
        },
      },
    ])
    .exec();

  return reclamao;
};
