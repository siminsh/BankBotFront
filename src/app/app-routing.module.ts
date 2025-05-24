import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';

const routes: Routes = [
  { path: 'register', component: UserRegistrationComponent },
  { path: 'chatbot', component: ChatBoxComponent },
  { path: '', redirectTo: '/chatbot', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
