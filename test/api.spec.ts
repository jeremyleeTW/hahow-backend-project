import httpStatusCode from "http-status-codes";
import supertest from "supertest";
import app from "../src/app";
import {listHeroes} from "../src/libs/hahow";

const HEADER_CONTENT_TYPE = "application/json; charset=utf-8";

const GLOBAL_API_TIMEOUT = 15000; // 15s

describe("integration testings", () => {
    describe("Hahow project api", () => {
        test("it should be ok to return list of heroes", async () => {
            const response = await supertest(app)
                .get("/heroes");

            expect(response.status).toBe(httpStatusCode.OK);
            expect(response.headers["content-type"]).toBe(HEADER_CONTENT_TYPE);
            expect(typeof response.body).toBe("object");
            expect(Array.isArray(response.body.heroes)).toEqual(true);
            const heroes = response.body.heroes.length;
            for (let i = 0; i < heroes; i++) {
                const hero = response.body.heroes[i];
                expect(typeof hero.id).toBe("string");
                expect(typeof hero.name).toBe("string");
                expect(typeof hero.image).toBe("string");
            }
        }, GLOBAL_API_TIMEOUT);

        test("it should be ok to return list of heroes with profile when authenticated successfully", async () => {
            const response = await supertest(app)
                .get("/heroes")
                .set("User", "hahow")
                .set("Password", "rocks");

            expect(response.status).toBe(httpStatusCode.OK);
            expect(response.headers["content-type"]).toBe(HEADER_CONTENT_TYPE);
            expect(typeof response.body).toBe("object");
            expect(Array.isArray(response.body.heroes)).toEqual(true);
            for (const hero of response.body.heroes) {
                expect(typeof hero.id).toBe("string");
                expect(typeof hero.name).toBe("string");
                expect(typeof hero.image).toBe("string");
                expect(typeof hero.profile).toBe("object");
                const profile = hero.profile;
                expect(typeof profile.str).toBe("number");
                expect(typeof profile.int).toBe("number");
                expect(typeof profile.agi).toBe("number");
                expect(typeof profile.luk).toBe("number");
            }
        }, GLOBAL_API_TIMEOUT);

        test(`it should be ok to return nothing with code 404 by non-existing id`, async () => {
            const response = await supertest(app)
                .get(`/heroes/aaaaaaaaaaaaaaaaaaaaaaaaa`);

            expect(response.status).toBe(httpStatusCode.NOT_FOUND);
        }, GLOBAL_API_TIMEOUT);

        test(`it should be ok to return hero by id`, async () => {
            const response = await supertest(app)
                .get(`/heroes/1`);

            expect(response.status).toBe(httpStatusCode.OK);
            expect(response.headers["content-type"]).toBe(HEADER_CONTENT_TYPE);
            expect(typeof response.body).toBe("object");
            expect(typeof response.body.id).toBe("string");
            expect(typeof response.body.name).toBe("string");
            expect(typeof response.body.image).toBe("string");
        }, GLOBAL_API_TIMEOUT);

        test(`it should be ok to return hero by id with profile when authenticated successfully`, async () => {
            const response = await supertest(app)
                .get(`/heroes/1`)
                .set("User", "hahow")
                .set("Password", "rocks");

            expect(response.status).toBe(httpStatusCode.OK);
            expect(response.headers["content-type"]).toBe(HEADER_CONTENT_TYPE);
            expect(typeof response.body).toBe("object");
            expect(typeof response.body.id).toBe("string");
            expect(typeof response.body.name).toBe("string");
            expect(typeof response.body.image).toBe("string");
            expect(typeof response.body.profile).toBe("object");
            const profile = response.body.profile;
            expect(typeof profile.str).toBe("number");
            expect(typeof profile.int).toBe("number");
            expect(typeof profile.agi).toBe("number");
            expect(typeof profile.luk).toBe("number");
        }, GLOBAL_API_TIMEOUT);
    });
});