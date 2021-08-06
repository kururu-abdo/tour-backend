
module.exports = (sequelize, DataTypes) => {




    const state = sequelize.define("tag",


        {


            tag_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },


            tag_en_name: {
                type: DataTypes.STRING,

            },
            tag_ar_name: {
                type: DataTypes.STRING,

            },
          
        },
        {
            timestamps: false,
        }


    )


    return state;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}