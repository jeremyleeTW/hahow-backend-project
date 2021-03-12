import express from "express";
import httpStatusCode from "http-status-codes";
import {listHeroes, profileHero, singleHero} from "../libs/hahow";
import {IAuthenticatedHero, IHero} from "../libs/types/hahow";
import {IResponseBodyHero, IResponseBodyHeroes} from "./types/hahowController";

const getHeroes = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const authenticated = !!(req.auth);

        const responseHeroes = await listHeroes();
        if (responseHeroes.status === httpStatusCode.NOT_FOUND) {
            res.status(httpStatusCode.NOT_FOUND).end();
            return;
        }
        if (!Array.isArray(responseHeroes.data)) {
            throw new Error("not an array");
        }
        if ("code" in responseHeroes.data) {
            const {code, message} = responseHeroes.data;
            next(new Error(`getHeroes failed: code=${code} message=${message}`));
            return;
        }

        const heroes = await Promise.all(responseHeroes.data.map(async (h) => {
            const {id, image, name} = h;

            if (!authenticated) {
                return {
                    id,
                    image,
                    name
                } as IHero;
            }

            const responseHero = await profileHero(id);
            if (responseHero.status === httpStatusCode.NOT_FOUND) {
                res.status(httpStatusCode.NOT_FOUND).end();
                return;
            }
            if ("code" in responseHero.data) {
                const {code, message} = responseHero.data;
                next(new Error(`getProfile failed: code=${code} message=${message}`));
                return;
            }
            const profile = responseHero.data;

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
        const heroId = req.params.heroId;
        const authenticated = !!(req.auth);

        const responseHero = await singleHero(heroId);
        if (responseHero.status === httpStatusCode.NOT_FOUND) {
            res.status(httpStatusCode.NOT_FOUND).end();
            return;
        }
        if ("code" in responseHero.data) {
            const {code, message} = responseHero.data;
            next(new Error(`getHero failed: code=${code} message=${message}`));
            return;
        }

        if (!authenticated) {
            res.json(responseHero.data as IResponseBodyHero);
            return;
        }

        const responseProfile = await profileHero(heroId);
        if (responseProfile.status === httpStatusCode.NOT_FOUND) {
            res.status(httpStatusCode.NOT_FOUND).end();
            return;
        }
        res.json({
            ...responseHero.data,
            profile: responseProfile.data
        } as IResponseBodyHero);
    } catch (error) {
        next(error);
    }
};

export {
    getHeroes,
    getHero
};