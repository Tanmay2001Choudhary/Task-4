import { Component } from '@angular/core';
import { SearchUserComponent } from './search-user/search-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'newgentask3';
}
