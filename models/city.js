
module.exports = (sequelize, DataTypes) => {




    const city = sequelize.define("city",


        {


            city_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },


            city_ar_name: {
                type: DataTypes.STRING,

            },
             city_en_name: {
                type: DataTypes.STRING,

            },
            state_id: {
                type: DataTypes.INTEGER,

            } ,

            
        } ,
          {
            timestamps: false,
        }

    )


    return city;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}