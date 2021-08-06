
module.exports = (sequelize, DataTypes) => {




    const tour_location = sequelize.define("tour_location",


        {


            tour_loc_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },


            tag: {
                type: DataTypes.STRING,

            }
        } ,
        {
            timestamps: false,
        }


    )


    return tour_location;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}