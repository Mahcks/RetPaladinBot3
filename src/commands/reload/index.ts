import { Actions, CommonUserstate } from "tmi.js";
export = {
  name: "reload",
  aliases: [],
  permissions: ["developer"],
  globalCooldown: 10,
  cooldown: 30,
  description: "",
  dynamicDescription: [
    "<code></code>"
  ],
  testing: false,
  offlineOnly: false,
  code: async (client: Actions, channel: string, userstate: CommonUserstate, context: Array<string>) => {

  }
}