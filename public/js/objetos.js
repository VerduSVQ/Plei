class Usuario {
    constructor(id, usuario, clave, nombre, rangoAsistente, rangoOrganizador, activo, rol) {
        this.id = id;
        this.usuario = usuario;
        this.clave = clave;
        this.nombre = nombre;
        this.rangoAsistente = rangoAsistente;
        this.rangoOrganizador = rangoOrganizador;
        this.activo = activo;
        this.rol = rol;
    }
}

class Evento {
    constructor(idEvento, foto, nombre, ciudad, genero, idUser, idLoc) {
        this.idEvento = idEvento;
        this.foto = foto;
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.genero = genero;
        this.idUser = idUser;
        this.idLoc = idLoc;
    }
}

class Reporte {
    constructor(codReporte, mensaje, codigoReportado, activo) {
        this.codReporte = codReporte;
        this.mensaje = mensaje;
        this.codigoReportado = codigoReportado;
        this.activo = activo;
    }
}

class Localizacion {
    constructor(idLocalizacion, nombre, ciudad, provincia, coordenadas) {
        this.idLocalizacion = idLocalizacion;
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.provincia = provincia;
        this.coordenadas = coordenadas;
    }
}

class Asistencia {
    constructor(idUser, idEvento) {
        this.idUser = idUser;
        this.idEvento = idEvento;
    }
}

class OrganizadorFavorito {
    constructor(idUsuario, idOrganizador) {
        this.idUsuario = idUsuario;
        this.idOrganizador = idOrganizador;
    }
}

class Empresa {
    // ==========================
    // Métodos para Usuario
    // ==========================
    async altaUsuario(oUsuario) {
        return await peticionPOSTJSON("/usuarios", oUsuario);
    }

    async updateUsuario(oUsuario) {
        const idUser = oUsuario.id;
        return await peticionPUTJSON(`/usuarios/${idUser}`, oUsuario);
    }

    async borrarUsuario(idUsuario) {
        return await peticionDELETE(`/usuarios/${idUsuario}`);
    }

    async listadoUsuarios() {
        return await peticionGET("/usuarios", new FormData());
    }

    async login(usuario, clave) {
        const usuariolog = { usuario, clave };
        return await peticionPOSTJSON("/usuarios/login", usuariolog);
    }

    // ==========================
    // Métodos para Evento
    // ==========================
    async altaEvento(oEvento) {
        return await peticionPOSTJSON("/eventos", oEvento);
    }

    async updateEvento(oEvento) {
        const idEvento = oEvento.idEvento;
        return await peticionPUTJSON(`/eventos/${idEvento}`, oEvento);
    }

    async borrarEvento(idEvento) {
        return await peticionDELETE(`/eventos/${idEvento}`);
    }

    async listadoEventos() {
        return await peticionGET("/eventos", new FormData());
    }

    async listadoEventosUser(idUsuario) {
        return await peticionGET(`/eventos/MisEventos/${idUsuario}`, new FormData());
    }

    // ==========================
    // Métodos para Reporte
    // ==========================
    async altaReporte(oReporte) {
        return await peticionPOSTJSON("/reportes", oReporte);
    }

    async updateReporte(oReporte) {
        const codReporte = oReporte.codReporte;
        return await peticionPUTJSON(`/reportes/${codReporte}`, oReporte);
    }

    async borrarReporte(codReporte) {
        return await peticionDELETE(`/reportes/${codReporte}`);
    }

    async listadoReportes() {
        return await peticionGET("/reportes", new FormData());
    }

    // ==========================
    // Métodos para Localizacion
    // ==========================
    async altaLocalizacion(oLocalizacion) {
        return await peticionPOSTJSON("/localizaciones", oLocalizacion);
    }

    async updateLocalizacion(oLocalizacion) {
        const idLocalizacion = oLocalizacion.idLocalizacion;
        return await peticionPUTJSON(`/localizaciones/${idLocalizacion}`, oLocalizacion);
    }

    async borrarLocalizacion(idLocalizacion) {
        return await peticionDELETE(`/localizaciones/${idLocalizacion}`);
    }

    async listadoLocalizaciones() {
        return await peticionGET("/localizaciones", new FormData());
    }

    // ==========================
    // Métodos para Asistencia
    // ==========================
    async altaAsistencia(oAsistencia) {
        return await peticionPOSTJSON("/asistencias", oAsistencia);
    }

    async borrarAsistencia(idUser, idEvento) {
        return await peticionDELETE(`/asistencias/${idUser}/${idEvento}`);
    }

    async listadoAsistencias() {
        return await peticionGET("/asistencias", new FormData());
    }

    async listadoAsistenciasEvento(idEvento) {
        return await peticionGET(`/asistencias/evento/${idEvento}`, new FormData());
    }

    async listadoAsistenciasUsuario(idUser) {
        return await peticionGET(`/asistencias/usuario/${idUser}`, new FormData());
    }

    // ==========================
    // Métodos para OrganizadorFavorito
    // ==========================
    async altaOrganizadorFavorito(oOrganizadorFavorito) {
        return await peticionPOSTJSON("/organizadoresFavoritos", oOrganizadorFavorito);
    }

    async borrarOrganizadorFavorito(idUsuario, idOrganizador) {
        return await peticionDELETE(`/organizadoresFavoritos/${idUsuario}/${idOrganizador}`);
    }

    async listadoOrganizadoresFavoritos(idUsuario) {
        return await peticionGET(`/organizadoresFavoritos/${idUsuario}`, new FormData());
    }
}
