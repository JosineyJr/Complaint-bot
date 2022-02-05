module.exports = async ({ model }) => {
  const ranking = await model.find({}).sort({ reclamou: -1 });

  return ranking
};
