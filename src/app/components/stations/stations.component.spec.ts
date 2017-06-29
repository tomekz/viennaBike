import {} from 'jasmine'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MdSelectModule } from '@angular/material'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule } from '@angular/forms'
import { DebugElement }    from '@angular/core'
import { By }              from '@angular/platform-browser'
import { StationsComponent } from './stations.component'
import { StationsService } from '../../services/stations.service'
import { StationFilterPipe } from '../../pipes/stations-filter.pipe'
import { Observable } from 'rxjs/Rx'
import { Station }  from '../../model/Station'
import fakeStations from './fake-stations' 

class StationsServiceStub {
  fetchObservable() :Observable<Station[]>{
    return Observable.of(fakeStations.network.stations.map((s) => new Station(s)))
  }
}


describe('StationsComponent', () => {
  let component: StationsComponent;
  let fixture: ComponentFixture<StationsComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MdSelectModule, RouterTestingModule, NoopAnimationsModule],
      declarations: [ StationsComponent, StationFilterPipe ],
      providers: [ {provide: StationsService, useValue: new StationsServiceStub() } ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(StationsComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('should display 121 stations', () => {
    fixture.detectChanges()
    expect(component.stations.length).toBe(121)
  })

  it('should display a card for a station with its name and bikes count', () =>{
    fixture.detectChanges()
    let cardTitle = debugElement.query(By.css('.stations .station-card md-card-title')) 
    let cardContent = debugElement.query(By.css('.stations .station-card .station-bikes-count'))

    expect(cardTitle.name).toBe('md-card-title')
    expect(cardTitle.nativeElement.innerText).toBe('Station 114')
    expect(cardContent.nativeElement.innerText).toBe('16 bikes')
  })

}); 
