
module.exports = (sequelize, DataTypes) => {




    const work_time = sequelize.define("comment",


        {


            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },



            time: {
                type: DataTypes.TIME,

            },
            comment: {
                type: DataTypes.STRING,

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