const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('evento', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ciudad: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    genero: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    foto: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    rango: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    activo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id'
      }
    },
    idLoc: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'localizacion',
        key: 'idLocalizacion'
      }
    }
  }, {
    sequelize,
    tableName: 'evento',
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
        name: "evento_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      },
      {
        name: "evento_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "idLoc" },
        ]
      },
    ]
  });
};
