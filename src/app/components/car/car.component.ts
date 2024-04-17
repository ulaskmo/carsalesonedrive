import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICar } from '../../interfaces/car';
import { CarApiService } from '../../services/car-api.service';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [],
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  @Input() carData?: ICar;
  @Output() carDeleted = new EventEmitter<string>();
  carImageWidth: number = 300;

  constructor(private _carAPIService: CarApiService) {}

  deleteCar(carId: string): void {
    this._carAPIService.delCarDetails(carId).subscribe(
      (result) => {
        console.log(result);
        this.carDeleted.emit(carId);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}