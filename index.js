const APPLICATION_ID = process.env.APPLICATION_ID 
const TOKEN = process.env.TOKEN 
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
const GUILD_ID = process.env.GUILD_ID 

const Discord = require('discord.js');
const Pinger = new Discord.Client();

const config = {

  "prefix": "unitaz", //Add your prefix here

  "ownerOnly": true, //If set to true, only bot owner can control Pinger. If set to false, everyone can use Pinger.

  "ownerID": "1012802456066981908", //Id of bot owner for "ownerOnly" function.

  "channelName": "1090253504251179080", //Name of channel, where will be all pings sent.

  "pingInterval": "1000", //Time in ms (miliseconds). 1000 recommended - If 1000ms (1s), bot will send ping every 1000ms (1s).

  "token": "MTA5MDI1MDc4MDM2NTI5OTczMg.GKgcs9.ZD6D7efzpbdYIRUqM3_s2Okq6J8jdEN_yUZKV4" //Bot token from discord app.

}

Pinger.on('ready', async () => {
    Pinger.user.setActivity('Iam normal bot :kappa:');
    console.log(`${Pinger.user.username} is online!`);
});

Pinger.on('message', async message => {
    let prefix = config.prefix;
    if (!message.content.startsWith(prefix)) return;

    async function init() {
        console.log(1)
        await sleep(1000)
        console.log(2)
    }

    function sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }

    if (config.ownerOnly == true && message.author.id !== config.ownerID) {
        return;
    } else {

        if (message.content.startsWith(prefix + "ping")) {
            let user = message.mentions.users.first();
            if (!user) return message.channel.send(`**${message.author.username}**, you must mention someone!`);

            message.channel.send(`**${message.author.username}**, ping on **${user.tag}** started!`);
            Pinger.user.setActivity(`Pinging: ${user.tag}`);
            console.log(`Started pinging on: ${user.tag}!`)


            interval = setInterval(async () => {

                let pingChannel = Pinger.channels.find(c => c.name === `${config.channelName}`);
                if (!pingChannel) {
                    await message.guild.createChannel(`${config.channelName}`).then(c => {
                        console.log(`Channel not found. Created new one.\nName: ${c.name}\nID: ${c.id}`);
                        c.send(`<@${user.id}>`);
                    });
                } else {
                    pingChannel.send(`<@${user.id}>`);
                }


            }, config.pingInterval);
        };

        if (message.content.startsWith(prefix + "stop")) {
            await message.channel.send(`**${message.author.username}**, stopping pinging!`);
            await clearInterval(interval);
            await sleep(5000);
            await message.channel.send(`**${message.author.username}**, stopped pinging successfully!`);
            await Pinger.user.setActivity("Iam normal bot :kappa:")
            console.log(`Stopped pinging by: ${message.author.tag}`);

        }
    }
});

Pinger.login(config.token);
