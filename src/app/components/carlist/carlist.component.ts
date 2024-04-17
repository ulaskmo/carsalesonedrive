import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarApiService } from '../../services/car-api.service';
import { CarComponent } from '../car/car.component';
import { ICar, NewCar } from '../../interfaces/car';

@Component({
  selector: 'app-carlist',
  standalone: true,
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css'],
  imports: [CarComponent, CommonModule]
})
export class CarlistComponent implements OnInit {
  carsData: ICar[] = [];
  show: boolean = false;

  constructor(private _carAPIService: CarApiService) {}

  ngOnInit(): void {
    this.getCars();
  }

  toggleAddForm(): void {
    this.show = !this.show;
  }

  getCars(): void {
    this._carAPIService.getCarDetails().subscribe(
      (carsData) => {
        this.carsData = carsData;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addCar(make: string, model: string, year: string, imageUrl: string): boolean {
    const addCar: ICar = new NewCar(make, model, year, imageUrl);
    this._carAPIService.addCarDetails(addCar).subscribe(
      (newCar) => {
        this.carsData = [...this.carsData, newCar];
        this.getCars();
      },
      (error) => {
        console.error(error);
      }
    );
    this.toggleAddForm();
    return false;
  }

  deleteCar(carId: string): void {
    this._carAPIService.delCarDetails(carId).subscribe(
      (result) => {
        console.log(result);
        this.getCars();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}