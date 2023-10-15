import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

const allPokemon = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'pokemon_clean.json'), 'utf8')
    )

async function main() {
    for (const pokemon of allPokemon) {
        await prisma.pokemon.create({
            data: {
                pokemonId: pokemon.id,
                name: pokemon.name,
                type1: pokemon.type1,
                type2: pokemon.type2,
                sprite: pokemon.sprite,
            }
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

