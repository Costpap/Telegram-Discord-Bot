module.exports = {
	name: "ping",
	description: "Checks the Server response time, API response time, and Uptime of the bot",
	async execute(client, message, args) {
		if (message.channel.type !== 'dm'){
			if (!message.channel.permissionsFor(client.user).has("EMBED_LINKS")) {
				return message.channel.send(
					"Oops I don't have permission to embed messages, please contact the admins about this",
				);
			}
		}
		let botMsg = await message.channel.send("〽️ Pinging");

		botMsg
			.edit("", {
				embed: {
					title: "🏓 Ping",
					description: [
						"**Server**: `" + (botMsg.createdAt - message.createdAt) + "ms`",
						"**API**: `" + Math.round(client.ws.ping) + "ms`",
						"**Uptime**: `" + msToTime(client.uptime) + "`",
					].join("\n"),
					footer: {
						text: "Requested by " + message.author.tag,
						icon_url: message.author.displayAvatarURL,
					},
					color: "#0088cc",
					timestamp: new Date(),
				},
			})
			.catch(() => botMsg.edit("An unknown error occurred."));

		function msToTime(ms) {
			let days = Math.floor(ms / 86400000);
			let daysms = ms % 86400000;
			let hours = Math.floor(daysms / 3600000);
			let hoursms = ms % 3600000;
			let minutes = Math.floor(hoursms / 60000);
			let minutesms = ms % 60000;
			let sec = Math.floor(minutesms / 1000);

			let str = "";
			if (days) str = str + days + "d ";
			if (hours) str = str + hours + "h ";
			if (minutes) str = str + minutes + "m ";
			if (sec) str = str + sec + "s";

			return str;
		}
	},
};
