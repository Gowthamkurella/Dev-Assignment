import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { RateQuestionsDto } from './dto/rate-questions.dto';
import { RatingService } from './rating.service';

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
    return res.status(HttpStatus.OK).json(questions[0]);
  }

  @Post('date-range')
  async getQuestionsWithRatingsByDate(
    @Body('start') start: string,
    @Body('end') end: string,
    @Res() res: Response,
  ) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);
    const questions = await this.ratingService.getQuestionsWithRatingsByDate(
      startDate,
      endDate,
    );

    if (questions.length === 0) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }
    return res.status(HttpStatus.OK).json(questions[0]);
  }
}
