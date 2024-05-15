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
exports.RatingController = void 0;
const common_1 = require("@nestjs/common");
const rating_service_1 = require("./rating.service");
const rate_questions_dto_1 = require("./dto/rate-questions.dto");
let RatingController = class RatingController {
    constructor(ratingService) {
        this.ratingService = ratingService;
    }
    addRatings(rateQuestionsDto) {
        return this.ratingService.addRatings(rateQuestionsDto.rates);
    }
    getQuestionsWithRatings() {
        return this.ratingService.getQuestionsWithRatings();
    }
    getQuestionsWithRatingsByDate(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        return this.ratingService.getQuestionsWithRatingsByDate(startDate, endDate);
    }
};
exports.RatingController = RatingController;
__decorate([
    (0, common_1.Post)('feedback'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rate_questions_dto_1.RateQuestionsDto]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "addRatings", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "getQuestionsWithRatings", null);
__decorate([
    (0, common_1.Get)('date-range'),
    __param(0, (0, common_1.Query)('start')),
    __param(1, (0, common_1.Query)('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "getQuestionsWithRatingsByDate", null);
exports.RatingController = RatingController = __decorate([
    (0, common_1.Controller)('ratings'),
    __metadata("design:paramtypes", [rating_service_1.RatingService])
], RatingController);
//# sourceMappingURL=rating.controller.js.map