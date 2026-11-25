import { useEffect, useState } from 'react';
import { AgentConfigForm } from './AgentConfigForm';
import { ModelConfig } from '@/types/Model';

export function AgentPanel() {
  const { getModelConfig, saveModelConfig: saveModelConfigToFile } =
    window.electronAPI;

  const [modelConfigs, setModelConfigs] = useState<ModelConfig[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function loadModelConfig() {
    setIsLoading(true);

    const modelConfigData = await getModelConfig();

    setModelConfigs(modelConfigData);
    setIsLoading(false);
  }

  useEffect(() => {
    loadModelConfig();
  }, []);

  function saveModelConfig(modelConfig: ModelConfig) {
    setModelConfigs((prev) => [...prev, modelConfig]);
    saveModelConfigToFile(modelConfig);
  }

  return (
    <aside className="h-full overflow-y-auto bg-[#1C1C1C] p-3 text-[#e5e5e5] scrollbar-none xl:p-4 [&::-webkit-scrollbar]:hidden">
      {isLoading && <span>Loading...</span>}
      {!isLoading && modelConfigs.length === 0 && (
        <AgentConfigForm saveModelConfig={saveModelConfig} />
      )}
      {!isLoading && modelConfigs.length > 0 && <h1>Chat windows</h1>}
    </aside>
  );
}
