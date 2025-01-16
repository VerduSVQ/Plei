const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usuario: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    clave: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    rangoAsistente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rangoOrganizador: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    rol: {
      type: DataTypes.STRING(3),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuario',
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
    ]
  });
};
