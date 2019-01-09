import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterializeAction } from 'angular2-materialize';

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
   * Modal form.
   */
  public searchForm: FormGroup;

  // Side navbar actions.
  public sideNavActions = new EventEmitter<string | MaterializeAction>();

  // Side nav params.
  public sideNavParams: any[] = [{ closeOnClick: true, edge: 'right' }];
  public showAllFilters = true;

  /**
   * Output search event.
   */
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Placeholder input
   */
  @Input() placeholder: string = 'Pesquisar';

  /**
   * Emit a key of values selected to dynamic form.
   */
  @Output() keysSelected: EventEmitter<string[]> = new EventEmitter<string[]>();

  /**
   * Emit a dynamic form values.
   */
  @Output() formValue: EventEmitter<any> = new EventEmitter();

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

    this.searchForm.controls['input'].valueChanges
      .debounceTime(400)
      .subscribe(search => this.onSearch.emit(search));
  }

  get input() { return this.searchForm.get('input'); }

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

  /**
 * Get all keys to add in search fild
 * @param keys keys selecteds in dynamic form.
 * emit keys selecteds to component
 */
  formKeysSelected(keys: string[]) {
    this.keysSelected.emit(keys);
    this.hideSideNav();
  }

  /**
   * Get dynamic form values.
   * @param values values to dynamic form.
   * emit values to dynamic form to component
   */
  formValues(values) {
    if (!values) {
      this.formValue.emit(null);
      return;
    }
    // object to save state form.
    const state = {
      values: [], // form values in formact -> [{key,value}]
      dates: {},  // object with init_date and finish_date to do filter.
    };

    // remove empty values.
    Object.keys(values)
      // tslint:disable-next-line:ter-prefer-arrow-callback
      .forEach(function eachKey(key) {
        // case has a value.
        if (values[key] && key !== 'init_date' && key !== 'finish_date') {
          state.values.push({ key, value: values[key] });
        }
        if (values[key] && key === 'init_date') {
          state.dates['init_date'] = values[key];
        } else if (values[key] && key === 'finish_date') {
          state.dates['finish_date'] = values[key];
        }
      });

    this.formValue.emit(state);
    this.hideSideNav();
  }

  /**
   * hide sideNav.
   */
  hideSideNav() {
    this.sideNavParams = ['hide'];
    this.sideNavActions.emit('sideNav');
  }

}
