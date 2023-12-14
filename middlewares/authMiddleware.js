import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    const { authorization } = req.headers;

    const [authType, authToken] = (authorization || "").split(" ");

    if(!authToken || authType !== "Bearer") {
        const error = new Error("로그인 후 이용 가능한 기능입니다.");
        error.status = 400;
        throw error;
    }

    try{
        const user = jwt.verify(authToken, process.env.COOKIE_SECRET);

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).send("로그인 후 이용 가능한 기능입니다.");
    }
}