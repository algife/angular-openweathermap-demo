import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WeatherService } from '@services/weather/weather.service';
import { Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';

const searchBoxDebounceTime = 200;

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  private readonly destroyed$ = new Subject();

  public searchBoxForm = this.fb.group({
    query: ['', Validators.required]
  });

  constructor(private readonly fb: FormBuilder, private readonly weatherService: WeatherService) {}

  ngOnInit() {
    this.initSubscriptions();
  }

  private initSubscriptions() {
    // Sources
    const queryChanges$ = this.searchBoxForm.valueChanges.pipe(
      takeUntil(this.destroyed$),
      debounceTime(searchBoxDebounceTime),
      map(({ query }) => query)
    );

    // Subscriptions
    queryChanges$.subscribe(query => this.weatherService.filterCities(query));
  }
}
