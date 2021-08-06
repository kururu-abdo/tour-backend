
module.exports = (sequelize, DataTypes) => {




    const facilitate_location_type = sequelize.define("facilitate_location_type",


        {


            type_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },


            type_ar_name: {
                type: DataTypes.STRING,

            },
            type_en_name: {
                type: DataTypes.STRING,

            },



        } ,
        {
            timestamps: false,
        }


    )


    return facilitate_location_type;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}