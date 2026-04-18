import { Injectable } from '@nestjs/common';
import type { AuditEvent } from './audit.types';

@Injectable()
export class AuditService {
  async record(event: AuditEvent): Promise<void> {
    // Implementação inicial: log estruturado (pode evoluir para persistir no BD)
    // eslint-disable-next-line no-console
    console.log(JSON.stringify({ audit: event }));
  }
}

