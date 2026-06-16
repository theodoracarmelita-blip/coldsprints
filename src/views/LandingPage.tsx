import React from 'react';
import { Zap, Code, ShieldCheck, Wallet, ArrowRight, GraduationCap } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface LandingPageProps {
  onEnter: (role: 'student' | 'employer') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="animate-slide-up" style={{ minHeight: '100vh', backgroundColor: 'var(--colors-canvas-parchment)' }}>
      
      {/* SECTION 1: Pure White Hero Tile (Apple Style: Edge-to-Edge display, negative spacing) */}
      <section style={{ 
        backgroundColor: 'var(--colors-canvas)',
        padding: '100px 32px 120px',
        textAlign: 'center',
        borderBottom: '1px solid var(--colors-hairline)'
      }}>
        <div className="apple-container" style={{ maxWidth: '800px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--colors-canvas-parchment)',
            border: '1px solid var(--colors-hairline)',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--colors-ink)',
            marginBottom: '32px'
          }}>
            <GraduationCap size={14} color="var(--colors-primary)" />
            <span>Outsource Engineering Tasks to Verified Students</span>
          </div>

          <h1 className="apple-hero-display" style={{ marginBottom: '24px' }}>
            CodeSprints. <br />
            Accelerated. Verified.
          </h1>

          <p style={{
            fontSize: '21px',
            lineHeight: '1.47',
            color: 'var(--colors-ink)',
            opacity: 0.6,
            maxWidth: '620px',
            margin: '0 auto 48px'
          }}>
            Connect your repository, outline test constraints, and match instantly with top university developers. Clean code delivered via automated sandboxes.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => onEnter('student')}
              className="btn btn-primary-pill"
              style={{ padding: '14px 28px' }}
            >
              Start as Student Developer
            </button>
            <button 
              onClick={() => onEnter('employer')}
              className="btn btn-secondary-pill"
              style={{ padding: '14px 28px' }}
            >
              Post a CodeSprint <ArrowRight size={16} style={{ marginLeft: '4px' }} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: Parchment Tile (Apple Style: Grid of cards with hairline borders) */}
      <section style={{ 
        backgroundColor: 'var(--colors-canvas-parchment)', 
        padding: '80px 32px',
        borderBottom: '1px solid var(--colors-hairline)'
      }}>
        <div className="apple-container">
          <h2 className="apple-display-lg" style={{ textAlign: 'center', marginBottom: '60px' }}>
            Outsourcing built for speed.
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {/* Card 1 */}
            <GlassCard style={{ padding: '40px', backgroundColor: 'var(--colors-canvas)' }} hoverEffect={false}>
              <div style={{ color: 'var(--colors-primary)', marginBottom: '24px' }}>
                <Zap size={28} />
              </div>
              <h3 className="apple-tagline" style={{ marginBottom: '12px' }}>Micro-Task Sprints</h3>
              <p style={{ fontSize: '15px', color: 'var(--colors-ink)', opacity: 0.7, lineHeight: '1.5' }}>
                Designed for tasks that take hours, not months. Perfect for component optimizations, environment setups, bug repairs, or testing integrations.
              </p>
            </GlassCard>

            {/* Card 2 */}
            <GlassCard style={{ padding: '40px', backgroundColor: 'var(--colors-canvas)' }} hoverEffect={false}>
              <div style={{ color: 'var(--colors-primary)', marginBottom: '24px' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 className="apple-tagline" style={{ marginBottom: '12px' }}>Sandbox Execution</h3>
              <p style={{ fontSize: '15px', color: 'var(--colors-ink)', opacity: 0.7, lineHeight: '1.5' }}>
                We test every submission within automated sandbox execution environments, compiling code and running validation suites to check quality.
              </p>
            </GlassCard>

            {/* Card 3 */}
            <GlassCard style={{ padding: '40px', backgroundColor: 'var(--colors-canvas)' }} hoverEffect={false}>
              <div style={{ color: 'var(--colors-primary)', marginBottom: '24px' }}>
                <Wallet size={28} />
              </div>
              <h3 className="apple-tagline" style={{ marginBottom: '12px' }}>Escrow Guarantee</h3>
              <p style={{ fontSize: '15px', color: 'var(--colors-ink)', opacity: 0.7, lineHeight: '1.5' }}>
                Budget is deposited safely in platform escrow prior to work commencement. Payout is released automatically to students once tests pass.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* SECTION 3: Alternating Canvases - Work for Students (Pure White) */}
      <section style={{ 
        backgroundColor: 'var(--colors-canvas)', 
        padding: '80px 32px',
        borderBottom: '1px solid var(--colors-hairline)'
      }}>
        <div className="apple-container dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <span className="apple-badge apple-badge-action" style={{ marginBottom: '16px' }}>DEVELOPERS</span>
            <h3 className="apple-display-md" style={{ marginBottom: '16px', lineHeight: '1.2' }}>
              Turn your code into income.
            </h3>
            <p style={{ fontSize: '17px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '32px', lineHeight: '1.5' }}>
              Earn income during spare study hours by contributing to real-world commercial startup projects. Gain resume-building verified experience.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--colors-primary)' }}><Code size={18} /></div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600 }}>Commercial Experience</h4>
                  <p style={{ fontSize: '14px', opacity: 0.6 }}>Work directly on production systems and build a verified profile history.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--colors-primary)' }}><Wallet size={18} /></div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600 }}>Secure Payouts</h4>
                  <p style={{ fontSize: '14px', opacity: 0.6 }}>Milestones are fully escrowed beforehand; payment is guaranteed upon test completion.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onEnter('student')} 
              className="btn btn-primary-pill"
            >
              Sign Up as Student
            </button>
          </div>

          {/* Renders / Graphic Placeholder */}
          <div style={{
            background: 'var(--colors-canvas-parchment)',
            border: '1px solid var(--colors-hairline)',
            borderRadius: '18px',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: 'rgba(0, 0, 0, 0.04) 0px 4px 20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px'
          }}>
            <div style={{ color: '#059669' }}>✔ verify: performance audit passed (18ms)</div>
            <div style={{ color: '#059669' }}>✔ verify: 3/3 Jest test suites resolved</div>
            <div style={{ color: '#0066cc' }}>$ codecheck --verify-signature: SUCCESS</div>
            <div style={{ color: '#86868b' }}>[INFO] Escrow balance release pending...</div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Alternating Canvases - Delegate for Startups (Parchment) */}
      <section style={{ 
        backgroundColor: 'var(--colors-canvas-parchment)', 
        padding: '80px 32px',
        borderBottom: '1px solid var(--colors-hairline)'
      }}>
        <div className="apple-container dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          
          <div style={{
            background: 'var(--colors-canvas)',
            border: '1px solid var(--colors-hairline)',
            borderRadius: '18px',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: 'rgba(0, 0, 0, 0.04) 0px 4px 20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--colors-hairline)', paddingBottom: '12px' }}>
              <span style={{ fontWeight: 600 }}>Create Micro-Task</span>
              <span style={{ color: '#059669', fontWeight: 600 }}>$350.00</span>
            </div>
            <div style={{ fontSize: '13px', opacity: 0.6 }}>
              TITLE: Fix autocomplete lag in React search dropdown
            </div>
            <div style={{ fontSize: '13px', opacity: 0.6 }}>
              CONSTRAINTS: Latency &lt; 50ms, Jest test suites passing
            </div>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <span className="apple-badge apple-badge-emerald">Escrow Funded</span>
            </div>
          </div>

          <div>
            <span className="apple-badge apple-badge-action" style={{ marginBottom: '16px' }}>STARTUPS & CLIENTS</span>
            <h3 className="apple-display-md" style={{ marginBottom: '16px', lineHeight: '1.2' }}>
              Delegate tasks. Secure execution.
            </h3>
            <p style={{ fontSize: '17px', color: 'var(--colors-ink)', opacity: 0.6, marginBottom: '32px', lineHeight: '1.5' }}>
              Avoid heavy recruitment overhead for small bug-fixes, simple scripts, or performance audits. Set rewards, write test assertions, and get verified code results.
            </p>

            <button 
              onClick={() => onEnter('employer')} 
              className="btn btn-primary-pill"
            >
              Post a CodeSprint
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER: Parchment design, relaxed links spacing */}
      <footer style={{
        backgroundColor: 'var(--colors-canvas-parchment)',
        padding: '64px 32px 80px',
        color: '#86868b',
        fontSize: '12px',
        borderTop: '1px solid var(--colors-hairline)'
      }}>
        <div className="apple-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '32px', marginBottom: '48px' }}>
          <div>
            <h4 style={{ color: 'var(--colors-ink)', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Explore</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ cursor: 'pointer' }}>Sprints Catalog</span>
              <span style={{ cursor: 'pointer' }}>Active Pools</span>
              <span style={{ cursor: 'pointer' }}>Student Profiles</span>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'var(--colors-ink)', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Platform</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ cursor: 'pointer' }}>Escrow Ledger</span>
              <span style={{ cursor: 'pointer' }}>Sandbox Environment</span>
              <span style={{ cursor: 'pointer' }}>Verification Checklists</span>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'var(--colors-ink)', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ cursor: 'pointer' }}>About CodeSprint</span>
              <span style={{ cursor: 'pointer' }}>Security Policies</span>
              <span style={{ cursor: 'pointer' }}>Legal & Privacy</span>
            </div>
          </div>
        </div>

        <div className="apple-container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <span>© 2026 CodeSprint Marketplace. Built for speed and verified execution.</span>
          <span>SF Pro & Inter Substituted.</span>
        </div>
      </footer>
    </div>
  );
};
