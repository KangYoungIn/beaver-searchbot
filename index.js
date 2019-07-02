const botkit = require('botkit');  //봇 모듈
const slack = require('slack-node');
const dotenv = require('dotenv');
const token = process.env.TOKEN;

const controller = botkit.slackbot({
    debug: false,
    log: true
});

const botScope = [
    'direct_message',
    'direct_mention',
    'metion'
];

controller.hears(['위키', 'wiki'], botScope, (bot, message) => {
    bot.reply(message, 'http://wiki.mapcloud.co.kr');
});

controller.hears(['깃헙', '깃허브', 'github'], botScope, (bot, message) => {
    bot.reply(message, 'https://github.com/kangyoungin/beaver.git');
});

controller.hears(['putty', '푸티'], botScope, (bot, message) => {
    bot.reply(message, 'https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html');
});

controller.hears(['mremote', '원격접속툴'], botScope, (bot, message) => {
    bot.reply(message, 'https://www.mapcloud.co.kr/index.php/s/wOCwLSxm1V68rhT/download');
});

controller.hears(['됴니생일', '지원이생일'], botScope, (bot, message) => {
    bot.reply(message, '1994년 11월 4일입니다.');
});


controller.hears(['요니생일', '영인이생일'], botScope, (bot, message) => {
    bot.reply(message, '1992년 11월 2일입니다.');
});

controller.spawn({
    token: token
}).startRTM();
