import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'input-date-field',
  templateUrl: './input-date-field.component.html',
  styleUrls: ['./input-date-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputDateFieldComponent implements OnInit {
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() placeholder: string = '';
  @Input() errorMessages!: any;

  constructor(private formGroupDirective: FormGroupDirective) { };

  get formControl(): FormControl {
    return this.formGroupDirective.control.get(this.controlName) as FormControl
  }
  ngOnInit(): void {
  }

}
