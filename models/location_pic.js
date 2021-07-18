
module.exports = (sequelize, DataTypes) => {




    const location_pic = sequelize.define("location_pic",


        {


            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },


            pic: {
                type: DataTypes.STRING,

            }
        }

    )


    return location_pic;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}