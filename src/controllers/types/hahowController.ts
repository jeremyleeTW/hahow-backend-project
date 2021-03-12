import {IAuthenticatedHero, IHero} from "../../libs/types/hahow";

export interface IResponseBodyHeroes {
    heroes: IAuthenticatedHero[] | IHero[];
}

export type IResponseBodyHero = IAuthenticatedHero | IHero;