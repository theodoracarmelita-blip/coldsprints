# CodeSprint

CodeSprint is a premium two-sided freelance talent marketplace that connects organizations requiring short-term technical assistance with verified university student developers. 

Designed with a sleek **Apple Store UI Aesthetic**, the platform provides a frictionless experience for posting tasks, reviewing candidate background profiles, managing secure milestone escrows, and executing automated code verification sandboxes.

---

## Key Features

1. **Apple Store Visual Design System**
   * **Clean Aesthetics**: Elegant daytime interface with a soft parchment background (`#f5f5f7`), pure white layouts with hairline border frames (`#e0e0e0`), and confident SF Pro typography.
   * **Action Blue Theme**: A single signature interactive brand color (`#0066cc`) used exclusively for action states, buttons, and links.
   * **Double Navigation Chrome**: Thin pitch-black global header paired with a frosted glass role-selection controller sub-bar.

2. **Apply & Hire Competitive Recruiting Model**
   * **Job Listings**: Students browse and apply to open projects. Tasks remain visible in the explore catalog to support multi-user competition until a student is hired.
   * **Developer Background Check**: Employers can click **Check Profile** to view candidate bios, verified academic credentials, and skill directories (rendered as tags) before hiring.

3. **Sprint Drop System**
   * **Drop Flow**: Students can drop active tasks if they prove too difficult.
   * **Safety Guardrails**: Dropping a sprint resets its status back to `'open'` and clears submissions, returning it to the directory. The locked escrow remains safely held in the system.

4. **Automated Escrow Vault**
   * **Escrow Locks**: Posting a sprint automatically reserves project rewards from the client's wallet balance.
   * **Dynamic Price Edits**: Employers can update active task prices. Increases auto-debit additional wallet funds, while price drops refund the delta to their wallet.

5. **Sandbox Test Verification**
   * **Mock Terminal Simulator**: Simulates code checks, downloading dependencies, running test files, and outputting logs in real-time. Successful checks trigger automatic escrow payouts.

---

## Setup & Running the Project

Follow these steps to set up and run CodeSprint on your local machine:

### 1. Prerequisites
Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
* `npm` (packaged with Node.js)

### 2. Clone the Repository
Clone this repository to your local computer and navigate into the project folder:
```bash
git clone https://github.com/theodoracarmelita-blip/coldsprints.git
cd coldsprints
```

### 3. Install Dependencies
Run the install command to install all library dependencies (including `lucide-react` for icons):
```bash
npm install
```

### 4. Run the Development Server
Start the local server to run the project in development mode:
```bash
npm run dev
```
Once started, open your browser and go to:
* **[http://localhost:5173](http://localhost:5173)** or the port printed in your terminal window.

### 5. Build for Production
To build a highly optimized client bundle for deployment:
```bash
npm run build
```
This generates static production assets inside the `dist/` directory, which can be deployed to Vercel, Netlify, or any static hosting service.

---

## File Directory Map

* `src/App.tsx` — Root component containing client-side state machine handlers and local storage synchronization.
* `src/index.css` — Core custom CSS tokens, layout classes, and design tokens conforming to the Apple design system.
* `src/views/`
  * `LandingPage.tsx` — Landing page featuring alternating full-bleed blocks.
  * `StudentDashboard.tsx` — Student workspace for exploring sprints, tracking progress, and submitting solutions.
  * `EmployerDashboard.tsx` — Employer console for posting tasks, editing budgets, inspecting applicant details, and initiating sandboxes.
* `src/components/` — Sub-layout building blocks (`Header`, `GlassCard`, `TerminalSimulator`).
* `src/utils/mockData.ts` — Type interfaces and initial database profiles.
