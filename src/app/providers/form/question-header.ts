import { QuestionBase } from './question-base';

export class HeaderQuestion extends QuestionBase<string> {
  controlType = 'text';
  header = true;
  value = '';

  constructor(options: {} = {}) {
    super(options);
    this.header = options['header'] || true;
    this.value = options['value'] || '';
  }
}
