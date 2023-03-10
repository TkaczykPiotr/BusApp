import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/shared/auth.service';
import { GeneratedpdfComponent } from './generatedpdf/generatedpdf.component';


@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  logBut = false;
  accountButton = false;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
     private auth : AuthService,
     ) {

  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }

      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
        if(localStorage.getItem('token') == 'true'){
          this.logBut = true;
          this.accountButton = true;
        }
      });
  }

  logout(){
    this.logBut = false;
    this.accountButton = false
    this.auth.logout();
  }


}
