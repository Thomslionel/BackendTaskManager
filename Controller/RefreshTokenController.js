const { where } = require("sequelize");
const RefreshToken = require("../Model/RefreshToken");
const jwt = require("jsonwebtoken");
const {User} = require("../Model/association")

exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                message: "Refresh token requis"
            });
        }

        const tokenInDb = await RefreshToken.findOne({
            where: { refreshToken }
        });

        if (!tokenInDb) {
            return res.status(403).json({
                message: "Refresh token invalide"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        // DELETE ancien refresh token
        await RefreshToken.destroy({
            where: {
                id: tokenInDb.id
            }
        });


        const user = await User.findByPk(decoded.userId);

        const newAccessToken = jwt.sign(
            {
                userId: decoded.userId,
                email: user.email,
                username : user.username

            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        const newRefreshToken = jwt.sign(
            {
                userId: decoded.userId
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "30d"
            }
        );

        await RefreshToken.create({
            refreshToken: newRefreshToken,
            user_id: decoded.userId
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });

    } catch (error) {
        return res.status(403).json({
            message: error.message
        });
    }
};