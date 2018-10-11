// task.js
// ...
Task.associate = function(models) {
  // Using additional options like CASCADE etc for demonstration
  // Can also simply do Task.belongsTo(models.User);
  Task.belongsTo(models.User, {
    onDelete: "CASCADE",
    foreignKey: {
      allowNull: false
    }
  });
}
// ...