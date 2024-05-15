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
exports.RatingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const response_schema_1 = require("../question/schemas/response.schema");
const mongodb_1 = require("mongodb");
let RatingService = class RatingService {
    constructor(responseModel) {
        this.responseModel = responseModel;
    }
    async addRatings(rateQuestionsDto) {
        const responses = rateQuestionsDto.map(rate => ({
            questionId: new mongodb_1.ObjectId(rate.questionId),
            rating: rate.rating
        }));
        return this.responseModel.insertMany(responses);
    }
    async getQuestionsWithRatings() {
        return this.responseModel.aggregate([
            {
                $group: {
                    _id: "$questionId",
                    avg_rating: { $avg: "$rating" },
                    total_responses: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "questions",
                    localField: "_id",
                    foreignField: "_id",
                    as: "question_details"
                }
            },
            {
                $unwind: "$question_details"
            },
            {
                $project: {
                    _id: 0,
                    question: "$question_details.title",
                    avg_rating: 1,
                    total_responses: 1
                }
            }
        ]);
    }
    async getQuestionsWithRatingsByDate(startDate, endDate) {
        return this.responseModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: "$questionId",
                    avg_rating: { $avg: "$rating" },
                    total_responses: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "questions",
                    localField: "_id",
                    foreignField: "_id",
                    as: "question_details"
                }
            },
            {
                $unwind: "$question_details"
            },
            {
                $project: {
                    _id: 0,
                    question: "$question_details.title",
                    avg_rating: 1,
                    total_responses: 1
                }
            }
        ]);
    }
};
exports.RatingService = RatingService;
exports.RatingService = RatingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(response_schema_1.Response.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RatingService);
//# sourceMappingURL=rating.service.js.map