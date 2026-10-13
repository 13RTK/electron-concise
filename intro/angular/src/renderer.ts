import { Component } from '@angular/core';
import './index.css';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <h1>App Component</h1>
    <p>Integration with Angular vite analog vite plugin</p>
  `,
})
class AppComponent {
  /* Your component code goes here */
}

bootstrapApplication(AppComponent).catch(console.error);
