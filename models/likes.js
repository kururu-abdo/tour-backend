
module.exports = (sequelize, DataTypes) => {




    const like = sequelize.define("like",


        {


            id: {
                type: DataTypes.INTEGER,
               // primaryKey: true,
               unique :true,
                autoIncrement: true ,
               
            },


           user_id: {
                type: DataTypes.INTEGER,
               primaryKey: true,


            },
            location_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,


            },

        } ,
        {
            timestamps: false,
            
        } ,
        


    )


    return like;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}