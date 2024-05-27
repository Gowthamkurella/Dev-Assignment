import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body('title') title: string) {
    return this.questionService.create(title);
  }

  @Get()
  async findAllOrSearch(@Query('q') searchTerm: string, @Res() res: Response) {
    let questions;

    if (searchTerm) {
      questions = await this.questionService.searchQuestions(searchTerm);
    } else {
      questions = await this.questionService.findAll();
    }

    if (questions.length === 0) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }

    return res.status(HttpStatus.OK).json(questions);
  }

  // @Get('search')
  // async search(@Query('q') searchTerm: string) {
  //   if (!searchTerm) {
  //     return [];
  //   }
  //   return this.questionService.searchQuestions(searchTerm);
  // }

  // @Get()
  // async findAll(@Res() res: Response) {
  //   const questions = await this.questionService.findAll();
  //   if (questions.length === 0) {
  //     return res.status(HttpStatus.NO_CONTENT).send();
  //   }
  //   return res.status(HttpStatus.OK).json(questions);
  // }

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
