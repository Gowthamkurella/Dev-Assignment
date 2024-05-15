import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response, ResponseDocument } from '../question/schemas/response.schema';
import { RateQuestionDto } from './dto/rate-question.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class RatingService {
    constructor(@InjectModel(Response.name) private responseModel: Model<ResponseDocument>) {}

    
    async addRatings(rateQuestionsDto: RateQuestionDto[]): Promise<any> {
        const responses = rateQuestionsDto.map(rate => ({
            questionId: new ObjectId(rate.questionId), 
            rating: rate.rating
        }));
        return this.responseModel.insertMany(responses);
    }
    
    async getQuestionsWithRatings(): Promise<any> {
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

    async getQuestionsWithRatingsByDate(startDate: Date, endDate: Date): Promise<any> {
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
}
