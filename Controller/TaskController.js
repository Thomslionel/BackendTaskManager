const { where } = require("sequelize");
const { Task, User } = require("../Model/association");


exports.createTask = async (req, res, next) => {
    try {
        const {
            title, description, status, priority, due_date, completed_at, category_id,
        } = req.body

        const user_id = req.user.userId;
        const task = await Task.create({

            title, description, status, priority, due_date, completed_at, user_id, category_id,

        });
        return res.status(201).json({ message: "Task " + task.title + " bien creer" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}




exports.findAllTask = async (req, res, next) => {
    try {

        const task = await Task.findAll({
            include: {
                model: User,
                attributes: ["username", "email"]
            },

        });
        return res.status(200).json({
            message: "Task recupperer avec succes",
            data: task
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}



exports.findTaskById = async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id, {
            include: {
                model: User,
                attributes: ["username", "email"]
            }
        },);
        if (!task) {
            return res.status(404).json({
                message: "Task introuvable"
            });
        }

      

        if (task.user_id != req.user.userId) {
            return res.status(403).json({ message: "Acces refuse" });
        }
        return res.status(200).json({
            message: "Task recupperer avec succes",
            data: task
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


exports.updateTask = async (req, res) => {
    try {
        const {
            title,
            description,
            status,
            priority,
            due_date,
            completed_at,
            user_id,
            category_id
        } = req.body;

        const updateTask = {};

        if (title !== undefined) updateTask.title = title;
        if (description !== undefined) updateTask.description = description;
        if (status !== undefined) {
            updateTask.status = status
            if (updateTask.status === "DONE") {
                updateTask.completed_at = new Date();
            } else {
                updateTask.completed_at = null;
            }

        };
        if (priority !== undefined) updateTask.priority = priority;
        if (due_date !== undefined) updateTask.due_date = due_date;

        if (user_id !== undefined) updateTask.user_id = user_id;
        if (category_id !== undefined) updateTask.category_id = category_id;


        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Tache introuvable" });
        }


        console.log(req.user.userId)

        if (task.user_id != req.user.userId) {
            return res.status(403).json({ message: "Acces refuse" });
        }



        const [updatedRows] = await Task.update(updateTask, {
            where: { id: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({
                message: "Task introuvable"
            });
        }

        return res.status(200).json({
            message: "Task mise à jour avec succès"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteTask = async (req, res, next) => {
    try {

        const task = await Task.findByPk(req.params.id);

       

        if (!task) {
            return res.status(404).json({ message: "Tache introuvable" });
        }

        if (task.user_id != req.user.userId) {
            return res.status(403).json({ message: "Acces refuse" });
        }

        await Task.destroy({ where: { id: req.params.id } });
        return res.status(200).json({ message: "Task supprimer " })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


exports.findAllTaskOfUser = async (req, res, next) => {
    try {
        const task = await Task.findAll({ where: { user_id: req.user.userId } })

        if (task === null) {
            return res.status(200).json({ message: "Aucune tache pour ce user" })
        }

        return res.status(200).json({
            message: "Task recupperer avec succes",
            data: task
        });




    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}






