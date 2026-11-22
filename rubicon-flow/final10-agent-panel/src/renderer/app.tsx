import { createRoot } from 'react-dom/client';
import { Editor } from './components/Editor';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { useState } from 'react';

function App() {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="h-screen w-full bg-[#1E1E1E]">
      <nav className="flex h-6  justify-end">
        <section className="h-full">
          <button
            className="text-sm cursor-pointer mr-4"
            onClick={() => setShowPanel((prev) => !prev)}
          >
            X
          </button>
        </section>
      </nav>

      <Group>
        <Panel>
          <main className="h-full min-w-0 flex-1">
            <Editor />
          </main>
        </Panel>

        <Separator className="w-0.5 hover:bg-blue-500" />
        {showPanel && (
          <Panel defaultSize="20%">
            <div className="h-full">deafeho</div>
          </Panel>
        )}
      </Group>
    </div>
  );
}

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
