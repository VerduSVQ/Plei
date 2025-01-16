// config/sequelize.js
const { Sequelize } = require('sequelize');

// Instanciar sequelize  para conectar a mysql
const sequelize = new Sequelize('Plei', 'root', 'oYyPrHWRdddXiHTOnoYtqxrZgBgcSfwB', {
    host: 'junction.proxy.rlwy.net', // Solo el host, sin el puerto
    port: 50279, // El puerto expuesto por Railway
    dialect: 'mysql', // Dialecto para MySQL
    dialectOptions: {
      connectTimeout: 10000, // Ajusta el tiempo de espera de conexión
    },
    logging: console.log, // Habilita o deshabilita logs de consultas
  });
  
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Conexión establecida correctamente.');
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  })();

module.exports = sequelize; // Exportar la instancia de Sequelize para usarla en otros archivos