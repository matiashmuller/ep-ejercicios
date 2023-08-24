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

//actualiza registro
User.update({ firstName: "XXXXXXX" }, {
  where: {
    lastName: 'Rodriguez'
  }
}).then(() => {
  console.log("Done");
});
