import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  Res,
  Query,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Response } from 'express';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body('title') title: string) {
    return this.questionService.create(title);
  }

  @Get('search')
  async search(@Query('q') searchTerm: string) {
    if (!searchTerm) {
      return [];
    }
    return this.questionService.searchQuestions(searchTerm);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const questions = await this.questionService.findAll();
    if (questions.length === 0) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }
    return res.status(HttpStatus.OK).json(questions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('title') title: string) {
    return this.questionService.update(id, title);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.questionService.delete(id);
  }
}
