
module.exports = (sequelize, DataTypes) => {




    const log = sequelize.define("log",


        {


            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            event: {
                type: DataTypes.STRING(1245),
               


            },
            event_time:{
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
           

        },
        {
            timestamps: false,
        }


    )


    return log;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}