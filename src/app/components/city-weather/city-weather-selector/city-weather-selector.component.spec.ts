import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityWeatherSelectorComponent } from './city-weather-selector.component';

describe('CityWeatherSelectorComponent', () => {
  let component: CityWeatherSelectorComponent;
  let fixture: ComponentFixture<CityWeatherSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CityWeatherSelectorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityWeatherSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
