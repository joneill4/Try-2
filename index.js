const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
require('dotenv').config();

// Initialize Slack clients
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
const webClient = new WebClient(process.env.SLACK_BOT_TOKEN);

// Event listener for messages
slackEvents.on('message', async (event) => {
    if (!event.subtype && event.text) {
        console.log(`Message received from ${event.user}: ${event.text}`);

        // Example: Basic response logic
        if (event.text.toLowerCase().includes('slay')) {
            try {
                await webClient.chat.postMessage({
                    channel: event.channel,
                    text: `👑 Slay detected! Keep it fabulous, <@${event.user}>!`
                });
            } catch (error) {
                console.error('Error posting message:', error);
            }
        }
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
slackEvents.start(PORT).then(() => {
    console.log(`⚡️ Slaybot is running on port ${PORT}`);
});
