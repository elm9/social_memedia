var bcrypt = require("bcrypt-nodejs")

module.exports = function (sequelize, DataTypes) {
    var Profile = sequelize.define("profile", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true    
            }
        }
    });

    Profile.prototype.validPassword = function (password) {
        // console.log(password);
        // console.log(this.password);
        return bcrypt.compareSync(password, this.password);
    };

    Profile.hook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return Profile;
};