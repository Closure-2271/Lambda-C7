const { checkCheckpoint14 } = require('./checkpoint/checkpoint14');
const { checkCheckpoint99 } = require('./checkpoint/checkpoint99');
const { checkCheckpoint11 } = require('./checkpoint/checkpoint11');
const { checkCheckpoint63 } = require('./checkpoint/checkpoint63');
const { EmbedBuilder } = require('discord.js');

async function sendHelp(interaction) {
  const isCheckpoint14Valid = await checkCheckpoint14();
  const isCheckpoint99Valid = await checkCheckpoint99();
  const isCheckpoint11Valid = await checkCheckpoint11();
  const isCheckpoint63Valid = await checkCheckpoint63();

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
