import { Response } from 'express';
import { RatingService } from './rating.service';
import { RateQuestionsDto } from './dto/rate-questions.dto';
export declare class RatingController {
    private readonly ratingService;
    constructor(ratingService: RatingService);
    addRatings(rateQuestionsDto: RateQuestionsDto): Promise<any>;
    getQuestionsWithRatings(res: Response): Promise<Response<any, Record<string, any>>>;
    getQuestionsWithRatingsByDate(start: string, end: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
