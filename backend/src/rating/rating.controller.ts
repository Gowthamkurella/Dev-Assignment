import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
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
  async getQuestionsWithRatings(
    @Query('start') start: string,
    @Query('end') end: string,
    @Res() res: Response,
  ) {
    if (start && end) {
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
    } else {
      const questions = await this.ratingService.getQuestionsWithRatings();
      if (questions.length === 0) {
        return res.status(HttpStatus.NO_CONTENT).send();
      }
      return res.status(HttpStatus.OK).json(questions[0]);
    }
  }
}
