export class UsuarioSinPassword {
    nick: string;
    mail: string;
    telefono: number;
    conectado: boolean;

    constructor() {
        // Inicializa las propiedades por defecto si es necesario
        this.nick = '';
        this.mail = '';
        this.telefono = 0;
        this.conectado = false;
      }
  }
  