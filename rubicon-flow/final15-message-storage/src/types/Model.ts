export type ApiFormat =
  | 'openai-chat'
  | 'openai-responses'
  | 'anthropic-messages';

export type ModelConfig = {
  apiKey: string;
  baseURL: string;
  model: string;
  apiFormat: ApiFormat;
};

export enum ModelConfigAction {
  GET_CONFIG = 'getConfig',
  SAVE_CONFIG = 'saveConfig',
}
