const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { token, clientId } = require('./config.json');
const { Checkpoint14 } = require('./checkpoint/checkpoint14');
const { Checkpoint99 } = require('./checkpoint/checkpoint99');
const { Checkpoint11 } = require('./checkpoint/checkpoint11');
const { Checkpoint63 } = require('./checkpoint/checkpoint63');

const { sendHelp } = require('./help');
const  setStatus  = require('./status')

const commands = [
    new SlashCommandBuilder()
    .setName('checkpoint11')
    .setDescription('获取最后遗愿 遭遇战[秋露·只] 的进度信息'),
  new SlashCommandBuilder()
    .setName('checkpoint14')
    .setDescription('获取最后遗愿 遭遇战[瑞文] 的进度信息'),
    new SlashCommandBuilder()
    .setName('checkpoint63')
    .setDescription('获取深石地窖 遭遇战[坦尼克斯] 的进度信息'),
    new SlashCommandBuilder()
    .setName('checkpoint99')
    .setDescription('获取 <blank> test 的进度信息'),
  new SlashCommandBuilder()
    .setName('help-c7')
    .setDescription('检查可用的进度机器人目录')
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
  setStatus(client);
});
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  try {
    await interaction.deferReply(); // 延迟回复，避免交互超时
    
    if (interaction.commandName === 'checkpoint11') {
      await Checkpoint11(interaction);
    } else if (interaction.commandName === 'checkpoint14') {
      await Checkpoint14(interaction);
    } else if (interaction.commandName === 'checkpoint99') {
      await Checkpoint99(interaction);
    } else if (interaction.commandName === 'checkpoint63') {
      await Checkpoint63(interaction);
    } else if (interaction.commandName === 'help-c7') {
      await sendHelp(interaction);
    }
    else if (interaction.commandName === 'help-c7') {
      await sendHelp(interaction);
    }
    
  } catch (error) {
    console.error('Error handling interaction:', error);
    await interaction.followUp('处理命令时发生错误。');
  }
  
});

client.login(token);
