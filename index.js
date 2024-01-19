const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const puppeteer = require('puppeteer');
const { token, clientId } = require('./config.json');

const commands = [
  new SlashCommandBuilder()
    .setName('checkpoint11')
    .setDescription('获取最后遗愿 遭遇战[2] 的进度信息')
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

  if (interaction.commandName === 'checkpoint11') {
    try {
      await interaction.deferReply();

      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();
      await page.goto('https://d2checkpoint.com/', { waitUntil: 'networkidle0' });

      const data = await page.evaluate(() => {
        const element = document.querySelector('[id="11"]');
        if (!element) return null;

        const imageUrl = element.querySelector('.card-img-top')?.src;
        const raidName = element.querySelector('.card-title span')?.textContent.trim();
        const bossName = element.querySelector('.card-subtitle span')?.textContent.trim();
        const fireteamCount = element.querySelector('.text-warning.small')?.textContent.trim();
        const additionalText = element.querySelector('.card-text')?.textContent.trim();
        return { imageUrl, raidName, bossName, fireteamCount, additionalText };
      });

      await browser.close();

      if (!data) {
        await interaction.followUp('未找到相关信息。');
        return;
      }
      // 创建一个普通的 embed 对象
      const color = parseInt('0099ff', 16);
      const embed = {
        color: color,
        title: data.raidName + " - " + data.bossName,
        description: `**Fireteam Count**: ${data.fireteamCount}\n${data.additionalText}`,
        image: { url: data.imageUrl },
      };

      await interaction.followUp({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching data:', error.message);
      if (interaction.deferred || interaction.replied) {
        await interaction.followUp('在获取数据时发生错误。').catch(console.error);
      } else {
        await interaction.reply('在获取数据时发生错误。').catch(console.error);
      }
    }
  }
});

client.login(token);
