import http from "http";
import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const PORT = process.env.PORT || 10000;
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Bot is running ✅");
  })
  .listen(PORT, () => console.log("Health server running on port", PORT));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("guildMemberAdd", (member) => {
  const channelId = "1436954627798077585";
  const channel = member.guild.channels.cache.get(channelId);

  if (!channel) return;
  channel.send(
    `Welcome ${member}! 🎉\nMake sure to read the rules and enjoy your stay 🙂`,
  );
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === "hi")
    return message.reply({ content: `Namaste ${message.author.username}!` });

  if (message.content.toLowerCase().replace(" ", "") === "kcha")
    return message.reply({ content: "Sab thik cha!" });
});

client.on("interactionCreate", (interaction) => {
  if (interaction.commandName === "website")
    return interaction.reply({
      content: "https://dev.tools.solanaskypilots.com/",
    });

  interaction.reply({ content: "Pong!" });
});

client.on("guildMemberRemove", (member) => {
  const channelId = "1436954627798077585";
  const channel = member.guild.channels.cache.get(channelId);

  if (!channel) return;
  console.log(member);
  channel.send(`${member} lai bagaidiye!`);
});

client.login(process.env.DISCORD_TOKEN);
