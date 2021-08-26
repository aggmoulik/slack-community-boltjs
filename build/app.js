"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var slack = __importStar(require("@slack/bolt"));
var axios = __importStar(require("axios"));
var WebSocket = __importStar(require("ws"));
// create bolt app
var app = new slack.App({
    token: process.env.SLACK_BOT_TOKEN,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
});
// Listens to incoming messages that contain "hello"
app.message("hello", function (_a) {
    var message = _a.message, say = _a.say, body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: 
                // say() sends a message to the channel where the event was triggered
                return [4 /*yield*/, say({
                        blocks: [
                            {
                                type: "section",
                                text: {
                                    type: "mrkdwn",
                                    text: "Hey there <@" + message.ts + ">!",
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
                        text: "Hey there <@" + message.channel + ">!",
                    })];
                case 1:
                    // say() sends a message to the channel where the event was triggered
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
// / subscribe to 'app_mention' event in your App config
// need app_mentions:read and chat:write scopes
app.event("app_mention", function (_a) {
    var event = _a.event, context = _a.context, client = _a.client, say = _a.say;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, say({
                        blocks: [
                            {
                                type: "section",
                                text: {
                                    type: "mrkdwn",
                                    text: "Thanks for the mention <@" + event.user + ">! Here's a button",
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
                        text: "Hey there <@" + event.username + ">!",
                    })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
app.action("first_button", function (_a) {
    var action = _a.action, body = _a.body, ack = _a.ack, say = _a.say, respond = _a.respond, payload = _a.payload;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: 
                // Acknowledge the action
                return [4 /*yield*/, ack()];
                case 1:
                    // Acknowledge the action
                    _b.sent();
                    return [4 /*yield*/, say("<@" + body.user.id + ">! Welcome to Slack Community Meetup")];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, respond("You selected <@" + body.user.id + ">")];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
app.action("button_click", function (_a) {
    var body = _a.body, ack = _a.ack, say = _a.say;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: 
                // Acknowledge the action
                return [4 /*yield*/, ack()];
                case 1:
                    // Acknowledge the action
                    _b.sent();
                    return [4 /*yield*/, say("<@" + body.user.id + ">! clicked the button")];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
app.command("/test", function (_a) {
    var ack = _a.ack, respond = _a.respond, say = _a.say, body = _a.body, command = _a.command, payload = _a.payload;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, ack("We have acknowledged but we don' know what this do.")];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, say({
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
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
app.event("dnd_updated_user", function (_a) {
    var event = _a.event, say = _a.say;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            console.log("Hey there <@" + (event.dnd_status.dnd_enabled ? "GoodBye" : "Welcome back") + ">");
            return [2 /*return*/];
        });
    });
});
// Listening on port 3000
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var BEARER_TOKEN, WEB_SOCKET_URL;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BEARER_TOKEN = "Bearer " + process.env.SLACK_APP_TOKEN;
                WEB_SOCKET_URL = "https://slack.com/api/apps.connections.open";
                axios
                    .default({
                    method: "POST",
                    url: WEB_SOCKET_URL,
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded",
                        Authorization: BEARER_TOKEN,
                    },
                })
                    .then(function (res) {
                    var data = res.data;
                    if (data === null || data === void 0 ? void 0 : data.ok) {
                        var wssUrl = data.url;
                        var socket = new WebSocket.default(wssUrl);
                        socket.onopen = function (e) {
                            // connection established
                            console.log("connection established");
                        };
                        socket.onmessage = function (event) {
                            // application received message
                            console.log("application received message");
                        };
                        socket.onerror = function (error) {
                            console.log(error);
                        };
                    }
                });
                return [4 /*yield*/, app.start(3000)];
            case 1:
                _a.sent();
                console.log("⚡️ Bolt app is running!");
                return [2 /*return*/];
        }
    });
}); })();
