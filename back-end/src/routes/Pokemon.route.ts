import { Router } from "express";
import PokemonController from "../controllers/Pokemon.controller";

const router = Router();
const PokemonControllerInstance = new PokemonController();

router.get("/pokemon/search/name", (req, res) => PokemonControllerInstance.searchByName(req, res));
router.get("/pokemon/search/type", (req, res) => PokemonControllerInstance.searchByTypes(req, res));
router.get("/pokemon", (req, res) => PokemonControllerInstance.getAll(req, res));

export default router;
