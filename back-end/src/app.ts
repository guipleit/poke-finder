import express from 'express';
import PokemonRouter from './routes/Pokemon.route';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(PokemonRouter);

export default app;