module.exports = function(sequelize, DataTypes) {
    var memedia = sequelize.define("memedia", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: DataTypes.STRING,
        password: DataTypes.TEXT,
    });
    return memedia;
  };
  


