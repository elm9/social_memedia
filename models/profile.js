module.exports = function(sequelize, DataTypes) {
    var memedia = sequelize.define("profile", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: DataTypes.STRING,
        password: DataTypes.TEXT,
        email: DataTypes.TEXT
    });
    return memedia;
  };
  


