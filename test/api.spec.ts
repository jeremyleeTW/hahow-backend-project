import httpStatusCode from "http-status-codes";
import supertest from "supertest";
import app from "../src/app";

const HEADER_CONTENT_TYPE = "application/json; charset=utf-8";

describe("integration testings", () => {
    describe("Hahow project api", () => {
        let heroes: number = -1;

        test("it should be ok to return list of heroes", async () => {
            const response = await supertest(app)
                .get("/heroes");

            expect(response.status).toBe(httpStatusCode.OK);
            expect(response.headers["content-type"]).toBe(HEADER_CONTENT_TYPE);
            expect(typeof response.body).toBe("object");
            expect(Array.isArray(response.body.heroes)).toEqual(true);
            heroes = response.body.heroes.length;
            for (let i = 0; i < heroes; i++) {
                const hero = response.body.heroes[i];
                expect(typeof hero.id).toBe("string");
                expect(typeof hero.name).toBe("string");
                expect(typeof hero.image).toBe("string");
            }
        });

        test("it should be ok to return list of heroes with profile when authenticated successfully", async () => {
            const response = await supertest(app)
                .get("/heroes");

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
        });

        test("it should be ok to return hero by id", async () => {
            for (let i = 0; i < heroes; i++) {
                const response = await supertest(app)
                    .get(`/heroes/${i + 1}`);

                expect(response.status).toBe(httpStatusCode.OK);
                expect(response.headers["content-type"]).toBe(HEADER_CONTENT_TYPE);
                expect(typeof response.body).toBe("object");
                expect(typeof response.body.id).toBe("string");
                expect(typeof response.body.name).toBe("string");
                expect(typeof response.body.image).toBe("string");
            }
        });

        test("it should be ok to return hero by id with profile when authenticated successfully", async () => {
            for (let i = 0; i < heroes; i++) {
                const response = await supertest(app)
                    .get(`/heroes/${i + 1}`);

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
            }
        });
    });
});