
module.exports = (sequelize, DataTypes) => {




    const day = sequelize.define("day",


        {


            day_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },


            day_ar_name: {
                type: DataTypes.STRING,

            },
            day_en_name: {
                type: DataTypes.STRING,

            },
           
        }

    )


    return day;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}