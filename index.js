require('dotenv').config();
// Import required modules
const { App } = require('@slack/bolt');
require('dotenv').config();

// Initialize your Slack bot
const app = new App({
  token: process.env.SLACK_BOT_TOKEN, // Bot User OAuth Token
  signingSecret: process.env.SLACK_SIGNING_SECRET, // Signing Secret
  socketMode: true, // Enable Socket Mode
  appToken: process.env.SLACK_APP_TOKEN, // App-Level Token
});

// Listen for messages containing "slay" or "Slay"
app.message(/slay/i, async ({ message, say }) => {
  console.log(`Message received: ${message.text}`);
  await say(`Did someone say *Slay*?💅🏼`);
});

// Start the app
(async () => {
  try {
    await app.start();
    console.log('⚡️ Slack bot is running!');
  } catch (error) {
    console.error('Error starting Slack bot:', error);
  }
})();
