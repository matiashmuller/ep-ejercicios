const Sequelize = require('sequelize');

const sequelize = new Sequelize('Prueba', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb', 
  port: '3307'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



class Cars extends Sequelize.Model {}
Cars.init({
  firstName: Sequelize.STRING,
  lastName:Sequelize.STRING
}, { sequelize, modelName: 'users' });


/* crea usuario*/
sequelize.sync()
  .then(() => Cars.create({
    firstName: 'Pedro',
    lastName: 'Rodriguez'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });




