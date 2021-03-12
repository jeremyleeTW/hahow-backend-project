import express from "express";
import httpStatusCode from "http-status-codes";
import {listHeroes, profileHero} from "../libs/hahow";
import {IAuthenticatedHero, IHero} from "../libs/types/hahow";
import {IResponseBodyHeroes} from "./types/hahowController";

const getHeroes = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const authenticated = !!(req.auth);

        const {data} = await listHeroes();

        const heroes = await Promise.all(data.map(async (h) => {
            const {id, image, name} = h;

            if (!authenticated) {
                return {
                    id,
                    image,
                    name
                } as IHero;
            }

            const profile = (await profileHero(Number(id))).data;

            return {
                id,
                image,
                name,
                profile
            } as IAuthenticatedHero;
        }));

        res.status(httpStatusCode.OK).json({ heroes } as IResponseBodyHeroes);
    } catch (error) {
        next(error);
    }
};

const getHero = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        throw new Error("unimplemented");
    } catch (error) {
        next(error);
    }
};

export {
    getHeroes,
    getHero
};