import { Component, OnDestroy, OnInit} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthSrvice } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  collapsed = true;
  isAuthanticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthSrvice,
    ){}
 
    ngOnInit(): void {
      this.userSub = this.authService.user.subscribe(
        user => {
          // this.isAuthanticated = !user ? false : true ;
          this.isAuthanticated = !!user ;
          console.log(!!user);
          
        }
      );  
    }

  onSaveData(){
     this.dataStorageService.storeRecipes();
  }
 
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
