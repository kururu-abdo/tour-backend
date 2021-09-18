
module.exports = (sequelize, DataTypes) => {




    const facilitate_location = sequelize.define("facilitate_location",


        {


            fcilitate_loc_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            er_name: {
                type: DataTypes.STRING,
            } ,
            en_name:{
                type: DataTypes.STRING,
            } ,
ar_address: {
                type: DataTypes.STRING,

            },
            en_address: {
                type: DataTypes.STRING,

            },

            email: {
                type: DataTypes.STRING,

            },
            whtsapp: {
                type: DataTypes.STRING,

            },
            en_short_desc  :{
                type: DataTypes.STRING,

            } ,


            ar_short_desc: {
                type: DataTypes.STRING,

            },



        } ,
        {
            timestamps: false,
        }


    )


    return facilitate_location;

    // user.belongsTo(country, { foreignKey: 'fk_customerid', targetKey: 'country_id' });
    // country.hasMany(user, { foreignKey: 'fk_customerid', targetKey: 'country_id' });


}