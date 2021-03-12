import express from "express";
import {authenticate} from "../libs/hahow";
import httpStatusCode from "http-status-codes";
import logger from "../libs/logger";

const log = logger("authMiddleware");

const ERROR_MESSAGE_AUTHENTICATION_FAILURE = "authentication failure";

// authMiddleware uses 'authenticate' api powered by hahow to authenticate user with provided username && password
const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const username = req.header("User");
        const password = req.header("Password");
        if (!username || !password) {
            next();
            return;
        }

        const response = await authenticate(username, password);
        switch (response.status) {
            case httpStatusCode.OK:
                req.auth = true;
                break;
            case httpStatusCode.UNAUTHORIZED:
                res.status(httpStatusCode.UNAUTHORIZED).send(ERROR_MESSAGE_AUTHENTICATION_FAILURE);
                break;
            default:
                log.error(`authentication server responds with unknown code: ${response.status}`)
                throw new Error("unknown response code");
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default authMiddleware;