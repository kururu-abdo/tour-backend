// const dbConfig = require("../config/db.config");
// const Sequelize = require("sequelize");
const { Sequelize, sequelize } = require("../config/db.config");
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
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.user = require("./user")(sequelize, Sequelize);
db.country = require("./country")(sequelize, Sequelize);
// db.location_type = require("./location_type")(sequelize, Sequelize);

db.city = require("./city")(sequelize, Sequelize);

db.state = require("./state")(sequelize, Sequelize);
db.day = require("./day")(sequelize, Sequelize);
db.work_time = require("./workTime")(sequelize, Sequelize);

db.like = require("./likes")(sequelize, Sequelize);
db.location_pic = require("./location_pic")(sequelize, Sequelize);
//db.tour_location = require("./tour_location")(sequelize, Sequelize);
db.tour_type = require("./tour_loc_type")(sequelize, Sequelize);
db.location = require("./location")(sequelize, Sequelize);

db.facilitate_location_type = require("./facilitate_location_type")(sequelize, Sequelize);
db.facilitate_location = require("./facilitate_location")(sequelize, Sequelize);
// db.tourism_location_facilitates = require("./location_services")(sequelize, Sequelize);
//db.company = require("./company")(sequelize, Sequelize);
db.userType = require("./user_type")(sequelize, Sequelize);
db.comment = require("./comment")(sequelize, Sequelize);
db.rank = require("./rank")(sequelize, Sequelize);
db.tag = require("./tag")(sequelize, Sequelize);
db.location_tag = require("./location_tag")(sequelize, Sequelize);
db.tour_facilitate_location = require("./location_facilitate")(sequelize, Sequelize);
db.company = require('./company')(sequelize, Sequelize);
db.log = require('./logs')(sequelize, Sequelize);


//relationships  💏 😗 😙  😚 
//add some cnages


db.facilitate_location.hasMany(db.work_time, { })
db.work_time.belongsTo(db.facilitate_location , {})


db.tour_type.hasMany(db.location ,  {as :"type"})
db.location.belongsTo(db.tour_type , {as:"type"})


db.location.hasMany(db.tour_facilitate_location, { foreignKey: 'location_id', targetKey: 'location_id'})
db.facilitate_location.hasMany(db.tour_facilitate_location, { foreignKey: 'fcilitate_loc_id', targetKey: 'fcilitate_loc_id'})

db.tour_facilitate_location.belongsTo(db.location, { foreignKey: 'location_id', targetKey: 'location_id'})
db.tour_facilitate_location.belongsTo(db.facilitate_location, { foreignKey: 'fcilitate_loc_id', targetKey: 'fcilitate_loc_id'})





// db.facilitate_location_type.hasMany(db.facilitate_location, {})
// db.facilitate_location.belongsTo(db.facilitate_location_type, {} )



db.facilitate_location_type.hasMany(db.tour_facilitate_location, { foreignKey: 'type_id', targetKey: 'type_id'})
db.tour_facilitate_location.belongsTo(db.facilitate_location_type, { foreignKey: 'type_id', targetKey: 'type_id'})





db.day.hasMany(db.work_time , {})
db.work_time.belongsTo(db.day, {})




db.location.hasMany(db.location_pic , {})
db.location_pic.belongsTo(db.location, {})

db.location.hasMany(db.comment, {})
db.user.hasMany(db.comment, {})

db.comment.belongsTo(db.user , {})


db.comment.belongsTo(db.location, {})




db.location.belongsTo(db.city  ,{})
db.location.belongsTo(db.state, {})

db.city.belongsTo(db.state, { oreignKey: 'state_id', targetKey: 'state_id' })
db.state.hasMany(db.city, { oreignKey: 'state_id', targetKey: 'state_id' })

// db.country.hasMany(db.user, { 
//   // foreignKey: 'country_id' ,

//   // sourceKey: 'country_id' ,
//   as:"users"
//    });

// db.user.belongsTo(db.country, {
//   as: "country"
// })
//user
db.user.belongsTo(db.userType ,{
  as :"user_type"
})




// db.userType.hasMany(db.user ,  {
//   as: "user_type2"
// })



db.user.belongsTo(db.country, {
  foreignKey: "country_id",
  as: 'country'
});
// db.country.hasMany(db.user, { foreignKey: "country_id2",})

//like

db.like.belongsTo(db.user, { foreignKey: 'user_id', targetKey: 'user_id' })

db.like.belongsTo(db.location, { foreignKey: 'location_id', targetKey: 'location_id' })
db.user.hasMany(db.like, { foreignKey: 'user_id', sourceKey: 'user_id' })
db.location.hasMany(db.like, { foreignKey: 'location_id', sourceKey: 'location_id' })
//rank
db.rank.belongsTo(db.user, { foreignKey: 'user_id', targetKey: 'user_id'})
db.rank.hasMany(db.location, { foreignKey: 'location_id', targetKey: 'location_id' })
db.user.hasMany(db.rank, { foreignKey: 'user_id', sourceKey: 'user_id' })
db.location.hasMany(db.rank, { foreignKey: 'location_id', sourceKey: 'location_id' })

// db.rank.belongsTo(db.user, {})
// db.rank.belongsTo(db.location, {})



db.location.hasMany(db.location_tag, {})
db.tag.hasMany(db.location_tag, {})
db.location_tag.belongsTo(db.location ,{})

db.location_tag.belongsTo(db.tag, {})



module.exports = db;
