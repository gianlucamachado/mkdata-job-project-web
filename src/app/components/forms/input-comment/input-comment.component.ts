import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Input comment component.
 */
@Component({
  selector: 'app-input-comment',
  templateUrl: './input-comment.component.html',
  styleUrls: ['./input-comment.component.scss'],
})
export class InputCommentComponent implements OnInit {

  /**
   * On button clicked.
   */
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Form group
   */
  public inputForm: FormGroup;

  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {

    // initialize form
    this.inputForm = this.formBuilder.group({
      input: ['', Validators.compose([Validators.required])],
    });

  }

  /**
   * Validate
   */
  validate(form: FormGroup) {
    if (form.valid) {

      // send event
      this.onClick.emit(form.getRawValue().input);

      // clear input
      this.inputForm.reset();

    }
  }

}
