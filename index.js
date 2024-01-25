const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { token, clientId } = require('./config.json');
const { Checkpoint14 } = require('./checkpoint/checkpoint14');
const { Checkpoint99 } = require('./checkpoint/checkpoint99');
const { Checkpoint11 } = require('./checkpoint/checkpoint11');
const { Checkpoint33 } = require('./checkpoint/checkpoint33');
const { Checkpoint63 } = require('./checkpoint/checkpoint63');
const { Checkpoint132 } = require('./checkpoint/checkpoint132');
const { Checkpoint142 } = require('./checkpoint/checkpoint142');
const { Checkpoint172 } = require('./checkpoint/checkpoint172');
const { Checkpoint182} = require('./checkpoint/checkpoint182');
const { Checkpoint193 } = require('./checkpoint/checkpoint193');
const { Checkpoint233 } = require('./checkpoint/checkpoint233');
const { Checkpoint243 } = require('./checkpoint/checkpoint243');
const { Checkpoint252 } = require('./checkpoint/checkpoint252');
const { Checkpoint262 } = require('./checkpoint/checkpoint262');

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
    .setName('checkpoint132')
    .setDescription('获取二象性 遭遇战[查厄托的梦魇] 的进度信息'),
  new SlashCommandBuilder()
    .setName('checkpoint142')
    .setDescription('获取二象性 遭遇战[查厄托的梦魇 - 传说] 的进度信息'),
  new SlashCommandBuilder()
    .setName('checkpoint193')
    .setDescription('获取梦魇根源 遭遇战[奈扎雷克] 的进度信息'),
  new SlashCommandBuilder()
    .setName('checkpoint233')
    .setDescription('获取克洛塔之死 遭遇战[克洛塔] 的进度信息'),
  new SlashCommandBuilder()
    .setName('checkpoint243')
    .setDescription('获取克洛塔之死 遭遇战[克洛塔 - 传说] 的进度信息'),
  new SlashCommandBuilder()
    .setName('checkpoint252')
    .setDescription('获取战争领主的废墟 遭遇战[赫芬德的复仇] 的进度信息'),
  new SlashCommandBuilder()
    .setName('checkpoint262')
    .setDescription('获取战争领主的废墟 遭遇战[赫芬德的复仇 - 传说] 的进度信息'),
    new SlashCommandBuilder()
    .setName('checkpoint33')
    .setDescription('获取救赎花园 遭遇战[圣洁首脑] 的进度信息'),
    new SlashCommandBuilder()
    .setName('checkpoint172')
    .setDescription('获取守望者尖塔 遭遇战[珀塞斯] 的进度信息 的进度信息'),
    new SlashCommandBuilder()
    .setName('checkpoint182')
    .setDescription('获取守望者尖塔 遭遇战[珀塞斯 - 传说] 的进度信息 的进度信息'),
  new SlashCommandBuilder()
    .setName('checkpoint99')
    .setDescription('获取 <blank> 的进度信息'),
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
    } 
    else if (interaction.commandName === 'checkpoint14') {
      await Checkpoint14(interaction);
    } 
    else if (interaction.commandName === 'checkpoint33') {
      await Checkpoint33(interaction);
    } 
    else if (interaction.commandName === 'checkpoint99') {
      await Checkpoint99(interaction);
    } 
    else if (interaction.commandName === 'checkpoint63') {
      await Checkpoint63(interaction);
    } 
    else if (interaction.commandName === 'help-c7') {
      await sendHelp(interaction);
    } 
    else if (interaction.commandName === 'checkpoint132') {
      await Checkpoint132(interaction);
    } 
    else if (interaction.commandName === 'checkpoint142') {
      await Checkpoint142(interaction);
    } 
    else if (interaction.commandName === 'checkpoint172') {
      await Checkpoint172(interaction);
    } 
    else if (interaction.commandName === 'checkpoint182') {
      await Checkpoint182(interaction);
    } 
    else if (interaction.commandName === 'checkpoint193') {
      await Checkpoint193(interaction);
    } 
    else if (interaction.commandName === 'checkpoint233') {
      await Checkpoint233(interaction);
    } 
    else if (interaction.commandName === 'checkpoint243') {
      await Checkpoint243(interaction);
    } 
    else if (interaction.commandName === 'checkpoint252') {
      await Checkpoint252(interaction);
    } 
    else if (interaction.commandName === 'checkpoint262') {
      await Checkpoint262(interaction);
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
