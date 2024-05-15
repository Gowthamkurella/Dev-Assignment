import { RatingService } from './rating.service';
import { RateQuestionsDto } from './dto/rate-questions.dto';
export declare class RatingController {
    private readonly ratingService;
    constructor(ratingService: RatingService);
    addRatings(rateQuestionsDto: RateQuestionsDto): Promise<any>;
    getQuestionsWithRatings(): Promise<any>;
    getQuestionsWithRatingsByDate(start: string, end: string): Promise<any>;
}
