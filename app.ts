import * as slack from "@slack/bolt";
import * as axios from "axios";
import * as WebSocket from "ws";

// create bolt app
const app = new slack.App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

// Listens to incoming messages that contain "hello"
app.message("hello", async ({ message, say, body }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey there <@${message.ts}>!`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Testing Slack App Block Kit",
          },
          action_id: "button_click",
        },
      },
    ],
    text: `Hey there <@${message.channel}>!`,
  });
});

// / subscribe to 'app_mention' event in your App config
// need app_mentions:read and chat:write scopes
app.event("app_mention", async ({ event, context, client, say }) => {
  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Thanks for the mention <@${event.user}>! Here's a button`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Button",
            emoji: true,
          },
          value: "click_me_123",
          action_id: "first_button",
        },
      },
    ],
    text: `Hey there <@${event.username}>!`,
  });
});

app.action(
  "first_button",
  async ({ action, body, ack, say, respond, payload }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}>! Welcome to Slack Community Meetup`);
    await respond(`You selected <@${body.user.id}>`);
  }
);

app.action("button_click", async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}>! clicked the button`);
});

app.command("/test", async ({ ack, respond, say, body, command, payload }) => {
  await ack("We have acknowledged but we don' know what this do.");
  await say({
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "Slack Community Meetup",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*Type:*\nPaid Time Off",
          },
          {
            type: "mrkdwn",
            text: "*Created by:*\n Moulik Aggarwal",
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*When:*\nAug 10 - Aug 13",
          },
          {
            type: "mrkdwn",
            text: "*Type:*\nPaid time off",
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*Hours:*\n16.0 (2 days)",
          },
          {
            type: "mrkdwn",
            text: "*Remaining balance:*\n32.0 hours (4 days)",
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "<https://www.aggmoulik.me|View Moulik Aggarwal Website>",
        },
      },
    ],
    text: "We have called the test command from pull stack developer workspace",
  });
});

app.event("dnd_updated_user", async ({ event, say }) => {
  console.log(
    `Hey there <@${event.dnd_status.dnd_enabled ? "GoodBye" : "Welcome back"}>`
  );
  // await say({
  //   blocks: [
  //     {
  //       type: "section",
  //       text: {
  //         type: "mrkdwn",
  //         text: `Thanks for the mention <@${event.user}>! Here's a button`,
  //       },
  //     },
  //   ],
  //   text: `Hey there <@${
  //     event.dnd_status.dnd_enabled ? "GoodBye" : "Welcome back"
  //   }>`,
  // });
});

// Listening on port 3000
(async () => {
  let BEARER_TOKEN = `Bearer ${process.env.SLACK_APP_TOKEN}`;
  const WEB_SOCKET_URL = "https://slack.com/api/apps.connections.open";
  axios
    .default({
      method: "POST",
      url: WEB_SOCKET_URL,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: BEARER_TOKEN,
      },
    })
    .then((res) => {
      let data = res.data;
      if (data?.ok) {
        let wssUrl = data.url;
        let socket = new WebSocket.default(wssUrl);

        socket.onopen = function (e) {
          // connection established
          console.log(`connection established`);
        };

        socket.onmessage = function (event) {
          // application received message
          console.log(`application received message`);
        };

        socket.onerror = function (error) {
          console.log(error);
        };
      }
    });
  await app.start(3000);
  console.log("⚡️ Bolt app is running!");
})();
