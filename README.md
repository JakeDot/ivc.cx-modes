# IVC Object Bus Fabric

A high-density, React-based simulation of a futuristic, object-oriented chat and network management protocol (IVC). It provides a terminal-inspired user interface for interacting with human users, network daemons, AI models, and kernel-level subsystems.

The application revolves around a unique addressing and modifier system, allowing users to query, inspect, and modify the state of any entity in the network using IRC-style flags.

## 🌟 Core Features

- **Object-Oriented Addressing**: Every entity in the system is an addressable target (Channels, Users, AI Models, System Services, and Kernel nodes).
- **Modifier System**: Dynamically alter the view or state of a target by appending modes (e.g., `+raw`, `+k`, `+m`).
- **Delta View Matrix (ΔVIEW)**: A comprehensive diagnostic interface for any object, featuring JSON serialization, dynamic property (§PROPS) management, relational DB proxies, and raw wire protocol streams.
- **Kernel Diagnostics (+k)**: Simulate Ring-0 kernel debugging, including dmesg ring buffers, memory page tables, CPU registers, and syscall traps.
- **AI Model Integration Sub-views**: Dedicated inspectors for AI models (e.g., `$gemini-3.7-flash`), including `ΔPROMPTS` for instruction management and `MODEL_STATE` for hyperparameter tuning.
- **Personal Sub-channels**: Create scoped personal workspaces under any target identity (e.g., `@user/#notes`).

---

## 📡 Addressing Guide (Prefixes)

The first character of a target address defines its structural type and default inheritance rules:

| Prefix | Type | Example | Description |
| :--- | :--- | :--- | :--- |
| `#` | **Channel Group** | `#feed` | Standard multi-user broadcast streams. |
| `@` | **User Identity** | `@jakedot` | Represents a human user or operator. |
| `$` | **AI Model Object** | `$gemini-3.7-flash` | Represents a generative AI model or autonomous agent. |
| `&` | **Network Service** | `&ChanServ` | Infrastructure daemons and network services. |
| `~` | **Kernel Node** | `~sys.core` | Low-level system or Netadmin routing nodes. |
| `?` | **Query Facet** | `?#telemetry` | Ephemeral or parameterized search/filter queries. |

---

## ⚙️ Modifier Flags

Modifiers change how you interact with or view a target. They are appended to the address (e.g., `#feed+Δview` or `/mode #feed +m`).

### Diagnostic Modes
- **`+Δview`** (or `+raw`): Opens the Delta View Matrix for deep object inspection.
- **`+k`**: Opens Kernel Diagnostic mode (Ring-0 execution view).
- **`+Δmodes`**: Opens the Mode Ledger / Audit History to view real-time overrides.

### Access & State Modes
- **`+S` / `+s`**: Marks a target as a Trusted (`+S`) or Untrusted (`+s`) external service.
- **`+v`**: Voice mode (allows dispatching messages in moderated channels).
- **`+m`**: Mute / Moderated mode (restricts standard messaging).
- **`+t`**: Trace mode (enables telemetry and message tracing).
- **`+n` / `+N`**: Netadmin (`+n`) and Network Services (`+N`) restricted execution.
- **`+o` / `+a`**: Operator (`+o`) and Admin (`+a`) elevation.

---

## 🔍 Delta View Matrix (ΔVIEW)

Appending `+Δview` (or running `/view`) opens a multi-tab inspector for the active target:

1. **JSON (+raw)**: The raw, serialized state of the object.
2. **§PROPS**: Dynamic typed property matrix (view, add, edit, or delete custom flags).
3. **/SUB_OBJECTS**: Discovers generated sub-channels, query facets, and structural facets (e.g., `#notes`, `#evals`).
4. **DB (+db)**: A relational database proxy with a live mock SQL console (e.g., `SELECT * FROM IVC_PROPS`).
5. **ΔDIFF (+diff)**: Compares the object's current state against its base prototype version.
6. **WIRE (+wire)**: Shows the raw ASCII/UTF-8 IRCv3/IVC socket interconnect stream (IRQ 33).
7. **ΔPROMPTS** *(Model Objects only)*: Manages core system instructions and safety overrides.
8. **MODEL_STATE** *(Model Objects only)*: Inspects runtime hyperparameters (Temperature, Top K, Top P).

---

## 💻 Terminal Commands

The bottom input bar acts as both a standard chat box and a command terminal.

| Command | Action |
| :--- | :--- |
| `/join <target>` | Navigates to a specific channel, user, or object. |
| `/mode <target> <flags>` | Applies or negates modifiers (e.g., `/mode @user +v-m`). |
| `/topic <text>` | Sets the topic for the current channel. |
| `/view` or `/raw` | Opens the JSON/ΔVIEW matrix for the current target. |
| `/props`, `/db`, `/diff`, `/wire` | Opens the respective ΔVIEW tab directly. |
| `/model`, `/prompts` | Opens AI-specific ΔVIEW tabs. |
| `/subobjects` or `/subs` | Opens the Sub-objects discovery view. |
| `/part` | Leaves the current view and returns to `#feed`. |

---

## 🚀 Development Setup

This project uses **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

*(All commands should be executed from the root directory).*
