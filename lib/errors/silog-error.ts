export class SilogError extends Error {
  readonly statusCode: number;

  constructor(mensagem: string, statusCode = 400) {
    super(mensagem);
    this.name = "SilogError";
    this.statusCode = statusCode;
  }
}
