const createReclamao = require('../data/mongodb/repositories/createReclamao.respository');
const getReclamaoModel = require('../data/mongodb/models/reclamao.model');
const addReclamacaoToReclamao = require('../data/mongodb/repositories/addReclamacaoToReclamao.repository');
module.exports = async ({ connection }) => {
  const reclamaoModel = await getReclamaoModel({ connection });

  const commands = {
    reclamou: async (args) => {
      const message = args?.message;
      const [reclamao, reclamou] = args.args;
      await addReclamacaoToReclamao({ model: reclamaoModel, reclamou, name: reclamao });
      return message.channel.send(`${reclamao} otario - ${Date.now() - message.createdTimestamp}ms`);
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

        default:
          break;
      }
    },
  };

  return commands;
};
