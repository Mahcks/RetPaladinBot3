import { Actions, CommonUserstate } from "tmi.js";
import { dateDiff } from "../../utils";
import { getUser } from "../../utils/helix";
import { CommandInt } from "../../validation/CommandSchema";

const accountAge: CommandInt = {
  name: "accountage",
  aliases: [],
  permissions: [],
  globalCooldown: 10,
  cooldown: 30,
  description: "Get your Twitch account age.",
  dynamicDescription: [
    "Check your own account age.",
    "<code>!accountage</code>",
    "",
    "Check another users account age.",
    "<code>!accountage (user)</code>",
  ],
  testing: false,
  offlineOnly: false,
  code: async (client: Actions, channel: string, userstate: CommonUserstate, context: Array<string>) => {
    const user = userstate["display-name"];
    let tagged = (context[0]) ? context[0] : user; 
    if (!tagged) return client.action(channel, "Error: User was not found.");
    tagged = (tagged.startsWith("@")) ? tagged.substring(1) : tagged;

    let accountInfo = await getUser(tagged);
    try {
      let foundDate = accountInfo["data"][0]["created_at"];
      let elapsed = dateDiff(new Date(), new Date(foundDate));
      if (tagged.toLowerCase() === userstate["displayname"]) {
        client.say(channel, `You created your account ${elapsed} ago`);
      } else {
        client.say(channel, `${tagged} created their account ${elapsed} ago`);
      }
    } catch (error) {
      client.say(channel, `@${user} sorry I couldn't find the account "${tagged}"`);
    }
  }
}

export = accountAge;