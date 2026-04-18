## Template de módulo (API)

Padrão de camadas (não misturar responsabilidades):
- **Controller**: HTTP (rotas, status codes, DTOs)
- **Service**: regras de negócio + orquestração + auditoria
- **Repository**: persistência (Prisma) e consultas

Checklist obrigatório:
- Validação de entrada (DTO + `class-validator`)
- Tratamento de erro padronizado (usar `ApiError`)
- Auditoria (usar `AuditService.record(...)`)
- Logs (já vêm do logger HTTP com `requestId`)

