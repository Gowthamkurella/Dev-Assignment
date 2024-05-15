"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const rating_service_1 = require("./rating.service");
const rating_controller_1 = require("./rating.controller");
const response_schema_1 = require("../question/schemas/response.schema");
const question_schema_1 = require("../question/schemas/question.schema");
let RatingModule = class RatingModule {
};
exports.RatingModule = RatingModule;
exports.RatingModule = RatingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: question_schema_1.Question.name, schema: question_schema_1.QuestionSchema },
                { name: response_schema_1.Response.name, schema: response_schema_1.ResponseSchema },
            ]),
        ],
        providers: [rating_service_1.RatingService],
        controllers: [rating_controller_1.RatingController],
    })
], RatingModule);
//# sourceMappingURL=rating.module.js.map