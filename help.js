const { checkCheckpoint14 } = require('./checkpoint/checkpoint14');
const { checkCheckpoint99 } = require('./checkpoint/checkpoint99');
const { checkCheckpoint11 } = require('./checkpoint/checkpoint11');
const { checkCheckpoint33 } = require('./checkpoint/checkpoint33');
const { checkCheckpoint63 } = require('./checkpoint/checkpoint63');
const { checkCheckpoint132 } = require('./checkpoint/checkpoint132');
const { checkCheckpoint142 } = require('./checkpoint/checkpoint142');
const { checkCheckpoint172 } = require('./checkpoint/checkpoint172');
const { checkCheckpoint182 } = require('./checkpoint/checkpoint182');
const { checkCheckpoint193 } = require('./checkpoint/checkpoint193');
const { checkCheckpoint233 } = require('./checkpoint/checkpoint233');
const { checkCheckpoint243 } = require('./checkpoint/checkpoint243');
const { checkCheckpoint252 } = require('./checkpoint/checkpoint252');
const { checkCheckpoint262 } = require('./checkpoint/checkpoint262');
const { EmbedBuilder } = require('discord.js');

let lastUpdated = null;
let checkpointStatusCache = null;

async function updateCheckpointStatus() {
  const checkResults = await Promise.all([
    checkCheckpoint14(),
    checkCheckpoint99(),
    checkCheckpoint11(),
    checkCheckpoint33(),
    checkCheckpoint63(),
    checkCheckpoint132(),
    checkCheckpoint142(),
    checkCheckpoint172(),
    checkCheckpoint182(),
    checkCheckpoint193(),
    checkCheckpoint233(),
    checkCheckpoint243(),
    checkCheckpoint252(),
    checkCheckpoint262(),
  ]);

  checkpointStatusCache = [
    { name: "checkpoint14", description: "获取最后遗愿 遭遇战[瑞文] 的进度信息", isValid: checkResults[0] },
    { name: "checkpoint99", description: "获取 <blank> 的进度信息", isValid: checkResults[1] },
    { name: "checkpoint11", description: "获取最后遗愿 遭遇战[秋露·只] 的进度信息", isValid: checkResults[2] },
    { name: "checkpoint63", description: "获取深石地窖 遭遇战[坦尼克斯] 的进度信息", isValid: checkResults[3] },
    { name: "checkpoint132", description: "获取二象性 遭遇战[查厄托的梦魇] 的进度信息", isValid: checkResults[4] },
    { name: "checkpoint142", description: "获取二象性 遭遇战[查厄托的梦魇 - 传说] 的进度信息", isValid: checkResults[5] },
    { name: "checkpoint193", description: "获取梦魇根源 遭遇战[奈扎雷克] 的进度信息", isValid: checkResults[6] },
    { name: "checkpoint233", description: "获取克洛塔之死 遭遇战[克洛塔] 的进度信息", isValid: checkResults[7] },
    { name: "checkpoint243", description: "获取克洛塔之死 遭遇战[克洛塔 - 传说] 的进度信息", isValid: checkResults[8] },
    { name: "checkpoint252", description: "获取战争领主的废墟 遭遇战[赫芬德的复仇] 的进度信息", isValid: checkResults[9] },
    { name: "checkpoint262", description: "获取战争领主的废墟 遭遇战[赫芬德的复仇 - 传说] 的进度信息", isValid: checkResults[10] },
    { name: "checkpoint33", description: "获取救赎花园 遭遇战[圣洁首脑] 的进度信息", isValid: checkResults[11] },
    { name: "checkpoint172", description: "获取守望者尖塔 遭遇战[珀塞斯] 的进度信息", isValid: checkResults[12] },
    { name: "checkpoint182", description: "获取守望者尖塔 遭遇战[珀塞斯 - 传说] 的进度信息", isValid: checkResults[13] },
  ];

  lastUpdated = new Date();
}

async function sendHelp(interaction) {
  if (!checkpointStatusCache || !lastUpdated) {
    await updateCheckpointStatus();  // 如果没有缓存或缓存失效，更新状态
  }

  const embed = new EmbedBuilder();
  embed.setTitle(`可用命令列表 (缓存更新时间: ${lastUpdated.toLocaleString()})`);
  embed.setDescription("以下是可用命令及其描述：");
  embed.setColor(0x34DB98);
  embed.setFooter({ text: `上次缓存更新时间: ${lastUpdated.toLocaleString()}` });

  for (const checkpoint of checkpointStatusCache) {
    const statusEmoji = checkpoint.isValid ? ":green_circle:" : ":red_circle:";
    embed.addFields({ name: `${statusEmoji} ${checkpoint.name}`, value: checkpoint.description });
  }

  await interaction.followUp({ embeds: [embed] });
}

setInterval(updateCheckpointStatus, 3600000); // 3600000 毫秒 = 1 小时

// 初始化状态
updateCheckpointStatus();

module.exports = { sendHelp };
