
module.exports = (sequelize, DataTypes) => {




    const state = sequelize.define("location_tag",


        {


            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },


          
        },
        {
            timestamps: false,
        }


    )


    return state;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}