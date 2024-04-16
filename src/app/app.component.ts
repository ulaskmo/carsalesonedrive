import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarlistComponent } from './components/carlist/carlist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CarlistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'carsalesonedrive';
}
