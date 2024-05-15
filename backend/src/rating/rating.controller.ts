import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RateQuestionsDto } from './dto/rate-questions.dto';

@Controller('ratings')
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    @Post('feedback')
    addRatings(@Body() rateQuestionsDto: RateQuestionsDto) {
        return this.ratingService.addRatings(rateQuestionsDto.rates);
    }

    @Get()
    getQuestionsWithRatings() {
        return this.ratingService.getQuestionsWithRatings();
    }

    @Get('date-range')
    getQuestionsWithRatingsByDate(@Query('start') start: string, @Query('end') end: string) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        return this.ratingService.getQuestionsWithRatingsByDate(startDate, endDate);
    }
}
