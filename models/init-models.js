var DataTypes = require("sequelize").DataTypes;
var _asistencia = require("./asistencia");
var _evento = require("./evento");
var _localizacion = require("./localizacion");
var _organizadorFavorito = require("./organizadorFavorito");
var _reporte = require("./reporte");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var asistencia = _asistencia(sequelize, DataTypes);
  var evento = _evento(sequelize, DataTypes);
  var localizacion = _localizacion(sequelize, DataTypes);
  var organizadorFavorito = _organizadorFavorito(sequelize, DataTypes);
  var reporte = _reporte(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  evento.belongsToMany(usuario, { as: 'idUser_usuarios', through: asistencia, foreignKey: "idEvento", otherKey: "idUser" });
  usuario.belongsToMany(evento, { as: 'idEvento_eventos', through: asistencia, foreignKey: "idUser", otherKey: "idEvento" });
  usuario.belongsToMany(usuario, { as: 'idOrganizador_usuarios', through: organizadorFavorito, foreignKey: "idUsuario", otherKey: "idOrganizador" });
  usuario.belongsToMany(usuario, { as: 'idUsuario_usuarios', through: organizadorFavorito, foreignKey: "idOrganizador", otherKey: "idUsuario" });
  asistencia.belongsTo(evento, { as: "idEvento_evento", foreignKey: "idEvento"});
  evento.hasMany(asistencia, { as: "asistencia", foreignKey: "idEvento"});
  evento.belongsTo(localizacion, { as: "idLoc_localizacion", foreignKey: "idLoc"});
  localizacion.hasMany(evento, { as: "eventos", foreignKey: "idLoc"});
  asistencia.belongsTo(usuario, { as: "idUser_usuario", foreignKey: "idUser"});
  usuario.hasMany(asistencia, { as: "asistencia", foreignKey: "idUser"});
  evento.belongsTo(usuario, { as: "idUser_usuario", foreignKey: "idUser"});
  usuario.hasMany(evento, { as: "eventos", foreignKey: "idUser"});
  organizadorFavorito.belongsTo(usuario, { as: "idUsuario_usuario", foreignKey: "idUsuario"});
  usuario.hasMany(organizadorFavorito, { as: "organizadorFavoritos", foreignKey: "idUsuario"});
  organizadorFavorito.belongsTo(usuario, { as: "idOrganizador_usuario", foreignKey: "idOrganizador"});
  usuario.hasMany(organizadorFavorito, { as: "idOrganizador_organizadorFavoritos", foreignKey: "idOrganizador"});
  reporte.belongsTo(usuario, { as: "codigoReportado_usuario", foreignKey: "codigoReportado"});
  usuario.hasMany(reporte, { as: "reportes", foreignKey: "codigoReportado"});

  return {
    asistencia,
    evento,
    localizacion,
    organizadorFavorito,
    reporte,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
