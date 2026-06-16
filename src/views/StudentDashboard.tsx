import React, { useState } from 'react';
import { Search, Calendar, AlertCircle, CheckCircle, ExternalLink, Play, ArrowRight, X } from 'lucide-react';
import type { Task, UserProfile, Transaction } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';

interface StudentDashboardProps {
  tasks: Task[];
  profile: UserProfile;
  transactions: Transaction[];
  activeTab: string;
  onAcceptTask: (taskId: string) => void;
  onDropTask: (taskId: string) => void;
  onSubmitSolution: (taskId: string, repoUrl: string, branch: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  tasks,
  profile,
  transactions,
  activeTab,
  onAcceptTask,
  onDropTask,
  onSubmitSolution,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [submitRepo, setSubmitRepo] = useState('');
  const [submitBranch, setSubmitBranch] = useState('main');
  const [submitTaskId, setSubmitTaskId] = useState<string | null>(null);

  // Filter tasks
  const availableTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    return (task.status === 'open' || task.status === 'applied') && matchesSearch && matchesCategory;
  });

  const activeSprints = tasks.filter(task => task.status === 'active' || task.status === 'review');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case 'frontend': return 'apple-badge-action';
      case 'backend': return 'apple-badge-action';
      case 'security': return 'apple-badge-rose';
      case 'ai-ml': return 'apple-badge-emerald';
      default: return '';
    }
  };

  const handleOpenSubmitModal = (task: Task) => {
    setSubmitTaskId(task.id);
    setSubmitRepo(`https://github.com/${profile.name.toLowerCase().replace(' ', '')}/coldsprint-sol-${task.id.toLowerCase()}`);
    setSubmitBranch('main');
  };

  const handleCloseSubmitModal = () => {
    setSubmitTaskId(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitTaskId && submitRepo.trim()) {
      onSubmitSolution(submitTaskId, submitRepo, submitBranch);
      setSubmitTaskId(null);
    }
  };

  return (
    <div className="animate-slide-up" style={{ padding: '40px 0', maxWidth: '1024px', margin: '0 auto' }}>
      <div className="apple-container">
        
        {/* Section title header */}
        <div style={{ marginBottom: '40px' }}>
          <h2 className="apple-display-lg" style={{ color: 'var(--colors-ink)', marginBottom: '8px' }}>
            Student Workspace
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--colors-ink)', opacity: 0.6 }}>
            Browse development task listings, accept quick sprint targets, and submit your code.
          </p>
        </div>

        <div className="dashboard-grid">
          {/* Left Sidebar Profile Info */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <GlassCard style={{ padding: '24px', backgroundColor: 'var(--colors-canvas)' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    marginBottom: '12px',
                    objectFit: 'cover',
                    border: '1px solid var(--colors-hairline)'
                  }}
                />
                <h3 className="apple-tagline" style={{ margin: '0 0 4px' }}>{profile.name}</h3>
                <p style={{ fontSize: '14px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '12px' }}>{profile.school}</p>
                <span className="apple-badge apple-badge-emerald">
                  Verified Student
                </span>
              </div>

              <hr style={{ border: '0', borderTop: '1px solid var(--colors-hairline)', margin: '16px 0' }} />

              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.5, textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.5px' }}>
                  About Me
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--colors-ink)', lineHeight: '1.5' }}>{profile.bio}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.5, textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.5px' }}>
                  Verified Skills
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {profile.skills?.map((skill, index) => (
                    <span key={index} className="apple-badge" style={{ fontSize: '11px' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard style={{ padding: '20px', backgroundColor: 'var(--colors-canvas)' }}>
              <h4 className="apple-tagline" style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Sprints Tracking
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--colors-ink)', opacity: 0.6 }}>Sprints Solved:</span>
                  <span style={{ fontWeight: 600, color: '#059669' }}>{completedTasks.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--colors-ink)', opacity: 0.6 }}>Total Earned:</span>
                  <span style={{ fontWeight: 600 }}>${completedTasks.reduce((acc, t) => acc + t.reward, 0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--colors-ink)', opacity: 0.6 }}>Acceptance Rate:</span>
                  <span style={{ fontWeight: 600, color: 'var(--colors-primary)' }}>100%</span>
                </div>
              </div>
            </GlassCard>
          </aside>

          {/* Right Dashboard Area */}
          <main className="content-section" style={{ minWidth: 0 }}>
            {activeTab === 'explore' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <h3 className="apple-tagline">Explore Sprints</h3>

                  {/* Filters search grid (Apple Store design: input-pill) */}
                  <div style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '400px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Search size={15} color="#86868b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                      <input 
                        type="text" 
                        placeholder="Search skills, titles..." 
                        className="apple-input apple-input-pill" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingLeft: '34px', height: '40px', fontSize: '15px' }}
                      />
                    </div>
                    <select 
                      className="apple-input"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      style={{ width: '130px', height: '40px', borderRadius: '9999px', fontSize: '14px', padding: '0 12px' }}
                    >
                      <option value="all">All Fields</option>
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="ai-ml">AI / ML</option>
                      <option value="security">Security</option>
                    </select>
                  </div>
                </div>

                {/* Available task lists */}
                {availableTasks.length === 0 ? (
                  <GlassCard style={{ padding: '40px', textAlign: 'center', color: 'var(--colors-ink)', opacity: 0.5 }}>
                    <AlertCircle size={32} style={{ marginBottom: '8px', opacity: 0.5, display: 'inline-block' }} />
                    <p>No available tasks match your target search query.</p>
                  </GlassCard>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {availableTasks.map(task => (
                      <GlassCard key={task.id} style={{ padding: '24px', backgroundColor: 'var(--colors-canvas)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px', gap: '16px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                              <span className={`apple-badge ${getCategoryBadgeColor(task.category)}`}>
                                {task.category}
                              </span>
                              <span style={{ fontSize: '13px', color: '#86868b' }}>posted by {task.clientName}</span>
                            </div>
                            <h3 className="apple-tagline" style={{ fontSize: '18px', color: 'var(--colors-ink)' }}>{task.title}</h3>
                          </div>

                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <span style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'end',
                              color: '#059669',
                              fontSize: '20px',
                              fontWeight: 600,
                              fontFamily: 'var(--font-mono)'
                            }}>
                              ${task.reward}
                            </span>
                            <span style={{ fontSize: '11px', color: '#86868b', display: 'block' }}>Milestone Escrowed</span>
                          </div>
                        </div>

                        <p style={{ fontSize: '15px', color: 'var(--colors-ink)', opacity: 0.7, marginBottom: '16px', lineHeight: '1.5' }}>
                          {task.description}
                        </p>

                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          flexWrap: 'wrap', 
                          gap: '12px',
                          borderTop: '1px solid var(--colors-hairline)',
                          paddingTop: '12px'
                        }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {task.skills.map((skill, i) => (
                              <span key={i} className="apple-badge" style={{ fontSize: '11px' }}>
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ fontSize: '13px', color: '#86868b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Calendar size={14} /> Due: {task.deadline}
                            </span>
                            {task.applicants?.some(a => a.studentId === 'student-1') ? (
                              <button 
                                className="btn btn-disabled"
                                disabled
                                style={{ padding: '8px 16px', fontSize: '14px', borderRadius: '9999px' }}
                              >
                                Applied
                              </button>
                            ) : (
                              <button 
                                onClick={() => onAcceptTask(task.id)}
                                className="btn btn-primary-pill"
                                style={{ padding: '8px 16px', fontSize: '14px' }}
                              >
                                Apply for Sprint <ArrowRight size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'sprints' && (
              <div>
                <h3 className="apple-tagline" style={{ marginBottom: '16px' }}>My Active Sprints</h3>

                {activeSprints.length === 0 ? (
                  <GlassCard style={{ padding: '40px', textAlign: 'center', color: 'var(--colors-ink)', opacity: 0.5 }}>
                    <AlertCircle size={32} style={{ marginBottom: '8px', opacity: 0.5, display: 'inline-block' }} />
                    <p>No active sprints in progress. Find tasks to begin working.</p>
                  </GlassCard>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {activeSprints.map(task => (
                      <GlassCard key={task.id} style={{ 
                        padding: '24px', 
                        backgroundColor: 'var(--colors-canvas)',
                        border: '1px solid var(--colors-hairline)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px', gap: '16px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                              <span className={`apple-badge ${getCategoryBadgeColor(task.category)}`}>
                                {task.category}
                              </span>
                              <span style={{ fontSize: '13px', color: '#86868b' }}>posted by {task.clientName}</span>
                            </div>
                            <h3 className="apple-tagline" style={{ fontSize: '18px' }}>{task.title}</h3>
                          </div>

                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <span style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'end',
                              color: '#059669',
                              fontSize: '20px',
                              fontWeight: 600,
                              fontFamily: 'var(--font-mono)'
                            }}>
                              ${task.reward}
                            </span>
                            <span style={{ fontSize: '11px', color: '#86868b' }}>Locked in Escrow</span>
                          </div>
                        </div>

                        <p style={{ fontSize: '15px', color: 'var(--colors-ink)', opacity: 0.7, marginBottom: '16px' }}>
                          {task.description}
                        </p>

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderTop: '1px solid var(--colors-hairline)',
                          paddingTop: '16px',
                          flexWrap: 'wrap',
                          gap: '12px'
                        }}>
                          <div>
                            {task.status === 'review' ? (
                              <span style={{
                                fontSize: '14px',
                                color: 'var(--colors-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontWeight: 600
                              }}>
                                <CheckCircle size={16} /> Solution under Sandbox verification review
                              </span>
                            ) : (
                              <span style={{
                                fontSize: '14px',
                                color: '#d97706',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}>
                                <AlertCircle size={16} /> Deadline time: 47 hours remaining
                              </span>
                            )}
                          </div>

                          <div>
                            {task.status === 'review' ? (
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', color: '#86868b' }}>
                                  Branch: <code>{task.submission?.branch}</code>
                                </span>
                                <span className="apple-badge">
                                  Verifying...
                                </span>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button 
                                  onClick={() => onDropTask(task.id)}
                                  className="btn btn-secondary-pill"
                                  style={{ color: '#e11d48', borderColor: '#e11d48', fontSize: '13px', padding: '8px 16px' }}
                                >
                                  Drop Sprint
                                </button>
                                <button 
                                  onClick={() => handleOpenSubmitModal(task)}
                                  className="btn btn-primary-pill"
                                  style={{ fontSize: '13px', padding: '8px 16px' }}
                                >
                                  Submit Code Solution <ExternalLink size={13} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h3 className="apple-tagline" style={{ marginBottom: '16px' }}>Earnings Ledger</h3>
                <p style={{ fontSize: '14px', color: '#86868b', marginBottom: '20px' }}>
                  A secure ledger recording completed sprints and payout distributions.
                </p>

                {transactions.length === 0 ? (
                  <GlassCard style={{ padding: '40px', textAlign: 'center', color: 'var(--colors-ink)', opacity: 0.5 }}>
                    <p>No transaction history logged to date.</p>
                  </GlassCard>
                ) : (
                  <GlassCard style={{ padding: '0', overflow: 'hidden', backgroundColor: 'var(--colors-canvas)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                      <thead>
                        <tr style={{ background: 'var(--colors-canvas-parchment)', borderBottom: '1px solid var(--colors-hairline)' }}>
                          <th style={{ padding: '16px 20px', color: 'var(--colors-ink)', opacity: 0.6 }}>ID</th>
                          <th style={{ padding: '16px 20px', color: 'var(--colors-ink)', opacity: 0.6 }}>Sprint Title</th>
                          <th style={{ padding: '16px 20px', color: 'var(--colors-ink)', opacity: 0.6 }}>Client / Client</th>
                          <th style={{ padding: '16px 20px', color: 'var(--colors-ink)', opacity: 0.6 }}>Release Date</th>
                          <th style={{ padding: '16px 20px', color: 'var(--colors-ink)', opacity: 0.6, textAlign: 'right' }}>Earning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map(tx => (
                          <tr key={tx.id} style={{ borderBottom: '1px solid var(--colors-hairline)' }}>
                            <td style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)' }}>{tx.id}</td>
                            <td style={{ padding: '16px 20px', fontWeight: 600 }}>{tx.taskTitle}</td>
                            <td style={{ padding: '16px 20px', color: 'var(--colors-ink)' }}>{tx.partyName}</td>
                            <td style={{ padding: '16px 20px', color: '#86868b' }}>{new Date(tx.timestamp).toLocaleString()}</td>
                            <td style={{ 
                              padding: '16px 20px', 
                              textAlign: 'right', 
                              fontWeight: 700,
                              color: '#059669'
                            }}>
                              +${tx.amount.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </GlassCard>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Submit Solution Modal */}
      {submitTaskId && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 500,
          padding: '20px'
        }}>
          <div className="apple-card" style={{ width: '100%', maxWidth: '500px', padding: '30px', backgroundColor: 'var(--colors-canvas)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 className="apple-tagline">Submit Code Sprint</h3>
              <button 
                onClick={handleCloseSubmitModal}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#86868b' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--colors-ink)', opacity: 0.7, marginBottom: '20px' }}>
              Submit your code repository link. Our automated compiler will run test suites inside our sandbox runner.
            </p>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '6px', fontWeight: 600 }}>
                  REPOSITORY URL (GITHUB)
                </label>
                <input 
                  type="url" 
                  required 
                  placeholder="https://github.com/username/project" 
                  className="apple-input"
                  value={submitRepo}
                  onChange={(e) => setSubmitRepo(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '6px', fontWeight: 600 }}>
                  BRANCH NAME
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder="main" 
                  className="apple-input"
                  value={submitBranch}
                  onChange={(e) => setSubmitBranch(e.target.value)}
                />
              </div>

              <div style={{
                background: 'var(--colors-canvas-parchment)',
                border: '1px solid var(--colors-hairline)',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '13px',
                color: 'var(--colors-ink)',
                opacity: 0.8,
                display: 'flex',
                alignItems: 'start',
                gap: '8px'
              }}>
                <Play size={16} color="var(--colors-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>
                  <strong>Automated Sandboxing</strong>: Submitting triggers our simulated compiler to pull code, run checkstyles, and execute verification test logs.
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'end', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={handleCloseSubmitModal} 
                  className="btn btn-pearl-capsule"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary-pill"
                >
                  Submit & Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
