import express from "express";

import { allPokemon } from "./data.js";

const app = express();
app.use(express.json());

//Aqui vão as minhas funções
const findPokemonByName = (name) => {
  return allPokemon.find((element) => {
    return element.name === name;
  });
};

const findPokemonsByType = (type) => {
  return allPokemon.filter((element) => {
    return element.types.includes(type);
  });
};

app.get("/pokemon", (req, res, next) => {
  res.json(allPokemon);
});

app.get("/pokemon/:id", (req, res, next) => {
  const { id } = req.params;

  const foundPokemon = allPokemon.find((element) => {
    return element.id === parseInt(id, 10);
  });

  res.json(foundPokemon);
});

app.get("/search", (req, res, next) => {
  const { name, type } = req.query;

  let result = null;

  if (name) {
    result = findPokemonByName(name);
  } else if (type) {
    result = findPokemonsByType(type);
  }

  return res.json(result);
});

export { app };
