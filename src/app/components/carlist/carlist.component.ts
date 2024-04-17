import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CarApiService } from '../../services/car-api.service'; // Import CarApiService
import { ICar, NewCar } from '../../interfaces/car'; // Import ICar and NewCar
import { CarComponent } from '../car/car.component';

@Component({
  selector: 'app-carlist',
  standalone: true,
  imports: [CarComponent, CommonModule],
  templateUrl: './carlist.component.html',
  styleUrl: './carlist.component.css'
})
export class CarlistComponent implements OnInit {
  carsData: ICar[] = [];
  show: boolean = false;

  constructor(private _carAPIService: CarApiService) {}

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this._carAPIService.getCarDetails().subscribe(carsData =>
      { this.carsData = carsData }
    );
  }

  addCar(make:string, model:string, year:string,imageUrl:string):boolean {
    let addCar:ICar;
    addCar=new NewCar(make,model,year,imageUrl);
    this._carAPIService.addCarDetails(addCar).subscribe(carsData =>
      { this.carsData = carsData }
    );
    return false;
  }

  refreshCars(): void {
    this.getCars();
  }
}
