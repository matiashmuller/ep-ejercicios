const Sequelize = require("sequelize");

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

//Creación de modelo "Student"
class Student extends Sequelize.Model { }
Student.init({
  dni: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'student'
});

//Creación de la tabla "students" si no existe, inserción, y actualización de registro
sequelize.sync().then(() => {
  console.log('Table created successfully!');
  
  //Inserción de registro
  Student.create({
    dni: 37696779,
    firstName: "Matías",
    lastName: "Miuler"
  }).then(res => {
    console.log(res)
  }).catch((error) => {
    console.error('Failed to create a new record : ', error);
  });

  //Actualización de registro con id=1
  Student.update({ lastName: "Müller" }, {
    where: {
      id: 1
    }
  }).then(() => {
    console.log("Register updated successfully");
  });

}).catch((error) => {
  console.error('Unable to create table : ', error);
});