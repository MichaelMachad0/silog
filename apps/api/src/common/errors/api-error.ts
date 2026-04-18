export type ApiErrorBody = {
  code: string;
  message: string;
  requestId?: string;
  details?: unknown;
};

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly details?: unknown;

  constructor(args: { code: string; message: string; status: number; details?: unknown }) {
    super(args.message);
    this.code = args.code;
    this.status = args.status;
    this.details = args.details;
  }
}

