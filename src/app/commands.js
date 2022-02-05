const createReclamao = require('../data/mongodb/repositories/createReclamao.respository');
const getReclamaoModel = require('../data/mongodb/models/reclamao.model');
module.exports = async ({ connection }) => {
  const reclamaoModel = await getReclamaoModel({ connection });

  const commands = {
    reclamou: (args) => {
      const message = args?.message;
      const [reclamao] = args.args;
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
