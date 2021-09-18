
module.exports = (sequelize, DataTypes) => {




    const rank = sequelize.define("rank",


        {


            id: {
                type: DataTypes.INTEGER,
                unique : true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,


            },
            location_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,


            },

            
            rank: {
                type: DataTypes.DOUBLE,

            },
           
        } ,
        {
            timestamps: false,
        }


    )


    return rank;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}