import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEquipo } from './ficha-equipo';

describe('FichaEquipo', () => {
  let component: FichaEquipo;
  let fixture: ComponentFixture<FichaEquipo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaEquipo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaEquipo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
