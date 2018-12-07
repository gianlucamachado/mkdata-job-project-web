import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Search bar component
 *
 * Allows user search by string.
 */
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {

  /**
   * Output search event.
   */
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Modal form.
   */
  public searchForm: FormGroup;

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
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // initialize form group
    self.initializeForm();
  }

  /**
   * Initialize Form.
   */
  initializeForm(): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // form group
    self.searchForm = self.formBuilder.group({
      input: ['', Validators.required],
    });
  }

}
