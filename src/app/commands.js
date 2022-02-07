const createReclamao = require('../data/mongodb/repositories/createReclamao.respository');
const getReclamaoModel = require('../data/mongodb/models/reclamao.model');
const addReclamacaoToReclamao = require('../data/mongodb/repositories/addReclamacaoToReclamao.repository');
const getReclamaoRankig = require('../data/mongodb/repositories/rankingReclamoes.repository');

module.exports = async ({ connection }) => {
  const reclamaoModel = await getReclamaoModel({ connection });

  const commands = {
    reclamou: async (args) => {
      const message = args?.message;
      const [reclamao, reclamou] = args.args;
      const addReclamacao = await addReclamacaoToReclamao({ model: reclamaoModel, reclamou, name: reclamao });

      if (addReclamacao.error) return message.channel.send(`${addReclamacao.error} - ${Date.now() - message.createdTimestamp}ms`);

      return message.channel.send(`Added ${addReclamacao} to ${reclamao} - ${Date.now() - message.createdTimestamp}ms`);
    },
    reclamao: async (args) => {
      const message = args?.message;
      const [option, nome] = args.args;

      switch (option) {
        case '-c':
          const reclamao = await createReclamao({ model: reclamaoModel, createReclamaoDTO: { nome } });
          if (reclamao.error) {
            return message.channel.send(`${reclamao.error} - ${Date.now() - message.createdTimestamp}ms`);
          }
          return message.channel.send(`reclamao ${nome} created - ${Date.now() - message.createdTimestamp}ms`);

        case '-r':
          const ranking = await getReclamaoRankig({ model: reclamaoModel });
          const formattedRanking = require('../utils/formatRanking.util')({ ranking });
          return message.channel.send(`${formattedRanking}${Date.now() - message.createdTimestamp}ms`);
      }
    },
  };

  return commands;
};
