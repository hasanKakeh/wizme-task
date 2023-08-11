import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { TitleService } from '@core/service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  title$!: Observable<string>
  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.title$ = this.titleService.title$
  }

}
