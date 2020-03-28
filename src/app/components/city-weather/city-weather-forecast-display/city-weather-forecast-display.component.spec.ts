import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CityWeatherForecastDisplayComponent } from './city-weather-forecast-display.component';

describe('CityWeatherDisplayComponent', () => {
  let component: CityWeatherForecastDisplayComponent;
  let fixture: ComponentFixture<CityWeatherForecastDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CityWeatherForecastDisplayComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityWeatherForecastDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
