import axios, { AxiosResponse } from "axios";

const baseUrl = "https://akabab.github.io/superhero-api/api";

interface HeroesResponse {
    id: string;
    name: string;
}
export async function getHeroById(heroId: string) {
    const heroesResponse: AxiosResponse<HeroesResponse> = await axios.get(
        baseUrl + '/id/' + heroId + ".json"
    );
    console.log(heroesResponse); 
    if (heroesResponse.status === 404){
        throw new Error("Hero not found");
    }

    return heroesResponse.data;
}

export async function getHeroByName(heroName: string) {
    const heroesResponse: AxiosResponse<HeroesResponse[]> = await axios.get(
        baseUrl + '/all.json'
    );
    console.log(heroesResponse); 
    if (heroesResponse.status === 404){
        throw new Error("Hero not found");
    }

    const allHeroes = heroesResponse.data;
    const theHero = allHeroes.find((hero) => {
        return hero.name.toLowerCase() === heroName.toLowerCase();
    });
    if (!theHero) {
        throw new Error("Hero not found");

    }

    return theHero;
}