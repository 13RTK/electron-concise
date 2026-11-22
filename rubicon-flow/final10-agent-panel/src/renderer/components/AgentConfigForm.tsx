import { useState } from 'react';

const inputClassName =
  'w-full rounded-md border border-[#414141] bg-[#262626] px-2 py-1 text-xs leading-normal text-white outline-none placeholder:text-[#777] focus:border-[#638de0] xl:px-3 xl:py-2 xl:text-sm xl:leading-5';

const baseUrlPlaceholders = {
  'openai-chat': 'https://api.openai.com/v1',
  'openai-responses': 'https://api.openai.com/v1',
  'anthropic-messages': 'https://api.anthropic.com/v1',
} as const;

type ApiFormat = keyof typeof baseUrlPlaceholders;

const apiPaths: Record<ApiFormat, string> = {
  'openai-chat': '/chat/completions',
  'openai-responses': '/responses',
  'anthropic-messages': '/messages',
};

export function AgentConfigForm() {
  const [apiFormat, setApiFormat] = useState<ApiFormat>('openai-chat');

  return (
    <>
      <h2 className="text-sm leading-5 font-semibold xl:text-base xl:leading-6">
        Agent Configuration
      </h2>
      <p className="mt-1 text-xs leading-normal text-[#a3a3a3] xl:leading-5">
        Select an API format and enter your model connection details.
      </p>

      <div className="mt-6 space-y-5">
        <label className="block space-y-2">
          <span className="block text-xs leading-normal font-medium xl:text-sm xl:leading-5">
            API Format
          </span>
          <select
            className={inputClassName}
            value={apiFormat}
            onChange={(event) => setApiFormat(event.target.value as ApiFormat)}
          >
            <option value="openai-chat">OpenAI Chat Completions</option>
            <option value="openai-responses">OpenAI Responses</option>
            <option value="anthropic-messages">Anthropic Messages</option>
          </select>
        </label>

        <label className="block space-y-2">
          <span className="block text-xs leading-normal font-medium xl:text-sm xl:leading-5">
            API Key
          </span>
          <input
            className={inputClassName}
            type="password"
            placeholder="Enter API key"
          />
        </label>

        <label className="block space-y-2">
          <span className="block text-xs leading-normal font-medium xl:text-sm xl:leading-5">
            Base URL
          </span>
          <input
            className={inputClassName}
            type="url"
            placeholder={baseUrlPlaceholders[apiFormat]}
          />
        </label>

        <label className="block space-y-2">
          <span className="block text-xs leading-normal font-medium xl:text-sm xl:leading-5">
            Model Name
          </span>
          <input
            className={inputClassName}
            type="text"
            placeholder="Enter model name"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="cursor-pointer rounded-md border border-[#414141] px-3 py-1.5 text-xs text-[#e5e5e5] transition-colors enabled:hover:bg-[#333] enabled:active:bg-[#444] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#638de0] disabled:cursor-not-allowed disabled:opacity-50 xl:text-sm"
          >
            Test Connection
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-md bg-[#456ab5] px-3 py-1.5 text-xs text-white transition-colors enabled:hover:bg-[#527bc9] enabled:active:bg-[#365795] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#638de0] disabled:cursor-not-allowed disabled:opacity-50 xl:text-sm"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </>
  );
}
