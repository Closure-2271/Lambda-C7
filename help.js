const { checkCheckpoint14 } = require('./checkpoint/checkpoint14');

async function sendHelp(interaction) {
  const isCheckpoint14Valid = await checkCheckpoint14();
  const commandsDescription = {
    "checkpoint14": {
      description: "获取最后遗愿 遭遇战[F] 的进度信息",
      isValid: isCheckpoint14Valid
    },
    // 其他命令可以在这里添加
  };

  let descriptionText = "以下是可用命令及其描述：\n";

  for (const [cmdName, cmdInfo] of Object.entries(commandsDescription)) {
    const statusEmoji = cmdInfo.isValid ? ":green_circle:" : ":red_circle:";
    descriptionText += `${statusEmoji} **${cmdName}**: ${cmdInfo.description}\n`;
  }

  await interaction.followUp(descriptionText);
}

module.exports = { sendHelp };
