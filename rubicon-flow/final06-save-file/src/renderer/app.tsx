import { createRoot } from 'react-dom/client';
import { Editor } from './components/Editor';

const root = createRoot(document.getElementById('app')!);
root.render(<Editor />);
