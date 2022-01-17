import { Actions, CommonUserstate } from "tmi.js";
import { getEmotes } from "../../utils/emotes";
import { getEventSubs } from "../../utils/EventSub";

export = {
  name: "debug",
  aliases: ["developer"],
  permissions: [],
  globalCooldown: 10,
  cooldown: 30,
  description: "Debugger for the bot.",
  dynamicDescription: [
    "<code></code>"
  ],
  testing: false,
  offlineOnly: false,
  code: async (client: Actions, channel: string, userstate: CommonUserstate, context: Array<string>) => {
    if (context[0] === "emotes") {
      await getEmotes();
      client.action(channel, `@${userstate["display-name"]} emotes have been updated!`);

    } else if (context[0] === "say") {
      context.shift();
      client.say(channel, `${context.join(" ")}`);

    } else if (context[0] === "action") {
      context.shift();
      client.action(channel, `${context.join(' ')}`);

    } else if (context[0] === "eventsub") {
      var eventSub = await getEventSubs();
      console.log(eventSub["data"]);
    }
  }
}