const {Sequelize, Op} = require("sequelize");


//Conexión a la db local "clase4" que usa mysql
const sequelize = new Sequelize(
  'clase4',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});


//Creación de modelo "Player"
class Player extends Sequelize.Model { }
Player.init({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  },
  pais: {
    type: Sequelize.STRING
  },
  pie: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'Player'
});


//Creación de la tabla "players" si no existe, inserción múltiple, y actualización múltiple de registros
sequelize.sync().then(() => {
  console.log('Table created successfully!');

  //Inserción de varios registros
  Player.bulkCreate([
    { firstName: "Lionel", lastName: "Messi", pais: "Argentina", pie: "Izq" },
    { firstName: "Ángel", lastName: "Di María", pais: "Uruguay", pie: "Izq" },
    { firstName: "Julián", lastName: "Álvarez", pais: "Ecuador", pie: "Der" }
  ])

  //Actualización de registros donde país != Argentina
  Player.update({ pais: "Argentina" }, {
    where: {
      pais: { [Op.ne]: "Argentina" }
    }
  }).then(() => {
    console.log("Registers updated successfully");
  });

}).catch((error) => {
  console.error('Unable to create table : ', error);
});