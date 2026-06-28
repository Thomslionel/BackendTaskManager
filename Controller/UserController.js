const { Json } = require("sequelize/lib/utils");
const { User } = require("../Model/association")
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const {DateTypes} = require("sequelize")


exports.createUser = async (req, res, next) => {
    try {

        const userToCreate = req.body;
        console.log(userToCreate)

        const user = await User.create({
            username: userToCreate.username,
            email: userToCreate.email,
            password: await bcrypt.hash(userToCreate.password, 10)

        });

        return res.status(201).json({ message: "Utilisateur " + userToCreate.username + " bien creer" });

    } catch (error) {
        res.status(500).json({ error: error.message })

    }




}



exports.findAllUser = async (req, res, next) => {
    try {
        const allUser = await User.findAll();

        return res.status(200).json({ message: "Users recuperer avec succes", data: allUser })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


exports.findUserById = async (req, res, next) => {
    try {
        console.log(req.params.id);

        const user = await User.findByPk(req.params.id);

        return res.status(200).json({
            message: user ? "User trouver" : "User introuvable avec cet id",
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}





exports.deleteUserById = async (req, res, next) => {
    try {
        console.log(req.params.id);

        await User.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.status(200).json({
            message: "Utilisateur suppprimer avec succes"
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}






exports.updateUserById = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        updateData.updatedAt = new Date();

        // 3. On passe l'objet simple à la méthode update
        const [updatedRows] = await User.update(updateData, {
            where: {
                id: req.params.id,
            }
        });

        // On vérifie si l'utilisateur existait vraiment
        if (updatedRows === 0) {
            return res.status(404).json({
                message: "Utilisateur non trouvé ou aucune modification apportée"
            });
        }

        return res.status(200).json({
            message: "User modifié avec succès",
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


