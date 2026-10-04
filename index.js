const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/ping', (req, res) => {
    res.status(200).send("OK");
});

app.listen(PORT, () => {
    console.log(`Web server đang chạy trên port ${PORT}`);
});

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const HUG_MESSAGES = [
    "{nguoi_hon} vừa hôn {nguoi_nhan} một cái thật kêu! chuuu~ 😘💋"
];

const fireGifs = [
    "https://static2.klipy.com/ii/4493325008d34b7bf8cd6813cd5c1619/44/f0/ALd4Vf2IrxRxTR6x5b8.gif"
];

client.once('ready', () => {
    console.log(`Bot đã sẵn sàng: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith('!hon')) return;

    const args = message.content.slice(4).trim();
    
    if (!args) {
        return message.channel.send(`<@${message.author.id}> muốn hôn ai đó nhưng lại chưa nói tên! 😳`);
    }

    const randomGif = fireGifs[Math.floor(Math.random() * fireGifs.length)];
    const randomMessage = HUG_MESSAGES[Math.floor(Math.random() * HUG_MESSAGES.length)]
        .replace("{nguoi_hon}", `<@${message.author.id}>`)
        .replace("{nguoi_nhan}", args);

    const embed = new EmbedBuilder()
        .setDescription(randomMessage)
        .setColor("#FF69B4")
        .setImage(randomGif)
        .setFooter({ text: "Sướng nhá :)))" })
        .setTimestamp();

    message.channel.send({ embeds: [embed] });
});

client.login(process.env.DISCORD_TOKEN);


