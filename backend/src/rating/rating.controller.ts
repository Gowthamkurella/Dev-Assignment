import { Controller, Post, Body, Param, Get, Query,Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
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
    async getQuestionsWithRatings(@Res() res: Response) {
      const questions = await this.ratingService.getQuestionsWithRatings();
      if (questions.length === 0) {
        return res.status(HttpStatus.NO_CONTENT).send();
      }
      return res.status(HttpStatus.OK).json(questions);
    }

    @Get('date-range')
    async getQuestionsWithRatingsByDate(@Query('start') start: string, @Query('end') end: string, @Res() res: Response) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const questions = await this.ratingService.getQuestionsWithRatingsByDate(startDate, endDate);
    if (questions.length === 0) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }
    return res.status(HttpStatus.OK).json(questions);
  }
}
