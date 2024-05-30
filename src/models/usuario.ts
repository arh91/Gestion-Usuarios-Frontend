export class Usuario {
    nick: string;
    password: string;
    mail: string
    telefono: number;
    conectado: boolean;
  
    constructor() {
      // Inicializa las propiedades por defecto si es necesario
      this.nick = '';
      this.password = '';
      this.mail = '';
      this.telefono = 0;
      this.conectado = false;
    }
  }