const cron = require("node-cron");
const { Op } = require("sequelize");
const { Task, User } = require("../Model/association");
const { sendMail } = require("./mailService");

cron.schedule("* 7 * * *", async () => {
  console.log("🔔 Daily task reminder running...");

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const tasks = await Task.findAll({
      where: {
        due_date: {
          [Op.gte]: today,
          [Op.lt]: tomorrow,
        },
      },
    });

    console.log("Tasks found:", tasks.length);

    const tasksByUser = {};

    for (const task of tasks) {
      if (!tasksByUser[task.user_id]) {
        tasksByUser[task.user_id] = [];
      }
      tasksByUser[task.user_id].push(task);
    }

    for (const userId in tasksByUser) {
      const user = await User.findByPk(userId);

      if (!user || !user.email) continue;

      const userTasks = tasksByUser[userId];

      const message = `
Bonjour ${user.username},

Voici vos tâches du jour :

${userTasks.map(task => `
--------------------
Titre: ${task.title}
Description: ${task.description || "Aucune"}
Priorité: ${task.priority}
Statut: ${task.status}
Deadline: ${new Date(task.due_date).toLocaleString()}
`).join("\n")}

Merci.
Task Manager
`;

      await sendMail(
        user.email,
        "Rappel des tâches du jour",
        message
      );
    }

    console.log("Emails sent ✔");
  } catch (error) {
    console.error("Cron error:", error);
  }
});