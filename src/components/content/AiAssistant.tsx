'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type AiProvider = 'ollama' | 'openai' | 'anthropic' | 'deepseek' | 'google';

const PROVIDER_CONFIG: Record<AiProvider, { label: string; baseUrl: string; modelPlaceholder: string }> = {
  ollama: { label: 'Ollama (本機)', baseUrl: 'http://localhost:11434', modelPlaceholder: 'qwen2.5:7b' },
  openai: { label: 'OpenAI (GPT)', baseUrl: 'https://api.openai.com/v1', modelPlaceholder: 'gpt-4o-mini' },
  anthropic: { label: 'Anthropic (Claude)', baseUrl: 'https://api.anthropic.com/v1', modelPlaceholder: 'claude-sonnet-5' },
  deepseek: { label: 'DeepSeek', baseUrl: 'https://api.deepseek.com/v1', modelPlaceholder: 'deepseek-chat' },
  google: { label: 'Google (Gemini)', baseUrl: 'https://generativelanguage.googleapis.com/v1beta', modelPlaceholder: 'gemini-2.0-flash' },
};

interface AiAssistantProps {
  chapterTitle: string;
  chapterContent: string;
}

export default function AiAssistant({ chapterTitle, chapterContent }: AiAssistantProps) {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `👋 你好！我是 AI 物理助教，歡迎問任何關於「${chapterTitle}」的問題！` },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<AiProvider>('ollama');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('qwen2.5:7b');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load saved settings
  useEffect(() => {
    const saved = localStorage.getItem('ai-assistant-config');
    if (saved) {
      try {
        const cfg = JSON.parse(saved);
        setProvider(cfg.provider || 'ollama');
        setApiKey(cfg.apiKey || '');
        setModel(cfg.model || 'qwen2.5:7b');
      } catch {}
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveSettings = (p: AiProvider, k: string, m: string) => {
    setProvider(p);
    setApiKey(k);
    setModel(m);
    localStorage.setItem('ai-assistant-config', JSON.stringify({ provider: p, apiKey: k, model: m }));
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const context = chapterContent.slice(0, 3000);
      const config = PROVIDER_CONFIG[provider];
      let reply = '';

      if (provider === 'ollama') {
        reply = await callOllama(config, model, context, userMsg);
      } else if (provider === 'anthropic') {
        reply = await callAnthropic(apiKey, model, context, userMsg);
      } else {
        reply = await callOpenAICompatible(config.baseUrl, apiKey, model, context, userMsg);
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      setMessages((prev) => [...prev, { role: 'assistant', content: `❌ 錯誤：${err.message || '連線失敗'}。請檢查 API Key 和模型設定。` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
        aria-label="AI 物理助教"
      >
        {open ? '✕' : '🤖'}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-40 flex w-80 flex-col rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
          {/* Header */}
          <div className="flex items-center gap-2 rounded-t-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-white">
            <span>🤖</span>
            <span className="text-sm font-semibold">AI 物理助教</span>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="ml-auto text-xs opacity-80 hover:opacity-100"
            >
              ⚙️
            </button>
          </div>

          {/* Settings panel */}
          {showSettings && (
            <div className="border-b border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800">
              <div className="mb-2">
                <label className="text-[10px] font-semibold uppercase text-zinc-500">AI 模型</label>
                <select
                  value={provider}
                  onChange={(e) => {
                    const p = e.target.value as AiProvider;
                    const cfg = PROVIDER_CONFIG[p];
                    saveSettings(p, apiKey, cfg.modelPlaceholder);
                  }}
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-xs dark:border-zinc-600 dark:bg-zinc-700 dark:text-white"
                >
                  {Object.entries(PROVIDER_CONFIG).map(([key, cfg]) => (
                    <option key={key} value={key}>{cfg.label}</option>
                  ))}
                </select>
              </div>
              {provider !== 'ollama' && (
                <div className="mb-2">
                  <label className="text-[10px] font-semibold uppercase text-zinc-500">API Key</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => saveSettings(provider, e.target.value, model)}
                    placeholder="sk-..."
                    className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-xs dark:border-zinc-600 dark:bg-zinc-700 dark:text-white"
                  />
                </div>
              )}
              <div>
                <label className="text-[10px] font-semibold uppercase text-zinc-500">模型名稱</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => saveSettings(provider, e.target.value, apiKey)}
                  placeholder={PROVIDER_CONFIG[provider].modelPlaceholder}
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-xs dark:border-zinc-600 dark:bg-zinc-700 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex h-80 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-zinc-100 px-3.5 py-2 text-sm text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  <span className="inline-block animate-pulse">思考中⋯</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-zinc-200 p-3 dark:border-zinc-700">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="問一個物理問題⋯"
              className="flex-1 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-blue-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:focus:border-blue-500"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-sm text-white transition-colors hover:bg-blue-600 disabled:opacity-40"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

async function callOllama(config: typeof PROVIDER_CONFIG[AiProvider], model: string, context: string, question: string): Promise<string> {
  const res = await fetch(`${config.baseUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt: `你是一位物理助教。以下是學習者正在閱讀的章節內容：\n\n${context}\n\n學習者問：${question}\n\n請用繁體中文簡潔清楚地回答。`,
      stream: false,
    }),
  });
  if (!res.ok) throw new Error(`Ollama 錯誤 (${res.status})`);
  const data = await res.json();
  return data.response;
}

async function callAnthropic(apiKey: string, model: string, context: string, question: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      system: '你是一位物理助教，用繁體中文回答。可包含公式。',
      messages: [{ role: 'user', content: `以下是章節內容：\n${context}\n\n學習者問：${question}` }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic 錯誤 (${res.status})`);
  const data = await res.json();
  return data.content[0].text;
}

async function callOpenAICompatible(baseUrl: string, apiKey: string, model: string, context: string, question: string): Promise<string> {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: '你是一位物理助教，用繁體中文回答。可包含公式。' },
        { role: 'user', content: `以下是章節內容：\n${context}\n\n學習者問：${question}` },
      ],
      max_tokens: 1024,
    }),
  });
  if (!res.ok) throw new Error(`API 錯誤 (${res.status})`);
  const data = await res.json();
  return data.choices[0].message.content;
}
