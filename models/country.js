
module.exports = (sequelize, DataTypes) => {




    const country = sequelize.define("countries",


        {


            country_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },


            country_ar_name: {
                type: DataTypes.STRING,

            },
            country_en_name: {
                type: DataTypes.STRING,

            },
            country_code: {
                type: DataTypes.STRING,

            }
        }

    )


    return country;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}