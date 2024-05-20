import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Response,
  ResponseDocument,
} from '../question/schemas/response.schema';
import { Question, QuestionDocument } from './schemas/question.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(Response.name) private responseModel: Model<ResponseDocument>,
  ) {}

  async create(title: string): Promise<Question> {
    try {
      const newQuestion = new this.questionModel({ title });
      return await newQuestion.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create question');
    }
  }

  async findAll(): Promise<Question[]> {
    try {
      return await this.questionModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve questions');
    }
  }

  async findOne(id: string): Promise<Question> {
    try {
      const question = await this.questionModel.findById(id).exec();
      if (!question) {
        throw new NotFoundException(`Question with ID ${id} not found`);
      }
      return question;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve question');
    }
  }

  async update(id: string, title: string): Promise<Question> {
    try {
      const updatedQuestion = await this.questionModel
        .findByIdAndUpdate(id, { title }, { new: true })
        .exec();
      if (!updatedQuestion) {
        throw new NotFoundException(`Question with ID ${id} not found`);
      }
      return updatedQuestion;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update question');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.questionModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Question with ID ${id} not found`);
      }
      await this.responseModel.deleteMany({ questionId: id }).exec();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete question');
    }
  }

  async searchQuestions(searchTerm: string): Promise<Question[]> {
    try {
      return await this.questionModel
        .find({
          title: { $regex: searchTerm, $options: 'i' },
        })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to search questions');
    }
  }
}
