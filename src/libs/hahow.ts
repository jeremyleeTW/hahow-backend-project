import axios from "axios";
import {IContentHeroes, IHero, IProfile} from "./types/hahow";

const HOST_URL = "https://hahow-recruit.herokuapp.com";

// refer to https://github.com/hahow/hahow-recruit/blob/master/backend.md

// List Heroes / GET
const listHeroes = () => {
    return axios.get<IContentHeroes>(`${HOST_URL}/heroes`);
};

// Single Hero / GET
const singleHero = (id: number) => {
    return axios.get<IHero>(`${HOST_URL}/heroes/${id.toString()}`);
};

// Profile of Hero / GET
const profileHero = (id: number) => {
    return axios.get<IProfile>(`${HOST_URL}/heroes/${id.toString()}/profile`);
};

// Authenticate / POST
const authenticate = (username: string, password: string) => {
    return axios.post(`${HOST_URL}/auth`, {
        username,
        password
    });
};

export {
    listHeroes,
    singleHero,
    profileHero,
    authenticate
};