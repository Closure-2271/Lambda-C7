const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { token, clientId } = require('./config.json');
const { Checkpoint14 } = require('./checkpoint/checkpoint14'); // 引入 catchinfo.js 中的函数
const { sendHelp } = require('./help');

const commands = [
  new SlashCommandBuilder()
    .setName('checkpoint14')
    .setDescription('获取最后遗愿 遭遇战[F] 的进度信息'),
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('显示所有命令及其描述')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('开始注册全局命令...');

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );

    console.log('全局命令注册成功！');
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  try {
    await interaction.deferReply(); // 延迟回复，避免交互超时

    if (interaction.commandName === 'checkpoint14') {
      await Checkpoint14(interaction);
    } else if (interaction.commandName === 'help') {
      await sendHelp(interaction);
    }
  } catch (error) {
    console.error('Error handling interaction:', error);
    await interaction.followUp('处理命令时发生错误。');
  }
});

client.login(token);
