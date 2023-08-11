import { InputDateFieldComponent } from './components/input-date-field/input-date-field.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationPipe } from './pipes/validation.pipe';

const components = [
  ValidationPipe,
  InputFieldComponent,
  InputDateFieldComponent
]

@NgModule({
  declarations: components,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  exports: components
})
export class SharedModule { }
