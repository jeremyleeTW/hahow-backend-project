import express from "express";
import {authenticate} from "../libs/hahow";

const ERROR_MESSAGE_AUTHENTICATION_FAILURE = "authentication failure";

// authMiddleware uses 'authenticate' api powered by hahow to authenticate user with provided username && password
const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const username = req.header("User");
        const password = req.header("Password");
        if (!username || !password) {
            // TODO detail every possible responses
            res.status(401).send(ERROR_MESSAGE_AUTHENTICATION_FAILURE);
            return;
        }

        const response = await authenticate(username, password);
        switch (response.status) {
            case 200:
                req.auth = true;
                break;
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default authMiddleware;