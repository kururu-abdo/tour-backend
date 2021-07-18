
module.exports = (sequelize, DataTypes) => {




    const location_type = sequelize.define("location_type",


        {


            location_type_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true ,


            },


            type_ar_name: {
                type: DataTypes.STRING,
                length:  30

            },
            type_en_name: {
                type: DataTypes.STRING,
                length :  50

            },
          
        }

    )


    return location_type;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}