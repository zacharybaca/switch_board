# SwitchBoard — Departmental Task & Team Workload Engine

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-18%2B-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-v20%2B_LTS-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_v8-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--Time-010101?style=flat-square&logo=socketdotio&logoColor=white)

**SwitchBoard** is a role-governed departmental task allocation, real-time progress tracking, and workload balancing web application built on the MERN stack. Designed for department managers, team leads, and operational staff, SwitchBoard moves beyond static to-do lists by combining live WebSocket Kanban boards, employee bandwidth guardrails, blocker escalation workflows, and immutable audit trails.

---

## Key Features

* **Workload Capacity & Burnout Guardrails:** Automatically calculates active workload scores (story points or open task volume) per employee and alerts managers when a team member exceeds 85% (warning) or 100% (over-allocated) capacity prior to task assignment.
* **Live WebSocket Status Broadcasting:** Powered by **Socket.io** room segregation (`dept_<departmentId>`), status changes (`In Progress`, `Blocked`, `Under Review`, `Completed`) update across manager dashboards and team Kanban boards in real time without page refreshes.
* **Impediment & Blocker Escalation Protocol:** Employees can flag tasks as `Blocked` with mandatory written reasoning (e.g., *awaiting client credentials* or *upstream outage*), triggering an instant visual alert banner on the manager's dashboard.
* **Skill Competency Tagging:** Managers can catalog departmental skills (e.g., *Billing Disputes*, *Tier 2 Network Support*, *Account Escalations*) and filter available personnel possessing those exact proficiencies when delegating work.
* **Interactive Drag-and-Drop Kanban Board:** Built using the native HTML5 Drag-and-Drop API with optimistic UI updates and background `fetch()` synchronization.
* **Immutable Task Audit Ledger:** Records a chronological history of every task creation, reassignment, priority escalation, deadline adjustment, and state transition for operational transparency.

---

## Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Architecture** | MERN Workspace Monorepo | Unified repository separating `/client` and `/server` packages using ES6+ modules. |
| **Frontend Core** | React 18+ & Vite | Fast HMR, modular `.jsx` component architecture, and optimized production bundling. |
| **Language** | JavaScript (ES6+ / ES2022) | Pure modern JavaScript across the full stack with zero compilation overhead. |
| **Styling & UI** | Vanilla CSS3 + Optional Reactstrap | Custom CSS variables, Flexbox/Grid layouts, and optional Reactstrap modal/grid primitives. |
| **HTTP Client** | Native `fetch()` API | Zero-dependency HTTP layer using built-in browser and Node.js v20+ `fetch()` with `credentials: 'include'`. |
| **Backend Runtime** | Node.js (v20+ LTS) & Express.js | RESTful API routing, security headers, and role-based middleware. |
| **Database & ODM** | MongoDB + Mongoose (v8+) | Document storage with compound indexing for tasks, embedded subtasks, and audit logs. |
| **Real-Time Engine** | Socket.io | Bi-directional event streaming for live Kanban board transitions and manager blocker alerts. |
| **Authentication** | JWT + `bcryptjs` + HttpOnly Cookies | Stateless Role-Based Access Control (RBAC) governing `manager`, `lead`, and `employee` roles. |

---

## Monorepo Directory Structure

