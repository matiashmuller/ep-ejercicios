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


const Model = Sequelize.Model;
class User extends Model {}
User.init({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'user'
});


//elimina usuario con id =2
User.destroy({
  where: {
    id: 1
  }
}).then(() => {
  console.log("Elimine Registro");
});
