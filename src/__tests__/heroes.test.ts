import axios from "axios";
import { describe, expect, it, test, vi } from "vitest";
import { getHeroById, getHeroByName } from "../heroes";

describe('Fetch hero by id', () => {
    it('should fetch hero with valid id', async () => {
        vi.spyOn(axios, 'get').mockResolvedValue({
            data: {id: "1", name: "superman"}
        }); 
        const results = await getHeroById("1");
        expect(results.id).toBe("1");

    });

    it("should throw error if id is invalid", async () => {
        vi.spyOn(axios, 'get').mockResolvedValue({status: 404}); 
        await expect(getHeroById("invalidId")).rejects.toThrow("Hero not found");

    });
} )

describe('Fetch hero by name', () => {
    it('should fetch correct hero by name', async () => {
        vi.spyOn(axios, 'get').mockResolvedValue({
            data: [{id: "1", name: "superman"}, {id: "2", name: "batman"}]
        }); 
        const results = await getHeroByName("Superman");
        expect(results?.name).toBe("superman");

    });

    it("should throw error if name is not found", async () => {
        vi.spyOn(axios, 'get').mockResolvedValue({status: 404}); 
        await expect(getHeroByName(
            "invalidName"
        )).rejects.toThrow(
            "Hero not found"
            );

    });
} );