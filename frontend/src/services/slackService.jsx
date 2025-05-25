import axios from 'axios';

export const sendSummaryToSlack = async (message) => {
  try {
    // Replace this with your actual Slack webhook URL
    const webhookURL = "https://hooks.slack.com/services/XXXX/YYYY/ZZZZ";
    await axios.post(webhookURL, {
      text: `To-Do Summary:\n${message}`,
    });
    return true;
  } catch (error) {
    console.error("Slack Error:", error);
    return false;
  }
};