```text
switchboard/
├── package.json
├── docker-compose.yml
├── .gitignore
├── README.md
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                      # Mongoose database connection setup
│   │   │   └── socket.js                  # Socket.io initialization & department room events
│   │   ├── controllers/
│   │   │   ├── authController.js          # Authentication, JWT cookies, profile retrieval
│   │   │   ├── taskController.js          # Task CRUD, assignment, status transitions
│   │   │   ├── departmentController.js    # Department management, employee roster, team stats
│   │   │   ├── userController.js          # Employee workload analytics and profile updates
│   │   │   └── auditController.js         # Historical task activity log retrieval
│   │   ├── middleware/
│   │   │   ├── auth.js                    # JWT token verification & req.user attachment
│   │   │   ├── rbac.js                    # Role enforcement (Manager vs. Employee access)
│   │   │   └── errorHandler.js            # Centralized API exception handling
│   │   ├── models/
│   │   │   ├── User.js                    # Employee/Manager accounts, roles, capacity limits
│   │   │   ├── Department.js              # Department definitions, skill tags, team leads
│   │   │   ├── Task.js                    # Core task schema, subtasks, priority, status
│   │   │   └── TaskAuditLog.js            # Immutable historical audit logs
│   │   ├── routes/
│   │   │   ├── authRoutes.js              # /api/auth/*
│   │   │   ├── taskRoutes.js              # /api/tasks/*
│   │   │   ├── departmentRoutes.js        # /api/departments/*
│   │   │   └── userRoutes.js              # /api/users/*
│   │   ├── utils/
│   │   │   ├── workloadCalculator.js      # Capacity & overallocation estimation logic
│   │   │   ├── fetchClient.js             # Native Node.js fetch() wrapper
│   │   │   └── logger.js                  # Structured logging utility
│   │   ├── app.js                         # Express middleware, CORS, routing pipeline
│   │   └── server.js                      # HTTP server + Socket.io listener binding
│   ├── .env.example
│   └── package.json
│
└── client/
    ├── public/
    │   ├── favicon.ico
    │   └── robots.txt
    ├── src/
    │   ├── assets/                        # SwitchBoard logo and static SVG icons
    │   ├── styles/
    │   │   ├── variables.css              # Color tokens, status colors, spacing variables
    │   │   ├── layout.css                 # Grid, flexbox, sidebar, and responsive breakpoints
    │   │   └── components.css             # Custom styling for cards, Kanban columns, modals
    │   ├── components/
    │   │   ├── common/                    # Button.jsx, Input.jsx, Modal.jsx, Badge.jsx, ConfirmDialog.jsx
    │   │   ├── layout/                    # AppLayout.jsx, Navbar.jsx, Sidebar.jsx, DepartmentSwitcher.jsx
    │   │   ├── kanban/                    # KanbanBoard.jsx, KanbanColumn.jsx, TaskCard.jsx, DropIndicator.jsx
    │   │   ├── tasks/                     # TaskCreateModal.jsx, TaskEditModal.jsx, TaskDetailDrawer.jsx, SubtaskList.jsx
    │   │   ├── employees/                 # EmployeeWorkloadBar.jsx, EmployeeCard.jsx, CapacityBadge.jsx
    │   │   └── analytics/                 # VelocityChart.jsx, StatusBreakdownDonut.jsx, BlockerAlertBanner.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx            # User session, role verification, authentication state
    │   │   └── SocketContext.jsx          # Real-time WebSocket connection and event dispatchers
    │   ├── hooks/
    │   │   ├── useTasks.js                # Custom native fetch() hooks for task queries and mutations
    │   │   ├── useDepartment.js           # Custom native fetch() hooks for roster, skills, and metrics
    │   │   └── useTaskSocket.js           # Listener hook for real-time live board updates
    │   ├── pages/
    │   │   ├── ManagerDashboard.jsx       # Departmental KPI metrics, overallocation warnings, live feed
    │   │   ├── EmployeeDashboard.jsx      # Assigned tasks, daily priority checklist, blocker logger
    │   │   ├── BoardView.jsx              # Interactive drag-and-drop Kanban workflow
    │   │   ├── TaskListView.jsx           # Searchable, filterable tabular task management view
    │   │   ├── TeamCapacityView.jsx       # Department workload heatmap and allocation matrix
    │   │   ├── Login.jsx                  # User authentication
    │   │   └── Register.jsx               # Employee onboarding & account creation
    │   ├── services/
    │   │   ├── api.js                     # Native browser fetch() wrapper with credentials & error handling
    │   │   └── socketService.js           # Socket.io client emitter and subscription listeners
    │   ├── App.jsx                        # React Router configuration with ProtectedRoute wrappers
    │   ├── main.jsx                       # React DOM mount point
    │   └── index.css                      # Global CSS imports
    ├── vite.config.js                     # Vite build configuration
    └── package.json
```

---

## Database Models (Mongoose)

