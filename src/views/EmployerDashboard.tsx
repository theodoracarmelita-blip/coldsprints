import React, { useState } from 'react';
import { AlertCircle, CheckCircle, DollarSign, Calendar, RefreshCw, Send, ShieldAlert, ShieldCheck, Edit, X } from 'lucide-react';
import type { Task, UserProfile, Transaction, Applicant } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';

interface EmployerDashboardProps {
  tasks: Task[];
  profile: UserProfile;
  transactions: Transaction[];
  activeTab: string;
  onPostTask: (taskData: Omit<Task, 'id' | 'status' | 'clientName'>) => void;
  onEditTask: (task: Task) => void;
  onHireStudent: (taskId: string, studentId: string) => void;
  onTriggerVerification: (taskId: string) => void;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({
  tasks,
  profile,
  transactions,
  activeTab,
  onPostTask,
  onEditTask,
  onHireStudent,
  onTriggerVerification,
}) => {
  // Post Task Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'frontend' | 'backend' | 'ai-ml' | 'security' | 'other'>('frontend');
  const [reward, setReward] = useState<number>(300);
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [isSuccessMsg, setIsSuccessMsg] = useState(false);

  // Edit Task State
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<'frontend' | 'backend' | 'ai-ml' | 'security' | 'other'>('frontend');
  const [editReward, setEditReward] = useState<number>(0);
  const [editDeadline, setEditDeadline] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editSkillsStr, setEditSkillsStr] = useState('');

  // Applicant Background Check State
  const [viewingApplicant, setViewingApplicant] = useState<Applicant | null>(null);
  const [viewingApplicantTaskId, setViewingApplicantTaskId] = useState<string | null>(null);

  const clientTasks = tasks; 

