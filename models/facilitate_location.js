
module.exports = (sequelize, DataTypes) => {




    const facilitate_location = sequelize.define("facilitate_location",


        {


            fcilitate_loc_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },


            email: {
                type: DataTypes.STRING,

            },
            whtsapp: {
                type: DataTypes.STRING,

            },



        }

    )


    return facilitate_location;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}