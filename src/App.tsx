import { useState } from 'react';
import { ConfigProvider } from './context/ConfigProvider';
import { Header } from './components/Header';
import { Wizard } from './components/Wizard/Wizard';
import { ExpertPanel } from './components/Expert/ExpertPanel';
import { TomlPreview } from './components/TomlPreview';
import './App.css';

function App() {
  const [mode, setMode] = useState<'wizard' | 'expert'>('wizard');

  return (
    <ConfigProvider>
      <div className="min-h-screen max-w-5xl mx-auto bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">
        <Header mode={mode} onModeChange={setMode} />
        {mode === 'wizard' ? <Wizard /> : <ExpertPanel />}
        <TomlPreview />
      </div>
    </ConfigProvider>
  );
}

export default App;
