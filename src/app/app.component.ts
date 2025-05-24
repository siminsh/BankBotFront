import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <app-navigation></app-navigation>
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center my-3">
          <h1>
            <i class="bi" [ngClass]="{'bi-robot': currentRoute === '/chatbot', 'bi-person-plus': currentRoute === '/register'}"></i>
            {{pageTitle}}
          </h1>
        </div>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding-bottom: 2rem;
    }
    h1 {
      color: #2c3e50;
      transition: all 0.3s ease;
      font-weight: 600;
    }
    .bi {
      margin-right: 10px;
      font-size: 0.9em;
    }
  `]
})
export class AppComponent {
  title = 'BankBot';
  currentRoute: string = '/chatbot';
  pageTitle: string = 'BankBot - AI Financial Assistant';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
      
      if (this.currentRoute === '/chatbot') {
        this.pageTitle = 'AI Financial Assistant';
      } else if (this.currentRoute === '/register') {
        this.pageTitle = 'User Registration';
      } else {
        this.pageTitle = 'BankBot';
      }
    });
  }
}

