const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, RefreshToken } = require("../Model/association");





exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email déjà utilisé"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashPassword
        });

        return res.status(201).json({
            message: "Utilisateur créé avec succès"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};




exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }



        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Mot de passe invalide"
            });
        }

        const accessToken = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                username : user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        const refreshToken = jwt.sign(
            {
                userId: user.id
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "30d"
            }
        );

        await RefreshToken.create({
            refreshToken,
            user_id: user.id
        });

        return res.status(200).json({
            accessToken,
            refreshToken
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};



exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        await RefreshToken.destroy({
            where: { refreshToken }
        });

        return res.status(200).json({
            message: "Déconnexion réussie"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};