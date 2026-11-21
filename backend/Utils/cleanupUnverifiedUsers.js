const cron = require("node-cron");
const Users = require("../models/users");
const Tokens = require("../models/tokens");

// Every hour: drop unverified users older than 1 hour, and expired verification tokens
function cleanupUnverifiedUsers() {
  cron.schedule("0 * * * *", async () => {
    try {
      const deleted = await Users.deleteUnverifiedOlderThan(new Date(Date.now() - 3600 * 1000));
      await Tokens.deleteExpired();
      console.log(`Deleted ${deleted} unverified users older than 1 hour`);
    } catch (error) {
      console.error("Error cleaning up unverified users:", error);
    }
  });
}

module.exports = cleanupUnverifiedUsers;
