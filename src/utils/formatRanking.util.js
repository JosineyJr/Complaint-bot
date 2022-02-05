module.exports = ({ ranking }) => {
  let formattedRanking = '';
  for (const [podiumIndex, podium] of Object.entries(ranking)) {
    formattedRanking += `${parseInt(podiumIndex) + 1} - reclamao: ${podium.nome} - reclamacoes: ${podium.reclamou}\n`;
  }
  return formattedRanking;
};
