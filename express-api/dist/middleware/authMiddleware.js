"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const jwt_1 = require("../utils/jwt");
function authenticateToken(req, res, next) {
    //   const authHeader = req.headers["authorization"];
    //   const token = authHeader && authHeader.split(" ")[1];
    try {
        const token = req.cookies.auth_token;
        if (!token)
            return res.status(401).json({ message: "Unauthorized" });
        const user = (0, jwt_1.verifyToken)(token);
        if (!user)
            return res.status(401).json({ message: "Unauthorized" });
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
