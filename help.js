const { checkCheckpoint14 } = require('./checkpoint/checkpoint14');
const { checkCheckpoint99 } = require('./checkpoint/checkpoint99');
const { EmbedBuilder } = require('discord.js');

async function sendHelp(interaction) {
  const isCheckpoint14Valid = await checkCheckpoint14();
  const isCheckpoint99Valid = await checkCheckpoint99();
  const commandsDescription = {
    "checkpoint14": {
      description: "获取最后遗愿 遭遇战[F] 的进度信息",
      isValid: isCheckpoint14Valid
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
  embed.setColor(0x0099ff);

  for (const [cmdName, cmdInfo] of Object.entries(commandsDescription)) {
    const statusEmoji = cmdInfo.isValid ? ":green_circle:" : ":red_circle:";
    embed.addFields({ name: `${statusEmoji} ${cmdName}`, value: cmdInfo.description });
  }

  await interaction.followUp({ embeds: [embed] });
  await interaction.followUp('由于 Discord 本身的限制，请手动复制命令。');
}

module.exports = { sendHelp };
