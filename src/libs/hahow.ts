import axios from "axios";
import httpStatusCode from "http-status-codes";
import {IHero, IProfile, IUnknownError} from "./types/hahow";

const HOST_URL = "https://hahow-recruit.herokuapp.com";

// refer to https://github.com/hahow/hahow-recruit/blob/master/backend.md

// List Heroes / GET
const listHeroes = () => {
    return axios.get<IHero[] | IUnknownError>(`${HOST_URL}/heroes`,
        {
            validateStatus(status) {
                return status === httpStatusCode.OK ||
                    status === httpStatusCode.NOT_FOUND;
            }
        });
};

// Single Hero / GET
const singleHero = (id: string) => {
    return axios.get<IHero | IUnknownError>(`${HOST_URL}/heroes/${id}`,
        {
            validateStatus(status) {
                return status === httpStatusCode.OK ||
                    status === httpStatusCode.NOT_FOUND;
            }
        });
};

// Profile of Hero / GET
const profileHero = (id: string) => {
    return axios.get<IProfile | IUnknownError>(`${HOST_URL}/heroes/${id}/profile`,
        {
            validateStatus(status) {
                return status === httpStatusCode.OK ||
                    status === httpStatusCode.NOT_FOUND;
            }
        });
};

// Authenticate / POST
const authenticate = (name: string, password: string) => {
    return axios.post(`${HOST_URL}/auth`, {
        name,
        password
    }, {
        validateStatus (status) {
            return status === httpStatusCode.OK
                || status === httpStatusCode.BAD_REQUEST
                || status === httpStatusCode.UNAUTHORIZED;
        }
    });
};

export {
    listHeroes,
    singleHero,
    profileHero,
    authenticate
};