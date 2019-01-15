import { QuestionBase } from './question-base';

export class SwitchQuestion extends QuestionBase<string> {
  controlType = 'switch';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
