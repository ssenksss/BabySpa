import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { PriceList } from './pages/price-list/price-list';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';
import { Profile } from './pages/profile/profile';
import { Admin } from './pages/admin/admin';
import {Calendar} from './pages/calendar/calendar';
import {Terms} from './pages/terms/terms';
import {Cart} from './pages/cart/cart';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'price-list', component: PriceList },
  { path: 'services', component: Services },
  { path: 'contact', component: Contact },
  { path: 'profile', component: Profile },
  { path: 'admin', component: Admin },
  { path: 'terms', component: Terms },
  { path: 'calendar', component: Calendar },
  { path: 'cart', component: Cart },

];

