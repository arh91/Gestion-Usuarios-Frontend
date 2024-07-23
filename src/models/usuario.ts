export class Usuario {
    nick: string;
    password?: string;
    mail: string
    telefono: number;
    fechaRegistro: Date;
    conectado: boolean;
  

    constructor(nick: string = '', password?: string, mail: string = '', telefono: number = 0, fechaRegistro: Date = new Date(),
      conectado: boolean = false) {
      this.nick = nick;
      this.password = password;
      this.mail = mail;
      this.telefono = telefono;
      this.fechaRegistro = fechaRegistro;
      this.conectado = conectado;
    }

  }