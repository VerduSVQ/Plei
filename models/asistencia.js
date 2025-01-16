const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('asistencia', {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'id'
      }
    },
    idEvento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'evento',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'asistencia',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUser" },
          { name: "idEvento" },
        ]
      },
      {
        name: "asistenciaEvento",
        using: "BTREE",
        fields: [
          { name: "idEvento" },
        ]
      },
    ]
  });
};
