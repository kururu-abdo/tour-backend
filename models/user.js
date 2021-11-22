
module.exports = (sequelize, DataTypes) => {




    const user = sequelize.define("users",


        {


            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true

            },


            user_name: {
                type: DataTypes.STRING,

            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            password: {
                type: DataTypes.STRING,

            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            address: {
                type: DataTypes.STRING,

            },
            pic : {
                type: DataTypes.STRING,

            } ,

            country_id: {
                type: DataTypes.INTEGER,

            },
        } ,
        {
            timestamps: false,
            indexes: [
                {
                    unique: true,
                    fields: [ 'phone']
                }
            ]
        }


    )


    return user;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}