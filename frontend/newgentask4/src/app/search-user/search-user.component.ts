import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search-user',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
})
export class SearchUserComponent implements OnInit, OnDestroy {
  user: User | null = null;
  latestModifiedUsers: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User | null = null;
  private usersSub: Subscription = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.usersSub = this.userService.users$.subscribe((users) => {
      this.latestModifiedUsers = users;
    });

    this.userService.getUsers();
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length >= 3) {
      this.userService.searchUsers(value).subscribe((users) => {
        this.filteredUsers = users;
      });
    } else {
      this.filteredUsers = [];
    }
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.filteredUsers = [];
  }

  ngOnDestroy(): void {
    console.log('DashboardComponent destroyed');
    this.usersSub.unsubscribe();
  }
}
