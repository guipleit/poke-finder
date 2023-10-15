import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { stat } from "fs";

const prisma = new PrismaClient();

prisma.pokemon

class PokemonController {
    private model
    constructor() { 
        this.model = prisma.pokemon;
    }

    async getAll(_req: Request, res: Response) {
        const allPokemon = await this.model.findMany();
        return res.status(200).json(allPokemon);
    }

    async searchByName(req: Request, res: Response) {
        let name = req.query.name;

        if (!name) {
            return res.status(400).json({ error: "Missing name query parameter" });
        }

        name = name.toString().toLowerCase();

        const pokemon = await this.model.findMany({
            where: {
                name: {
                    contains: name,
                }
            }
        });

        if (!pokemon) {
            return res.status(404).json({ error: "Pokemon not found" });
        }

        return res.status(200).json(pokemon);
    }

    async searchByTypes(req: Request, res: Response) {
        let type1 = req.query.type1;
        let type2 = req.query.type2 || "";

        if (!type1) {
            return res.status(400).json({ error: "Missing type1 query parameter" });
        }

        type1 = type1.toString().toLowerCase();
        type2 = type2.toString().toLowerCase();

        const pokemon = await this.model.findMany({
            where: {
                OR: [
                    {
                        type1: {
                            contains: type1,
                        },
                        type2: {
                            contains: type2,
                        }
                    },
                    {
                        type1: {
                            contains: type2,
                        },
                        type2: {
                            contains: type1,
                        }
                    }
                ]
            }
        });


        if (!pokemon || pokemon.length === 0) {
            return res.status(404).json({ error: "Pokemon not found" });
        }

        return res.status(200).json(pokemon);
    }
}

export default PokemonController;