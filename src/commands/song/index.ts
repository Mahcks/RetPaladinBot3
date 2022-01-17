import axios from "axios";
import { Actions, CommonUserstate } from "tmi.js";
import config from "../../cfg/config";
export = {
  name: "song",
  aliases: [],
  permissions: [],
  globalCooldown: 10,
  cooldown: 30,
  description: "Get current song Esfand is playing through Spotify.",
  dynamicDescription: [
    "<code>!song</code>"
  ],
  testing: false,
  offlineOnly: false,
  code: async (client: Actions, channel: string, userstate: CommonUserstate, context: Array<string>) => { 
    const user = userstate["display-name"];

    const data = await axios({
      method: "GET",
      url: `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=mahcksimus&api_key=${config.apiKeys.last_fm}&format=json`
    });

    if (!data) return client.action(channel, `@${user} there was an issue fetching the current song!`);
    var recentSong = await data.data.recenttracks.track[0];
    client.action(channel, `@${user} current song: ${recentSong["name"]} ${recentSong["artist"]["#text"]}`);
  }
}