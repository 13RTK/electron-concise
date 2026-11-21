import { createRoot } from 'react-dom/client';
import { Editor } from './components/Editor';

function App() {
  return (
    <div className="h-screen w-full">
      <main className="h-full min-w-0 flex-1">
        <Editor />
      </main>
    </div>
  );
}

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
