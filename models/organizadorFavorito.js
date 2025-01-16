const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('organizadorFavorito', {
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'id'
      }
    },
    idOrganizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'organizadorFavorito',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
          { name: "idOrganizador" },
        ]
      },
      {
        name: "organizadorFavorito_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "idOrganizador" },
        ]
      },
    ]
  });
};
