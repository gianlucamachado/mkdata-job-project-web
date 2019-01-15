export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  placeholder: string;
  required: boolean;
  order: number;
  controlType: string;
  className: string[];
  header: boolean;
  mask: string;

  constructor(options: {
    value?: T,
    key?: string,
    label?: string,
    placeholder?: string,
    required?: boolean,
    order?: number,
    controlType?: string,
    header?: boolean,
    className?: string[]
    mask?: string,
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.className = options.className || [];
    this.header = options.header || false;
    this.mask = options.mask || '';
  }
}
