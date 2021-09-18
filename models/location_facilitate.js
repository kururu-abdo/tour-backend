
module.exports = (sequelize, DataTypes) => {




    const tour_facilitate_location = sequelize.define("tour_facilitate_location",


        {


            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            } 

        },
        {
            timestamps: false,
        }


    )


    return tour_facilitate_location;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}