const { ActivityType } = require('discord.js');

const setStatus = (client) => {
  // 初始状态
  let index = 0;
  
  const setActivity = () => {
    const statuses = [
      '/help-c7 获取进度机器人!',
      '最喜欢可露希尔小姐...',
    ];

    client.user.setActivity({
      type: ActivityType.Custom,
      name: 'customstatis',
      state: statuses[index],
    });

    index = (index + 1) % statuses.length;
  };
  setInterval(setActivity, 7000);

  // 初始设置
  setActivity();
};

module.exports = setStatus;
