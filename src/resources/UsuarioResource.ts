
export default class UsuarioResource {
  private usuario: any;

  constructor(usuario: any) {
    this.usuario = usuario;
  }

  item() {
    return {
      id: this.usuario._id,

      nombre: this.usuario.nombre,
      email: this.usuario.email,

      rol: this.usuario.rol,

      direccion: this.usuario.direccion,
      telefono: this.usuario.telefono,

      createdAt: this.usuario.createdAt,
      updatedAt: this.usuario.updatedAt,
    };
  }
}