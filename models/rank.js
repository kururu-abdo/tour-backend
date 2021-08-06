
module.exports = (sequelize, DataTypes) => {




    const work_time = sequelize.define("rank",


        {


            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },



            rank: {
                type: DataTypes.DOUBLE,

            },
           
        } ,
        {
            timestamps: false,
        }


    )


    return work_time;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}