const cron = require("node-cron");
const { Op } = require("sequelize");
const { Task, User } = require("../Model/association");
const { sendMail } = require("./mailService");

cron.schedule("40 22 * * *", async () => {
    console.log("🔔 Daily task reminder running...");

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        // 1. récupérer les tâches du jour
        const tasks = await Task.findAll({
            where: {
                due_date: {
                    [Op.gte]: today,
                    [Op.lt]: tomorrow,
                },
            },
        });

        console.log("Tasks found:", tasks.length);

        // 2. regrouper par userId (important pour éviter spam)
        const tasksByUser = {};

        for (const task of tasks) {
            if (!tasksByUser[task.user_id]) {
                tasksByUser[task.user_id] = [];
            }
            tasksByUser[task.user_id].push(task);
        }

        // 3. pour chaque user → fetch email → send mail
        for (const userId in tasksByUser) {
            const user = await User.findByPk(userId);

            if (!user || !user.email) continue;

            const userTasks = tasksByUser[userId];

            const taskList = userTasks
                .map(t => `- ${t.title} (${t.priority})`)
                .join("\n");

            const message = `
Bonjour ${user.username},

📌 Rappel des tâches pour aujourd’hui (${today.toDateString()}) :

${userTasks
                    .map(t => `
━━━━━━━━━━━━━━
📝 Titre : ${t.title}
📄 Description : ${t.description || "Aucune description"}
⚡ Priorité : ${t.priority}
📅 Deadline : ${new Date(t.due_date).toLocaleString()}
📊 Statut : ${t.status}
━━━━━━━━━━━━━━
`)
                    .join("\n")}

Merci de les compléter à temps 👍

Task Manager
`;

            await sendMail(
                user.email,
                "Rappel des tâches du jour",
                message
            );
        }

        console.log("Emails sent ✔");
    } catch (err) {
        console.error("Cron error:", err);
    }
});