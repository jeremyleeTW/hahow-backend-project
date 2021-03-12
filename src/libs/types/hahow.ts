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

interface IAuthenticatedHero extends IHero {
    profile: IProfile;
}

export interface IContentHeroes {
    heroes: IHero[];
}

export interface IContentAuthenticatedHeroes {
    heroes: IAuthenticatedHero[];
}

export type ResponseBodyListHeroes = IContentAuthenticatedHeroes | IContentHeroes;