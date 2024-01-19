const { checkCheckpoint14 } = require('./checkpoint/checkpoint14');
const { checkCheckpoint99 } = require('./checkpoint/checkpoint99');
const { checkCheckpoint11 } = require('./checkpoint/checkpoint11');
const { checkCheckpoint63 } = require('./checkpoint/checkpoint63');
const { checkCheckpoint132 } = require('./checkpoint/checkpoint132');
const { checkCheckpoint142 } = require('./checkpoint/checkpoint142');
const { checkCheckpoint193 } = require('./checkpoint/checkpoint193');
const { checkCheckpoint233 } = require('./checkpoint/checkpoint233');
const { checkCheckpoint243 } = require('./checkpoint/checkpoint243');
const { checkCheckpoint252 } = require('./checkpoint/checkpoint252');
const { checkCheckpoint262 } = require('./checkpoint/checkpoint262');
const { EmbedBuilder } = require('discord.js');

async function sendHelp(interaction) {
  const isCheckpoint14Valid = await checkCheckpoint14();
  const isCheckpoint99Valid = await checkCheckpoint99();
  const isCheckpoint11Valid = await checkCheckpoint11();
  const isCheckpoint63Valid = await checkCheckpoint63();
  const isCheckpoint132Valid = await checkCheckpoint132();
  const isCheckpoint142Valid = await checkCheckpoint142();
  const isCheckpoint193Valid = await checkCheckpoint193();
  const isCheckpoint233Valid = await checkCheckpoint233();
  const isCheckpoint243Valid = await checkCheckpoint243();
  const isCheckpoint252Valid = await checkCheckpoint252();
  const isCheckpoint262Valid = await checkCheckpoint262();

  const commandsDescription = {
    "checkpoint11": {
        description: "获取最后遗愿 遭遇战[秋露·只] 的进度信息",
        isValid: isCheckpoint11Valid
      },
    "checkpoint14": {
      description: "获取最后遗愿 遭遇战[瑞文] 的进度信息",
      isValid: isCheckpoint14Valid
    },
    "checkpoint63": {
        description: "获取深石地窖 遭遇战[坦尼克斯] 的进度信息",
        isValid: isCheckpoint63Valid
      },
      "checkpoint132": {
        description: "获取二象性 遭遇战[查厄托的梦魇] 的进度信息",
        isValid: isCheckpoint132Valid
      },
      "checkpoint142": {
        description: "获取二象性 遭遇战[查厄托的梦魇 - 传说] 的进度信息",
        isValid: isCheckpoint142Valid
      },
      "checkpoint193": {
        description: "获取梦魇根源 遭遇战[奈扎雷克] 的进度信息",
        isValid: isCheckpoint193Valid
      },
      "checkpoint233": {
        description: "获取克洛塔之死 遭遇战[克洛塔] 的进度信息",
        isValid: isCheckpoint233Valid
      },
      "checkpoint243": {
        description: "获取克洛塔之死 遭遇战[克洛塔 - 传说] 的进度信息",
        isValid: isCheckpoint243Valid
      },
      "checkpoint252": {
        description: "获取战争领主的废墟 遭遇战[赫芬德的复仇] 的进度信息",
        isValid: isCheckpoint252Valid
      },
      "checkpoint262": {
        description: "获取战争领主的废墟 遭遇战[赫芬德的复仇 - 传说] 的进度信息",
        isValid: isCheckpoint262Valid
      },      
    "checkpoint99": {
      description: "获取 <blank> test 的进度信息",
      isValid: isCheckpoint99Valid
    },
    // 其他命令
  };

  const embed = new EmbedBuilder();
  embed.setTitle("可用命令列表");
  embed.setDescription("以下是可用命令及其描述：");
  embed.setColor(0x34DB98);

  for (const [cmdName, cmdInfo] of Object.entries(commandsDescription)) {
    const statusEmoji = cmdInfo.isValid ? ":green_circle:" : ":red_circle:";
    embed.addFields({ name: `${statusEmoji} ${cmdName}`, value: cmdInfo.description });
  }

  await interaction.followUp({ embeds: [embed] });
  await interaction.followUp('由于 Discord 本身的限制，请手动复制命令。');
}

module.exports = { sendHelp };
