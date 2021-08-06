
module.exports = (sequelize, DataTypes) => {




    const work_time = sequelize.define("work_time",


        {


            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },


          
            start_time: {
                type: DataTypes.TIME,

            },
            end_time: {
                type: DataTypes.TIME,

            }
        } ,
        {
            timestamps: false,
        }


    )


    return work_time;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}