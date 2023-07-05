const { heroesModel } = require("./index");
const Sequelize = require('sequelize')

const getAllHeroes = async () => {
  try {
    const heroesData = await heroesModel.findAll({
      attributes: ["id", "realname", "firstappearance", "slug", "snapped"],
      order: [["id", "ASC"]],
    });

    return heroesData;
  } catch (error) {
    throw new Error("ERROR!");
  }
};

const getOneHero = async (searchSlug) => {
  try {
    const foundHero = await heroesModel.findOne({
      where: { slug: searchSlug },
    });

    return foundHero;
  } catch (error) {
    throw new Error("Database error");
  }
};

const addHero = async (newHero) => {
  const addedHero = await heroesModel.create(newHero);

  return addedHero;
};

const searchHeroes = async (searchTerm) => {
  try {
    const foundHeroes = await heroesModel.findAll({
      where: {
        [Sequelize.Op.or]: [
          { id: searchTerm },
          { slug: {[Sequelize.Op.like]: `%${searchTerm}%`} },
          { name: {[Sequelize.Op.like]: `%${searchTerm}%`} },
          { realname: {[Sequelize.Op.like]: `%${searchTerm}%`} }
        ],
      },
      attributes: ["id", "realname", "firstappearance", "slug", "snapped"]
    });

    return foundHeroes;
  } catch (error) {
    console.log(error)
    throw new Error("Database error");
  }
};

module.exports = { addHero, getOneHero, getAllHeroes, searchHeroes };
