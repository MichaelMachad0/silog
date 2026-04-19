"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    code;
    status;
    details;
    constructor(args) {
        super(args.message);
        this.code = args.code;
        this.status = args.status;
        this.details = args.details;
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=api-error.js.map