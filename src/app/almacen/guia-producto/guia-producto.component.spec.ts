import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaProductoComponent } from './guia-producto.component';

describe('GuiaProductoComponent', () => {
  let component: GuiaProductoComponent;
  let fixture: ComponentFixture<GuiaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuiaProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuiaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
