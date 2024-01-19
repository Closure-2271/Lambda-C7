const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const puppeteer = require('puppeteer');

async function Checkpoint142(interaction) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto('https://d2checkpoint.com/', { waitUntil: 'networkidle0' });

  const data = await page.evaluate(() => {
    const element = document.querySelector('[id="142"]');
    if (!element) return null;

    const imageUrl = element.querySelector('.card-img-top')?.src;
    const raidName = element.querySelector('.card-title span')?.textContent.trim();
    const bossName = element.querySelector('.card-subtitle span')?.textContent.trim();
    let fireteamCount = element.querySelector('.text-success.small')?.textContent.trim() ||
                        element.querySelector('.text-warning.small')?.textContent.trim() ||
                        element.querySelector('.text-danger.small')?.textContent.trim();
    const additionalText = element.querySelector('.card-text')?.textContent.trim();
    return { imageUrl, raidName, bossName, fireteamCount, additionalText };
  });

  await browser.close();

  if (!data) {
    await interaction.followUp('未找到相关信息');
    return;
  }

  const color = parseInt('34DB98', 16);
  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(data.raidName + " - " + data.bossName)
    .setDescription(`**Fireteam Count**: ${data.fireteamCount}` + (data.additionalText ? `\n\n${data.additionalText}` : ''))
    .setImage(data.imageUrl);

  const button = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('copy')
        .setLabel('复制内容')
        .setStyle(ButtonStyle.Primary),
    );

  await interaction.followUp({ embeds: [embed], components: [button] });

  // 发送额外的信息
  if (data.additionalText) {
    await interaction.followUp('/j '+data.additionalText);
  }
}

async function checkCheckpoint142() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto('https://d2checkpoint.com/', { waitUntil: 'networkidle0' });

  const elementExists = await page.evaluate(() => {
    const element = document.querySelector('[id="142"]');
    return element !== null;
  });

  await browser.close();
  return elementExists;
}
module.exports = { Checkpoint142, checkCheckpoint142 };
