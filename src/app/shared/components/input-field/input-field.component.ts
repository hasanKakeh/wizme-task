import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent implements OnInit {
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() placeholder: string = '';
  @Input() errorMessages!: any
  constructor(private formGroupDirective: FormGroupDirective) { }

  get formControl(): FormControl {
    return this.formGroupDirective.control.get(this.controlName) as FormControl
  }
  ngOnInit(): void {
  }

}
