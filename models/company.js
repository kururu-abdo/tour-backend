

module.exports = (sequelize, DataTypes) => {




    const company = sequelize.define("company",


        {


            id : {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },


           ar_name: {
                type: DataTypes.STRING,

            },
           en_name: {
                type: DataTypes.STRING,

            },
            address: {
                type: DataTypes.STRING,

            },
            phone: {
                type: DataTypes.STRING,

            },
            email: {
                type: DataTypes.STRING,

            },
            whatsapp: {
                type: DataTypes.STRING,

            },

        } ,
        {
            timestamps: false,
        }

    )


    return company;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}