export interface IProfile {
    str: number;
    int: number;
    agi: number;
    luk: number;
}

export interface IHero {
    id: string;
    name: string;
    image: string;
}

export interface IUnknownError {
    code: number;
    message: string;
}

export interface IAuthenticatedHero extends IHero {
    profile: IProfile;
}