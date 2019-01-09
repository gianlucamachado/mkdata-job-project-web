import { QuestionBase } from './question-base';

export class RadioBoxQuestion extends QuestionBase<string> {
  controlType = 'radiobox';
  options: { key: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
