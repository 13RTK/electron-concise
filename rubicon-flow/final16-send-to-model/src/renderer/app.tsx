import { createRoot } from 'react-dom/client';
import { Editor } from './components/Editor';
import { AgentPanel } from './components/AgentPanel';
import { RobotIcon } from '@phosphor-icons/react';
import { Activity } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { useAtom } from 'jotai';
import { showPanelAtom } from '@/renderer/atoms/showPanel';

function App() {
  const [showPanel, setShowPanel] = useAtom(showPanelAtom);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <nav className="flex h-6 shrink-0 justify-end bg-[#1C1C1C]">
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

      <div className="min-h-0 flex-1">
        <Group>
          <Panel>
            <main className="h-full min-w-0 flex-1">
              <Editor />
            </main>
          </Panel>

          <Separator className="w-0.5 bg-[#1C1C1C] hover:bg-blue-500" />

          <Activity mode={showPanel ? 'visible' : 'hidden'}>
            <Panel defaultSize="20%" className="bg-[#1C1C1C]">
              <AgentPanel />
            </Panel>
          </Activity>
        </Group>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
