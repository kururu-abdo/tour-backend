
module.exports = (sequelize, DataTypes) => {




    const state = sequelize.define("state",


        {


            state_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },


            state_ar_name: {
                type: DataTypes.STRING,

            },
            state_en_name: {
                type: DataTypes.STRING,

            },
           
        }

    )


    return state;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}