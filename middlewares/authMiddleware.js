import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.COOKIE_SECRET;
export const verifyToken = (req, res, next) => {
    try {
        const clientToken = req.cookies.user;
        const decoded = jwt.verify(clientToken, secretKey);
        if (decoded) {
            res.locals.id = decoded.id;
            next();
        } else {
            res.status(401).json({
                error: 'unauthorized'
            });
        }
    } catch (err) {
        res.status(401).json({
            error: 'token expired'
        });
    }
};