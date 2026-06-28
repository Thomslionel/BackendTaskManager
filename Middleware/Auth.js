const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Token manquant"
            });
        }

        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                message: "Format token invalide"
            });
        }

        const token = parts[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = {
            userId: decoded.userId,
            email: decoded.email
        };


        

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token invalide ou expiré"
        });
    }
};