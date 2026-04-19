"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotoristasController = void 0;
const common_1 = require("@nestjs/common");
const request_context_middleware_1 = require("../../common/http/request-context.middleware");
const motoristas_service_1 = require("./motoristas.service");
let MotoristasController = class MotoristasController {
    motoristasService;
    constructor(motoristasService) {
        this.motoristasService = motoristasService;
    }
    create(dto, req) {
        const requestId = (0, request_context_middleware_1.getRequestContext)(req)?.requestId;
        return this.motoristasService.create(dto, { requestId });
    }
    findAll() {
        return this.motoristasService.findAll();
    }
    findOne(id) {
        return this.motoristasService.findOne(id);
    }
};
exports.MotoristasController = MotoristasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", void 0)
], MotoristasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MotoristasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MotoristasController.prototype, "findOne", null);
exports.MotoristasController = MotoristasController = __decorate([
    (0, common_1.Controller)('motoristas'),
    __metadata("design:paramtypes", [motoristas_service_1.MotoristasService])
], MotoristasController);
//# sourceMappingURL=motoristas.controller.js.map