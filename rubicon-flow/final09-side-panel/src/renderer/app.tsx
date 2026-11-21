import { createRoot } from 'react-dom/client';
import { Editor } from './components/Editor';
import { RobotIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';

function App() {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="h-screen w-full">
      <nav className="flex h-6 justify-end bg-[#1C1C1C]">
        <section className="h-full">
          <button
            type="button"
            className="mr-4 cursor-pointer hover:bg-white"
            onClick={() => setShowPanel((prev) => !prev)}
          >
            <RobotIcon size={24} color="#456ab5" />
          </button>
        </section>
      </nav>

      <Group>
        <Panel>
          <main className="h-full min-w-0 flex-1">
            <Editor />
          </main>
        </Panel>

        <Separator className="w-0.5 bg-[#1C1C1C] hover:bg-blue-500" />

        {showPanel && (
          <Panel defaultSize="20%" className="bg-[#1C1C1C]">
            <div>panel</div>
          </Panel>
        )}
      </Group>
    </div>
  );
}

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
