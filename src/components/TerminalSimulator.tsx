import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, CheckCircle, RefreshCw } from 'lucide-react';

interface TerminalSimulatorProps {
  taskTitle: string;
  repoUrl: string;
  branch: string;
  onComplete: (success: boolean, stats: { testsPassed: number; totalTests: number; coverage: string }) => void;
  onCancel: () => void;
}

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({
  taskTitle,
  repoUrl,
  branch,
  onComplete,
  onCancel,
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const testSteps = [
    `Initializing CodeSprint Automated Sandbox environment...`,
    `$ git clone -b ${branch} ${repoUrl} ./sandbox`,
    `Cloning into './sandbox'...`,
    `remote: Enumerating objects: 24, done.`,
    `remote: Counting objects: 100% (24/24), done.`,
    `remote: Compressing objects: 100% (18/18), done.`,
    `Receiving objects: 100% (24/24), 28.45 KiB | 5.69 MiB/s, done.`,
    `$ cd ./sandbox && npm install`,
    `npm warn deprecated source-map-url@0.4.1: See https://github.com/lydell/source-map-url#deprecated`,
    `added 286 packages, and audited 287 packages in 3s`,
    `$ npm run lint`,
    `> eslint . --ext .ts,.tsx`,
    `✔ No linting errors or warnings found in code guidelines.`,
    `$ npm run test -- --coverage`,
    `> jest --coverage`,
    ` RUNS  src/components/__tests__/Solution.test.tsx`,
    ` PASS  src/components/__tests__/Solution.test.tsx (1.82s)`,
    `  ✓ verify task constraints: input fields are structured and validated (42ms)`,
    `  ✓ performance audit: execution time is under the 50ms latency threshold (18ms)`,
    `  ✓ boundary conditions: handles extreme loads and null pointers gracefully (8ms)`,
    `Test Suites: 1 passed, 1 total`,
    `Tests:       3 passed, 3 total`,
    `Snapshots:   0 total`,
    `Time:        2.31s, estimated 3s`,
    `--------------------------|---------|---------|---------|---------|`,
    `File                      | % Stmts | % Branch| % Funcs | % Lines |`,
    `--------------------------|---------|---------|---------|---------|`,
    `All files                 |    96.4 |    91.3 |     100 |    96.2 |`,
    ` Solution.tsx             |    96.4 |    91.3 |     100 |    96.2 |`,
    `--------------------------|---------|---------|---------|---------|`,
    `Coverage summary: 96.2% lines covered.`,
    `✔ Verification checklist 100% satisfied.`,
    `$ codecheck --verify-origin`,
    `[INFO] Match verified: Author signature links to student verification ID profile.`,
    `[INFO] Escrow security audit: Payment authorization approved.`,
    `Verification execution successfully completed!`
  ];

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const runSimulation = async () => {
    setIsRunning(true);
    setLogs([]);
    setIsFinished(false);
    setProgress(0);

    for (let i = 0; i < testSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 150 + Math.random() * 200));
      setLogs((prev) => [...prev, testSteps[i]]);
      setProgress(Math.round(((i + 1) / testSteps.length) * 100));
    }

    setIsRunning(false);
    setIsFinished(true);
  };

  const handleApprove = () => {
    onComplete(true, {
      testsPassed: 3,
      totalTests: 3,
      coverage: '96.2%'
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 7, 18, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '800px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 50px rgba(99, 102, 241, 0.3)',
        overflow: 'hidden'
      }}>
        {/* Terminal Header */}
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(13, 17, 38, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={18} color="var(--accent-cyan)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
              Sandbox Verify: <span style={{ color: 'var(--accent-cyan)' }}>{taskTitle}</span>
            </span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
          </div>
        </div>

        {/* Terminal Info */}
        <div style={{
          padding: '12px 20px',
          background: 'rgba(99, 102, 241, 0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div>
            <strong>Repo:</strong> <code>{repoUrl}</code>
          </div>
          <div>
            <strong>Branch:</strong> <code>{branch}</code>
          </div>
        </div>

        {/* Console logs output */}
        <div style={{
          flex: 1,
          background: '#03050d',
          padding: '20px',
          overflowY: 'auto',
          minHeight: '250px',
          maxHeight: '450px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          color: '#e2e8f0',
        }}>
          {logs.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: '200px',
              color: 'var(--text-muted)'
            }}>
              <Terminal size={48} style={{ marginBottom: '12px', opacity: 0.5 }} />
              <p>Ready to verify submission build</p>
              <button 
                onClick={runSimulation}
                className="btn btn-primary"
                style={{ marginTop: '16px' }}
              >
                <Play size={16} /> Execute Test Suite
              </button>
            </div>
          ) : (
            logs.map((log, index) => {
              let color = '#e2e8f0';
              if (log.startsWith('$ ')) color = 'var(--accent-cyan)';
              else if (log.startsWith('PASS') || log.includes('✓') || log.includes('✔') || log.includes('SUCCESS')) color = 'var(--accent-emerald)';
              else if (log.includes('warn') || log.includes('[INFO]')) color = 'var(--accent-amber)';
              else if (log.includes('FAIL') || log.includes('error')) color = 'var(--accent-rose)';

              return (
                <div key={index} style={{ color }}>
                  {log}
                </div>
              );
            })
          )}
          <div ref={terminalEndRef} />
        </div>

        {/* Progress Bar */}
        {isRunning && (
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)' }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--accent-indigo) 0%, var(--accent-cyan) 100%)',
              transition: 'width 0.2s ease-out'
            }} />
          </div>
        )}

        {/* Terminal Controls */}
        <div style={{
          padding: '16px 20px',
          background: 'rgba(13, 17, 38, 0.7)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            {isRunning ? (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RefreshCw size={14} className="spin-animation" style={{ animation: 'spin 2s linear infinite' }} />
                Testing code constraints ({progress}%)...
              </span>
            ) : isFinished ? (
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                <CheckCircle size={16} /> Ready to release Escrow payout
              </span>
            ) : (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Waiting to begin testing
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={onCancel}
              className="btn btn-secondary"
              disabled={isRunning}
            >
              Cancel
            </button>
            {isFinished ? (
              <button 
                onClick={handleApprove}
                className="btn btn-emerald"
              >
                Approve & Pay Out
              </button>
            ) : (
              <button 
                onClick={runSimulation}
                className="btn btn-primary"
                disabled={isRunning}
              >
                <RefreshCw size={16} /> Re-Run Tests
              </button>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
