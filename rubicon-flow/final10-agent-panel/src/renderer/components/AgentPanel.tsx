import { AgentConfigForm } from './AgentConfigForm';

export function AgentPanel() {
  return (
    <aside className="h-full overflow-y-auto bg-[#1C1C1C] p-3 text-[#e5e5e5] scrollbar-none xl:p-4 [&::-webkit-scrollbar]:hidden">
      <AgentConfigForm />
    </aside>
  );
}