  const activePosts = clientTasks.filter(t => t.status !== 'completed');
  const completedPosts = clientTasks.filter(t => t.status === 'completed');

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case 'frontend': return 'apple-badge-action';
      case 'backend': return 'apple-badge-action';
      case 'security': return 'apple-badge-rose';
      case 'ai-ml': return 'apple-badge-emerald';
      default: return '';
    }
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !deadline) return;

    const skills = skillsStr.split(',').map(s => s.trim()).filter(Boolean);

    onPostTask({
      title,
      category,
      reward,
      deadline,
      description,
      skills
    });

    setTitle('');
    setDescription('');
    setSkillsStr('');
    setDeadline('');
    setIsSuccessMsg(true);
    setTimeout(() => setIsSuccessMsg(false), 3000);
  };

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditCategory(task.category);
    setEditReward(task.reward);
    setEditDeadline(task.deadline);
    setEditDescription(task.description);
    setEditSkillsStr(task.skills.join(', '));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask || !editTitle.trim() || !editDescription.trim() || !editDeadline) return;

    const skills = editSkillsStr.split(',').map(s => s.trim()).filter(Boolean);

    onEditTask({
      ...editingTask,
      title: editTitle,
      category: editCategory,
      reward: editReward,
      deadline: editDeadline,
      description: editDescription,
      skills
    });

    setEditingTask(null);
  };

  return (
    <div className="animate-slide-up" style={{ padding: '40px 0', maxWidth: '1024px', margin: '0 auto' }}>
      <div className="apple-container">
        
        {/* Section rhythm styling: soft title on parchment */}
        <div style={{ marginBottom: '40px' }}>
          <h2 className="apple-display-lg" style={{ color: 'var(--colors-ink)', marginBottom: '8px' }}>
            Employer Console
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--colors-ink)', opacity: 0.6 }}>
            Outsource development sprints, manage active code posts, and verify milestone deliverables.
          </p>
        </div>

        <div className="dashboard-grid">
          {/* Left Sidebar Profile Info (Apple Card styling) */}
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
                <p style={{ fontSize: '14px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '12px' }}>AuraTech AI</p>
                <span className="apple-badge apple-badge-emerald">
                  Verified Business
                </span>
              </div>

              <hr style={{ border: '0', borderTop: '1px solid var(--colors-hairline)', margin: '16px 0' }} />

              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.5, textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.5px' }}>
                  Company Profile
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--colors-ink)', lineHeight: '1.5' }}>{profile.bio}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.5, textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.5px' }}>
                  Security Status
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669' }}>
                    <ShieldCheck size={16} /> Identity Verified
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669' }}>
                    <ShieldCheck size={16} /> Escrow Funds Active
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard style={{ padding: '20px', backgroundColor: 'var(--colors-canvas)' }}>
              <h4 className="apple-tagline" style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Budget Ledgers
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--colors-ink)', opacity: 0.6 }}>Locked in Escrow:</span>
                  <span style={{ fontWeight: 600, color: 'var(--colors-primary)' }}>
                    ${activePosts.reduce((acc, t) => acc + t.reward, 0)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--colors-ink)', opacity: 0.6 }}>Released Payouts:</span>
                  <span style={{ fontWeight: 600, color: '#059669' }}>
                    ${completedPosts.reduce((acc, t) => acc + t.reward, 0)}
                  </span>
                </div>
              </div>
            </GlassCard>
          </aside>

          {/* Right Dashboard Area */}
          <main className="content-section" style={{ minWidth: 0 }}>
            {activeTab === 'manage' && (
              <div>
                <h3 className="apple-tagline" style={{ marginBottom: '16px' }}>My Active Posts</h3>

                {activePosts.length === 0 ? (
                  <GlassCard style={{ padding: '40px', textAlign: 'center', color: 'var(--colors-ink)', opacity: 0.5 }}>
                    <AlertCircle size={32} style={{ marginBottom: '8px', opacity: 0.5, display: 'inline-block' }} />
                    <p>No active tasks posted. Click "Post Task" above to publish a sprint.</p>
                  </GlassCard>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {activePosts.map(task => (
                      <GlassCard key={task.id} style={{ 
                        padding: '24px',
                        backgroundColor: 'var(--colors-canvas)',
                        border: task.status === 'review' ? '1px solid var(--colors-primary)' : '1px solid var(--colors-hairline)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px', gap: '16px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                              <span className={`apple-badge ${getCategoryBadgeColor(task.category)}`}>
                                {task.category}
                              </span>
                              <span style={{
                                fontSize: '12px', 
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                color: task.status === 'review' ? 'var(--colors-primary)' : '#86868b'
                              }}>
                                {task.status === 'review' ? 'Code Review Pending' : `Status: ${task.status}`}
                              </span>
                            </div>
                            <h3 className="apple-tagline" style={{ fontSize: '18px', color: 'var(--colors-ink)' }}>{task.title}</h3>
                          </div>

                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <span style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'end',
                              color: 'var(--colors-ink)',
                              fontSize: '20px',
                              fontWeight: 600,
                              fontFamily: 'var(--font-mono)'
                            }}>
                              ${task.reward}
                            </span>
                            <span style={{ fontSize: '12px', color: '#86868b', display: 'block' }}>Bonded in Escrow</span>
                          </div>
                        </div>

                        <p style={{ fontSize: '15px', color: 'var(--colors-ink)', opacity: 0.7, marginBottom: '16px', lineHeight: '1.5' }}>
                          {task.description}
                        </p>

                        {/* Submission review block */}
                        {task.status === 'review' && task.submission && (
                          <div style={{
                            background: 'var(--colors-canvas-parchment)',
                            border: '1px solid var(--colors-hairline)',
                            padding: '16px',
                            borderRadius: '12px',
                            marginBottom: '16px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '12px'
                          }}>
                            <div>
                              <span style={{ display: 'block', fontSize: '11px', color: '#86868b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                SOLUTION SUBMITTED BY STUDENT
                              </span>
                              <code style={{ fontSize: '13px', color: 'var(--colors-ink)', display: 'block', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
                                {task.submission.repoUrl} ({task.submission.branch})
                              </code>
                              <span style={{ fontSize: '12px', color: '#86868b' }}>
                                Submitted: {new Date(task.submission.submittedAt).toLocaleTimeString()}
                              </span>
                            </div>

                            <button 
                              onClick={() => onTriggerVerification(task.id)}
                              className="btn btn-primary-pill"
                              style={{ fontSize: '13px', padding: '8px 16px' }}
                            >
                              <RefreshCw size={14} /> Run Sandbox Tests
                            </button>
                          </div>
                        )}
                        {/* Applicants drawer/block */}
                        {task.status === 'applied' && task.applicants && task.applicants.length > 0 && (
                          <div style={{
                            background: 'var(--colors-canvas-parchment)',
                            border: '1px solid var(--colors-hairline)',
                            padding: '16px',
                            borderRadius: '12px',
                            marginBottom: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                          }}>
                            <span style={{ fontSize: '11px', color: '#86868b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Student Applicants Competing for Sprint
                            </span>
                            {task.applicants.map(applicant => (
                              <div key={applicant.studentId} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: 'var(--colors-canvas)',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                border: '1px solid var(--colors-hairline)',
                                flexWrap: 'wrap',
                                gap: '10px'
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <img 
                                    src={applicant.avatar} 
                                    alt={applicant.name} 
                                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                                  />
                                  <div>
                                    <span style={{ fontSize: '14px', fontWeight: 600, display: 'block', color: 'var(--colors-ink)' }}>
                                      {applicant.name}
                                    </span>
                                    <span style={{ fontSize: '12px', color: '#86868b', display: 'block' }}>
                                      {applicant.school}
                                    </span>
                                  </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setViewingApplicant(applicant);
                                      setViewingApplicantTaskId(task.id);
                                    }}
                                    className="btn btn-secondary-pill"
                                    style={{ 
                                      padding: '6px 14px', 
                                      fontSize: '12px', 
                                      borderColor: 'var(--colors-hairline)', 
                                      color: 'var(--colors-ink)', 
                                      background: 'var(--colors-canvas)' 
                                    }}
                                  >
                                    Check Profile
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => onHireStudent(task.id, applicant.studentId)}
                                    className="btn btn-primary-pill"
                                    style={{ padding: '6px 14px', fontSize: '12px' }}
                                  >
                                    Hire Developer
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

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
                            
                            {/* Action Buttons: Edit and Payout */}
                            {task.status !== 'completed' && (
                              <button 
                                onClick={() => handleOpenEditModal(task)}
                                className="btn btn-pearl-capsule"
                                style={{ padding: '6px 12px', fontSize: '13px' }}
                              >
                                <Edit size={12} /> Edit
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

            {activeTab === 'post' && (
              <div>
                <h3 className="apple-tagline" style={{ marginBottom: '16px' }}>Create a CodeSprint</h3>

                {isSuccessMsg && (
                  <div className="apple-card" style={{
                    background: 'rgba(16,185,129,0.08)',
                    borderColor: 'rgba(16,185,129,0.2)',
                    padding: '12px 16px',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '15px',
                    marginBottom: '20px'
                  }}>
                    <CheckCircle size={18} /> Sprint posted successfully! Payout reward is locked in platform Escrow.
                  </div>
                )}

                <GlassCard style={{ padding: '30px', backgroundColor: 'var(--colors-canvas)' }}>
                  <form onSubmit={handlePostSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }} className="dashboard-grid">
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '6px', fontWeight: 600 }}>
                          TASK TITLE
                        </label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Optimize canvas performance under lag" 
                          className="apple-input"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '6px', fontWeight: 600 }}>
                          CATEGORY
                        </label>
                        <select 
                          className="apple-input"
                          value={category}
                          onChange={(e) => setCategory(e.target.value as any)}
                        >
                          <option value="frontend">Frontend</option>
                          <option value="backend">Backend</option>
                          <option value="ai-ml">AI / ML</option>
                          <option value="security">Security</option>
                          <option value="other">Other Scripting</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="dashboard-grid">
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '6px', fontWeight: 600 }}>
                          REWARD AMOUNT (USD)
                        </label>
                        <div style={{ position: 'relative' }}>
                          <DollarSign size={16} color="#86868b" style={{ position: 'absolute', left: '12px', top: '16px' }} />
                          <input 
                            type="number" 
                            required 
                            min={50}
                            className="apple-input"
                            value={reward}
                            onChange={(e) => setReward(parseInt(e.target.value) || 0)}
                            style={{ paddingLeft: '32px' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '6px', fontWeight: 600 }}>
                          DEADLINE DATE
                        </label>
                        <input 
                          type="date" 
                          required 
                          className="apple-input"
                          value={deadline}
                          onChange={(e) => setDeadline(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '6px', fontWeight: 600 }}>
                        REQUIRED SKILLS (COMMAS SEPARATED)
                      </label>
                      <input 
                        type="text" 
                        placeholder="React, Memoization, Performance Audit" 
                        className="apple-input"
                        value={skillsStr}
                        onChange={(e) => setSkillsStr(e.target.value)}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '6px', fontWeight: 600 }}>
                        TASK SPECIFICATIONS & GUIDELINES
                      </label>
                      <textarea 
                        required 
                        rows={5}
                        placeholder="Describe the bug or feature, inputs/outputs, and requirements." 
                        className="apple-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ resize: 'vertical', minHeight: '100px' }}
                      />
                    </div>

                    {reward > profile.balance && (
                      <div style={{
                        background: 'rgba(244,63,94,0.08)',
                        border: '1px solid rgba(244,63,94,0.15)',
                        padding: '12px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#e11d48',
                        display: 'flex',
                        alignItems: 'start',
                        gap: '8px'
                      }}>
                        <ShieldAlert size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>
                          <strong>Escrow Balance Insufficient</strong>: You need ${reward} to publish this task, which exceeds your current balance (${profile.balance}).
                        </span>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                      <button 
                        type="submit" 
                        className="btn btn-primary-pill"
                        disabled={reward > profile.balance}
                        style={{ padding: '12px 24px' }}
                      >
                        Verify Escrow & Post Sprint <Send size={16} />
                      </button>
                    </div>
                  </form>
                </GlassCard>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h3 className="apple-tagline" style={{ marginBottom: '16px' }}>Escrow Ledger logs</h3>
                <p style={{ fontSize: '14px', color: '#86868b', marginBottom: '20px' }}>
                  A clear ledger tracking all funds locked in escrow and payout milestone releases.
                </p>

                {transactions.length === 0 ? (
                  <GlassCard style={{ padding: '40px', textAlign: 'center', color: 'var(--colors-ink)', opacity: 0.5 }}>
                    <p>No transactions logged to date.</p>
                  </GlassCard>
                ) : (
                  <GlassCard style={{ padding: '0', overflow: 'hidden', backgroundColor: 'var(--colors-canvas)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                      <thead>
                        <tr style={{ background: 'var(--colors-canvas-parchment)', borderBottom: '1px solid var(--colors-hairline)' }}>
                          <th style={{ padding: '16px 20px', color: 'var(--colors-ink)', opacity: 0.6 }}>ID</th>
                          <th style={{ padding: '16px 20px', color: 'var(--colors-ink)', opacity: 0.6 }}>Sprint Title</th>
                          <th style={{ padding: '16px 20px', color: 'var(--colors-ink)', opacity: 0.6 }}>Action</th>
                          <th style={{ padding: '16px 20px', color: 'var(--colors-ink)', opacity: 0.6 }}>Timestamp</th>
                          <th style={{ padding: '16px 20px', color: 'var(--colors-ink)', opacity: 0.6, textAlign: 'right' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map(tx => (
                          <tr key={tx.id} style={{ borderBottom: '1px solid var(--colors-hairline)' }}>
                            <td style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)' }}>{tx.id}</td>
                            <td style={{ padding: '16px 20px', fontWeight: 600 }}>{tx.taskTitle}</td>
                            <td style={{ padding: '16px 20px' }}>
                              <span className={`apple-badge ${
                                tx.type === 'deposit' ? 'apple-badge-emerald' : 
                                tx.type === 'escrow_lock' ? 'apple-badge-rose' : 'apple-badge-action'
                              }`}>
                                {tx.type.replace('_', ' ')}
                              </span>
                            </td>
                            <td style={{ padding: '16px 20px', color: '#86868b' }}>{new Date(tx.timestamp).toLocaleString()}</td>
                            <td style={{ 
                              padding: '16px 20px', 
                              textAlign: 'right', 
                              fontWeight: 700,
                              color: tx.type === 'deposit' || tx.type === 'escrow_release' ? '#059669' : 'var(--colors-ink)'
                            }}>
                              {tx.type === 'deposit' || tx.type === 'escrow_release' ? '+' : '-'}${tx.amount.toFixed(2)}
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

      {/* Edit Task Modal */}
      {editingTask && (
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
          <div className="apple-card" style={{ width: '100%', maxWidth: '600px', padding: '30px', backgroundColor: 'var(--colors-canvas)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 className="apple-tagline">Edit CodeSprint Details</h3>
              <button 
                onClick={() => setEditingTask(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#86868b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '6px', fontWeight: 600 }}>
                  TASK TITLE
                </label>
                <input 
                  type="text" 
                  required 
                  className="apple-input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '6px', fontWeight: 600 }}>
                    CATEGORY
                  </label>
                  <select 
                    className="apple-input"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as any)}
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="ai-ml">AI / ML</option>
                    <option value="security">Security</option>
                    <option value="other">Other Scripting</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '6px', fontWeight: 600 }}>
                    DEADLINE
                  </label>
                  <input 
                    type="date" 
                    required 
                    className="apple-input"
                    value={editDeadline}
                    onChange={(e) => setEditDeadline(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '6px', fontWeight: 600 }}>
                  REWARD AMOUNT (USD)
                </label>
                <div style={{ position: 'relative' }}>
                  <DollarSign size={16} color="#86868b" style={{ position: 'absolute', left: '12px', top: '16px' }} />
                  <input 
                    type="number" 
                    required 
                    min={50}
                    className="apple-input"
                    value={editReward}
                    onChange={(e) => setEditReward(parseInt(e.target.value) || 0)}
                    style={{ paddingLeft: '32px' }}
                  />
                </div>
                {/* Balance validation message */}
                {editReward - editingTask.reward > profile.balance && (
                  <span style={{ fontSize: '12px', color: '#e11d48', marginTop: '4px', display: 'block' }}>
                    Warning: Increasing reward by ${editReward - editingTask.reward} exceeds your balance (${profile.balance}).
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '6px', fontWeight: 600 }}>
                  REQUIRED SKILLS (COMMAS SEPARATED)
                </label>
                <input 
                  type="text" 
                  className="apple-input"
                  value={editSkillsStr}
                  onChange={(e) => setEditSkillsStr(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '6px', fontWeight: 600 }}>
                  TASK DESCRIPTION / GUIDELINES
                </label>
                <textarea 
                  required 
                  rows={4}
                  className="apple-input"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'end', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setEditingTask(null)} 
                  className="btn btn-pearl-capsule"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary-pill"
                  disabled={editReward - editingTask.reward > profile.balance}
                >
                  Apply & Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Applicant Profile Modal */}
      {viewingApplicant && (
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 className="apple-tagline" style={{ margin: 0 }}>Candidate Profile Check</h3>
              <button 
                onClick={() => {
                  setViewingApplicant(null);
                  setViewingApplicantTaskId(null);
                }}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#86868b' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Header profile info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img 
                  src={viewingApplicant.avatar} 
                  alt={viewingApplicant.name} 
                  style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--colors-hairline)' }}
                />
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--colors-ink)', margin: '0 0 4px' }}>
                    {viewingApplicant.name}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#86868b', margin: '0 0 8px' }}>
                    {viewingApplicant.school}
                  </p>
                  <span className="apple-badge apple-badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={12} /> Verified Student Developer
                  </span>
                </div>
              </div>

              <hr style={{ border: 0, borderTop: '1px solid var(--colors-hairline)', margin: 0 }} />

              {/* Bio details */}
              <div>
                <span style={{ display: 'block', fontSize: '11px', color: '#86868b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  Background / Bio
                </span>
                <p style={{ fontSize: '15px', color: 'var(--colors-ink)', lineHeight: '1.5', margin: 0 }}>
                  {viewingApplicant.bio || "No background details provided by applicant."}
                </p>
              </div>

              {/* Verified Skills */}
              <div>
                <span style={{ display: 'block', fontSize: '11px', color: '#86868b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  Verified Skill Directory
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {viewingApplicant.skills && viewingApplicant.skills.length > 0 ? (
                    viewingApplicant.skills.map((skill, index) => (
                      <span key={index} className="apple-badge" style={{ fontSize: '12px', padding: '4px 10px' }}>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '13px', color: '#86868b' }}>No verified skills listed.</span>
                  )}
                </div>
              </div>

              {/* Applied Date details */}
              <div style={{ fontSize: '12px', color: '#86868b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} /> Applied on: {new Date(viewingApplicant.appliedAt).toLocaleDateString()} at {new Date(viewingApplicant.appliedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>

              {/* Footer action buttons */}
              <div style={{ display: 'flex', justifyContent: 'end', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => {
                    setViewingApplicant(null);
                    setViewingApplicantTaskId(null);
                  }} 
                  className="btn btn-pearl-capsule"
                >
                  Close Profile
                </button>
                {viewingApplicantTaskId && (
                  <button 
                    type="button" 
                    onClick={() => {
                      onHireStudent(viewingApplicantTaskId, viewingApplicant.studentId);
                      setViewingApplicant(null);
                      setViewingApplicantTaskId(null);
                    }} 
                    className="btn btn-primary-pill"
                  >
                    Hire Developer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
