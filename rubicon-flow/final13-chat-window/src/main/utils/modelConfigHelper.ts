import { ModelConfig, ModelConfigAction } from '@/types/Model';
import { app, IpcMainInvokeEvent } from 'electron';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

function getModelConfigPath() {
  return path.join(app.getPath('userData'), 'model.json');
}

let MODEL_CONFIG_PATH: string | null = null;

export async function getModelConfig() {
  if (!MODEL_CONFIG_PATH) {
    MODEL_CONFIG_PATH = getModelConfigPath();
  }

  try {
    const modelConfigs = JSON.parse(await readFile(MODEL_CONFIG_PATH, 'utf-8'));
    return modelConfigs || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function saveModelConfig(modelConfig: ModelConfig) {
  try {
    const modelConfigs = await getModelConfig();
    modelConfigs.push(modelConfig);

    await mkdir(path.dirname(MODEL_CONFIG_PATH!), { recursive: true });
    await writeFile(MODEL_CONFIG_PATH!, JSON.stringify(modelConfigs), 'utf-8');

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function handleModelConfig(
  _event: IpcMainInvokeEvent,
  action: ModelConfigAction,
  modelConfig?: ModelConfig,
) {
  if (action === ModelConfigAction.GET_CONFIG) {
    const modelConfigs = await getModelConfig();

    return modelConfigs;
  }

  if (action === ModelConfigAction.SAVE_CONFIG && modelConfig) {
    const result = await saveModelConfig(modelConfig);

    return result;
  }
}
