
module.exports = (sequelize, DataTypes) => {




    const comment = sequelize.define("comment",


        {


            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },



            time: {
                type: DataTypes.DATE,

            },
            comment: {
                type: DataTypes.STRING,

            }
        } ,
        {
            timestamps: false,
        }


    )


    return comment;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}