
module.exports = (sequelize, DataTypes) => {




    const location = sequelize.define("location",


        {


           location_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true

            },


            location_ar_name: {
                type: DataTypes.STRING,

            },
            location_en_name: {
                type: DataTypes.STRING,

            },

            ar_desc: {
                type: DataTypes.STRING,

            },
            en_desc: {
                type: DataTypes.STRING,

            },
            lat: {
                type: DataTypes.DOUBLE,


            },
            lng: {
                type: DataTypes.DOUBLE,

            },
           
        }

    )


    return location;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}