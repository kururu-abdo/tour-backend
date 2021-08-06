
module.exports = (sequelize, DataTypes) => {




    const userType = sequelize.define("userType",


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


    return userType;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}