1. **`User` (`User.js`)**: Stores `email`, `passwordHash`, `firstName`, `lastName`, `role` (`manager`, `lead`, `employee`), `departmentId`, `skills` array, and `maxCapacityPoints` (default: `40`).
2. **`Department` (`Department.js`)**: Defines organizational units with `name`, `managerId`, `defaultColumns` (`Backlog`, `Assigned`, `In Progress`, `Under Review`, `Completed`), and `skillCatalog`.
3. **`Task` (`Task.js`)**: Captures work items including `title`, `description`, `departmentId`, `assignedTo`, `createdBy`, `status`, `priority` (`low`, `medium`, `high`, `urgent`), `estimatedPoints`, `dueDate`, `isBlocked`, `blockerReason`, and embedded `subtasks`.
4. **`TaskAuditLog` (`TaskAuditLog.js`)**: Immutable ledger recording `taskId`, `performedBy`, `action`, `previousValue`, `newValue`, and `timestamp`.

---

## REST API Endpoints

| Method | Endpoint | Access Role | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a user account and assign initial department/role. |
| `POST` | `/api/auth/login` | Public | Authenticate credentials and issue an `HttpOnly` JWT cookie. |
| `POST` | `/api/auth/logout` | Private (All) | Clear authentication session cookie. |
| `GET` | `/api/auth/me` | Private (All) | Retrieve active user profile, role, department, and skills. |
| `GET` | `/api/tasks` | Private (All) | List department tasks (supports `?status=`, `?assignedTo=`, `?priority=`). |
| `POST` | `/api/tasks` | Manager / Lead | Create and assign a task; checks `estimatedPoints` against employee capacity. |
| `GET` | `/api/tasks/:id` | Private (All) | Fetch single task details with populated assignee and subtasks. |
| `PUT` | `/api/tasks/:id` | Manager / Lead | Update task metadata, assignee, points, or deadline; records audit log. |
| `PATCH` | `/api/tasks/:id/status` | Private (All) | Transition task status column and broadcast via Socket.io. |
| `PATCH` | `/api/tasks/:id/block` | Private (All) | Flag task as blocked (`isBlocked: true`) with `blockerReason` and alert managers. |
| `PATCH` | `/api/tasks/:id/unblock` | Private (All) | Clear blocked flag and log resolution timestamp. |
| `DELETE` | `/api/tasks/:id` | Manager | Permanently delete a task item. |
| `GET` | `/api/tasks/:id/audit` | Private (All) | Fetch chronological audit log history for a specific task. |
| `GET` | `/api/departments/:id/roster` | Private (All) | List department members with active workload points and open task counts. |
| `GET` | `/api/departments/:id/metrics` | Manager / Lead | Retrieve completion velocity, blocker counts, and weekly trends. |
| `POST` | `/api/departments` | Manager | Create a new departmental unit. |
| `GET` | `/api/users/capacity` | Manager / Lead | Calculate team workload heatmap and flag employees exceeding 100% capacity. |
| `PATCH` | `/api/users/:id/skills` | Manager | Update an employee's verified skill tags. |

---

## Getting Started & Local Setup

### Prerequisites
* **Node.js** (v20.0.0 or higher)
* **npm** (v9+)
* **Docker & Docker Compose** (for local MongoDB container) or a local/Atlas MongoDB instance

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/switchboard.git
cd switchboard
```

### 2. Start Local MongoDB via Docker
```bash
docker-compose up -d
```

### 3. Configure Backend Environment Variables
Create a `.env` file inside the `/server` directory based on `.env.example`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/switchboard
JWT_SECRET=your_super_secret_jwt_signing_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### 4. Install Dependencies & Start the Server
```bash
cd server
npm install
npm run dev
```

### 5. Install Dependencies & Start the Client
Open a second terminal window:
```bash
cd client
npm install
npm run dev
```
The React client will launch at `http://localhost:5173` and communicate with the Express API and Socket.io server at `http://localhost:5000`.

---

## Role-Based Access Matrix

| Capability | Manager | Team Lead | Employee |
| :--- | :---: | :---: | :---: |
| Create & Assign Tasks | Yes | Yes | No |
| Edit Task Deadlines & Points | Yes | Yes | No |
| Delete Tasks | Yes | No | No |
| Update Assigned Task Status & Subtasks | Yes | Yes | Yes |
| Flag / Unflag Task Blockers | Yes | Yes | Yes |
| View Team Workload Capacity Heatmap | Yes | Yes | No |
| Manage Employee Skill Tags | Yes | No | No |

---

## License

This project is licensed under the MIT License.