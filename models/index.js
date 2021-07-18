const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.user = require("./user")(sequelize, Sequelize);
db.country = require("./country")(sequelize, Sequelize);
db.location_type = require("./location_type")(sequelize, Sequelize);

db.city = require("./city")(sequelize, Sequelize);

db.state = require("./state")(sequelize, Sequelize);
db.day = require("./day")(sequelize, Sequelize);
db.work_time = require("./workTime")(sequelize, Sequelize);

db.like = require("./likes")(sequelize, Sequelize);
db.location_pic = require("./location_pic")(sequelize, Sequelize);
db.tour_location = require("./tour_location")(sequelize, Sequelize);
db.tour_type = require("./tour_loc_type")(sequelize, Sequelize);
db.location = require("./location")(sequelize, Sequelize);
db.facilitate_location_type = require("./facilitate_location_type")(sequelize, Sequelize);
db.facilitate_location = require("./facilitate_location")(sequelize, Sequelize);
db.tourism_location_facilitates = require("./location_services")(sequelize, Sequelize);
db.company = require("./company")(sequelize, Sequelize);





//relationships  💏 😗 😙  😚 
//add some cnages


db.country.hasMany(db.user, { 
  // foreignKey: 'country_id' ,

  // sourceKey: 'country_id' ,
  as:"users"
   });
db.user.belongsTo(db.country, {
  foreignKey: "country_id",
  as: 'country'
});



module.exports = db;
