import { QuestionService } from './question.service';
import { Response } from 'express';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(title: string): Promise<import("./schemas/question.schema").Question>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string): Promise<import("./schemas/question.schema").Question>;
    update(id: string, title: string): Promise<import("./schemas/question.schema").Question>;
    delete(id: string): Promise<void>;
}
