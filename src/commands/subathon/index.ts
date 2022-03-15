import { Actions, CommonUserstate } from "tmi.js";
import { getTarget } from "../../utils";
import { getEsfandTotalSubs, getFollowers } from "../../utils/helix";
import { findOne, findQuery } from "../../utils/maria";
import { CommandInt } from "../../validation/CommandSchema";
const subathon: CommandInt = {
  Name: "subathon",
  Aliases: [],
  Permissions: [],
  GlobalCooldown: 10,
  Cooldown: 30,
  Description: "How many more followers until subathon?",
  DynamicDescription: [
    "<code>!subathon</code>",
  ],
  Testing: false,
  OfflineOnly: false,
  OnlineOnly: false,
  Code: async (client: Actions, channel: string, userstate: CommonUserstate, context: Array<string>) => {
    const user = userstate["display-name"];
    let tagged = getTarget(user, context[0]);

    let query = await findQuery(`SELECT * FROM wheelspin`);
    let isPowerHour = query[0].IsPowerHour;
    let powerHour = (isPowerHour === "true") ? true : false;
    let res = `${(powerHour) ? "POWER HOUR!" : ""} ${(powerHour ? 40 : 20)} seconds per sub/$5/500 bits. Tier 2 is ${powerHour ? 40*2 : 20*2} seconds. Tier 3 is ${powerHour ? 40*5 : 20*5} seconds.`
    client.action(channel, `@${tagged} ${res}`);
    //client.action(channel, `@${tagged} Subathon is on pause while Esfand goes to L.A. for the streamer awards (March 12th @ 5pm PST). Timer is paused at 12h 9m 41s, donations and subs still add to the timer. Full details here: https://www.youtube.com/watch?v=uwgGPzYtoek`);
  }
}

export = subathon;