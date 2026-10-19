import { createRoot } from 'react-dom/client';
import RootLayout from './ui/RootLayout';

const root = createRoot(document.body);
root.render(
  <RootLayout>
    <h2>demo</h2>
  </RootLayout>,
);
