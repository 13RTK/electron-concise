import { lazy } from 'react';
import { createRoot } from 'react-dom/client';

const Home = lazy(() => import('./pages/home/Home'));
const Setting = lazy(() => import('./pages/setting/Setting'));

const hashPath = window.location.hash.slice(1);
const Page = hashPath === 'home' ? Home : Setting;

const root = createRoot(document.body);
root.render(<Page />);
