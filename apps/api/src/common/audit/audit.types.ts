export type AuditEventName =
  | 'entity.created'
  | 'entity.updated'
  | 'entity.deleted'
  | 'auth.login'
  | 'auth.logout';

export type AuditEvent = {
  name: AuditEventName;
  at: string; // ISO
  actor?: {
    userId?: string;
    ip?: string;
  };
  requestId?: string;
  resource?: {
    type: string;
    id?: string;
  };
  metadata?: Record<string, unknown>;
};

