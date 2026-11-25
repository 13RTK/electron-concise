import type { ModelConfig } from '@/types/Model';
import { chatWithModel, type ChatMessage } from '@/renderer/utils/modelHelper';
import { ArrowUpIcon } from '@phosphor-icons/react';
import { useState } from 'react';

export function ChatWindow({ modelConfigs }: { modelConfigs: ModelConfig[] }) {
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const modelNames = modelConfigs.map(({ model }) => model);
  const modelIndex = modelConfigs[selectedModelIndex] ? selectedModelIndex : 0;

  const [messageContent, setMessageContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSendMessage() {
    setIsLoading(true);

    const currentMessageContent = messageContent;
    const currentChatMessage: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content: currentMessageContent,
    };

    setMessages((prev) => [...prev, currentChatMessage]);
    setMessageContent('');

    const response = await chatWithModel(modelConfigs[selectedModelIndex], {
      messages: [...messages, currentChatMessage],
    });
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: 'assistant',
        content: response,
      },
    ]);

    setIsLoading(false);
  }

  return (
    <section
      aria-label="Chat"
      className="flex h-full min-w-0 flex-col bg-[#181b21] text-sm text-[#f2f3f7] scheme-dark"
    >
      <header className="shrink-0 border-b border-[#4f5867] px-3.5 py-3">
        <h2 className="text-base font-semibold">Chat</h2>
        <label className="mt-2 flex items-center justify-between gap-2 text-xs">
          <span className="shrink-0 text-[#a3acba]">Model</span>
          <select
            className="min-w-0 rounded-md border border-[#4f5867] bg-[#22262e] px-2 py-1 outline-none enabled:cursor-pointer focus-visible:border-[#7b98ff]"
            value={modelNames.length ? modelIndex : ''}
            onChange={(event) =>
              setSelectedModelIndex(Number(event.currentTarget.value))
            }
            disabled={modelNames.length === 0}
          >
            {modelNames.length === 0 && <option value="">Unconfigured</option>}
            {modelNames.map((name, index) => (
              <option key={index} value={index}>
                {modelNames.indexOf(name) === modelNames.lastIndexOf(name)
                  ? name
                  : `${name} (${index + 1})`}
              </option>
            ))}
          </select>
        </label>
      </header>

      <section
        aria-label="Messages"
        className="min-h-0 flex-1 overflow-y-auto p-3.5"
        tabIndex={0}
      >
        {messages.length === 0 ? (
          <p className="text-[#a3acba]">No messages yet.</p>
        ) : (
          <ol className="space-y-3">
            {messages.map(({ id, role, content }) => (
              <li
                key={id}
                className={`w-fit max-w-[90%] rounded-lg px-3 py-2 ${
                  role === 'user' ? 'ml-auto bg-[#3e4369]' : 'bg-[#22262e]'
                }`}
              >
                <p className="mb-1 text-xs font-semibold opacity-40">
                  {role === 'user' ? 'You' : 'Assistant'}
                </p>
                <p className="wrap-anywhere whitespace-pre-wrap">{content}</p>
              </li>
            ))}
          </ol>
        )}

        {isLoading && <span>Thinking...</span>}
      </section>

      <footer className="shrink-0 border-t border-[#4f5867] p-3.5">
        <div className="flex items-end gap-2 rounded-lg border border-[#4f5867] bg-[#22262e] p-2 focus-within:border-[#7b98ff]">
          <textarea
            aria-label="Message"
            placeholder="Ask about your code…"
            rows={2}
            className="min-w-0 flex-1 resize-none text-[13px]/5 outline-none placeholder:text-[#a3acba]"
            value={messageContent}
            onChange={(event) => setMessageContent(event.target.value)}
          />
          <button
            type="submit"
            aria-label="Send message"
            className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-md bg-[#7b98ff] text-[#181b21] opacity-60 hover:bg-blue-500"
            disabled={isLoading}
            onClick={handleSendMessage}
          >
            <ArrowUpIcon size={16} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </footer>
    </section>
  );
}
