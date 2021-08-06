
module.exports = (sequelize, DataTypes) => {




    const tour_type = sequelize.define("tour_location_type",


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


    return tour_type;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}