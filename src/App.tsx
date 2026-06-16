import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TerminalSimulator } from './components/TerminalSimulator';
import { LandingPage } from './views/LandingPage';
import { StudentDashboard } from './views/StudentDashboard';
import { EmployerDashboard } from './views/EmployerDashboard';
import type { Task, UserProfile, Transaction } from './utils/mockData';
import { 
  INITIAL_TASKS, 
  INITIAL_STUDENT_PROFILE, 
  INITIAL_EMPLOYER_PROFILE, 
  INITIAL_TRANSACTIONS 
} from './utils/mockData';

function App() {
  const [activeRole, setActiveRole] = useState<'landing' | 'student' | 'employer'>('landing');
  const [activeTab, setActiveTab] = useState<string>('explore');
  
  // State variables synchronized with localStorage
  const [tasks, setTasks] = useState<Task[]>([]);
  const [studentProfile, setStudentProfile] = useState<UserProfile>(INITIAL_STUDENT_PROFILE);
  const [employerProfile, setEmployerProfile] = useState<UserProfile>(INITIAL_EMPLOYER_PROFILE);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Terminal simulator state
  const [runningVerifyTaskId, setRunningVerifyTaskId] = useState<string | null>(null);

  // Initialize state from LocalStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('coldsprint_tasks');
    const storedStudent = localStorage.getItem('coldsprint_student');
    const storedEmployer = localStorage.getItem('coldsprint_employer');
    const storedTx = localStorage.getItem('coldsprint_txs');

    if (storedTasks) setTasks(JSON.parse(storedTasks));
    else {
      setTasks(INITIAL_TASKS);
      localStorage.setItem('coldsprint_tasks', JSON.stringify(INITIAL_TASKS));
    }

    if (storedStudent) setStudentProfile(JSON.parse(storedStudent));
    else localStorage.setItem('coldsprint_student', JSON.stringify(INITIAL_STUDENT_PROFILE));

    if (storedEmployer) setEmployerProfile(JSON.parse(storedEmployer));
    else localStorage.setItem('coldsprint_employer', JSON.stringify(INITIAL_EMPLOYER_PROFILE));

    if (storedTx) setTransactions(JSON.parse(storedTx));
    else {
      setTransactions(INITIAL_TRANSACTIONS);
      localStorage.setItem('coldsprint_txs', JSON.stringify(INITIAL_TRANSACTIONS));
    }
  }, []);

  // Sync utilities
  const updateTasksState = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem('coldsprint_tasks', JSON.stringify(newTasks));
  };

  const updateStudentProfileState = (newProfile: UserProfile) => {
    setStudentProfile(newProfile);
    localStorage.setItem('coldsprint_student', JSON.stringify(newProfile));
  };

  const updateEmployerProfileState = (newProfile: UserProfile) => {
    setEmployerProfile(newProfile);
    localStorage.setItem('coldsprint_employer', JSON.stringify(newProfile));
  };

  const updateTransactionsState = (newTxs: Transaction[]) => {
    setTransactions(newTxs);
    localStorage.setItem('coldsprint_txs', JSON.stringify(newTxs));
  };

  // Student Actions
  const handleApplyTask = (taskId: string) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        const studentApplicant = {
          studentId: 'student-1',
          name: studentProfile.name,
          avatar: studentProfile.avatar,
          school: studentProfile.school || 'Stanford University',
          appliedAt: new Date().toISOString(),
          bio: studentProfile.bio,
          skills: studentProfile.skills || [],
          isVerified: studentProfile.isVerified
        };
        const currentApplicants = t.applicants || [];
        if (currentApplicants.some(a => a.studentId === 'student-1')) return t;
        
        return { 
          ...t, 
          status: 'applied' as const, 
          applicants: [...currentApplicants, studentApplicant] 
        };
      }
      return t;
    });
    updateTasksState(updated);
  };

  const handleHireStudent = (taskId: string, studentId: string) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        return { 
          ...t, 
          status: 'active' as const, 
          assigneeId: studentId 
        };
      }
      return t;
    });
    updateTasksState(updated);
  };

  const handleDropTask = (taskId: string) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        return { 
          ...t, 
          status: 'open' as const, 
          assigneeId: undefined,
          submission: undefined,
          applicants: []
        };
      }
      return t;
    });
    updateTasksState(updated);
  };

  const handleSubmitSolution = (taskId: string, repoUrl: string, branch: string) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: 'review' as const,
          submission: {
            repoUrl,
            branch,
            submittedAt: new Date().toISOString(),
            testsPassed: 0,
            totalTests: 3,
            coverage: '0%'
          }
        };
      }
      return t;
    });
    updateTasksState(updated);
    setActiveTab('sprints');
  };

  // Employer Actions
  const handlePostTask = (taskData: Omit<Task, 'id' | 'status' | 'clientName'>) => {
    const newId = `task-${Date.now()}`;
    const newTask: Task = {
      ...taskData,
      id: newId,
      status: 'open' as const,
      clientName: 'AuraTech AI'
    };

    // Lock funds in escrow from employer balance
    const updatedEmployer = {
      ...employerProfile,
      balance: employerProfile.balance - taskData.reward
    };
    updateEmployerProfileState(updatedEmployer);

    // Add transaction audit record
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      taskId: newId,
      taskTitle: taskData.title,
      amount: taskData.reward,
      type: 'escrow_lock',
      timestamp: new Date().toISOString(),
      partyName: 'AuraTech AI'
    };
    updateTransactionsState([newTx, ...transactions]);
    updateTasksState([...tasks, newTask]);
    
    setActiveTab('manage');
  };

  const handleEditTask = (updatedTask: Task) => {
    const originalTask = tasks.find(t => t.id === updatedTask.id);
    if (!originalTask) return;

    const rewardDiff = updatedTask.reward - originalTask.reward;

    if (rewardDiff > 0 && rewardDiff > employerProfile.balance) {
      alert("Insufficient funds to lock the additional reward amount in Escrow.");
      return;
    }

    const updatedEmployer = {
      ...employerProfile,
      balance: employerProfile.balance - rewardDiff
    };
    updateEmployerProfileState(updatedEmployer);

    if (rewardDiff !== 0) {
      const editTx: Transaction = {
        id: `tx-${Date.now()}-edit`,
        taskId: updatedTask.id,
        taskTitle: updatedTask.title,
        amount: Math.abs(rewardDiff),
        type: rewardDiff > 0 ? 'escrow_lock' : 'escrow_release',
        timestamp: new Date().toISOString(),
        partyName: 'AuraTech AI'
      };
      updateTransactionsState([editTx, ...transactions]);
    }

    const updatedTasks = tasks.map(t => {
      if (t.id === updatedTask.id) {
        return updatedTask;
      }
      return t;
    });
    updateTasksState(updatedTasks);
  };

  const handleTriggerVerification = (taskId: string) => {
    setRunningVerifyTaskId(taskId);
  };

  const handleVerificationComplete = (success: boolean, stats: { testsPassed: number; totalTests: number; coverage: string }) => {
    if (!runningVerifyTaskId) return;

    const targetTask = tasks.find(t => t.id === runningVerifyTaskId);
    if (!targetTask) return;

    if (success) {
      // 1. Mark task as completed
      const updatedTasks = tasks.map(t => {
        if (t.id === runningVerifyTaskId) {
          return {
            ...t,
            status: 'completed' as const,
            submission: t.submission ? {
              ...t.submission,
              testsPassed: stats.testsPassed,
              totalTests: stats.totalTests,
              coverage: stats.coverage,
              feedback: 'Automated test suite verification checks successfully passed. Escrow released.'
            } : undefined
          };
        }
        return t;
      });
      updateTasksState(updatedTasks);

      // 2. Pay student developer
      const updatedStudent = {
        ...studentProfile,
        balance: studentProfile.balance + targetTask.reward
      };
      updateStudentProfileState(updatedStudent);

      // 3. Log escrow release / payout transaction
      const releaseTx: Transaction = {
        id: `tx-${Date.now()}-rel`,
        taskId: targetTask.id,
        taskTitle: targetTask.title,
        amount: targetTask.reward,
        type: 'escrow_release',
        timestamp: new Date().toISOString(),
        partyName: 'AuraTech AI'
      };

      const payoutTx: Transaction = {
        id: `tx-${Date.now()}-pay`,
        taskId: targetTask.id,
        taskTitle: targetTask.title,
        amount: targetTask.reward,
        type: 'payout',
        timestamp: new Date().toISOString(),
        partyName: 'AuraTech AI'
      };

      updateTransactionsState([payoutTx, releaseTx, ...transactions]);
    }

    setRunningVerifyTaskId(null);
  };

  const runningTask = tasks.find(t => t.id === runningVerifyTaskId);

  return (
    <>
      <Header 
        activeRole={activeRole} 
        setActiveRole={setActiveRole}
        studentProfile={studentProfile}
        employerProfile={employerProfile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main style={{ minHeight: 'calc(100vh - 180px)', paddingBottom: '40px' }}>
        {activeRole === 'landing' && (
          <LandingPage 
            onEnter={(role) => {
              setActiveRole(role);
              setActiveTab(role === 'student' ? 'explore' : 'manage');
            }} 
          />
        )}

        {activeRole === 'student' && (
          <StudentDashboard 
            tasks={tasks}
            profile={studentProfile}
            transactions={transactions.filter(t => t.type === 'payout')}
            activeTab={activeTab}
            onAcceptTask={handleApplyTask}
            onDropTask={handleDropTask}
            onSubmitSolution={handleSubmitSolution}
          />
        )}

        {activeRole === 'employer' && (
          <EmployerDashboard 
            tasks={tasks}
            profile={employerProfile}
            transactions={transactions}
            activeTab={activeTab}
            onPostTask={handlePostTask}
            onEditTask={handleEditTask}
            onHireStudent={handleHireStudent}
            onTriggerVerification={handleTriggerVerification}
          />
        )}
      </main>

      {/* Terminal Simulator sandbox executor popup */}
      {runningVerifyTaskId && runningTask && runningTask.submission && (
        <TerminalSimulator 
          taskTitle={runningTask.title}
          repoUrl={runningTask.submission.repoUrl}
          branch={runningTask.submission.branch}
          onCancel={() => setRunningVerifyTaskId(null)}
          onComplete={handleVerificationComplete}
        />
      )}
    </>
  );
}

export default App;
