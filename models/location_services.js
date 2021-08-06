
module.exports = (sequelize, DataTypes) => {




    const tourism_location_facilitates = sequelize.define("tourism_location_facilitates",


        {


            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }

        } ,
        {
            timestamps: false,
        }


    )


    return tourism_location_facilitates;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}