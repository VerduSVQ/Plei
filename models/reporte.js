const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reporte', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codReporte: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    mensaje: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    codigoReportado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'reporte',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "reporte_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "codigoReportado" },
        ]
      },
    ]
  });
};
