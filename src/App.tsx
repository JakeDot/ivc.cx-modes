import React, { useState, useEffect, useRef } from 'react';
import { Home, Search, Bell, Menu, User, MessageSquare, Heart, Share2, MoreHorizontal, GitCommit, Code, Terminal, Send, Hash, ChevronRight, Folder, Bookmark, EyeOff, Ban, Server, Activity, PlaySquare, Sparkles, Settings, Database, ShieldCheck, ShieldAlert, Cpu, Coins, Layers, Zap, Workflow, Binary, GitFork, Gauge, Radio, Volume2, Mic, CheckCircle2, Sliders, SlidersHorizontal, RotateCcw, Check, Copy, Plus, Minus, ArrowRight, Shield, Info, History, Clock, UserCheck, Filter, Users, Lock, RefreshCw, Trash2, Globe, Key, Pin, Edit3, Edit2, ExternalLink, FileText, GitCompare, Table, FileCode, Braces, Split, Network, CornerDownRight, X, FolderTree, FileDiff } from 'lucide-react';

interface PrefixDescriptor {
  prefix: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface TraceEvent {
  id: string;
  timestamp: string;
  type: 'STATE_TRANSITION' | 'MSG_DISPATCH' | 'PERMISSION_GRANT' | 'PACKET_INTERCONNECT' | 'MODE_CHANGE';
  target: string;
  source: string;
  details: string;
  stateFrom?: string;
  stateTo?: string;
  payload?: any;
}

export interface ModeHistoryEntry {
  id: string;
  target: string;
  modeDelta: string;
  actionDescription: string;
  appliedBy: string;
  timestamp: string;
  scope: string;
}

export interface ObjectProp {
  id: string;
  key: string;
  type: 'string' | 'number' | 'boolean' | 'json' | 'enum' | 'timestamp';
  value: any;
  origin: 'PROTOTYPE' | 'INHERITED' | 'OVERRIDDEN' | 'DYNAMIC_DELTA';
  isReadOnly?: boolean;
  description: string;
  schemaRule?: string;
  updatedAt: string;
}

export interface GeneratedSubObject {
  path: string;
  name: string;
  type: 'channel' | 'sub_channel' | 'query_facet' | 'props' | 'db' | 'wire' | 'server' | 'stream' | 'storage';
  description: string;
  inheritedModes: string;
  isEphemeral?: boolean;
  activeListeners?: number;
}

export interface DatabaseRecord {
  table: string;
  primaryKey: string;
  columns: Record<string, any>;
  foreignKeys?: { column: string; referencesTable: string; referencesKey: string }[];
}

export interface PersonalChannelPost {
  id: string;
  author: string;
  handle: string;
  time: string;
  content: string;
  isPinned?: boolean;
  role?: 'user' | 'model' | 'system';
  likes?: number;
}

export const DEFAULT_PERSONAL_CHANNELS: Record<string, PersonalChannelPost[]> = {
  '@jakedot/#notes': [
    {
      id: 'p-1',
      author: 'Jake Dot',
      handle: '@jakedot',
      time: '10m ago',
      content: '📌 [PINNED] Welcome to @jakedot/#notes personal workspace.\nChannel ID: <prefix><object>/#channel (@jakedot/#notes).\nModes active: +p+m+n+t+s. Owner: @jakedot (founder/op).',
      isPinned: true,
      role: 'user',
      likes: 5
    },
    {
      id: 'p-2',
      author: 'Jake Dot',
      handle: '@jakedot',
      time: '5m ago',
      content: 'IVC Protocol Task Checklist:\n1. Personal channel ID addressing format <prefix><object>/#channel implemented.\n2. Cascading mode inheritance & founder ACLs verified.\n3. Model-backed personal channels ($duck.ai/#evals) connected.',
      isPinned: false,
      role: 'user',
      likes: 3
    }
  ],
  '@jakedot/#dev': [
    {
      id: 'p-dev-1',
      author: 'Jake Dot',
      handle: '@jakedot',
      time: '15m ago',
      content: 'Development Scratchpad:\n- Port: 3000 (Vite HMR/Reverse Proxy mode)\n- Routing Protocol: ivc://host/<prefix><object>/#channel\n- Fast state synchronization across localStorage enabled.',
      isPinned: true,
      role: 'user',
      likes: 2
    }
  ],
  '$duck.ai/#evals': [
    {
      id: 'p-duck-1',
      author: 'duck.ai',
      handle: '$duck.ai',
      time: '1h ago',
      content: '📌 [SYSTEM BENCHMARK] Autonomous evaluation suite initialized on $duck.ai/#evals.\nModel Accuracy: 99.8% | Context Window: 1M tokens | Status: +S TRUSTED_MODEL_OBJECT',
      isPinned: true,
      role: 'model',
      likes: 12
    },
    {
      id: 'p-duck-2',
      author: 'duck.ai',
      handle: '$duck.ai',
      time: '20m ago',
      content: 'Personal channel isolation test completed. Send any prompt or evaluation query to execute scoped inference.',
      role: 'model',
      likes: 4
    }
  ],
  '$gemini-3.7-flash/#prompts': [
    {
      id: 'p-gem-1',
      author: 'gemini-3.7-flash',
      handle: '$gemini-3.7-flash',
      time: '30m ago',
      content: 'Prompt Template Repository:\nActive system prompt loaded with multi-turn grounding and IVC route interpretation.',
      isPinned: true,
      role: 'model',
      likes: 8
    }
  ],
  '~root/#kernel-log': [
    {
      id: 'p-root-1',
      author: 'Root Supervisor',
      handle: '~root',
      time: '2h ago',
      content: '[KERNEL SUPERVISOR] Ring buffer initialized. /dev/ivc_bus0 mapped at 0x00FF3400. All personal channel namespace boundaries validated under RFC 1459 / IVC v2.',
      isPinned: true,
      role: 'system',
      likes: 7
    }
  ],
  '&services/#audit': [
    {
      id: 'p-srv-1',
      author: 'Network Services',
      handle: '&services',
      time: '45m ago',
      content: '[DAEMON LEDGER] NickServ & ChanServ daemon certificates renewed. TLS 1.3 active with zero dropped sessions across personal channels.',
      isPinned: true,
      role: 'system',
      likes: 9
    }
  ],
  '@user[123]/#cluster-log': [
    {
      id: 'p-u123-1',
      author: 'Client Cluster Node',
      handle: '@user[123]',
      time: '1h ago',
      content: 'Cluster node 123 telemetry report: Memory 42%, CPU load 0.18. Zero anomalous packet drops.',
      isPinned: false,
      role: 'user',
      likes: 1
    }
  ]
};

export const DEFAULT_PERSONAL_TOPICS: Record<string, string> = {
  '@jakedot/#notes': 'Personal Developer Notes, Architecture Specs & Scratchpad',
  '@jakedot/#dev': 'Active development stream & compiler output logs',
  '@jakedot/#general': 'General personal discussions and owner bulletins',
  '$duck.ai/#evals': 'Autonomous benchmark evaluations and model accuracy telemetry',
  '$duck.ai/#prompts': 'Prompt experiments and model reasoning tests',
  '$gemini-3.7-flash/#prompts': 'Prompt template engineering and system instructions repository',
  '~root/#kernel-log': 'Ring buffer supervisor messages and hardware interrupt trace',
  '&services/#audit': 'Network services audit ledger and security certificate monitor',
  '@user[123]/#cluster-log': 'Client cluster telemetry, health diagnostics and ping reports'
};

export const DEFAULT_OBJECT_PROPS: Record<string, ObjectProp[]> = {
  '@jakedot': [
    { id: 'pr-j1', key: 'identity.handle', type: 'string', value: '@jakedot', origin: 'PROTOTYPE', isReadOnly: true, description: 'Canonical user handle', schemaRule: 'pattern: ^@[a-z0-9_]+$', updatedAt: '12:00:00' },
    { id: 'pr-j2', key: 'identity.role', type: 'string', value: 'Operator / Root Founder', origin: 'PROTOTYPE', description: 'Network authority designation', schemaRule: 'enum: [Operator, Admin, User]', updatedAt: '12:00:00' },
    { id: 'pr-j3', key: 'acl.mode_mask', type: 'string', value: '+ao-s+v', origin: 'OVERRIDDEN', description: 'Effective permission flags bitmask', schemaRule: 'irc_mode_string', updatedAt: '12:42:15' },
    { id: 'pr-j4', key: 'session.ring', type: 'number', value: 0, origin: 'PROTOTYPE', description: 'Hardware execution privilege ring (0=Ring0 kernel)', schemaRule: 'range: 0..3', updatedAt: '11:15:00' },
    { id: 'pr-j5', key: 'network.vhost', type: 'string', value: 'staff.operator.ivc.net', origin: 'INHERITED', description: 'Cloaked hostmask presentation', schemaRule: 'fqdn', updatedAt: '10:00:00' },
    { id: 'pr-j6', key: 'quota.monthly_queries', type: 'number', value: 1000000, origin: 'DYNAMIC_DELTA', description: 'Remaining monthly query quota tokens', schemaRule: 'min: 0', updatedAt: '12:50:11' },
    { id: 'pr-j7', key: 'telemetry.trace_enabled', type: 'boolean', value: true, origin: 'PROTOTYPE', description: 'Real-time event trace emitter state (+t)', schemaRule: 'boolean', updatedAt: '12:34:01' }
  ],
  '$duck.ai': [
    { id: 'pr-d1', key: 'model.engine', type: 'string', value: 'duck-neural-v4-turbo', origin: 'PROTOTYPE', isReadOnly: true, description: 'Inference foundation model architecture', schemaRule: 'model_id', updatedAt: '11:00:00' },
    { id: 'pr-d2', key: 'model.context_tokens', type: 'number', value: 1048576, origin: 'PROTOTYPE', description: 'Maximum active context window capacity', schemaRule: 'power_of_two', updatedAt: '11:00:00' },
    { id: 'pr-d3', key: 'model.temperature', type: 'number', value: 0.7, origin: 'OVERRIDDEN', description: 'Sampling entropy temperature for generation', schemaRule: 'range: 0.0..2.0', updatedAt: '12:10:00' },
    { id: 'pr-d4', key: 'model.trust_tier', type: 'string', value: '+S (Trusted Object)', origin: 'INHERITED', description: 'System trust validation status', schemaRule: 'enum: [+S, +s, -S]', updatedAt: '10:30:00' },
    { id: 'pr-d5', key: 'model.grounding_active', type: 'boolean', value: true, origin: 'DYNAMIC_DELTA', description: 'Live Google search and web grounding integration', schemaRule: 'boolean', updatedAt: '12:30:00' },
    { id: 'pr-d6', key: 'model.latency_target_ms', type: 'number', value: 120, origin: 'PROTOTYPE', description: 'Target token streaming response latency', schemaRule: 'ms', updatedAt: '11:00:00' }
  ],
  '$gemini-3.7-flash': [
    { id: 'pr-g1', key: 'model.id', type: 'string', value: 'models/gemini-3.7-flash', origin: 'PROTOTYPE', isReadOnly: true, description: 'Google GenAI model identifier', schemaRule: 'sdk_model_id', updatedAt: '10:00:00' },
    { id: 'pr-g2', key: 'model.temperature', type: 'number', value: 0.4, origin: 'OVERRIDDEN', description: 'Default system response entropy', schemaRule: 'range: 0.0..1.0', updatedAt: '11:00:00' },
    { id: 'pr-g3', key: 'model.reasoning_budget', type: 'number', value: 8192, origin: 'PROTOTYPE', description: 'Dynamic thinking token allocation ceiling', schemaRule: 'tokens', updatedAt: '10:00:00' },
    { id: 'pr-g4', key: 'model.api_status', type: 'enum', value: 'READY_STREAMING', origin: 'DYNAMIC_DELTA', description: 'Live backend endpoint status', schemaRule: 'enum: [READY, BUSY, OFFLINE]', updatedAt: '13:00:00' }
  ],
  '&services': [
    { id: 'pr-s1', key: 'daemons.total', type: 'number', value: 6, origin: 'PROTOTYPE', isReadOnly: true, description: 'Count of active network service daemons', schemaRule: 'count', updatedAt: '10:00:00' },
    { id: 'pr-s2', key: 'security.tls_version', type: 'string', value: 'TLSv1.3', origin: 'PROTOTYPE', isReadOnly: true, description: 'Inter-daemon encryption standard', schemaRule: 'tls_proto', updatedAt: '10:00:00' },
    { id: 'pr-s3', key: 'network.sync_interval_ms', type: 'number', value: 500, origin: 'OVERRIDDEN', description: 'State synchronization interval between nodes', schemaRule: 'min: 100', updatedAt: '11:30:00' },
    { id: 'pr-s4', key: 'daemons.nickserv', type: 'enum', value: 'ONLINE', origin: 'DYNAMIC_DELTA', description: 'NickServ authentication status', schemaRule: 'enum: [ONLINE, DEGRADED, OFFLINE]', updatedAt: '12:45:00' },
    { id: 'pr-s5', key: 'daemons.chanserv', type: 'enum', value: 'ONLINE', origin: 'DYNAMIC_DELTA', description: 'ChanServ channel guard status', schemaRule: 'enum: [ONLINE, DEGRADED, OFFLINE]', updatedAt: '12:45:00' }
  ],
  '~root': [
    { id: 'pr-r1', key: 'kernel.ring', type: 'number', value: 0, origin: 'PROTOTYPE', isReadOnly: true, description: 'Processor Ring-0 execution level', schemaRule: '0', updatedAt: '09:00:00' },
    { id: 'pr-r2', key: 'kernel.arch', type: 'string', value: 'x86_64-ivc', origin: 'PROTOTYPE', isReadOnly: true, description: 'Virtual kernel micro-architecture', schemaRule: 'arch', updatedAt: '09:00:00' },
    { id: 'pr-r3', key: 'security.kprobe_active', type: 'boolean', value: true, origin: 'PROTOTYPE', description: 'Kernel trace probe active', schemaRule: 'boolean', updatedAt: '11:15:00' },
    { id: 'pr-r4', key: 'syscall.trap_mask', type: 'string', value: '0x000001ff', origin: 'INHERITED', description: 'Intercepted syscall bitmask', schemaRule: 'hex32', updatedAt: '11:15:00' }
  ],
  '#feed': [
    { id: 'pr-f1', key: 'channel.topic', type: 'string', value: 'Global public feed stream and network status announcements', origin: 'PROTOTYPE', description: 'Channel topic description', schemaRule: 'text', updatedAt: '10:00:00' },
    { id: 'pr-f2', key: 'channel.max_members', type: 'number', value: 50000, origin: 'PROTOTYPE', description: 'Channel occupant ceiling (+l)', schemaRule: 'min: 1', updatedAt: '10:00:00' },
    { id: 'pr-f3', key: 'channel.moderated', type: 'boolean', value: false, origin: 'DYNAMIC_DELTA', description: 'Voice requirement mode (+m)', schemaRule: 'boolean', updatedAt: '12:40:00' },
    { id: 'pr-f4', key: 'channel.broadcast_rate', type: 'string', value: 'UNRESTRICTED', origin: 'PROTOTYPE', description: 'Rate limit ceiling per second', schemaRule: 'enum: [UNRESTRICTED, THROTTLED, BURST]', updatedAt: '10:00:00' }
  ],
  '§config': [
    { id: 'pr-c1', key: 'schema.version', type: 'string', value: '2026.08.19-rev4', origin: 'PROTOTYPE', isReadOnly: true, description: 'Master schema revision number', schemaRule: 'semver', updatedAt: '12:00:00' },
    { id: 'pr-c2', key: 'validation.mode', type: 'string', value: 'STRICT_SEMANTIC', origin: 'PROTOTYPE', description: 'Schema validator strictness level', schemaRule: 'enum: [STRICT_SEMANTIC, PERMISSIVE, DYNAMIC]', updatedAt: '12:00:00' },
    { id: 'pr-c3', key: 'persistence.provider', type: 'string', value: 'LOCAL_STORAGE_AND_SQLITE_BUS', origin: 'PROTOTYPE', description: 'Active data persistence backend', schemaRule: 'provider_id', updatedAt: '12:00:00' },
    { id: 'pr-c4', key: 'ivc.protocol_revision', type: 'string', value: 'IVC/2.4', origin: 'PROTOTYPE', isReadOnly: true, description: 'Wire protocol specification version', schemaRule: 'proto_ver', updatedAt: '12:00:00' }
  ]
};

const PREFIX_REGISTRY: Record<string, PrefixDescriptor> = {
  '§': {
    prefix: '§',
    name: 'Section Schema & Spec',
    category: 'Schema Definition',
    badge: 'SECTION',
    description: 'Declarative schema metadata, property specs, and structural blueprints.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  '+': {
    prefix: '+',
    name: 'Extension Feature Unit',
    category: 'Dynamic Extension',
    badge: 'EXTENSION',
    description: 'Pluggable middleware, extended behavior nodes, and runtime extension modules.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  '?': {
    prefix: '?',
    name: 'Diagnostic Introspection Probe',
    category: 'Query & Telemetry',
    badge: 'PROBE',
    description: 'Active diagnostic interrogator, telemetry probe, and runtime introspection hook.',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200'
  },
  '£': {
    prefix: '£',
    name: 'Token Ledger & Quota',
    category: 'Ledger Settlement',
    badge: 'LEDGER',
    description: 'Token account balances, rate consumption quotas, and gas metering ledger.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200'
  },
  '€': {
    prefix: '€',
    name: 'Billing Channel & Tier',
    category: 'Settlement Gate',
    badge: 'TIER',
    description: 'Tiered entitlement gateway, invoice records, and billing channel authorizations.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  '￠': {
    prefix: '￠',
    name: 'Cent Micro-Rate Limiter',
    category: 'Traffic Gating',
    badge: 'RATE_LIMIT',
    description: 'Sub-cent micropayment gate, burst token buckets, and fine-grained packet throttling.',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200'
  },
  '¥': {
    prefix: '¥',
    name: 'Hardware & Compute Cluster',
    category: 'Resource Pool',
    badge: 'COMPUTE',
    description: 'GPU/TPU accelerator node allocations, hardware worker clusters, and cycle pools.',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200'
  },
  '₠': {
    prefix: '₠',
    name: 'ECU Interop Bridge',
    category: 'Protocol Interop',
    badge: 'BRIDGE',
    description: 'Cross-cluster protocol translation bridge, peer federation, and foreign subnet relay.',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200'
  },
  '∮': {
    prefix: '∮',
    name: 'Contour Cyclic Routine',
    category: 'Execution Circuit',
    badge: 'CIRCUIT',
    description: 'Cyclic background daemons, heartbeat loops, health watchdog, and scheduled crons.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
  '∃': {
    prefix: '∃',
    name: 'Existential Predicate Guard',
    category: 'State Assertion',
    badge: 'PREDICATE',
    description: 'Runtime invariant verification, existence assertions, and precondition guards.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200'
  },
  '∏': {
    prefix: '∏',
    name: 'N-ary Pipeline Product',
    category: 'Pipeline Generator',
    badge: 'PIPELINE',
    description: 'Composition pipelines, asset bundler streams, and multi-stage compilation nodes.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  '∑': {
    prefix: '∑',
    name: 'N-ary Summation Accumulator',
    category: 'Metrics Aggregator',
    badge: 'ACCUMULATOR',
    description: 'Global metric reduction, packet rollup sink, and telemetry aggregation matrix.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  '±': {
    prefix: '±',
    name: 'Tolerance & Variance Window',
    category: 'Drift & Margin',
    badge: 'TOLERANCE',
    description: 'Latency jitter tolerance, clock skew bounds, and acceptable drift envelopes.',
    color: 'text-lime-600',
    bgColor: 'bg-lime-50',
    borderColor: 'border-lime-200'
  },
  '=': {
    prefix: '=',
    name: 'Equivalence Alias Pointer',
    category: 'Canonical Symlink',
    badge: 'ALIAS',
    description: 'Symbolic address alias, transparent route redirector, and canonical pointer.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  '×': {
    prefix: '×',
    name: 'Matrix Dispatcher & Crossbar',
    category: 'Thread Multiplexer',
    badge: 'CROSSBAR',
    description: 'Multi-threaded crossbar switch, asynchronous matrix dispatcher, and barrier mutex.',
    color: 'text-fuchsia-600',
    bgColor: 'bg-fuchsia-50',
    borderColor: 'border-fuchsia-200'
  }
};

const PREFIX_LIST = ['§', '+', '?', '£', '€', '￠', '¥', '₠', '∮', '∃', '∏', '∑', '±', '=', '×'];

interface HandshakeLog {
  id: string;
  time: string;
  source: string;
  dest: string;
  protocol: string;
  info: string;
}

interface Post {
  id: string;
  author: string;
  handle: string;
  time: string;
  content: string;
  baseLikes: number;
  comments: number;
  avatarUrl?: string;
  url: string;
}

export default function App() {
  const [address, setAddress] = useState('#feed');
  const [commandInput, setCommandInput] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [ivcPosts, setIvcPosts] = useState<Post[]>([]);
  const [ivcLoading, setIvcLoading] = useState(false);
  const [rawData, setRawData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Network Simulation State
  const [handshakeLogs, setHandshakeLogs] = useState<HandshakeLog[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Local State persistence for subobjects
  const [bookmarks, setBookmarks] = useState<Post[]>(() => {
    try { return JSON.parse(localStorage.getItem('lite_bookmarks') || '[]'); } catch { return []; }
  });
  const [likes, setLikes] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('lite_likes') || '[]'); } catch { return []; }
  });
  const [ignored, setIgnored] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('lite_ignored') || '[]'); } catch { return []; }
  });
  const [banned, setBanned] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('lite_banned') || '[]'); } catch { return []; }
  });
  
  const [negatedModes, setNegatedModes] = useState<Record<string, string[]>>(() => {
    try { return JSON.parse(localStorage.getItem('lite_negatedModes') || '{}'); } catch { return {}; }
  });

  // Model Chat States (Tri-faceted: Server channels, Channel amalgamation, Private Anonymous PRIVMSG)
  const [modelChats, setModelChats] = useState<Record<string, {role: string, text: string}[]>>(() => {
    try { return JSON.parse(localStorage.getItem('lite_modelChats') || '{}'); } catch { return {}; }
  });
  const [serverChats, setServerChats] = useState<Record<string, {role: string, text: string}[]>>(() => {
    try { return JSON.parse(localStorage.getItem('lite_serverChats') || '{}'); } catch { return {}; }
  });
  const [roomChats, setRoomChats] = useState<Record<string, {role: string, text: string}[]>>(() => {
    try { return JSON.parse(localStorage.getItem('lite_roomChats') || '{}'); } catch { return {}; }
  });
  const [privmsgChats, setPrivmsgChats] = useState<Record<string, {role: string, text: string}[]>>(() => {
    try { return JSON.parse(localStorage.getItem('lite_privmsgChats') || '{}'); } catch { return {}; }
  });
  const [activeServerChannel, setActiveServerChannel] = useState<Record<string, string>>(() => {
    try { return JSON.parse(localStorage.getItem('lite_activeServerChannel') || '{}'); } catch { return {}; }
  });
  const [anonymousSessionId, setAnonymousSessionId] = useState<string>(() => {
    return 'anon_sess_' + Math.random().toString(36).substring(2, 7);
  });
  const [manualFacet, setManualFacet] = useState<Record<string, 'server' | 'channel' | 'privmsg'>>({});
  const [modelChatInput, setModelChatInput] = useState('');
  const [modelLoading, setModelLoading] = useState<Record<string, boolean>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Personal Channel States (<prefix><object>/#channel)
  const [personalChannels, setPersonalChannels] = useState<Record<string, PersonalChannelPost[]>>(() => {
    try {
      const stored = localStorage.getItem('lite_personal_channels');
      return stored ? { ...DEFAULT_PERSONAL_CHANNELS, ...JSON.parse(stored) } : DEFAULT_PERSONAL_CHANNELS;
    } catch {
      return DEFAULT_PERSONAL_CHANNELS;
    }
  });
  const [personalTopics, setPersonalTopics] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem('lite_personal_topics');
      return stored ? { ...DEFAULT_PERSONAL_TOPICS, ...JSON.parse(stored) } : DEFAULT_PERSONAL_TOPICS;
    } catch {
      return DEFAULT_PERSONAL_TOPICS;
    }
  });
  const [personalInput, setPersonalInput] = useState('');
  const [editingPersonalTopic, setEditingPersonalTopic] = useState(false);
  const [topicDraft, setTopicDraft] = useState('');
  const [newChannelInput, setNewChannelInput] = useState('');
  const [showNewChannelInput, setShowNewChannelInput] = useState(false);

  // Kernel-Mode (+k) Diagnostic State
  const [kernelTab, setKernelTab] = useState<'dmesg' | 'memory' | 'registers' | 'traps' | 'trace'>('dmesg');
  const [kernelLogs, setKernelLogs] = useState<string[]>([]);

  // Trace-Mode (+t) State & Telemetry
  const [traceFilter, setTraceFilter] = useState<'ALL' | 'STATE' | 'MSG' | 'PERM' | 'PKT'>('ALL');
  const [customTraceLogs, setCustomTraceLogs] = useState<TraceEvent[]>([]);
  
  // Δmodes Editor State
  const [deltaNotice, setDeltaNotice] = useState<string | null>(null);
  const [deltaTab, setDeltaTab] = useState<'matrix' | 'history'>('matrix');
  const [historyTargetFilter, setHistoryTargetFilter] = useState<'current' | 'all'>('current');
  const [modeHistory, setModeHistory] = useState<ModeHistoryEntry[]>([
    {
      id: 'mh-1',
      target: '#feed',
      modeDelta: '+v',
      actionDescription: 'Granted global voice override permission',
      appliedBy: '@jakedot',
      timestamp: '12:42:15',
      scope: 'Channel Local Scope'
    },
    {
      id: 'mh-2',
      target: '#feed',
      modeDelta: '-t',
      actionDescription: 'Opted-out from inherited telemetry trace mode',
      appliedBy: '@jakedot',
      timestamp: '12:35:40',
      scope: 'Channel Local Scope'
    },
    {
      id: 'mh-3',
      target: '&services',
      modeDelta: '+N+S',
      actionDescription: 'Network services daemon & trusted external service tier verified',
      appliedBy: 'SYSTEM',
      timestamp: '11:42:01',
      scope: 'Global Network'
    },
    {
      id: 'mh-4',
      target: '~root',
      modeDelta: '+n+k',
      actionDescription: 'Superuser Ring-0 kernel diagnostics attachment',
      appliedBy: '@root',
      timestamp: '11:15:22',
      scope: 'Ring-0 Superuser'
    },
    {
      id: 'mh-5',
      target: '$gemini-3.7-flash',
      modeDelta: '+S+o',
      actionDescription: 'Auto-applied trusted external service and operator bridge',
      appliedBy: 'ChanServ',
      timestamp: '10:58:04',
      scope: 'Model Subsystem'
    },
    {
      id: 'mh-6',
      target: '@user[123]',
      modeDelta: '+v',
      actionDescription: 'Granted voice bypass in moderated channels',
      appliedBy: '@jakedot',
      timestamp: '10:30:19',
      scope: 'User Cluster'
    },
    {
      id: 'mh-7',
      target: '#feed',
      modeDelta: '+m',
      actionDescription: 'Set channel to moderated / muted broadcast',
      appliedBy: '@jakedot',
      timestamp: '10:12:00',
      scope: 'Channel Local Scope'
    }
  ]);

  // §props and Δview Matrix States
  const [objectPropsStore, setObjectPropsStore] = useState<Record<string, ObjectProp[]>>(() => {
    try {
      const stored = localStorage.getItem('lite_object_props');
      return stored ? { ...DEFAULT_OBJECT_PROPS, ...JSON.parse(stored) } : DEFAULT_OBJECT_PROPS;
    } catch {
      return DEFAULT_OBJECT_PROPS;
    }
  });
  const [deltaViewTab, setDeltaViewTab] = useState<'json' | 'diff' | 'props' | 'db' | 'subobjects' | 'wire'>('json');
  const [propsSearchFilter, setPropsSearchFilter] = useState('');
  const [editingPropId, setEditingPropId] = useState<string | null>(null);
  const [editingPropVal, setEditingPropVal] = useState<string>('');
  const [newPropKey, setNewPropKey] = useState('');
  const [newPropVal, setNewPropVal] = useState('');
  const [newPropType, setNewPropType] = useState<'string' | 'number' | 'boolean' | 'json' | 'enum'>('string');
  const [showAddPropModal, setShowAddPropModal] = useState(false);
  const [dbSqlQuery, setDbSqlQuery] = useState<string>('');
  const [dbQueryCustomOutput, setDbQueryCustomOutput] = useState<{ columns: string[]; rows: any[][] } | null>(null);
  const [subObjectSearchFilter, setSubObjectSearchFilter] = useState('');
  const [jsonSearchFilter, setJsonSearchFilter] = useState('');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const [querySubChannelFilter, setQuerySubChannelFilter] = useState('');

  const logModeChange = (target: string, delta: string, desc: string, user: string = '@jakedot') => {
    const newEntry: ModeHistoryEntry = {
      id: `mh-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      target,
      modeDelta: delta,
      actionDescription: desc,
      appliedBy: user,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      scope: target.startsWith('#') ? 'Channel Scope' : target.startsWith('~') ? 'Ring-0 Scope' : target.startsWith('&') ? 'Network Services' : 'Object Scope'
    };
    setModeHistory(prev => [newEntry, ...prev]);
  };

  useEffect(() => {
    async function fetchAllData() {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/repos/cgeo/cgeo/commits?sha=master&per_page=15');
        if (!response.ok) throw new Error('Failed to fetch commits');
        
        const data = await response.json();
        setRawData(data); // Capture raw metadata stream
        
        const formatItem = (item: any, prefix: string = '') => {
          const date = new Date(item.commit.author.date);
          const now = new Date();
          const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
          const timeStr = diffHours < 1 ? 'Just now' : diffHours < 24 ? `${diffHours}h` : `${Math.floor(diffHours / 24)}d`;
          
          return {
            id: prefix + item.sha,
            author: item.author?.login || item.commit.author.name,
            handle: `@${(item.author?.login || item.commit.author.name).replace(/\s+/g, '').toLowerCase()}`,
            time: timeStr,
            content: item.commit.message,
            baseLikes: Math.floor(Math.random() * 50),
            comments: item.commit.comment_count,
            avatarUrl: item.author?.avatar_url,
            url: item.html_url
          };
        };

        setPosts(data.map((i: any) => formatItem(i)));
        setError(null);

        // Fetch IVC Data
        setIvcLoading(true);
        const [resServlet, resCxM] = await Promise.all([
          fetch('https://api.github.com/repos/JakeDot/ivc-servlet/commits?sha=master&per_page=10'),
          fetch('https://api.github.com/repos/JakeDot/ivc.cx-m/commits?sha=master&per_page=10')
        ]).catch(() => [null, null]);

        let ivcCombined: Post[] = [];
        if (resServlet && resServlet.ok) {
          const sData = await resServlet.json();
          ivcCombined = [...ivcCombined, ...sData.map((i: any) => ({ ...formatItem(i, 'servlet_'), handle: '#ivc/servlet' }))];
        }
        if (resCxM && resCxM.ok) {
          const cData = await resCxM.json();
          ivcCombined = [...ivcCombined, ...cData.map((i: any) => ({ ...formatItem(i, 'cxm_'), handle: '#ivc/cx-m' }))];
        }
        setIvcPosts(ivcCombined);

      } catch (err) {
        console.error(err);
        setError('Failed to load data from repositories.');
      } finally {
        setLoading(false);
        setIvcLoading(false);
      }
    }

    fetchAllData();
  }, []);

  // Sync to local storage
  useEffect(() => { localStorage.setItem('lite_bookmarks', JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem('lite_likes', JSON.stringify(likes)); }, [likes]);
  useEffect(() => { localStorage.setItem('lite_ignored', JSON.stringify(ignored)); }, [ignored]);
  useEffect(() => { localStorage.setItem('lite_banned', JSON.stringify(banned)); }, [banned]);
  useEffect(() => { localStorage.setItem('lite_modelChats', JSON.stringify(modelChats)); }, [modelChats]);
  useEffect(() => { localStorage.setItem('lite_serverChats', JSON.stringify(serverChats)); }, [serverChats]);
  useEffect(() => { localStorage.setItem('lite_roomChats', JSON.stringify(roomChats)); }, [roomChats]);
  useEffect(() => { localStorage.setItem('lite_privmsgChats', JSON.stringify(privmsgChats)); }, [privmsgChats]);
  useEffect(() => { localStorage.setItem('lite_activeServerChannel', JSON.stringify(activeServerChannel)); }, [activeServerChannel]);
  useEffect(() => { localStorage.setItem('lite_negatedModes', JSON.stringify(negatedModes)); }, [negatedModes]);
  useEffect(() => { localStorage.setItem('lite_personal_channels', JSON.stringify(personalChannels)); }, [personalChannels]);
  useEffect(() => { localStorage.setItem('lite_personal_topics', JSON.stringify(personalTopics)); }, [personalTopics]);
  useEffect(() => { localStorage.setItem('lite_object_props', JSON.stringify(objectPropsStore)); }, [objectPropsStore]);

  // Parse addressing structure (e.g. @user+pm, #group/subgroup/channel+raw, ivc://host/#feed/&config, §config, ?probe, etc.)
  let rawAddress = address;
  
  // Check for configuration modifier from ivc:// URL format
  let isConfig = false;
  if (rawAddress.endsWith('/&config')) {
    isConfig = true;
    rawAddress = rawAddress.replace('/&config', '');
  } else if (rawAddress.endsWith('&config')) {
    isConfig = true;
    rawAddress = rawAddress.replace('&config', '');
  }

  // Strip ivc protocol if it exists so we just get the object
  if (rawAddress.startsWith('ivc://host/')) {
    rawAddress = rawAddress.substring(11);
  }

  let baseTarget = '';
  let modifiers: string[] = [];
  if (rawAddress.startsWith('+') && rawAddress.length > 1) {
    const parts = rawAddress.slice(1).split('+');
    baseTarget = '+' + parts[0];
    modifiers = parts.slice(1);
  } else {
    const addressParts = rawAddress.split('+');
    baseTarget = addressParts[0];
    modifiers = addressParts.slice(1);
  }

  // Prefix detection for symbols: §+?£€￠¥₠∮∃∏∑±=×
  const matchedPrefixChar = PREFIX_LIST.find(p => baseTarget.startsWith(p));
  const matchedPrefixDescriptor = matchedPrefixChar ? PREFIX_REGISTRY[matchedPrefixChar] : null;

  // Check for property accessor
  let propertyTarget: string | null = null;
  if (baseTarget.includes('/§')) {
    const parts = baseTarget.split('/§');
    baseTarget = parts[0];
    propertyTarget = parts[1];
  }

  // Check for event accessor
  let eventTarget: string | null = null;
  if (baseTarget.includes('/∆')) {
    const parts = baseTarget.split('/∆');
    baseTarget = parts[0];
    eventTarget = parts[1];
  } else if (baseTarget.startsWith('∆')) {
    eventTarget = baseTarget.substring(1);
    baseTarget = 'GLOBAL_NETWORK';
  }
  
  // Helper for grouped modifiers like +oma
  const hasMode = (char: string, fullWord: string) => 
    modifiers.includes(char) || 
    modifiers.includes(fullWord) || 
    modifiers.some(m => m.length <= 4 && m.includes(char));

  const isRaw = modifiers.includes('raw') || modifiers.includes('Δview') || modifiers.includes('deltaview') || modifiers.includes('rawmode') || baseTarget.endsWith('/Δview') || baseTarget.endsWith('/raw');
  const isProps = modifiers.includes('§props') || modifiers.includes('props') || baseTarget.endsWith('/§props') || baseTarget.endsWith('/props') || propertyTarget !== null || baseTarget === '§props';
  const isDb = modifiers.includes('db') || modifiers.includes('database') || baseTarget.endsWith('/db') || baseTarget === 'db';
  const isDiff = modifiers.includes('diff') || modifiers.includes('Δdiff') || baseTarget.endsWith('/diff') || baseTarget === 'diff';
  const isSubObjects = modifiers.includes('subobjects') || modifiers.includes('sub-objects') || baseTarget.endsWith('/subobjects') || baseTarget.endsWith('/sub-objects');
  const isWire = modifiers.includes('wire') || modifiers.includes('socket') || modifiers.includes('raw-wire') || baseTarget.endsWith('/wire');
  const isPrompts = modifiers.includes('prompts') || modifiers.includes('Δprompts') || baseTarget.endsWith('/Δprompts') || baseTarget.endsWith('/prompts');
  const isModelState = modifiers.includes('model') || modifiers.includes('model-state') || baseTarget.endsWith('/model') || modifiers.includes('modelstate');
  const isDeltaView = isRaw || isProps || isDb || isDiff || isSubObjects || isWire || isPrompts || isModelState;

  const isPm = modifiers.includes('pm');
  const isBookmarks = modifiers.includes('bookmarks');
  const isLike = modifiers.includes('like') || modifiers.includes('likes');
  const isIgnore = modifiers.includes('ignore') || modifiers.includes('ignored');
  const isBan = modifiers.includes('ban') || modifiers.includes('banned');
  const isRawVM = modifiers.includes('raw-vm');
  const isAOS = modifiers.includes('ao-s');
  const isMacro = modifiers.includes('macro') || modifiers.includes('macros');
  const isCxM = modifiers.includes('cx-m');
  const isL = modifiers.includes('l') || modifiers.includes('listen') || modifiers.includes('live');
  const isDeltaModes = modifiers.includes('Δmodes') || modifiers.includes('deltamodes') || modifiers.includes('delta-modes') || modifiers.includes('modes') || modifiers.includes('Δ') || modifiers.includes('delta') || baseTarget === 'Δmodes' || baseTarget === '#Δmodes' || baseTarget === 'modes';
  
  // Query-Driven Sub-Channels: <target>/?#sub-channel or <target>/?filter=active
  const isQuerySubChannel = baseTarget.includes('/?#') || (baseTarget.includes('/?') && !baseTarget.includes('/?#'));
  let queryParentTarget = baseTarget;
  let querySubChannelSlug = '';
  let queryPredicateParam = '';
  if (baseTarget.includes('/?#')) {
    const qParts = baseTarget.split('/?#');
    queryParentTarget = qParts[0];
    querySubChannelSlug = qParts[1] || '';
  } else if (baseTarget.includes('/?')) {
    const qParts = baseTarget.split('/?');
    queryParentTarget = qParts[0];
    queryPredicateParam = qParts[1] || '';
  }

  // Personal Channel Concept: <prefix><object>/#channel
  const isPersonalChannel = baseTarget.includes('/#') && !isQuerySubChannel;
  const personalChannelParts = isPersonalChannel ? baseTarget.split('/#') : ['', ''];
  const personalOwner = personalChannelParts[0];
  const personalChannelName = '#' + (personalChannelParts[1] || '');
  const personalChannelSlug = personalChannelParts[1] || '';

  // Object hierarchy logic (~ for Netadmin only, $ for Oper, | for Admin, & for Network Services)
  const isModel = baseTarget.startsWith('$') && !baseTarget.startsWith('$@') && !baseTarget.startsWith('$#') && !isPersonalChannel;
  const isModelServerMod = modifiers.includes('server') || modifiers.includes('connect') || modifiers.includes('srv') || modifiers.includes('channels') || baseTarget.includes('/server');
  const isModelJoinMod = modifiers.includes('join') || modifiers.includes('channel') || modifiers.includes('room');
  const isModelPrivmsgMod = modifiers.includes('privmsg') || modifiers.includes('msg') || modifiers.includes('pm') || modifiers.includes('query') || modifiers.includes('anon');
  
  const currentModelFacet: 'server' | 'channel' | 'privmsg' = 
    isModelServerMod ? 'server' :
    isModelJoinMod ? 'channel' :
    isModelPrivmsgMod ? 'privmsg' :
    (manualFacet[baseTarget] || 'server');

  const isServices = modifiers.includes('N') || modifiers.includes('services') || modifiers.includes('network') || modifiers.includes('netservices') || baseTarget.startsWith('&');
  
  const targetNegated = negatedModes[baseTarget] || [];
  // +n Netadmin (only) mode
  const defaultN = baseTarget.startsWith('~');
  // +N Network services mode
  const defaultCapN = baseTarget.startsWith('&') || baseTarget === 'GLOBAL_NETWORK' || baseTarget.startsWith('#network');
  
  const defaultO = baseTarget.startsWith('$') || baseTarget.startsWith('|');
  const defaultA = baseTarget.startsWith('$@') || baseTarget.startsWith('|');
  
  // +s (untrusted external service) & +S (trusted external service)
  // Automatic +S applies to: services, $ai.model, and any [$@&] objects
  const isDollarAtAmpObject = baseTarget.startsWith('$') || baseTarget.startsWith('@') || baseTarget.startsWith('&');
  const isAiModelOrServices = isServices || isModel || baseTarget.includes('.ai') || baseTarget.includes('ai.model') || baseTarget.includes('model') || defaultCapN;
  const defaultCapS = isDollarAtAmpObject || isAiModelOrServices;
  
  // Force +noma modes if we are viewing an opers event view
  const isOpersEvent = eventTarget === 'opers';
  const isN = (hasMode('n', 'netadmin') || isOpersEvent || defaultN) && !targetNegated.includes('n');
  const isCapN = (modifiers.includes('N') || modifiers.includes('services') || modifiers.includes('network') || modifiers.includes('netservices') || modifiers.some(m => m.length <= 4 && m.includes('N')) || defaultCapN) && !targetNegated.includes('N');
  const isCapS = (modifiers.includes('S') || modifiers.includes('trusted') || modifiers.includes('trusted-service') || modifiers.some(m => m.length <= 4 && m.includes('S')) || defaultCapS) && !targetNegated.includes('S');
  const isSmallS = (modifiers.includes('s') || modifiers.includes('untrusted') || modifiers.includes('untrusted-service') || modifiers.some(m => m.length <= 4 && m.includes('s'))) && !targetNegated.includes('s');
  // +k (kernel-mode) support
  const isK = (hasMode('k', 'kernel') || modifiers.includes('kernel-mode') || modifiers.includes('kernel')) && !targetNegated.includes('k');
  
  // +t (trace-mode) support: Captures real-time event logs for message & state transition history
  // Inherited trace mode on diagnostic probes (?*) or network handshake modules
  const isInheritedT = baseTarget.startsWith('?') || baseTarget.startsWith('#network/handshake');
  const isExplicitlyOptedOutOfTrace = targetNegated.includes('t');
  const isT = (hasMode('t', 'trace') || modifiers.includes('trace-mode') || modifiers.includes('trace') || modifiers.some(m => m.length <= 4 && m.includes('t')) || isInheritedT) && !isExplicitlyOptedOutOfTrace;
  
  // +v (voice mode) support:
  // - on users in a +m (muted) channel (enables talking/overriding mute)
  // - globally on users with serverwide/networkwide voice permission
  // - #chan+v (for unrestricted broadcast channels)
  const isV = (hasMode('v', 'voice') || modifiers.includes('voice') || modifiers.includes('voiced') || modifiers.some(m => m.length <= 4 && m.includes('v'))) && !targetNegated.includes('v');
  
  const isO = hasMode('o', 'oper') || hasMode('o', 'opers') || isOpersEvent || (defaultO && !targetNegated.includes('o'));
  const isMuted = hasMode('m', 'muted') || isOpersEvent;
  const isA = hasMode('a', 'admin') || isOpersEvent || (defaultA && !targetNegated.includes('a'));

  // Scroll to bottom of chat when it updates
  useEffect(() => {
    if (baseTarget.startsWith('$') && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [modelChats, serverChats, roomChats, privmsgChats, baseTarget]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = commandInput.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('/connect ') || trimmed.startsWith('/server ')) {
      const target = trimmed.startsWith('/connect ') ? trimmed.slice(9).trim() : trimmed.slice(8).trim();
      if (target.startsWith('$')) {
        setManualFacet(prev => ({ ...prev, [target]: 'server' }));
        setAddress(`${target}+server`);
        logModeChange(target, '+N+S', `Connected to ${target} as pseudo-server offering chat-level access as #channels`, '@jakedot');
      } else {
        setAddress(target);
      }
    } else if (trimmed.startsWith('/join ')) {
      const target = trimmed.slice(6).trim();
      if (target.startsWith('$')) {
        setManualFacet(prev => ({ ...prev, [target]: 'channel' }));
        setAddress(`${target}+join`);
        logModeChange(target, '+mntS', `Joined ${target} as pseudo-channel & user amalgamation`, '@jakedot');
      } else {
        setAddress(target);
      }
    } else if (trimmed.startsWith('/msg ') || trimmed.startsWith('/privmsg ')) {
      const isPriv = trimmed.startsWith('/privmsg ');
      const rest = isPriv ? trimmed.slice(9).trim() : trimmed.slice(5).trim();
      const firstSpace = rest.indexOf(' ');
      let target = '';
      let msg = '';
      if (firstSpace === -1) {
        target = rest;
      } else {
        target = rest.slice(0, firstSpace).trim();
        msg = rest.slice(firstSpace + 1).trim();
      }

      if (target) {
        if (target.startsWith('$')) {
          setManualFacet(prev => ({ ...prev, [target]: 'privmsg' }));
          setAddress(`${target}+privmsg`);
          if (msg) {
            triggerModelChat(target, msg, 'privmsg');
          }
          logModeChange(target, '+S', `Initiated anonymous PRIVMSG session with ${target}`, '@jakedot');
        } else {
          setAddress(`${target}+pm`);
        }
      }
    } else if (trimmed.startsWith('/query ')) {
      const target = trimmed.slice(7).trim();
      if (target.startsWith('$')) {
        setManualFacet(prev => ({ ...prev, [target]: 'privmsg' }));
        setAddress(`${target}+privmsg`);
      } else {
        setAddress(`${target}+pm`);
      }
    } else if (trimmed === '/mode' || trimmed === '/modes' || trimmed === '/delta' || trimmed === '/Δmodes') {
      setAddress(`${baseTarget}+Δmodes`);
    } else if (trimmed.startsWith('/mode ')) {
      const rawCmd = trimmed.slice(6).trim();
      const parts = rawCmd.split(/\s+/);
      
      let target = '';
      let modeChanges = '';
      
      if (parts.length === 1) {
        if (parts[0].startsWith('+') || parts[0].startsWith('-')) {
          modeChanges = parts[0];
          target = baseTarget;
        } else {
          // e.g. /mode #feed -> open Δmodes for that target
          setAddress(`${parts[0]}+Δmodes`);
          setCommandInput('');
          return;
        }
      } else if (parts.length >= 2) {
        if (parts[0].startsWith('+') || parts[0].startsWith('-')) {
          // Flag-first syntax: e.g. /mode -t object or /mode +v #feed
          modeChanges = parts[0];
          target = parts[1];
        } else {
          // Target-first syntax: e.g. /mode object -t or /mode #feed +v
          target = parts[0];
          modeChanges = parts[1];
        }
      }
      
      if (target && modeChanges) {
        setNegatedModes(prev => {
          const current = prev[target] || [];
          let updated = [...current];
          let negateMode = false;
          
          for (const char of modeChanges) {
            if (char === '-') negateMode = true;
            else if (char === '+') negateMode = false;
            else if (char === 'n' || char === 'N' || char === 's' || char === 'S' || char === 'k' || char === 't' || char === 'v' || char === 'o' || char === 'a' || char === 'm') {
              if (negateMode) {
                if (!updated.includes(char)) updated.push(char);
              } else {
                updated = updated.filter(c => c !== char);
              }
            }
          }
          return { ...prev, [target]: updated };
        });

        // If currently viewing target and opting out of -t, strip +t from active address
        if (target === baseTarget || target === address) {
          if (modeChanges.includes('-t') || (modeChanges.startsWith('-') && modeChanges.includes('t'))) {
            if (address.includes('+t')) {
              setAddress(address.replace('+t', ''));
            }
          }
        }
        
        logModeChange(target, modeChanges, `Executed terminal command: /mode ${target} ${modeChanges}`, '@jakedot');
      }
    } else if (trimmed.startsWith('/topic ') || trimmed === '/topic') {
      if (trimmed !== '/topic') {
        const newTopic = trimmed.slice(7).trim();
        setPersonalTopics(prev => ({ ...prev, [baseTarget]: newTopic }));
        logModeChange(baseTarget, '+t', `Updated channel topic: "${newTopic}"`, '@jakedot');
      }
    } else if (trimmed === '/part' || trimmed.startsWith('/part ')) {
      setAddress('#feed');
    } else if (trimmed === '/raw' || trimmed === '/view' || trimmed === '/Δview') {
      setAddress(`${baseTarget}+Δview`);
    } else if (trimmed === '/props' || trimmed === '/§props') {
      setAddress(`${baseTarget}+props`);
      setDeltaViewTab('props');
    } else if (trimmed === '/db' || trimmed === '/sql') {
      setAddress(`${baseTarget}+db`);
      setDeltaViewTab('db');
    } else if (trimmed === '/diff' || trimmed === '/Δdiff') {
      setAddress(`${baseTarget}+diff`);
      setDeltaViewTab('diff');
    } else if (trimmed === '/subobjects' || trimmed === '/subs') {
      setAddress(`${baseTarget}+subobjects`);
      setDeltaViewTab('subobjects');
    } else if (trimmed === '/wire') {
      setAddress(`${baseTarget}+wire`);
      setDeltaViewTab('wire');
    } else if (trimmed === '/prompts' || trimmed === '/Δprompts') {
      setAddress(`${baseTarget}+prompts`);
      setDeltaViewTab('prompts');
    } else if (trimmed === '/model') {
      setAddress(`${baseTarget}+model`);
      setDeltaViewTab('model');
    } else if (trimmed === '/docs' || trimmed === '/api/docs' || trimmed === '/docs/modes') {
      window.open('/api/docs/modes', '_blank');
    }
    setCommandInput('');
  };

  const toggleRawMode = () => {
    if (isDeltaView) {
      setAddress(address.replace('+raw', '').replace('+Δview', '').replace('+props', '').replace('+db', '').replace('+diff', '').replace('+subobjects', '').replace('+wire', ''));
    } else {
      setAddress(address + '+Δview');
    }
  };

  // Subobject modifiers actions
  const toggleBookmark = (e: React.MouseEvent, post: Post) => {
    e.stopPropagation();
    setBookmarks(prev => prev.some(b => b.id === post.id) ? prev.filter(b => b.id !== post.id) : [...prev, post]);
  };

  const toggleLike = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    setLikes(prev => prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]);
  };

  const toggleIgnore = (handle: string) => {
    setIgnored(prev => prev.includes(handle) ? prev.filter(h => h !== handle) : [...prev, handle]);
  };

  const toggleBan = (handle: string) => {
    setBanned(prev => prev.includes(handle) ? prev.filter(h => h !== handle) : [...prev, handle]);
  };

  const startHandshake = () => {
    if (isSimulating) return;
    setHandshakeLogs([]);
    setIsSimulating(true);

    const sequence = [
      { src: '10.0.0.1 (Node A)', dst: '10.0.0.2 (Node B)', proto: 'TCP', info: '7443 > 443 [SYN] Seq=0 Win=65535 Len=0' },
      { src: '10.0.0.2 (Node B)', dst: '10.0.0.1 (Node A)', proto: 'TCP', info: '443 > 7443 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0' },
      { src: '10.0.0.1 (Node A)', dst: '10.0.0.2 (Node B)', proto: 'TCP', info: '7443 > 443 [ACK] Seq=1 Ack=1 Win=65535 Len=0' },
      { src: '10.0.0.1 (Node A)', dst: '10.0.0.2 (Node B)', proto: 'TLSv1.3', info: 'Client Hello' },
      { src: '10.0.0.2 (Node B)', dst: '10.0.0.1 (Node A)', proto: 'TLSv1.3', info: 'Server Hello, Change Cipher Spec, Application Data' },
      { src: '10.0.0.1 (Node A)', dst: '10.0.0.2 (Node B)', proto: 'TLSv1.3', info: 'Change Cipher Spec, Application Data' },
      { src: '10.0.0.1 (Node A)', dst: '10.0.0.2 (Node B)', proto: 'HTTP/2', info: 'HEADERS [1] POST /api/v1/handshake' },
      { src: '10.0.0.2 (Node B)', dst: '10.0.0.1 (Node A)', proto: 'HTTP/2', info: 'HEADERS [1] 200 OK, DATA [1] (JSON)' },
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step >= sequence.length) {
        clearInterval(interval);
        setIsSimulating(false);
        return;
      }
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
      
      setHandshakeLogs(prev => [...prev, {
        id: `log-${step}-${Date.now()}`,
        time: timeStr,
        source: sequence[step].src,
        dest: sequence[step].dst,
        protocol: sequence[step].proto,
        info: sequence[step].info
      }]);
      step++;
    }, 600);
  };

  const triggerModelChat = async (
    currentTarget: string,
    userMsg: string,
    facet: 'server' | 'channel' | 'privmsg',
    channelName: string = '#general'
  ) => {
    if (!userMsg.trim() || modelLoading[currentTarget]) return;
    
    setModelLoading(prev => ({ ...prev, [currentTarget]: true }));

    // Temporarily add +l modifier to current address
    setAddress(prev => {
      if (prev.split('+')[0] === currentTarget && !prev.split('+').includes('l')) {
        return prev + '+l';
      }
      return prev;
    });

    const modelName = currentTarget.startsWith('$') ? currentTarget.substring(1) : currentTarget;
    const serverChanKey = `${currentTarget}:${channelName}`;
    
    if (facet === 'server') {
      setServerChats(prev => {
        const currentHistory = prev[serverChanKey] || [];
        return { ...prev, [serverChanKey]: [...currentHistory, { role: 'user', text: userMsg }] };
      });
    } else if (facet === 'channel') {
      setRoomChats(prev => {
        const currentHistory = prev[currentTarget] || [];
        return { ...prev, [currentTarget]: [...currentHistory, { role: 'user', text: userMsg }] };
      });
    } else {
      setPrivmsgChats(prev => {
        const currentHistory = prev[currentTarget] || [];
        return { ...prev, [currentTarget]: [...currentHistory, { role: 'user', text: userMsg }] };
      });
    }

    // Also update general modelChats for backwards compatibility
    setModelChats(prev => {
      const currentHistory = prev[currentTarget] || [];
      return { ...prev, [currentTarget]: [...currentHistory, { role: 'user', text: userMsg }] };
    });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelName,
          message: userMsg,
          contextType: facet,
          channelName,
          anonymousSessionId
        })
      });
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to fetch response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (facet === 'server') {
        setServerChats(prev => ({ ...prev, [serverChanKey]: [...(prev[serverChanKey] || []), { role: 'model', text: '' }] }));
      } else if (facet === 'channel') {
        setRoomChats(prev => ({ ...prev, [currentTarget]: [...(prev[currentTarget] || []), { role: 'model', text: '' }] }));
      } else {
        setPrivmsgChats(prev => ({ ...prev, [currentTarget]: [...(prev[currentTarget] || []), { role: 'model', text: '' }] }));
      }

      setModelChats(prev => ({ ...prev, [currentTarget]: [...(prev[currentTarget] || []), { role: 'model', text: '' }] }));

      if (reader) {
        let chunkText = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunkStr = decoder.decode(value, { stream: true });
          const lines = chunkStr.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.substring(6);
              if (dataStr === '[DONE]') continue;
              try {
                const data = JSON.parse(dataStr);
                chunkText += data.text;

                if (facet === 'server') {
                  setServerChats(prev => {
                    const currentHistory = prev[serverChanKey] || [];
                    const newHistory = [...currentHistory];
                    if (newHistory.length > 0) newHistory[newHistory.length - 1].text = chunkText;
                    return { ...prev, [serverChanKey]: newHistory };
                  });
                } else if (facet === 'channel') {
                  setRoomChats(prev => {
                    const currentHistory = prev[currentTarget] || [];
                    const newHistory = [...currentHistory];
                    if (newHistory.length > 0) newHistory[newHistory.length - 1].text = chunkText;
                    return { ...prev, [currentTarget]: newHistory };
                  });
                } else {
                  setPrivmsgChats(prev => {
                    const currentHistory = prev[currentTarget] || [];
                    const newHistory = [...currentHistory];
                    if (newHistory.length > 0) newHistory[newHistory.length - 1].text = chunkText;
                    return { ...prev, [currentTarget]: newHistory };
                  });
                }

                setModelChats(prev => {
                  const currentHistory = prev[currentTarget] || [];
                  const newHistory = [...currentHistory];
                  if (newHistory.length > 0) newHistory[newHistory.length - 1].text = chunkText;
                  return { ...prev, [currentTarget]: newHistory };
                });
              } catch (e) {}
            }
          }
        }
      }
    } catch (err: any) {
      console.error(err);
      const errMsg = `Error: ${err.message || 'Connection failed'}`;
      if (facet === 'server') {
        setServerChats(prev => ({ ...prev, [serverChanKey]: [...(prev[serverChanKey] || []), { role: 'model', text: errMsg }] }));
      } else if (facet === 'channel') {
        setRoomChats(prev => ({ ...prev, [currentTarget]: [...(prev[currentTarget] || []), { role: 'model', text: errMsg }] }));
      } else {
        setPrivmsgChats(prev => ({ ...prev, [currentTarget]: [...(prev[currentTarget] || []), { role: 'model', text: errMsg }] }));
      }
      setModelChats(prev => ({ ...prev, [currentTarget]: [...(prev[currentTarget] || []), { role: 'model', text: errMsg }] }));
    } finally {
      setModelLoading(prev => ({ ...prev, [currentTarget]: false }));
      // Remove +l modifier
      setAddress(prev => {
        if (prev.split('+')[0] === currentTarget) {
          return prev.split('+').filter(p => p !== 'l').join('+');
        }
        return prev;
      });
    }
  };

  const handleModelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentTarget = baseTarget;
    if (!modelChatInput.trim() || modelLoading[currentTarget]) return;
    
    const userMsg = modelChatInput;
    setModelChatInput('');
    const targetChan = activeServerChannel[currentTarget] || '#general';
    await triggerModelChat(currentTarget, userMsg, currentModelFacet, targetChan);
  };

  const handlePersonalChannelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = personalInput.trim();
    if (!text || modelLoading[baseTarget]) return;
    setPersonalInput('');

    // Handle slash commands inside personal channel input
    if (text.startsWith('/topic ')) {
      const newTopic = text.slice(7).trim();
      setPersonalTopics(prev => ({ ...prev, [baseTarget]: newTopic }));
      logModeChange(baseTarget, '+t', `Updated personal channel topic: "${newTopic}"`, '@jakedot');
      return;
    }
    if (text === '/clear') {
      setPersonalChannels(prev => ({ ...prev, [baseTarget]: [] }));
      return;
    }
    if (text.startsWith('/pin ')) {
      const pinText = text.slice(5).trim();
      const newPost: PersonalChannelPost = {
        id: `p-${Date.now()}`,
        author: 'Jake Dot',
        handle: '@jakedot',
        time: 'Just now',
        content: `📌 [PINNED] ${pinText}`,
        isPinned: true,
        role: 'user',
        likes: 0
      };
      setPersonalChannels(prev => ({
        ...prev,
        [baseTarget]: [newPost, ...(prev[baseTarget] || [])]
      }));
      return;
    }

    const newPost: PersonalChannelPost = {
      id: `p-${Date.now()}`,
      author: 'Jake Dot',
      handle: '@jakedot',
      time: 'Just now',
      content: text,
      role: 'user',
      likes: 0
    };

    setPersonalChannels(prev => ({
      ...prev,
      [baseTarget]: [...(prev[baseTarget] || []), newPost]
    }));

    // If the personal channel belongs to a model object ($duck.ai/#evals or $gemini/#prompts)
    if (personalOwner.startsWith('$')) {
      const cleanModel = personalOwner.substring(1);
      setModelLoading(prev => ({ ...prev, [baseTarget]: true }));

      // Append empty model placeholder
      const modelPostId = `p-${Date.now() + 1}`;
      setPersonalChannels(prev => ({
        ...prev,
        [baseTarget]: [
          ...(prev[baseTarget] || []),
          {
            id: modelPostId,
            author: cleanModel,
            handle: personalOwner,
            time: 'Just now',
            content: '',
            role: 'model',
            likes: 0
          }
        ]
      }));

      try {
        const historyData = (personalChannels[baseTarget] || []).map(p => ({
          role: p.role === 'model' ? 'model' : 'user',
          parts: [{ text: p.content }]
        }));

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: cleanModel,
            message: text,
            contextType: 'personal_channel',
            channelName: personalChannelName,
            history: historyData
          })
        });

        if (!response.ok) throw new Error('API Error');

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let chunkText = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const dataStr = line.substring(6);
                if (dataStr === '[DONE]') continue;
                try {
                  const data = JSON.parse(dataStr);
                  chunkText += data.text;
                  setPersonalChannels(prev => {
                    const currentList = prev[baseTarget] || [];
                    const updated = [...currentList];
                    const idx = updated.findIndex(p => p.id === modelPostId);
                    if (idx !== -1) {
                      updated[idx] = { ...updated[idx], content: chunkText };
                    }
                    return { ...prev, [baseTarget]: updated };
                  });
                } catch (e) {}
              }
            }
          }
        }
      } catch (err: any) {
        setPersonalChannels(prev => {
          const currentList = prev[baseTarget] || [];
          const updated = [...currentList];
          const idx = updated.findIndex(p => p.id === modelPostId);
          if (idx !== -1) {
            updated[idx] = { ...updated[idx], content: `Error: ${err.message || 'Failed to generate response'}` };
          }
          return { ...prev, [baseTarget]: updated };
        });
      } finally {
        setModelLoading(prev => ({ ...prev, [baseTarget]: false }));
      }
    }
  };

  const togglePinPersonalPost = (postId: string) => {
    setPersonalChannels(prev => {
      const list = prev[baseTarget] || [];
      return {
        ...prev,
        [baseTarget]: list.map(p => p.id === postId ? { ...p, isPinned: !p.isPinned } : p)
      };
    });
  };

  const toggleLikePersonalPost = (postId: string) => {
    setPersonalChannels(prev => {
      const list = prev[baseTarget] || [];
      return {
        ...prev,
        [baseTarget]: list.map(p => p.id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p)
      };
    });
  };

  const deletePersonalPost = (postId: string) => {
    setPersonalChannels(prev => {
      const list = prev[baseTarget] || [];
      return {
        ...prev,
        [baseTarget]: list.filter(p => p.id !== postId)
      };
    });
  };

  const savePersonalTopic = () => {
    if (topicDraft.trim()) {
      setPersonalTopics(prev => ({ ...prev, [baseTarget]: topicDraft.trim() }));
      logModeChange(baseTarget, '+t', `Updated channel topic: "${topicDraft.trim()}"`, '@jakedot');
    }
    setEditingPersonalTopic(false);
  };

  const createPersonalChannel = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSlug = newChannelInput.trim().replace(/^#+/, '').toLowerCase();
    if (!cleanSlug) return;
    const newChanId = `${personalOwner}/#${cleanSlug}`;
    setAddress(newChanId);
    if (!personalChannels[newChanId]) {
      setPersonalChannels(prev => ({
        ...prev,
        [newChanId]: [
          {
            id: `p-${Date.now()}`,
            author: personalOwner.replace(/^[@$~&§+?£€￠¥₠∮∃∏∑±=×]/, ''),
            handle: personalOwner,
            time: 'Just now',
            content: `📌 [INITIALIZED] Personal channel #${cleanSlug} created under owner ${personalOwner}.\nChannel ID: ${newChanId}\nModes: +p+m+n+t+s`,
            isPinned: true,
            role: personalOwner.startsWith('$') ? 'model' : 'user',
            likes: 1
          }
        ]
      }));
    }
    if (!personalTopics[newChanId]) {
      setPersonalTopics(prev => ({
        ...prev,
        [newChanId]: `Personal #${cleanSlug} workspace for ${personalOwner}`
      }));
    }
    setNewChannelInput('');
    setShowNewChannelInput(false);
    logModeChange(newChanId, '+p+m+n+t+s', `Created personal channel ${newChanId}`, '@jakedot');
  };

  const getObjectProps = (target: string): ObjectProp[] => {
    if (objectPropsStore[target]) {
      return objectPropsStore[target];
    }
    const now = new Date().toLocaleTimeString('en-US', { hour12: false });
    if (target.startsWith('$')) {
      return [
        { id: `pr-dyn-1`, key: 'model.engine', type: 'string', value: target.substring(1), origin: 'PROTOTYPE', isReadOnly: true, description: 'AI inference model engine', schemaRule: 'model_id', updatedAt: now },
        { id: `pr-dyn-2`, key: 'model.temperature', type: 'number', value: 0.7, origin: 'PROTOTYPE', description: 'Generation temperature', schemaRule: 'range: 0.0..2.0', updatedAt: now },
        { id: `pr-dyn-3`, key: 'model.context_tokens', type: 'number', value: 1048576, origin: 'PROTOTYPE', description: 'Context window capacity', schemaRule: 'tokens', updatedAt: now },
        { id: `pr-dyn-4`, key: 'model.trust_tier', type: 'string', value: '+S (Trusted Model Object)', origin: 'INHERITED', description: 'Auto-applied trusted service level', schemaRule: 'enum: [+S, +s]', updatedAt: now },
        { id: `pr-dyn-5`, key: 'acl.owner', type: 'string', value: '@jakedot', origin: 'PROTOTYPE', description: 'Registered operator identity', schemaRule: 'handle', updatedAt: now }
      ];
    } else if (target.startsWith('@')) {
      return [
        { id: `pr-dyn-1`, key: 'identity.handle', type: 'string', value: target, origin: 'PROTOTYPE', isReadOnly: true, description: 'User identity identifier', schemaRule: 'pattern: ^@[a-z0-9_]+$', updatedAt: now },
        { id: `pr-dyn-2`, key: 'identity.role', type: 'string', value: 'Cluster Identity Subobject', origin: 'PROTOTYPE', description: 'Cluster authority level', schemaRule: 'role', updatedAt: now },
        { id: `pr-dyn-3`, key: 'acl.modes', type: 'string', value: '+v', origin: 'PROTOTYPE', description: 'Active mode bitmask', schemaRule: 'irc_modes', updatedAt: now },
        { id: `pr-dyn-4`, key: 'quota.daily_messages', type: 'number', value: 5000, origin: 'INHERITED', description: 'Maximum daily dispatch quota', schemaRule: 'min: 0', updatedAt: now }
      ];
    } else if (target.startsWith('&')) {
      return [
        { id: `pr-dyn-1`, key: 'service.name', type: 'string', value: target.substring(1), origin: 'PROTOTYPE', isReadOnly: true, description: 'Service subsystem moniker', schemaRule: 'service_name', updatedAt: now },
        { id: `pr-dyn-2`, key: 'service.status', type: 'enum', value: 'ONLINE', origin: 'DYNAMIC_DELTA', description: 'Daemon heartbeat condition', schemaRule: 'enum: [ONLINE, DEGRADED, OFFLINE]', updatedAt: now },
        { id: `pr-dyn-3`, key: 'network.tls_mode', type: 'string', value: 'TLSv1.3_STRICT', origin: 'PROTOTYPE', description: 'Inter-daemon encryption standard', schemaRule: 'tls_mode', updatedAt: now },
        { id: `pr-dyn-4`, key: 'modes.inherited', type: 'string', value: '+N+S', origin: 'PROTOTYPE', description: 'Network services mode bitmask', schemaRule: 'irc_modes', updatedAt: now }
      ];
    } else if (target.startsWith('~')) {
      return [
        { id: `pr-dyn-1`, key: 'kernel.ring', type: 'number', value: 0, origin: 'PROTOTYPE', isReadOnly: true, description: 'Ring-0 execution supervisor level', schemaRule: '0', updatedAt: now },
        { id: `pr-dyn-2`, key: 'kernel.arch', type: 'string', value: 'x86_64-ivc-vkernel', origin: 'PROTOTYPE', isReadOnly: true, description: 'Micro-kernel architecture', schemaRule: 'arch', updatedAt: now },
        { id: `pr-dyn-3`, key: 'security.kprobe_active', type: 'boolean', value: true, origin: 'DYNAMIC_DELTA', description: 'Low-level probe trap status', schemaRule: 'boolean', updatedAt: now }
      ];
    } else if (target.startsWith('#')) {
      return [
        { id: `pr-dyn-1`, key: 'channel.name', type: 'string', value: target, origin: 'PROTOTYPE', isReadOnly: true, description: 'Canonical channel name', schemaRule: 'channel_id', updatedAt: now },
        { id: `pr-dyn-2`, key: 'channel.topic', type: 'string', value: `Channel ${target} discussion stream`, origin: 'PROTOTYPE', description: 'Channel topic bulletin', schemaRule: 'text', updatedAt: now },
        { id: `pr-dyn-3`, key: 'channel.moderated', type: 'boolean', value: false, origin: 'PROTOTYPE', description: 'Moderated voice mode (+m)', schemaRule: 'boolean', updatedAt: now },
        { id: `pr-dyn-4`, key: 'channel.max_members', type: 'number', value: 10000, origin: 'INHERITED', description: 'Capacity ceiling (+l)', schemaRule: 'min: 1', updatedAt: now }
      ];
    }
    return [
      { id: `pr-dyn-1`, key: 'object.canonical_id', type: 'string', value: target, origin: 'PROTOTYPE', isReadOnly: true, description: 'Canonical IVC addressable target', schemaRule: 'uri', updatedAt: now },
      { id: `pr-dyn-2`, key: 'object.status', type: 'enum', value: 'READY_ACTIVE', origin: 'DYNAMIC_DELTA', description: 'Runtime lifecycle state', schemaRule: 'enum: [READY_ACTIVE, RESOLVING, OFFLINE]', updatedAt: now },
      { id: `pr-dyn-3`, key: 'object.created_at', type: 'string', value: '2026-08-19 12:00:00', origin: 'PROTOTYPE', description: 'Instantiation timestamp', schemaRule: 'datetime', updatedAt: now }
    ];
  };

  const updateObjectProp = (target: string, propId: string, newValue: any) => {
    const currentProps = getObjectProps(target);
    const now = new Date().toLocaleTimeString('en-US', { hour12: false });
    const updated = currentProps.map(p => {
      if (p.id === propId) {
        return {
          ...p,
          value: newValue,
          origin: (p.origin === 'PROTOTYPE' ? 'OVERRIDDEN' : p.origin) as any,
          updatedAt: now
        };
      }
      return p;
    });
    setObjectPropsStore(prev => ({ ...prev, [target]: updated }));
    logModeChange(target, '§prop', `Updated §prop [${currentProps.find(p => p.id === propId)?.key}] = ${JSON.stringify(newValue)}`, '@jakedot');
  };

  const addObjectProp = (target: string, newProp: ObjectProp) => {
    const currentProps = getObjectProps(target);
    const updated = [...currentProps, newProp];
    setObjectPropsStore(prev => ({ ...prev, [target]: updated }));
    logModeChange(target, '§prop', `Added dynamic §prop [${newProp.key}] = ${JSON.stringify(newProp.value)}`, '@jakedot');
  };

  const deleteObjectProp = (target: string, propId: string) => {
    const currentProps = getObjectProps(target);
    const deletedProp = currentProps.find(p => p.id === propId);
    const updated = currentProps.filter(p => p.id !== propId);
    setObjectPropsStore(prev => ({ ...prev, [target]: updated }));
    if (deletedProp) {
      logModeChange(target, '§prop', `Deleted §prop [${deletedProp.key}]`, '@jakedot');
    }
  };

  const resetObjectProps = (target: string) => {
    if (DEFAULT_OBJECT_PROPS[target]) {
      setObjectPropsStore(prev => ({ ...prev, [target]: DEFAULT_OBJECT_PROPS[target] }));
    } else {
      setObjectPropsStore(prev => {
        const next = { ...prev };
        delete next[target];
        return next;
      });
    }
    logModeChange(target, '§prop', `Reset §props to prototype default for ${target}`, '@jakedot');
  };

  const getGeneratedSubObjects = (target: string): GeneratedSubObject[] => {
    const subObjects: GeneratedSubObject[] = [];
    const isModel = target.startsWith('$');
    const isUser = target.startsWith('@');
    const isServices = target.startsWith('&');
    const isKernel = target.startsWith('~');

    // 1. Personal Channels (/#channel)
    if (isUser || isModel || isKernel || isServices) {
      subObjects.push(
        { path: `${target}/#notes`, name: '#notes', type: 'channel', description: 'Personal notes and task log stream', inheritedModes: '+p+m+n+t+s', activeListeners: 1 },
        { path: `${target}/#dev`, name: '#dev', type: 'channel', description: 'Development scratchpad and compiler log', inheritedModes: '+p+m+n+t+s', activeListeners: 1 }
      );
      if (isModel) {
        subObjects.push(
          { path: `${target}/#evals`, name: '#evals', type: 'channel', description: 'Autonomous accuracy benchmark telemetry', inheritedModes: '+p+m+n+t+s+S', activeListeners: 3 },
          { path: `${target}/#prompts`, name: '#prompts', type: 'channel', description: 'Prompt template sandbox and grounding logs', inheritedModes: '+p+m+n+t+s+S', activeListeners: 2 }
        );
      }
    }

    // 2. Query Sub-Channels (/?#subchannel, /?query)
    subObjects.push(
      { path: `${target}/?#telemetry`, name: '?#telemetry', type: 'query_facet', description: 'Real-time telemetry event query filter', inheritedModes: '+t+v', isEphemeral: true, activeListeners: 1 },
      { path: `${target}/?#audit`, name: '?#audit', type: 'query_facet', description: 'Security audit ledger query filter', inheritedModes: '+n+S', isEphemeral: true, activeListeners: 1 },
      { path: `${target}/?filter=active`, name: '?filter=active', type: 'query_facet', description: 'Live active status predicate sub-query', inheritedModes: '+v', isEphemeral: true }
    );

    // 3. Facets & Structural Sub-Objects
    subObjects.push(
      { path: `${target}/§props`, name: '§props', type: 'props', description: 'Dynamic typed property matrix and schema rules', inheritedModes: '+n' },
      { path: `${target}/db`, name: 'db', type: 'db', description: 'Relational database representation and foreign key ledger', inheritedModes: '+N' },
      { path: `${target}/diff`, name: 'diff', type: 'query_facet', description: 'ΔDiff comparator against prototype baseline', inheritedModes: '+Δ' },
      { path: `${target}/wire`, name: 'wire', type: 'wire', description: 'IRCv3 / IVC raw socket wire protocol serializer', inheritedModes: '+k' },
      { path: `${target}/server`, name: 'server', type: 'server', description: 'Multi-channel chat multiplexer facet', inheritedModes: '+N+S', activeListeners: 4 },
      { path: `${target}/stream`, name: 'stream', type: 'stream', description: 'High-throughput packet interconnect stream (IRQ 33)', inheritedModes: '+t+k', activeListeners: 2 }
    );

    return subObjects;
  };

  const getDatabaseRepresentation = (target: string) => {
    const props = getObjectProps(target);
    const subObjects = getGeneratedSubObjects(target);
    const prefixChar = PREFIX_LIST.find(p => target.startsWith(p)) || (target.startsWith('$') ? '$' : target.startsWith('@') ? '@' : target.startsWith('#') ? '#' : target.startsWith('~') ? '~' : target.startsWith('&') ? '&' : '@');
    
    const objType = 
      target.startsWith('$') ? 'MODEL_OBJECT' :
      target.startsWith('@') ? 'USER_IDENTITY' :
      target.startsWith('&') ? 'NETWORK_SERVICE' :
      target.startsWith('~') ? 'NETADMIN_KERNEL' :
      target.startsWith('#') ? 'CHANNEL_GROUP' : 'SCHEMA_UNIT';

    const objectsTableRow = {
      id: target,
      prefix: prefixChar,
      canonical_name: target,
      owner_id: target.startsWith('@') ? target : '@jakedot',
      parent_id: target.includes('/') ? target.split('/')[0] : 'ROOT_NODE',
      object_type: objType,
      is_active: true,
      created_at: '2026-08-19 10:00:00.000',
      status: 'ACTIVE_ONLINE'
    };

    const propsTableRows = props.map(p => ({
      id: p.id,
      object_id: target,
      prop_key: p.key,
      prop_type: p.type,
      prop_val: typeof p.value === 'object' ? JSON.stringify(p.value) : String(p.value),
      origin: p.origin,
      is_readonly: p.isReadOnly ? 1 : 0,
      updated_at: p.updatedAt
    }));

    const modesTableRows = [
      { id: `ml-1`, target_object: target, mode_char: '+v', is_active: 1, granted_by: '@jakedot', timestamp: '12:42:15', scope: 'Object' },
      { id: `ml-2`, target_object: target, mode_char: '+S', is_active: 1, granted_by: 'SYSTEM', timestamp: '12:30:00', scope: 'Global' },
      { id: `ml-3`, target_object: target, mode_char: '+t', is_active: 1, granted_by: 'PARSER', timestamp: '12:00:00', scope: 'Telemetry' },
      { id: `ml-4`, target_object: target, mode_char: '+p', is_active: target.includes('/#') ? 1 : 0, granted_by: 'ROUTER', timestamp: '11:00:00', scope: 'Personal' }
    ];

    const subObjectsTableRows = subObjects.map((s, idx) => ({
      id: `sub-${idx + 1}`,
      parent_id: target,
      sub_path: s.path,
      sub_type: s.type,
      inheritance_mask: s.inheritedModes,
      is_ephemeral: s.isEphemeral ? 1 : 0
    }));

    return {
      objectsTableRow,
      propsTableRows,
      modesTableRows,
      subObjectsTableRows
    };
  };

  const executeDbSqlQuery = (query: string, target: string) => {
    const cleanQuery = query.trim().toUpperCase();
    const db = getDatabaseRepresentation(target);

    if (cleanQuery.includes('FROM IVC_OBJECTS')) {
      return {
        columns: ['id', 'prefix', 'canonical_name', 'owner_id', 'parent_id', 'object_type', 'is_active', 'status'],
        rows: [[
          db.objectsTableRow.id,
          db.objectsTableRow.prefix,
          db.objectsTableRow.canonical_name,
          db.objectsTableRow.owner_id,
          db.objectsTableRow.parent_id,
          db.objectsTableRow.object_type,
          'true',
          db.objectsTableRow.status
        ]]
      };
    } else if (cleanQuery.includes('FROM IVC_PROPS')) {
      return {
        columns: ['id', 'object_id', 'prop_key', 'prop_type', 'prop_val', 'origin', 'is_readonly', 'updated_at'],
        rows: db.propsTableRows.map(r => [r.id, r.object_id, r.prop_key, r.prop_type, r.prop_val, r.origin, r.is_readonly ? '1' : '0', r.updated_at])
      };
    } else if (cleanQuery.includes('FROM IVC_MODES_LEDGER') || cleanQuery.includes('FROM MODES')) {
      return {
        columns: ['id', 'target_object', 'mode_char', 'is_active', 'granted_by', 'timestamp', 'scope'],
        rows: db.modesTableRows.map(r => [r.id, r.target_object, r.mode_char, r.is_active ? '1' : '0', r.granted_by, r.timestamp, r.scope])
      };
    } else if (cleanQuery.includes('FROM IVC_SUB_OBJECTS') || cleanQuery.includes('FROM SUB_OBJECTS')) {
      return {
        columns: ['id', 'parent_id', 'sub_path', 'sub_type', 'inheritance_mask', 'is_ephemeral'],
        rows: db.subObjectsTableRows.map(r => [r.id, r.parent_id, r.sub_path, r.sub_type, r.inheritance_mask, r.is_ephemeral ? '1' : '0'])
      };
    }

    return {
      columns: ['query_status', 'target', 'matching_props', 'matching_subobjects', 'ledger_records'],
      rows: [['SUCCESS', target, db.propsTableRows.length, db.subObjectsTableRows.length, db.modesTableRows.length]]
    };
  };

  const getRawWireRepresentation = (target: string) => {
    const props = getObjectProps(target);
    const activeModesStr = `+${modifiers.join('+') || 'v'}`;
    const frameLines = [
      `:origin.ivc.net 001 @jakedot :Welcome to the IVC Object Bus Fabric (v2.4)`,
      `:origin.ivc.net 002 @jakedot :Your host is node-01.us-west.ivc.internal running ivc-vkernel-6.12`,
      `:origin.ivc.net 004 @jakedot ivc-node-01 2.4 ao-s+v mntS`,
      `MODE ${target} ${activeModesStr}`,
      ...props.slice(0, 4).map(p => `§PROP SET ${target} ${p.key}=${JSON.stringify(p.value)}`),
      `JOIN ${target}`,
      `:system!daemon@services.ivc.net NOTICE ${target} :Bound memory sandbox interconnect MTU=1500 IRQ=33`,
      `:telemetry@probe.ivc.net TRACE ${target} :STATE_TRANSITION -> READY_ACTIVE`
    ];

    const rawString = frameLines.join('\r\n');
    const byteLength = new TextEncoder().encode(rawString).length;
    const crc32 = '0x' + (Math.abs(rawString.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0))).toString(16).padStart(8, '0').toUpperCase();

    return {
      frameLines,
      rawString,
      byteLength,
      crc32,
      sequenceId: 489201,
      cipher: 'AES-256-GCM / TLSv1.3'
    };
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotification(label);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const renderPost = (post: Post) => {
    const isBookmarked = bookmarks.some(b => b.id === post.id);
    const isLiked = likes.includes(post.id);
    const displayLikes = post.baseLikes + (isLiked ? 1 : 0);

    return (
      <article key={post.id} className="bg-white border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => window.open(post.url, '_blank')}>
        <div className="flex space-x-3">
          {post.avatarUrl ? (
            <img src={post.avatarUrl} alt={post.author} className="w-10 h-10 rounded-sm flex-shrink-0 object-cover bg-gray-200" onClick={(e) => { e.stopPropagation(); setAddress(post.handle); }} />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-sm flex-shrink-0 flex items-center justify-center" onClick={(e) => { e.stopPropagation(); setAddress(post.handle); }}>
              <User className="w-5 h-5 text-gray-500" />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline space-x-2 truncate">
                <h2 className="text-base font-bold text-gray-900 truncate hover:underline" onClick={(e) => { e.stopPropagation(); setAddress(post.handle); }}>{post.author}</h2>
                <span className="text-sm text-blue-600 hover:underline truncate" onClick={(e) => { e.stopPropagation(); setAddress(post.handle); }}>{post.handle}</span>
                <span className="text-sm text-gray-500">· {post.time}</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 px-1 py-0.5">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-1 flex items-start space-x-2">
              <GitCommit className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-mono text-[13px]">
                {post.content}
              </p>
            </div>
            
            {/* Action Bar */}
            <div className="mt-3 flex items-center space-x-6 text-gray-500">
              <button className="flex items-center space-x-1.5 hover:text-blue-600 group" onClick={(e) => { e.stopPropagation(); setAddress(`${post.handle}+pm`); }}>
                <MessageSquare className="w-4 h-4 group-active:scale-95 transition-transform" />
                <span className="text-xs font-medium">PM</span>
              </button>
              <button className={`flex items-center space-x-1.5 group ${isLiked ? 'text-red-500' : 'hover:text-red-600'}`} onClick={(e) => toggleLike(e, post.id)}>
                <Heart className="w-4 h-4 group-active:scale-95 transition-transform" fill={isLiked ? "currentColor" : "none"} />
                <span className="text-xs font-medium">{displayLikes}</span>
              </button>
              <button className={`flex items-center space-x-1.5 group ${isBookmarked ? 'text-yellow-500' : 'hover:text-yellow-600'}`} onClick={(e) => toggleBookmark(e, post)}>
                <Bookmark className="w-4 h-4 group-active:scale-95 transition-transform" fill={isBookmarked ? "currentColor" : "none"} />
                <span className="text-xs font-medium">Save</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="py-12 flex justify-center">
          <span className={`inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${isRaw ? 'border-[#30363d] border-t-green-500' : 'border-gray-300 border-t-blue-600'}`}></span>
        </div>
      );
    }

    if (error) {
      return <div className="p-6 text-center text-red-500 font-medium">{error}</div>;
    }

    // 0. ΔMODES VIEW: Object Mode Configuration & Inheritance Matrix
    if (isDeltaModes && !isRaw) {
      const activeBase = (baseTarget === 'Δmodes' || baseTarget === '#Δmodes' || baseTarget === 'modes') ? '#feed' : baseTarget;
      const targetNegs = negatedModes[activeBase] || [];

      // Determine parent namespace & inheritance origin
      let parentScope = 'Global Network Root (~root)';
      let parentDescription = 'Top-level root scope with default unprivileged access.';
      if (activeBase.startsWith('#')) {
        const parts = activeBase.slice(1).split('/');
        if (parts.length > 1) {
          parentScope = `#${parts.slice(0, -1).join('/')}`;
          parentDescription = `Parent hierarchical group #${parts[0]}`;
        } else {
          parentScope = '#channels';
          parentDescription = 'Standard public channel directory.';
        }
      } else if (activeBase.startsWith('@') || activeBase.startsWith('$@')) {
        parentScope = '#users';
        parentDescription = 'User Cluster Subsystem with member identity rules.';
      } else if (activeBase.startsWith('$')) {
        parentScope = '&services';
        parentDescription = 'Model Subsystem and AI Inference Services Hub.';
      } else if (activeBase.startsWith('&')) {
        parentScope = 'GLOBAL_NETWORK';
        parentDescription = 'Network Services and Daemon cluster scope.';
      } else if (activeBase.startsWith('~')) {
        parentScope = 'Ring-0 System Superuser Scope';
        parentDescription = 'Kernel & low-level hardware virtualization container.';
      } else if (matchedPrefixDescriptor) {
        parentScope = `${matchedPrefixDescriptor.category}`;
        parentDescription = `Inherent to ${matchedPrefixDescriptor.name} registry.`;
      }

      // Mode matrix definitions
      const allModeDefinitions = [
        {
          flag: 'm',
          name: 'Channel Muted / Moderated',
          category: 'channel',
          desc: 'Restricts channel transmissions to voiced users (+v) and operators (+o).',
          active: isMuted,
          inherited: isOpersEvent,
          inheritedSource: isOpersEvent ? '§opers event session' : undefined,
          negated: targetNegs.includes('m')
        },
        {
          flag: 'v',
          name: 'Voice & Broadcast Override',
          category: 'channel',
          desc: 'Grants speaking permission in muted (+m) channels, or sets unrestricted mode on #chan+v.',
          active: isV,
          inherited: false,
          inheritedSource: undefined,
          negated: targetNegs.includes('v')
        },
        {
          flag: 'o',
          name: 'Channel Operator Privileges',
          category: 'channel',
          desc: 'Grants channel management rights, kick/ban capabilities, and bypasses channel restrictions.',
          active: isO,
          inherited: Boolean(defaultO || isOpersEvent),
          inheritedSource: defaultO ? 'Object Prefix ($ or |)' : isOpersEvent ? 'Operator Event Bus' : undefined,
          negated: targetNegs.includes('o')
        },
        {
          flag: 'a',
          name: 'Channel Administrator',
          category: 'channel',
          desc: 'Highest channel administrative authority and governance.',
          active: isA,
          inherited: Boolean(defaultA || isOpersEvent),
          inheritedSource: defaultA ? 'Object Prefix ($@ or |)' : isOpersEvent ? 'Operator Event Bus' : undefined,
          negated: targetNegs.includes('a')
        },
        {
          flag: 'k',
          name: 'Kernel Ring-0 Sandbox',
          category: 'diagnostic',
          desc: 'Enables direct low-level kernel diagnostics, register inspection, and page table view.',
          active: isK,
          inherited: false,
          inheritedSource: undefined,
          negated: targetNegs.includes('k')
        },
        {
          flag: 't',
          name: 'Trace Telemetry Stream',
          category: 'diagnostic',
          desc: 'Captures real-time state transitions, message packets, and event dispatch telemetry.',
          active: isT,
          inherited: Boolean(isInheritedT),
          inheritedSource: isInheritedT ? 'Diagnostic Probe (?*) Scope' : undefined,
          negated: targetNegs.includes('t')
        },
        {
          flag: 'n',
          name: 'Netadmin Superuser Only',
          category: 'network',
          desc: 'Restricts object interaction exclusively to verified network administrators.',
          active: isN,
          inherited: Boolean(defaultN || isOpersEvent),
          inheritedSource: defaultN ? 'Superuser Scope (~root)' : undefined,
          negated: targetNegs.includes('n')
        },
        {
          flag: 'N',
          name: 'Network Services Daemon',
          category: 'network',
          desc: 'Enables network services (NickServ, ChanServ, OperServ) daemon bindings.',
          active: isCapN,
          inherited: Boolean(defaultCapN),
          inheritedSource: defaultCapN ? '&services or #network cluster' : undefined,
          negated: targetNegs.includes('N')
        },
        {
          flag: 'S',
          name: 'Trusted External Service',
          category: 'security',
          desc: 'Verified trusted service tier. Auto-applied to $ai.model and [$@&] objects.',
          active: isCapS,
          inherited: Boolean(defaultCapS),
          inheritedSource: defaultCapS ? 'Auto-applied (AI model / [$@&] scope)' : undefined,
          negated: targetNegs.includes('S')
        },
        {
          flag: 's',
          name: 'Untrusted Sandboxed Service',
          category: 'security',
          desc: 'Isolated untrusted service sandbox mode for unverified external modules.',
          active: isSmallS,
          inherited: false,
          inheritedSource: undefined,
          negated: targetNegs.includes('s')
        }
      ];

      const handleSetModeAction = (flag: string, action: 'grant' | 'negate' | 'inherit') => {
        setNegatedModes(prev => {
          const current = prev[activeBase] || [];
          let updated = [...current];
          if (action === 'negate') {
            if (!updated.includes(flag)) updated.push(flag);
          } else if (action === 'grant' || action === 'inherit') {
            updated = updated.filter(c => c !== flag);
          }
          return { ...prev, [activeBase]: updated };
        });

        if (action === 'grant') {
          if (!modifiers.includes(flag)) {
            setAddress(`${activeBase}+${[...modifiers.filter(m => m !== 'Δmodes' && m !== 'modes' && m !== 'Δ'), flag, 'Δmodes'].join('+')}`);
          }
          setDeltaNotice(`Applied +${flag} to ${activeBase}`);
          logModeChange(activeBase, `+${flag}`, `Explicitly granted +${flag} (${allModeDefinitions.find(m => m.flag === flag)?.name || flag})`, '@jakedot');
        } else if (action === 'negate') {
          const cleanMods = modifiers.filter(m => m !== flag);
          setAddress(`${activeBase}+${cleanMods.join('+')}`);
          setDeltaNotice(`Opted-out / Negated -${flag} on ${activeBase}`);
          logModeChange(activeBase, `-${flag}`, `Opted-out from mode -${flag} (${allModeDefinitions.find(m => m.flag === flag)?.name || flag})`, '@jakedot');
        } else if (action === 'inherit') {
          const cleanMods = modifiers.filter(m => m !== flag);
          setAddress(`${activeBase}+${cleanMods.join('+')}`);
          setDeltaNotice(`Reset ${flag} to inherited default on ${activeBase}`);
          logModeChange(activeBase, `↺${flag}`, `Restored inherited default policy for mode flag ${flag}`, '@jakedot');
        }

        setTimeout(() => setDeltaNotice(null), 3500);
      };

      const handleApplyPreset = (presetName: string, deltas: string) => {
        const parts = deltas.split('');
        let isNeg = false;
        const negsToAdd: string[] = [];
        const flagsToRemove: string[] = [];
        const modsToAdd: string[] = [];

        for (const char of parts) {
          if (char === '-') isNeg = true;
          else if (char === '+') isNeg = false;
          else {
            if (isNeg) {
              negsToAdd.push(char);
            } else {
              flagsToRemove.push(char);
              modsToAdd.push(char);
            }
          }
        }

        setNegatedModes(prev => {
          const current = prev[activeBase] || [];
          let updated = current.filter(c => !flagsToRemove.includes(c));
          for (const n of negsToAdd) {
            if (!updated.includes(n)) updated.push(n);
          }
          return { ...prev, [activeBase]: updated };
        });

        const newMods = [...modifiers.filter(m => m !== 'Δmodes' && m !== 'modes' && m !== 'Δ' && !negsToAdd.includes(m)), ...modsToAdd, 'Δmodes'];
        setAddress(`${activeBase}+${Array.from(new Set(newMods)).join('+')}`);
        setDeltaNotice(`Applied Preset [${presetName}]: /mode ${activeBase} ${deltas}`);
        logModeChange(activeBase, deltas, `Applied preset [${presetName}] (${deltas})`, '@jakedot');
        setTimeout(() => setDeltaNotice(null), 3500);
      };

      const quickTargets = [
        '#feed',
        '#users',
        '&services',
        '~root',
        '@user[123]',
        '@jakedot',
        '$gemini-3.7-flash',
        '?diagnostics',
        '§config'
      ];

      // Filtered history entries for active target or all
      const displayedHistory = historyTargetFilter === 'current'
        ? modeHistory.filter(h => h.target === activeBase)
        : modeHistory;

      return (
        <div className="flex flex-col min-h-[calc(100vh-140px)] bg-slate-900 text-slate-100 font-sans pb-32">
          {/* Header Banner */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-700/80 flex items-center justify-center text-indigo-300 shadow-inner">
                  <Sliders className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-white tracking-wide">Δmodes Policy &amp; Mode Editor</h2>
                    <span className="px-1.5 py-0.2 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded font-mono text-[9px] font-bold">DELTA MATRIX</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">TARGET: {activeBase} · RESOLVED SCOPE: {parentScope}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href="/api/docs/modes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 rounded text-xs font-bold transition-colors flex items-center space-x-1"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>API Docs (HTML)</span>
                </a>
                <button
                  onClick={() => setAddress(activeBase)}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded text-xs font-bold transition-colors flex items-center space-x-1"
                >
                  <span>Exit Δmodes</span>
                </button>
              </div>
            </div>

            {/* Quick Object Switcher */}
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center space-x-1.5 overflow-x-auto text-[11px]">
              <span className="text-[10px] text-slate-500 font-mono uppercase mr-1">Switch Target:</span>
              {quickTargets.map(qt => (
                <button
                  key={qt}
                  onClick={() => setAddress(`${qt}+Δmodes`)}
                  className={`px-2 py-0.5 rounded font-mono whitespace-nowrap transition-colors border ${
                    activeBase === qt
                      ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {qt}
                </button>
              ))}
            </div>

            {/* Tab Navigation: Mode Matrix vs Mode History */}
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
              <div className="flex space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setDeltaTab('matrix')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    deltaTab === 'matrix'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Mode Matrix</span>
                </button>
                <button
                  onClick={() => setDeltaTab('history')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    deltaTab === 'history'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Mode History</span>
                  <span className="ml-1 px-1.5 py-0.2 bg-slate-800 text-[10px] rounded-full text-indigo-300 border border-slate-700 font-mono font-normal">
                    {modeHistory.filter(h => h.target === activeBase).length}
                  </span>
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-1.5 hidden sm:flex">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ACL SYNC ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Toast Notification */}
          {deltaNotice && (
            <div className="mx-4 mt-3 p-2.5 bg-emerald-950/90 border border-emerald-700 text-emerald-200 rounded-lg text-xs flex items-center justify-between shadow-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-mono">{deltaNotice}</span>
              </div>
              <button onClick={() => setDeltaNotice(null)} className="text-emerald-400 hover:text-emerald-200 text-xs">✕</button>
            </div>
          )}

          {/* Content Body: Mode Matrix vs Mode History */}
          {deltaTab === 'matrix' ? (
            <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
            {/* Inheritance & Scope Summary Card */}
            <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-bold flex items-center space-x-1.5">
                  <Workflow className="w-4 h-4 text-indigo-400" />
                  <span>Inheritance Hierarchy &amp; Resolution Scope</span>
                </span>
                <span className="font-mono text-[10px] text-slate-500">ACL LAYER 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Parent Scope</span>
                  <span className="font-bold text-indigo-300">{parentScope}</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{parentDescription}</p>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Explicit Negations / Opt-Outs</span>
                  {targetNegs.length === 0 ? (
                    <span className="text-slate-400 italic">None (All inherited defaults active)</span>
                  ) : (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {targetNegs.map(neg => (
                        <span key={neg} className="px-1.5 py-0.2 bg-red-950 text-red-300 border border-red-800 rounded font-mono font-bold text-[10px]">
                          -{neg} Opted Out
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Presets Bar */}
            <div className="p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>One-Click Delta Presets</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">AUTO-MUTATE</span>
              </div>

              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <button
                  onClick={() => handleApplyPreset('Open Broadcast', '+v-m-k')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 font-medium transition-colors"
                >
                  🚀 Open Broadcast (+v-m)
                </button>
                <button
                  onClick={() => handleApplyPreset('Moderated Voiced', '+m+v')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-medium transition-colors"
                >
                  🛡️ Moderated (+m+v)
                </button>
                <button
                  onClick={() => handleApplyPreset('Diagnostic Telemetry', '+k+t')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-medium transition-colors"
                >
                  🔬 Diagnostic (+k+t)
                </button>
                <button
                  onClick={() => handleApplyPreset('Netadmin Services', '+n+N+S')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 font-medium transition-colors"
                >
                  ⚡ Services (+n+N+S)
                </button>
                <button
                  onClick={() => {
                    setNegatedModes(prev => {
                      const updated = { ...prev };
                      delete updated[activeBase];
                      return updated;
                    });
                    setAddress(`${activeBase}+Δmodes`);
                    setDeltaNotice(`Reset all custom mode overrides for ${activeBase}`);
                    setTimeout(() => setDeltaNotice(null), 3500);
                  }}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-red-950 hover:text-red-300 hover:border-red-800 text-slate-400 border border-slate-700 font-medium transition-colors flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              </div>
            </div>

            {/* Mode Matrix Cards */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-bold uppercase tracking-wider text-[10px]">Associated &amp; Inherited Modes</span>
                <span className="text-[10px] font-mono text-slate-500">10 SUB-MODES CONFIGURED</span>
              </div>

              <div className="space-y-2">
                {allModeDefinitions.map(mode => {
                  let statusBadge = (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                      [-] INACTIVE
                    </span>
                  );

                  if (mode.negated) {
                    statusBadge = (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-300 border border-red-800">
                        [Ø] OPTED OUT (-{mode.flag})
                      </span>
                    );
                  } else if (mode.active) {
                    if (mode.inherited) {
                      statusBadge = (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800" title={mode.inheritedSource}>
                          [+] INHERITED (+{mode.flag})
                        </span>
                      );
                    } else {
                      statusBadge = (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                          [+] EXPLICIT (+{mode.flag})
                        </span>
                      );
                    }
                  }

                  return (
                    <div
                      key={mode.flag}
                      className={`p-3 rounded-xl border transition-all ${
                        mode.active && !mode.negated
                          ? 'bg-slate-950/70 border-indigo-900/60 shadow-sm'
                          : mode.negated
                          ? 'bg-red-950/20 border-red-900/40'
                          : 'bg-slate-950/30 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm flex-shrink-0 ${
                            mode.active && !mode.negated
                              ? 'bg-indigo-950 text-indigo-300 border border-indigo-700'
                              : mode.negated
                              ? 'bg-red-950 text-red-400 border border-red-800'
                              : 'bg-slate-900 text-slate-400 border border-slate-800'
                          }`}>
                            +{mode.flag}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-white text-xs">{mode.name}</span>
                              {statusBadge}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{mode.desc}</p>
                            {mode.inheritedSource && !mode.negated && (
                              <p className="text-[10px] text-indigo-400 mt-0.5 font-mono">Source: {mode.inheritedSource}</p>
                            )}
                          </div>
                        </div>

                        {/* 3-State Segmented Control */}
                        <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800 self-end sm:self-center flex-shrink-0">
                          <button
                            onClick={() => handleSetModeAction(mode.flag, 'grant')}
                            className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                              mode.active && !mode.negated && !mode.inherited
                                ? 'bg-emerald-600 text-white font-bold'
                                : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
                            }`}
                            title={`Force grant +${mode.flag}`}
                          >
                            + Grant
                          </button>
                          <button
                            onClick={() => handleSetModeAction(mode.flag, 'negate')}
                            className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                              mode.negated
                                ? 'bg-red-600 text-white font-bold'
                                : 'text-slate-400 hover:text-red-400 hover:bg-slate-800'
                            }`}
                            title={`Opt out and negate -${mode.flag}`}
                          >
                            - Opt-Out
                          </button>
                          <button
                            onClick={() => handleSetModeAction(mode.flag, 'inherit')}
                            className={`px-1.5 py-1 rounded text-[10px] font-medium transition-colors ${
                              !mode.negated && (mode.inherited || !mode.active)
                                ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                            }`}
                            title="Reset to inherited / default"
                          >
                            ↺ Inherit
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Generated Command Preview Box */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-300 flex items-center space-x-1.5">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <span>Protocol Command Equivalent</span>
                </span>
                <button
                  onClick={() => {
                    const cmd = `/mode ${activeBase} ${allModeDefinitions.filter(m => m.active && !m.negated).map(m => `+${m.flag}`).join('')}${targetNegs.map(n => `-${n}`).join('')}`;
                    navigator.clipboard?.writeText(cmd);
                    setDeltaNotice(`Copied to clipboard: ${cmd}`);
                    setTimeout(() => setDeltaNotice(null), 3000);
                  }}
                  className="text-[10px] text-slate-400 hover:text-white flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>

              <div className="p-2.5 bg-black/80 rounded-lg font-mono text-green-400 text-xs flex items-center justify-between border border-slate-800">
                <span>/mode {activeBase} {allModeDefinitions.filter(m => m.active && !m.negated).map(m => `+${m.flag}`).join('')}{targetNegs.map(n => `-${n}`).join('') || '+default'}</span>
                <button
                  onClick={() => setAddress(activeBase)}
                  className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold font-sans transition-colors"
                >
                  Apply &amp; View Object
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* MODE HISTORY TAB */
          <div className="p-4 space-y-4 max-w-2xl mx-auto w-full">
            {/* History Filter & Actions Bar */}
            <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <History className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-white">Mode Audit &amp; Mutation Log</span>
                  <span className="px-1.5 py-0.2 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded font-mono text-[9px]">
                    {displayedHistory.length} ENTRIES
                  </span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => {
                      const testDeltas = ['+v', '-t', '+m', '+k+t', '-m', '+o', '+n'];
                      const randomDelta = testDeltas[Math.floor(Math.random() * testDeltas.length)];
                      logModeChange(
                        activeBase,
                        randomDelta,
                        `Telemetry probe verified mode state transition [${randomDelta}]`,
                        Math.random() > 0.5 ? '@jakedot' : 'ChanServ'
                      );
                      setDeltaNotice(`Logged simulated mode event for ${activeBase}`);
                      setTimeout(() => setDeltaNotice(null), 3000);
                    }}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded text-[10px] font-bold transition-colors flex items-center space-x-1"
                  >
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Simulate Change</span>
                  </button>
                  <button
                    onClick={() => {
                      setModeHistory(prev => prev.filter(h => h.target !== activeBase));
                      setDeltaNotice(`Cleared mode history for ${activeBase}`);
                      setTimeout(() => setDeltaNotice(null), 3000);
                    }}
                    className="px-2 py-1 bg-slate-800 hover:bg-red-950 hover:text-red-300 hover:border-red-800 text-slate-400 border border-slate-700 rounded text-[10px] transition-colors"
                  >
                    Clear Target Log
                  </button>
                </div>
              </div>

              {/* Filter Selector */}
              <div className="flex items-center space-x-2 pt-1 border-t border-slate-800/80 text-xs">
                <span className="text-[10px] font-mono uppercase text-slate-500 flex items-center space-x-1">
                  <Filter className="w-3 h-3" />
                  <span>Filter Scope:</span>
                </span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setHistoryTargetFilter('current')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      historyTargetFilter === 'current'
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    Active Target ({activeBase})
                  </button>
                  <button
                    onClick={() => setHistoryTargetFilter('all')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      historyTargetFilter === 'all'
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    All Network Objects ({modeHistory.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable List of History Changes */}
            <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
              {displayedHistory.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/40 border border-slate-800/80 rounded-xl space-y-2">
                  <History className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-sm font-bold text-slate-300">No mode history records found</p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    No mode changes have been logged for <span className="font-mono text-indigo-400">{activeBase}</span> yet. Adjust mode flags on the Mode Matrix tab or execute a /mode command.
                  </p>
                  <button
                    onClick={() => setHistoryTargetFilter('all')}
                    className="mt-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-bold inline-block"
                  >
                    View All Network History
                  </button>
                </div>
              ) : (
                displayedHistory.map((item) => {
                  const isGrant = item.modeDelta.startsWith('+');
                  const isNegate = item.modeDelta.startsWith('-');
                  const isReset = item.modeDelta === 'RESET' || item.modeDelta.startsWith('↺');

                  return (
                    <div
                      key={item.id}
                      className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2 hover:border-slate-700 transition-colors shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                        <div className="flex items-center space-x-2">
                          {/* Delta Pill */}
                          <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold border ${
                            isReset
                              ? 'bg-slate-800 text-slate-300 border-slate-600'
                              : isNegate
                              ? 'bg-red-950 text-red-300 border-red-800'
                              : isGrant
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                              : 'bg-indigo-950 text-indigo-300 border-indigo-800'
                          }`}>
                            {item.modeDelta}
                          </span>

                          {/* Target Chip */}
                          <button
                            onClick={() => setAddress(`${item.target}+Δmodes`)}
                            className={`px-1.5 py-0.5 rounded font-mono text-[11px] font-bold border transition-colors hover:underline ${
                              item.target.startsWith('#')
                                ? 'bg-blue-950/60 text-blue-300 border-blue-800'
                                : item.target.startsWith('@')
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                                : item.target.startsWith('$')
                                ? 'bg-purple-950/60 text-purple-300 border-purple-800'
                                : item.target.startsWith('~')
                                ? 'bg-red-950/60 text-red-300 border-red-800'
                                : 'bg-slate-900 text-slate-300 border-slate-700'
                            }`}
                            title="Click to inspect this target"
                          >
                            {item.target}
                          </button>

                          {/* Scope Badge */}
                          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline-block">
                            · {item.scope}
                          </span>
                        </div>

                        {/* Timestamp */}
                        <div className="flex items-center space-x-1 text-slate-400 text-[11px] font-mono">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{item.timestamp}</span>
                        </div>
                      </div>

                      {/* Action Description */}
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        {item.actionDescription}
                      </p>

                      {/* Footer: User Who Applied Change */}
                      <div className="flex items-center justify-between pt-1.5 border-t border-slate-800/60 text-[11px]">
                        <div className="flex items-center space-x-1.5 text-slate-400">
                          <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Applied by:</span>
                          <span className="font-mono font-bold text-indigo-300 bg-indigo-950/50 px-1.5 py-0.2 rounded border border-indigo-900">
                            {item.appliedBy}
                          </span>
                        </div>

                        {item.target !== activeBase && (
                          <button
                            onClick={() => setAddress(`${item.target}+Δmodes`)}
                            className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold font-mono transition-colors"
                          >
                            Inspect Target →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
        </div>
      );
    }

    if (propertyTarget) {
      // Attempt to map some generic properties to make it feel alive
      let propValue: any = null;
      if (propertyTarget === 'type') {
        propValue = baseTarget.startsWith('$') ? 'Trusted Object' : baseTarget.startsWith('@') ? 'User Identity' : baseTarget.startsWith('#') ? 'Channel Group' : 'Unknown';
      } else if (propertyTarget === 'status') {
        propValue = 'active';
      } else if (propertyTarget === 'id') {
        propValue = baseTarget;
      } else if (propertyTarget === 'permissions') {
        propValue = ['read', 'write', 'execute'];
      } else if (propertyTarget === 'opers') {
        propValue = ['@jakedot', 'system_root', '0x88fA'];
      } else {
        propValue = { error: `Property §${propertyTarget} undefined or access denied.` };
      }

      return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-gray-50 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 bg-white sticky top-0 flex justify-between items-center z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold leading-tight text-gray-900">
                  Property Inspector
                </h2>
                <p className="text-xs text-gray-500 font-mono">
                  {baseTarget}/§{propertyTarget}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setAddress(baseTarget)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md hover:bg-gray-800 transition-colors shadow-sm"
            >
              <span>Back to Object</span>
            </button>
          </div>
          <div className="p-4 max-w-2xl mx-auto w-full space-y-4 pb-20">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-gray-900 flex items-center">
                  <Terminal className="w-4 h-4 mr-2 text-gray-500" />
                  Memory Location
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Base Target</span>
                  <code className="bg-gray-100 px-3 py-2 rounded text-sm text-gray-800 border border-gray-200">{baseTarget}</code>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Property Key</span>
                  <code className="bg-gray-100 px-3 py-2 rounded text-sm text-amber-700 border border-gray-200">§{propertyTarget}</code>
                </div>
              </div>
            </div>

            <div className="bg-[#0d1117] rounded-xl shadow-sm border border-[#30363d] overflow-hidden">
              <div className="p-4 border-b border-[#30363d] bg-[#161b22] flex items-center space-x-2 text-[#7ee787]">
                <Code className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider">Resolved Value</span>
              </div>
              <pre className="p-4 text-[13px] font-mono text-[#c9d1d9] leading-relaxed overflow-x-auto">
                {JSON.stringify(propValue, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      );
    }

    if (isConfig) {
      return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-gray-50 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 bg-white sticky top-0 flex justify-between items-center z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center font-bold">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold leading-tight text-gray-900">
                  Object Configuration
                </h2>
                <p className="text-xs text-gray-500 font-mono">
                  ivc://host/{baseTarget}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setAddress(baseTarget)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md hover:bg-gray-800 transition-colors shadow-sm"
            >
              <span>Done</span>
            </button>
          </div>
          <div className="p-4 max-w-2xl mx-auto w-full space-y-6 pb-20">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-gray-900 flex items-center">
                  <Terminal className="w-4 h-4 mr-2 text-gray-500" />
                  Routing Properties
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Visibility Target</p>
                    <p className="text-xs text-gray-500 mt-0.5">Control exposure of this IVC entity.</p>
                  </div>
                  <select className="text-sm bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 outline-none focus:ring-1 focus:ring-blue-500">
                    <option>Public Domain</option>
                    <option>Private Encrypted</option>
                    <option>System Only</option>
                  </select>
                </div>
                <div className="h-px bg-gray-100"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Execution Timeout</p>
                    <p className="text-xs text-gray-500 mt-0.5">Max response threshold for hooks.</p>
                  </div>
                  <input type="number" defaultValue={5000} className="w-24 text-sm bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 outline-none focus:ring-1 focus:ring-blue-500 text-right" />
                </div>
              </div>
            </div>

            {baseTarget.startsWith('$') && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-indigo-50">
                  <h3 className="font-bold text-indigo-900 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-indigo-500" />
                    Model specific IVC Config
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Inject System Instructions</p>
                      <p className="text-xs text-gray-500 mt-0.5">Override base constraints for this session.</p>
                    </div>
                    <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md hover:bg-indigo-100 border border-indigo-200">
                      Edit Instructions
                    </button>
                  </div>
                  <div className="h-px bg-gray-100"></div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Streaming Mode</p>
                      <p className="text-xs text-gray-500 mt-0.5">Require SSE (Server-Sent Events).</p>
                    </div>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                      <input type="checkbox" name="toggle" id="toggle" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-indigo-500 appearance-none cursor-pointer translate-x-5 transition-transform duration-200" style={{ right: 0 }} />
                      <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-indigo-500 cursor-pointer"></label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-red-50 rounded-xl border border-red-200 overflow-hidden">
              <div className="p-4">
                <h3 className="font-bold text-red-800 text-sm mb-1">Danger Zone</h3>
                <p className="text-xs text-red-600 mb-3">Irreversible routing actions.</p>
                <button className="w-full text-left px-3 py-2 bg-white text-red-600 text-sm font-medium border border-red-200 rounded-md hover:bg-red-50 transition-colors">
                  Purge Object State
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (eventTarget === 'opers') {
      const isGlobal = baseTarget === 'GLOBAL_NETWORK';
      return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-[#0d1117] text-gray-300 font-mono text-xs pb-14">
          <div className="p-4 border-b border-[#30363d] bg-[#161b22] sticky top-0 flex justify-between items-center z-10">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 text-red-400 font-bold text-sm mb-1">
                <Activity className="w-4 h-4" />
                <span>Operator Event Bus [∆opers]</span>
              </div>
              <span className="text-[10px] text-gray-500">
                {isGlobal ? 'Live monitoring of global network overrides' : `Monitoring subobject overrides for ${baseTarget}`}
              </span>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {isGlobal ? (
              <>
                <div className="flex flex-col sm:flex-row sm:space-x-3 bg-[#161b22] p-2 rounded border border-red-900/50">
                  <div className="flex space-x-2 mb-1 sm:mb-0 sm:w-16 flex-shrink-0">
                    <span className="text-gray-500">[11:42:01]</span>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:space-x-2">
                    <span className="text-red-400 w-24">SYSTEM</span>
                    <span className="text-gray-300">Global operator session instantiated for @jakedot</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-3 bg-[#161b22] p-2 rounded border border-[#30363d]">
                  <div className="flex space-x-2 mb-1 sm:mb-0 sm:w-16 flex-shrink-0">
                    <span className="text-gray-500">[11:42:05]</span>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:space-x-2">
                    <span className="text-blue-400 w-24">@jakedot</span>
                    <span className="text-gray-300">Set object flag +o on $gemini-3.7-flash</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-3 bg-[#161b22] p-2 rounded border border-[#30363d]">
                  <div className="flex space-x-2 mb-1 sm:mb-0 sm:w-16 flex-shrink-0">
                    <span className="text-gray-500">[11:42:12]</span>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:space-x-2">
                    <span className="text-amber-400 w-24">DAEMON</span>
                    <span className="text-gray-300">Recompiling target access matrix...</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-3 bg-[#161b22] p-2 rounded border border-[#30363d]">
                  <div className="flex space-x-2 mb-1 sm:mb-0 sm:w-16 flex-shrink-0">
                    <span className="text-gray-500">[11:42:15]</span>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:space-x-2">
                    <span className="text-red-400 w-24">SYSTEM</span>
                    <span className="text-gray-300">Property §opers successfully mapped to object tree</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row sm:space-x-3 bg-[#161b22] p-2 rounded border border-red-900/50">
                  <div className="flex space-x-2 mb-1 sm:mb-0 sm:w-16 flex-shrink-0">
                    <span className="text-gray-500">[11:45:00]</span>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:space-x-2">
                    <span className="text-purple-400 w-24">DAEMON</span>
                    <span className="text-gray-300">Subobject context attached to {baseTarget}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-3 bg-[#161b22] p-2 rounded border border-[#30363d]">
                  <div className="flex space-x-2 mb-1 sm:mb-0 sm:w-16 flex-shrink-0">
                    <span className="text-gray-500">[11:45:02]</span>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:space-x-2">
                    <span className="text-blue-400 w-24">@jakedot</span>
                    <span className="text-gray-300">Queried access control list for {baseTarget}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }

    // 1. ΔVIEW / RAW / PROPS / DB / WIRE RENDERING
    if (isDeltaView) {
      let debugObj: any = { error: "Unresolvable object" };
      
      if (matchedPrefixDescriptor) {
        debugObj = {
          address: baseTarget,
          prefix_glyph: matchedPrefixDescriptor.prefix,
          object_type: matchedPrefixDescriptor.name,
          category: matchedPrefixDescriptor.category,
          classification: matchedPrefixDescriptor.badge,
          description: matchedPrefixDescriptor.description,
          service_trust: isCapS ? 'TRUSTED_EXTERNAL_SERVICE (+S)' : isSmallS ? 'UNTRUSTED_EXTERNAL_SERVICE (+s)' : 'STANDARD_INTERNAL',
          active_modes: {
            netadmin: isN,
            network_services: isCapN,
            trusted_service: isCapS,
            untrusted_service: isSmallS,
            kernel_mode: isK,
            trace_mode: isT ? true : isExplicitlyOptedOutOfTrace ? 'OPTED_OUT_VIA_NEGATION (-t)' : false,
            voice_mode: isV,
            oper: isO,
            admin: isA,
            muted: isMuted
          },
          modifiers: modifiers
        };
      } else if (isServices || baseTarget.startsWith('&')) {
        debugObj = {
          address: baseTarget,
          type: 'NetworkServicesSubsystem',
          mode: '+N',
          services: ['NickServ', 'ChanServ', 'OperServ', 'BotServ', 'HostServ', 'MemoServ'],
          netadmin_only: isN,
          network_services: isCapN,
          active_modifiers: modifiers,
          status: 'ONLINE',
          daemons_active: 6
        };
      } else if (baseTarget === '#feed') {
        debugObj = rawData;
      } else if (baseTarget === '#channels') {
        debugObj = { available_channels: ['#feed', '#channels', '#network/handshake', '#1/2/3/4', '#dev/frontend/react'] };
      } else if (baseTarget === '#network/handshake') {
        debugObj = { address: baseTarget, type: 'NetworkSimulation', is_running: isSimulating, packet_count: handshakeLogs.length, capture: handshakeLogs };
      } else if (baseTarget === '#users') {
        debugObj = { address: baseTarget, type: 'UserClustersDirectory', entities: ['@user[123]', '@jakedot'] };
      } else if (isBookmarks) {
        debugObj = { address: baseTarget, type: 'BookmarksSubobject', count: bookmarks.length, items: bookmarks };
      } else if (isLike) {
        debugObj = { address: baseTarget, type: 'LikesSubobject', count: likes.length, items: likes };
      } else if (isIgnore) {
        debugObj = { address: baseTarget, type: 'IgnoredSubobject', count: ignored.length, items: ignored };
      } else if (isBan) {
        debugObj = { address: baseTarget, type: 'BannedSubobject', count: banned.length, items: banned };
      } else if (baseTarget.startsWith('@') || baseTarget.startsWith('$@')) {
        const userPosts = posts.filter(p => p.handle === baseTarget);
        debugObj = {
          address: baseTarget,
          type: isPm ? 'PrivateMessageSession' : 'UserIdentity',
          metadata: {
            resolved_posts_count: userPosts.length,
            recent_activity: userPosts,
            ignored_status: ignored.includes(baseTarget),
            banned_status: banned.includes(baseTarget),
            active_modifiers: modifiers
          }
        };
      } else if (baseTarget.startsWith('#') || baseTarget.startsWith('$#')) {
        const pathSegments = baseTarget.slice(1).split('/');
        debugObj = {
          address: baseTarget,
          type: 'HierarchicalChannelGroup',
          metadata: {
            root_group: pathSegments[0],
            depth: pathSegments.length,
            path_segments: pathSegments,
            active_modifiers: modifiers,
            resolved_view: "Generic Hierarchy"
          }
        };
      } else {
        debugObj = { address: baseTarget, status: "404 Object Not Found" };
      }

      const activeTab = deltaViewTab;
      const TargetProps = getObjectProps(baseTarget);
      const TargetSubObjects = getGeneratedSubObjects(baseTarget);

      const isModelTarget = baseTarget.startsWith('$');

      const tabs = [
        { id: 'json', label: 'JSON (+raw)' },
        { id: 'props', label: '§PROPS' },
        { id: 'subobjects', label: '/SUB_OBJECTS' },
        { id: 'db', label: 'DB (+db)' },
        { id: 'diff', label: 'ΔDIFF (+diff)' },
        { id: 'wire', label: 'WIRE (+wire)' }
      ];

      if (isModelTarget) {
        tabs.push({ id: 'prompts', label: 'ΔPROMPTS' });
        tabs.push({ id: 'model', label: 'MODEL_STATE' });
      }

      return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-950 text-slate-200 pb-16 overflow-hidden">
          {/* Top Navbar for Delta View */}
          <div className="flex flex-wrap items-center bg-slate-900 border-b border-slate-800 p-2 gap-2 text-xs font-mono select-none">
            <span className="text-slate-400 font-bold px-2 py-1 bg-slate-950 border border-slate-800 rounded">
              ΔVIEW_MATRIX: <span className="text-blue-400">{baseTarget}</span>
            </span>
            <div className="flex-1"></div>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setDeltaViewTab(tab.id as any);
                  setAddress(`${baseTarget}+${tab.id === 'json' ? 'raw' : tab.id}`);
                }}
                className={`px-3 py-1.5 rounded transition-colors border ${
                  activeTab === tab.id
                    ? 'bg-blue-900/40 text-blue-300 border-blue-800/60 font-bold'
                    : 'bg-slate-800 text-slate-400 border-transparent hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              onClick={() => setAddress(baseTarget)}
              className="px-3 py-1.5 bg-red-950/40 text-red-400 border border-red-900/60 rounded hover:bg-red-900/60 transition-colors ml-2"
              title="Close Matrix View"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Active Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-4 relative">
            {copiedNotification && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1.5 animate-in fade-in slide-in-from-top-4">
                <Check className="w-3.5 h-3.5" />
                <span>{copiedNotification}</span>
              </div>
            )}

            {/* JSON RAW TAB */}
            {activeTab === 'json' && (
              <div className="bg-[#0d1117] rounded-lg border border-[#30363d] p-4 font-mono text-[11px] sm:text-[12px] text-[#7ee787] overflow-x-auto h-full">
                <div className="flex items-center justify-between mb-4 border-b border-[#30363d] pb-2">
                  <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4 text-slate-500" />
                    <span className="uppercase tracking-wider text-slate-400 font-bold">Standard Serialization</span>
                  </div>
                  <button onClick={() => copyToClipboard(JSON.stringify(debugObj, null, 2), 'Copied JSON')} className="text-slate-500 hover:text-slate-300 transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <pre>{JSON.stringify(debugObj, null, 2)}</pre>
              </div>
            )}

            {/* PROPS TAB */}
            {activeTab === 'props' && (
              <div className="space-y-4 font-sans h-full flex flex-col">
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                  <div className="flex items-center space-x-2 text-indigo-400 font-mono text-sm">
                    <Settings className="w-4 h-4" />
                    <span className="font-bold">§PROPS MATRIX</span>
                  </div>
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Filter property key..."
                        value={propsSearchFilter}
                        onChange={(e) => setPropsSearchFilter(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded text-xs px-8 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <button
                      onClick={() => setShowAddPropModal(true)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center justify-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add Prop</span>
                    </button>
                    <button
                      onClick={() => resetObjectProps(baseTarget)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded text-xs font-bold flex items-center justify-center border border-slate-700 hover:border-slate-600"
                      title="Reset to prototype defaults"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-slate-950 border border-slate-800 rounded-lg">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 sticky top-0 z-10 font-mono text-[10px] uppercase">
                      <tr>
                        <th className="px-3 py-2 font-medium">Property Key</th>
                        <th className="px-3 py-2 font-medium">Value</th>
                        <th className="px-3 py-2 font-medium hidden md:table-cell">Type</th>
                        <th className="px-3 py-2 font-medium hidden lg:table-cell">Origin</th>
                        <th className="px-3 py-2 font-medium hidden xl:table-cell">Rule</th>
                        <th className="px-3 py-2 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 font-mono">
                      {TargetProps.filter(p => p.key.toLowerCase().includes(propsSearchFilter.toLowerCase())).length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-3 py-8 text-center text-slate-500 font-sans italic">
                            No properties found.
                          </td>
                        </tr>
                      ) : (
                        TargetProps.filter(p => p.key.toLowerCase().includes(propsSearchFilter.toLowerCase())).map(prop => (
                          <tr key={prop.id} className="hover:bg-slate-900/40 transition-colors group">
                            <td className="px-3 py-2">
                              <span className="text-blue-300">{prop.key}</span>
                              {prop.description && (
                                <span className="block text-[10px] text-slate-500 font-sans mt-0.5">{prop.description}</span>
                              )}
                            </td>
                            <td className="px-3 py-2">
                              {editingPropId === prop.id ? (
                                <div className="flex items-center space-x-1">
                                  <input
                                    type="text"
                                    value={editingPropVal}
                                    onChange={(e) => setEditingPropVal(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        updateObjectProp(baseTarget, prop.id, editingPropVal);
                                        setEditingPropId(null);
                                      } else if (e.key === 'Escape') {
                                        setEditingPropId(null);
                                      }
                                    }}
                                    className="bg-slate-950 border border-blue-500 rounded px-2 py-0.5 text-xs text-blue-200 w-full focus:outline-none"
                                    autoFocus
                                  />
                                  <button onClick={() => { updateObjectProp(baseTarget, prop.id, editingPropVal); setEditingPropId(null); }} className="p-1 text-emerald-400 hover:bg-emerald-900/30 rounded"><Check className="w-3.5 h-3.5" /></button>
                                  <button onClick={() => setEditingPropId(null)} className="p-1 text-slate-400 hover:bg-slate-800 rounded"><X className="w-3.5 h-3.5" /></button>
                                </div>
                              ) : (
                                <div 
                                  className={`truncate max-w-[200px] sm:max-w-[300px] cursor-text ${prop.isReadOnly ? 'text-slate-500 italic' : 'text-emerald-300'}`}
                                  onDoubleClick={() => { if (!prop.isReadOnly) { setEditingPropId(prop.id); setEditingPropVal(String(prop.value)); } }}
                                  title="Double-click to edit (if not read-only)"
                                >
                                  {typeof prop.value === 'object' ? JSON.stringify(prop.value) : String(prop.value)}
                                </div>
                              )}
                            </td>
                            <td className="px-3 py-2 hidden md:table-cell text-slate-400">{prop.type}</td>
                            <td className="px-3 py-2 hidden lg:table-cell">
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                prop.origin === 'PROTOTYPE' ? 'bg-slate-800 text-slate-400 border border-slate-700' :
                                prop.origin === 'OVERRIDDEN' ? 'bg-amber-950 text-amber-400 border border-amber-900' :
                                prop.origin === 'INHERITED' ? 'bg-purple-950 text-purple-400 border border-purple-900' :
                                'bg-blue-950 text-blue-400 border border-blue-900'
                              }`}>
                                {prop.origin}
                              </span>
                            </td>
                            <td className="px-3 py-2 hidden xl:table-cell text-slate-500 text-[10px]">{prop.schemaRule || '-'}</td>
                            <td className="px-3 py-2 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex items-center justify-end space-x-1">
                                {!prop.isReadOnly && (
                                  <button onClick={() => { setEditingPropId(prop.id); setEditingPropVal(String(prop.value)); }} className="p-1 text-blue-400 hover:bg-blue-900/30 rounded" title="Edit Property">
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                {!prop.isReadOnly && (
                                  <button onClick={() => deleteObjectProp(baseTarget, prop.id)} className="p-1 text-red-400 hover:bg-red-900/30 rounded" title="Delete Property">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Add Prop Modal overlay */}
                {showAddPropModal && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
                      <div className="flex items-center justify-between p-3 border-b border-slate-800 bg-slate-800/50">
                        <h3 className="font-bold text-slate-200 text-sm font-mono flex items-center"><Plus className="w-4 h-4 mr-2 text-indigo-400"/> New Dynamic Property</h3>
                        <button onClick={() => setShowAddPropModal(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
                      </div>
                      <div className="p-4 space-y-3 font-sans text-sm">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1 font-bold">Property Key (Namespace)</label>
                          <input type="text" value={newPropKey} onChange={(e) => setNewPropKey(e.target.value)} placeholder="e.g. custom.flag" className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-xs" />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1 font-bold">Data Type</label>
                          <select value={newPropType} onChange={(e) => setNewPropType(e.target.value as any)} className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-xs">
                            <option value="string">String</option>
                            <option value="number">Number</option>
                            <option value="boolean">Boolean</option>
                            <option value="json">JSON Object</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1 font-bold">Value</label>
                          <input type="text" value={newPropVal} onChange={(e) => setNewPropVal(e.target.value)} placeholder="Enter value..." className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-xs" />
                        </div>
                      </div>
                      <div className="p-3 bg-slate-800/50 border-t border-slate-800 flex justify-end space-x-2">
                        <button onClick={() => setShowAddPropModal(false)} className="px-4 py-1.5 text-xs font-bold text-slate-300 hover:bg-slate-800 rounded transition-colors">Cancel</button>
                        <button 
                          onClick={() => {
                            if (newPropKey.trim()) {
                              let finalVal: any = newPropVal;
                              if (newPropType === 'number') finalVal = Number(newPropVal) || 0;
                              if (newPropType === 'boolean') finalVal = newPropVal === 'true' || newPropVal === '1';
                              if (newPropType === 'json') { try { finalVal = JSON.parse(newPropVal); } catch { finalVal = { error: 'invalid json' }; } }
                              
                              addObjectProp(baseTarget, {
                                id: `pr-dyn-${Date.now()}`,
                                key: newPropKey.trim(),
                                value: finalVal,
                                type: newPropType,
                                origin: 'DYNAMIC_DELTA',
                                description: 'User-defined dynamic property',
                                updatedAt: new Date().toLocaleTimeString('en-US', { hour12: false })
                              });
                              setNewPropKey('');
                              setNewPropVal('');
                              setShowAddPropModal(false);
                            }
                          }}
                          className="px-4 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors"
                        >
                          Save Property
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SUBOBJECTS TAB */}
            {activeTab === 'subobjects' && (
              <div className="space-y-4 font-sans h-full flex flex-col">
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                  <div className="flex items-center space-x-2 text-fuchsia-400 font-mono text-sm">
                    <FolderTree className="w-4 h-4" />
                    <span className="font-bold">SUBOBJECT DISCOVERY</span>
                  </div>
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Filter subobjects..."
                        value={subObjectSearchFilter}
                        onChange={(e) => setSubObjectSearchFilter(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded text-xs px-8 py-1.5 text-slate-200 focus:outline-none focus:border-fuchsia-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {TargetSubObjects.filter(s => s.path.toLowerCase().includes(subObjectSearchFilter.toLowerCase()) || s.description.toLowerCase().includes(subObjectSearchFilter.toLowerCase())).length === 0 ? (
                      <div className="col-span-full py-8 text-center text-slate-500 italic">No subobjects discovered for this node.</div>
                    ) : (
                      TargetSubObjects.filter(s => s.path.toLowerCase().includes(subObjectSearchFilter.toLowerCase()) || s.description.toLowerCase().includes(subObjectSearchFilter.toLowerCase())).map((sub, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setAddress(sub.path)}
                          className="bg-slate-900 border border-slate-800 hover:border-fuchsia-700/50 rounded-lg p-3 cursor-pointer transition-colors group flex flex-col h-full"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2 font-mono text-sm font-bold text-slate-200 group-hover:text-fuchsia-300 transition-colors truncate">
                              {sub.type === 'channel' ? <Hash className="w-3.5 h-3.5 text-blue-400 shrink-0" /> :
                               sub.type === 'query_facet' ? <Search className="w-3.5 h-3.5 text-amber-400 shrink-0" /> :
                               sub.type === 'db' ? <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> :
                               <Settings className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                              <span className="truncate">{sub.name}</span>
                            </div>
                            {sub.isEphemeral && (
                              <span className="px-1.5 py-0.5 bg-amber-950/60 text-amber-400 border border-amber-900/60 rounded text-[9px] uppercase font-bold shrink-0">
                                Volatile
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mb-3 flex-1">{sub.description}</p>
                          <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-800/60">
                            <div className="flex items-center space-x-1 font-mono text-[10px] text-slate-500">
                              <Shield className="w-3 h-3" />
                              <span>{sub.inheritedModes}</span>
                            </div>
                            {sub.activeListeners && (
                              <div className="flex items-center space-x-1 font-mono text-[10px] text-emerald-500">
                                <Activity className="w-3 h-3" />
                                <span>{sub.activeListeners} LSN</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* DATABASE TAB (+db) */}
            {activeTab === 'db' && (() => {
              const db = getDatabaseRepresentation(baseTarget);
              return (
                <div className="space-y-4 font-sans h-full flex flex-col">
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    <div className="flex items-center space-x-2 text-emerald-400 font-mono text-sm">
                      <Database className="w-4 h-4" />
                      <span className="font-bold">RELATIONAL DB PROXY</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-4 h-4 text-slate-500" />
                      <span className="text-xs font-mono font-bold text-slate-400">SQL CONSOLE</span>
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={dbSqlQuery}
                        onChange={(e) => setDbSqlQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setDbQueryCustomOutput(executeDbSqlQuery(dbSqlQuery, baseTarget));
                          }
                        }}
                        placeholder="SELECT * FROM IVC_PROPS WHERE is_readonly = 1;"
                        className="flex-1 bg-[#0d1117] border border-[#30363d] rounded px-3 py-2 text-emerald-300 font-mono text-xs focus:outline-none focus:border-emerald-500"
                      />
                      <button 
                        onClick={() => setDbQueryCustomOutput(executeDbSqlQuery(dbSqlQuery, baseTarget))}
                        className="bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2 rounded text-xs font-bold transition-colors font-mono"
                      >
                        EXEC
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-4">
                    {dbQueryCustomOutput && (
                      <div className="bg-slate-950 border border-emerald-900/50 rounded-lg overflow-hidden">
                        <div className="bg-emerald-950/40 border-b border-emerald-900/50 px-3 py-2 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider">QUERY RESULT</span>
                          <button onClick={() => setDbQueryCustomOutput(null)} className="text-slate-500 hover:text-white"><X className="w-3.5 h-3.5"/></button>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left font-mono text-[11px] text-slate-300 whitespace-nowrap">
                            <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-800">
                              <tr>
                                {dbQueryCustomOutput.columns.map((c, i) => <th key={i} className="px-3 py-1.5 font-medium">{c}</th>)}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                              {dbQueryCustomOutput.rows.length === 0 ? (
                                <tr><td colSpan={dbQueryCustomOutput.columns.length} className="px-3 py-4 text-center text-slate-500 italic font-sans">0 rows returned.</td></tr>
                              ) : (
                                dbQueryCustomOutput.rows.map((row, i) => (
                                  <tr key={i} className="hover:bg-slate-900/30">
                                    {row.map((cell, j) => <td key={j} className="px-3 py-1.5">{String(cell)}</td>)}
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      {/* Objects Table */}
                      <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col h-64">
                        <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-between shrink-0">
                          <span className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">Table: IVC_OBJECTS</span>
                          <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">1 Row</span>
                        </div>
                        <div className="overflow-auto flex-1">
                          <table className="w-full text-left font-mono text-[10px] sm:text-[11px] text-slate-300 whitespace-nowrap">
                            <thead className="bg-slate-900/50 text-slate-500">
                              <tr><th className="px-3 py-1.5 font-medium">id (PK)</th><th className="px-3 py-1.5 font-medium">object_type</th><th className="px-3 py-1.5 font-medium">status</th></tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                              <tr className="hover:bg-slate-900/30">
                                <td className="px-3 py-1.5 text-blue-300">{db.objectsTableRow.id}</td>
                                <td className="px-3 py-1.5">{db.objectsTableRow.object_type}</td>
                                <td className="px-3 py-1.5 text-emerald-400">{db.objectsTableRow.status}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Props Table */}
                      <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col h-64">
                        <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-between shrink-0">
                          <span className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">Table: IVC_PROPS</span>
                          <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">{db.propsTableRows.length} Rows</span>
                        </div>
                        <div className="overflow-auto flex-1">
                          <table className="w-full text-left font-mono text-[10px] sm:text-[11px] text-slate-300 whitespace-nowrap">
                            <thead className="bg-slate-900/50 text-slate-500">
                              <tr><th className="px-3 py-1.5 font-medium">prop_key</th><th className="px-3 py-1.5 font-medium">prop_val</th><th className="px-3 py-1.5 font-medium">origin</th></tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                              {db.propsTableRows.map(r => (
                                <tr key={r.id} className="hover:bg-slate-900/30">
                                  <td className="px-3 py-1.5 text-indigo-300">{r.prop_key}</td>
                                  <td className="px-3 py-1.5 truncate max-w-[150px]">{r.prop_val}</td>
                                  <td className="px-3 py-1.5 text-slate-500">{r.origin}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Modes Ledger */}
                      <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col h-64">
                        <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-between shrink-0">
                          <span className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">Table: IVC_MODES_LEDGER</span>
                          <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">{db.modesTableRows.length} Rows</span>
                        </div>
                        <div className="overflow-auto flex-1">
                          <table className="w-full text-left font-mono text-[10px] sm:text-[11px] text-slate-300 whitespace-nowrap">
                            <thead className="bg-slate-900/50 text-slate-500">
                              <tr><th className="px-3 py-1.5 font-medium">mode_char</th><th className="px-3 py-1.5 font-medium">granted_by</th><th className="px-3 py-1.5 font-medium">scope</th></tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                              {db.modesTableRows.map(r => (
                                <tr key={r.id} className="hover:bg-slate-900/30">
                                  <td className="px-3 py-1.5 font-bold text-amber-400">{r.mode_char}</td>
                                  <td className="px-3 py-1.5 text-slate-400">{r.granted_by}</td>
                                  <td className="px-3 py-1.5">{r.scope}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* SubObjects Table */}
                      <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col h-64">
                        <div className="bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-between shrink-0">
                          <span className="text-[10px] font-mono text-slate-400 font-bold tracking-wider uppercase">Table: IVC_SUB_OBJECTS</span>
                          <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">{db.subObjectsTableRows.length} Rows</span>
                        </div>
                        <div className="overflow-auto flex-1">
                          <table className="w-full text-left font-mono text-[10px] sm:text-[11px] text-slate-300 whitespace-nowrap">
                            <thead className="bg-slate-900/50 text-slate-500">
                              <tr><th className="px-3 py-1.5 font-medium">sub_path</th><th className="px-3 py-1.5 font-medium">sub_type</th><th className="px-3 py-1.5 font-medium">is_ephemeral</th></tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                              {db.subObjectsTableRows.map(r => (
                                <tr key={r.id} className="hover:bg-slate-900/30">
                                  <td className="px-3 py-1.5 text-fuchsia-300">{r.sub_path}</td>
                                  <td className="px-3 py-1.5">{r.sub_type}</td>
                                  <td className="px-3 py-1.5">{r.is_ephemeral ? '1' : '0'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* WIRE TAB */}
            {activeTab === 'wire' && (() => {
              const wire = getRawWireRepresentation(baseTarget);
              return (
                <div className="space-y-4 font-mono h-full flex flex-col">
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-[#070b12] p-3 rounded-lg border border-[#30363d]">
                    <div className="flex items-center space-x-2 text-slate-300 font-bold text-sm uppercase tracking-wider">
                      <Cpu className="w-4 h-4 text-blue-500" />
                      <span>Socket Stream Buffer (IRQ 33)</span>
                    </div>
                    <div className="flex items-center space-x-3 text-[10px] text-slate-500">
                      <span className="flex items-center"><Shield className="w-3 h-3 mr-1 text-emerald-500"/> {wire.cipher}</span>
                      <span className="flex items-center"><Activity className="w-3 h-3 mr-1 text-amber-500"/> {wire.byteLength} BYTES</span>
                      <span className="font-bold border border-slate-700 px-1.5 py-0.5 rounded">SEQ: {wire.sequenceId}</span>
                    </div>
                  </div>

                  <div className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-b border-[#30363d] shrink-0">
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">RAW ASCII / UTF-8</span>
                      <button onClick={() => copyToClipboard(wire.rawString, 'Copied Wire Frames')} className="text-slate-400 hover:text-slate-200">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-4 overflow-y-auto flex-1 text-[11px] sm:text-[12px] leading-relaxed select-text space-y-1">
                      {wire.frameLines.map((line, i) => {
                        const isCmd = line.startsWith('MODE') || line.startsWith('JOIN') || line.startsWith('§PROP');
                        const isServer = line.startsWith(':');
                        return (
                          <div key={i} className="flex font-mono">
                            <span className="text-slate-600 mr-4 select-none border-r border-slate-800 pr-2 w-8 text-right shrink-0">{i.toString().padStart(2, '0')}</span>
                            <span className={`break-all ${isCmd ? 'text-amber-400 font-bold' : isServer ? 'text-slate-300' : 'text-blue-300'}`}>
                              {line}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="px-3 py-1.5 bg-slate-900 border-t border-slate-800 flex justify-between items-center shrink-0">
                      <span className="text-[10px] text-slate-500 font-bold">CRC-32: <span className="text-slate-400">{wire.crc32}</span></span>
                      <span className="text-[10px] text-emerald-500 font-bold animate-pulse flex items-center"><Activity className="w-3 h-3 mr-1"/> SOCKET_ESTABLISHED</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* DIFF TAB */}
            {activeTab === 'diff' && (
              <div className="space-y-4 font-mono h-full flex flex-col">
                 <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-[#1e1e1e] p-3 rounded-lg border border-slate-800">
                  <div className="flex items-center space-x-2 text-slate-300 font-bold text-sm uppercase tracking-wider">
                    <FileDiff className="w-4 h-4 text-orange-500" />
                    <span>PROTOTYPE ΔDIFF</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Comparing <span className="text-emerald-400 font-bold ml-1">Current State</span> vs <span className="text-red-400 font-bold ml-1">Prototype Baseline</span>
                  </div>
                </div>
                <div className="flex-1 bg-[#1e1e1e] border border-slate-800 rounded-lg p-4 overflow-y-auto text-xs sm:text-sm">
                  <div className="text-slate-400 mb-2 italic">// Generated Diff Map for {baseTarget}</div>
                  <div className="text-red-400">- base_prototype_version: "1.0.0"</div>
                  <div className="text-emerald-400">+ current_object_version: "2.4.1"</div>
                  <div className="text-slate-500 py-1">@@ -15,4 +15,7 @@</div>
                  <div className="text-slate-300">  metadata: {"{"}</div>
                  <div className="text-red-400">-   active_listeners: 0,</div>
                  <div className="text-emerald-400">+   active_listeners: 1,</div>
                  <div className="text-red-400">-   state: "INITIALIZING"</div>
                  <div className="text-emerald-400">+   state: "READY_ACTIVE",</div>
                  <div className="text-emerald-400">+   last_modified: "{new Date().toISOString()}"</div>
                  <div className="text-slate-300">  {"}"}</div>
                  <div className="text-slate-500 py-1">@@ -28,2 +31,4 @@</div>
                  <div className="text-slate-300">  active_modes: {"{"}</div>
                  <div className="text-red-400">-   kernel_mode: false,</div>
                  <div className="text-emerald-400">+   kernel_mode: {isK ? 'true' : 'false'},</div>
                  <div className="text-emerald-400">+   trusted_service: {isCapS ? 'true' : 'false'},</div>
                  <div className="text-slate-300">  {"}"}</div>
                </div>
              </div>
            )}

            {/* PROMPTS TAB */}
            {activeTab === 'prompts' && isModelTarget && (
              <div className="space-y-4 font-sans h-full flex flex-col">
                 <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-purple-950/20 p-3 rounded-lg border border-purple-900/50">
                  <div className="flex items-center space-x-2 text-purple-400 font-mono text-sm">
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-bold">SYSTEM PROMPTS & INSTRUCTIONS</span>
                  </div>
                </div>
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2 font-mono">Core System Prompt</div>
                      <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">You are a helpful, harmless, and honest AI assistant. You operate within the IVC protocol framework.</pre>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2 font-mono">Safety Policy (Override)</div>
                      <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">BLOCK_HATE_SPEECH=HIGH
BLOCK_DANGEROUS_CONTENT=HIGH
BLOCK_HARASSMENT=HIGH
BLOCK_SEXUALLY_EXPLICIT=HIGH</pre>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODEL STATE TAB */}
            {activeTab === 'model' && isModelTarget && (
              <div className="space-y-4 font-sans h-full flex flex-col">
                 <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-blue-950/20 p-3 rounded-lg border border-blue-900/50">
                  <div className="flex items-center space-x-2 text-blue-400 font-mono text-sm">
                    <Cpu className="w-4 h-4" />
                    <span className="font-bold">MODEL STATE & HYPERPARAMETERS</span>
                  </div>
                </div>
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-4 overflow-y-auto">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm">
                        <div className="text-slate-500 mb-2">Temperature</div>
                        <div className="text-emerald-400">0.7</div>
                     </div>
                     <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm">
                        <div className="text-slate-500 mb-2">Top P</div>
                        <div className="text-emerald-400">0.95</div>
                     </div>
                     <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm">
                        <div className="text-slate-500 mb-2">Top K</div>
                        <div className="text-emerald-400">40</div>
                     </div>
                     <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm">
                        <div className="text-slate-500 mb-2">Max Output Tokens</div>
                        <div className="text-emerald-400">8192</div>
                     </div>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // 2. KERNEL-MODE DIAGNOSTIC VISUALIZATION (+k)
    if (isK && !isRaw) {
      const defaultKernelLogs = [
        `[  0.000000] Linux ivc-vkernel 6.12.9-ivc #1 SMP PREEMPT_DYNAMIC Wed Aug 19 12:30:00 UTC 2026`,
        `[  0.000142] Command line: BOOT_IMAGE=/vmlinuz-6.12.9 root=UUID=ivc-root ro quiet mode=+k ring=0`,
        `[  0.002819] Memory: 16384K/65536K available (kernel code 2048K, rwdata 1024K, bss 512K)`,
        `[  0.004910] smpboot: CPU0: x86_64 Virtual Micro-Architecture (Core Ring-0 active)`,
        `[  0.012401] ivc_bus: probing node interface for target [${baseTarget}]`,
        `[  0.015890] ivc_bus: Ring-0 memory sandbox mapped at 0xffff888002a40000 (PML4: 0x10482b000)`,
        `[  0.018210] sys_diag: attached low-level kernel probe to address [${baseTarget}]`,
        `[  0.021000] kworker/0:1: dispatch loop online (latency 0.04ms)`
      ];

      return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-[#070b12] text-amber-400 font-mono text-xs pb-14 p-4 overflow-y-auto select-text">
          {/* Kernel Header Banner */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-amber-900/60 pb-3 gap-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded bg-amber-950/80 border border-amber-800/80 flex items-center justify-center text-amber-300">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-amber-300 text-sm tracking-wide">KERNEL DIAGNOSTICS [+k]</span>
                  <span className="px-1.5 py-0.2 text-[9px] bg-amber-950 text-amber-400 border border-amber-800 rounded font-bold">RING-0</span>
                </div>
                <p className="text-[10px] text-amber-600 font-mono">NODE_BIND: {baseTarget} · ARCH: x86_64-ivc-vkernel</p>
              </div>
            </div>
            <div className="flex items-center space-x-1.5 text-[10px]">
              <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 rounded flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
                KERNEL_OK
              </span>
              <button 
                onClick={() => setAddress(baseTarget + '+raw')}
                className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded transition-colors"
              >
                +raw
              </button>
            </div>
          </div>

          {/* Diagnostic Subsystem Tabs */}
          <div className="flex space-x-1 border-b border-amber-950/80 mb-3 text-[11px] overflow-x-auto">
            {[
              { id: 'dmesg', label: 'Ring Buffer (dmesg)', icon: Terminal },
              { id: 'memory', label: 'Page Tables & Heap', icon: Layers },
              { id: 'registers', label: 'CPU Registers', icon: Cpu },
              { id: 'traps', label: 'Syscall Traps & IRQs', icon: Activity },
              { id: 'trace', label: 'Trace & State History (+t)', icon: Radio }
            ].map(tab => {
              const Icon = tab.icon;
              const active = kernelTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setKernelTab(tab.id as any)}
                  className={`px-2.5 py-1.5 rounded-t font-semibold flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
                    active 
                      ? 'bg-amber-950/60 text-amber-200 border-t border-x border-amber-800/80' 
                      : 'text-amber-700 hover:text-amber-400 hover:bg-amber-950/20'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: dmesg Ring Buffer */}
          {kernelTab === 'dmesg' && (
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between text-[10px] text-amber-600 bg-amber-950/30 px-2 py-1 rounded border border-amber-900/30">
                <span>CIRCULAR LOG BUFFER: RING-0 (CAPACITY: 64 KB)</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      const newLog = `[ ${(Math.random() * 10).toFixed(6)}] ivc_kprobe: manual probe trigger on ${baseTarget} [cpu=0, rflags=0x246, cr3=0x10482b000]`;
                      setKernelLogs(prev => [...prev, newLog]);
                    }}
                    className="text-amber-400 hover:text-amber-200 underline font-bold"
                  >
                    + Probe Log
                  </button>
                  <button 
                    onClick={() => setKernelLogs([])}
                    className="text-amber-600 hover:text-amber-400 underline"
                  >
                    Clear Custom
                  </button>
                </div>
              </div>

              <div className="bg-[#03060a] border border-amber-950 rounded p-3 text-[11px] font-mono leading-relaxed space-y-1.5 overflow-x-auto">
                {defaultKernelLogs.concat(kernelLogs).map((log, idx) => (
                  <div key={idx} className="flex space-x-2">
                    <span className="text-amber-700 select-none flex-shrink-0">{log.slice(0, 14)}</span>
                    <span className={log.includes('ivc') || log.includes('target') ? 'text-amber-300 font-semibold' : 'text-amber-500/90'}>
                      {log.slice(14)}
                    </span>
                  </div>
                ))}
                <div className="flex items-center space-x-1.5 pt-1 text-amber-500">
                  <span className="w-1.5 h-3.5 bg-amber-400 animate-pulse"></span>
                  <span className="text-[10px] text-amber-700">klogd listening for interrupts...</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Memory & Page Tables */}
          {kernelTab === 'memory' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-[#03060a] p-2.5 rounded border border-amber-950 space-y-1">
                  <span className="text-amber-700 block">VIRTUAL ADDRESS RANGE (RING-0)</span>
                  <span className="text-amber-300 font-bold text-[11px] truncate block">0xFFFF800000000000 - 0xFFFFFFFFFFFFFFFF</span>
                  <span className="text-amber-600 block">Canonical High-Half Mapping: ENFORCED</span>
                </div>
                <div className="bg-[#03060a] p-2.5 rounded border border-amber-950 space-y-1">
                  <span className="text-amber-700 block">SLUB ALLOCATOR HEAP</span>
                  <span className="text-amber-300 font-bold text-[11px] block">kmalloc-512 (Active)</span>
                  <span className="text-amber-600 block">Fragmentation Envelope: &lt; 1.2%</span>
                </div>
              </div>

              <div className="bg-[#03060a] p-3 rounded border border-amber-950 space-y-2">
                <span className="text-xs font-bold text-amber-300 block">4-Level Page Table Isolation (PTI)</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                  <div className="bg-amber-950/20 p-2 rounded border border-amber-900/40">
                    <span className="text-amber-600 block">PML4 BASE (CR3)</span>
                    <span className="text-amber-300 font-mono">0x000000010482B000</span>
                  </div>
                  <div className="bg-amber-950/20 p-2 rounded border border-amber-900/40">
                    <span className="text-amber-600 block">PDP TABLE</span>
                    <span className="text-amber-300 font-mono">0x000000010482C000</span>
                  </div>
                  <div className="bg-amber-950/20 p-2 rounded border border-amber-900/40">
                    <span className="text-amber-600 block">PAGE DIRECTORY</span>
                    <span className="text-amber-300 font-mono">0x000000010482D000</span>
                  </div>
                  <div className="bg-amber-950/20 p-2 rounded border border-amber-900/40">
                    <span className="text-amber-600 block">PAGE TABLE</span>
                    <span className="text-amber-300 font-mono">0x000000010482E000</span>
                  </div>
                </div>
                <p className="text-[10px] text-amber-600 pt-1">
                  Target <span className="text-amber-400 font-bold">{baseTarget}</span> mapped in kernel sandbox buffer at <span className="text-amber-300 font-mono">0xFFFF888002A40000</span> (Flags: PRESENT | WRITABLE | NO_EXECUTE_USER).
                </p>
              </div>

              {/* Memory Hex Viewer Sample */}
              <div className="bg-[#03060a] p-3 rounded border border-amber-950 space-y-1.5">
                <span className="text-[11px] font-bold text-amber-300 block">Kernel Page Hex Dump [0xFFFF888002A40000]</span>
                <div className="text-[10px] font-mono text-amber-500/80 leading-relaxed overflow-x-auto">
                  <p>00000000: 49 56 43 5f 4b 45 52 4e  45 4c 5f 53 54 41 43 4b  IVC_KERNEL_STACK</p>
                  <p>00000010: 7f 45 4c 46 02 01 01 00  00 00 00 00 00 00 00 00  .ELF............</p>
                  <p>00000020: 02 00 3e 00 01 00 00 00  20 b9 0c 81 ff ff ff ff  ..&gt;..... .......</p>
                  <p>00000030: 40 00 00 00 00 00 00 00  00 10 00 00 00 00 00 00  @...............</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: CPU Registers */}
          {kernelTab === 'registers' && (
            <div className="space-y-3">
              <div className="bg-[#03060a] p-3 rounded border border-amber-950 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300 border-b border-amber-950 pb-1.5">
                  <span>General Purpose &amp; Control Registers (Thread 0)</span>
                  <span className="text-[10px] text-amber-600 font-mono">CPL=0 (RING-0)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                  {[
                    { reg: 'RIP', val: '0xffffffff810cb920', desc: 'Instruction Ptr' },
                    { reg: 'RSP', val: '0xffffc900001b3f58', desc: 'Kernel Stack' },
                    { reg: 'RFLAGS', val: '0x0000000000000246', desc: 'Flags (IF|PF|ZF)' },
                    { reg: 'RAX', val: '0x0000000000000000', desc: 'Syscall Return' },
                    { reg: 'RDI', val: '0x0000000000000001', desc: 'Arg 1 (Target fd)' },
                    { reg: 'RSI', val: '0xffff888002a40000', desc: 'Arg 2 (Buffer)' },
                    { reg: 'CR0', val: '0x0000000080050033', desc: 'Paging | Protect' },
                    { reg: 'CR3', val: '0x000000010482b000', desc: 'Page Directory Base' },
                    { reg: 'CR4', val: '0x0000000000370ef0', desc: 'SMEP | SMAP | FSGS' },
                  ].map(item => (
                    <div key={item.reg} className="bg-amber-950/20 p-2 rounded border border-amber-900/40">
                      <div className="flex justify-between items-center">
                        <span className="text-amber-400 font-bold">{item.reg}</span>
                        <span className="text-[9px] text-amber-600">{item.desc}</span>
                      </div>
                      <span className="text-amber-200 text-[10px] block mt-1 truncate">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Syscall Traps & IRQ */}
          {kernelTab === 'traps' && (
            <div className="space-y-3">
              <div className="bg-[#03060a] p-3 rounded border border-amber-950 space-y-2">
                <span className="text-xs font-bold text-amber-300 block">Syscall Dispatch Table</span>
                <div className="space-y-1 text-[10px]">
                  {[
                    { nr: '0x000', call: 'sys_read', args: '(fd=0, buf=0xffff8880, len=4096)', res: 'SUCCESS (4096)' },
                    { nr: '0x001', call: 'sys_write', args: '(fd=1, buf=0xffff8880, len=128)', res: 'SUCCESS (128)' },
                    { nr: '0x14e', call: 'sys_ivc_bind', args: `(target="${baseTarget}", flags=0x2)`, res: 'SUCCESS (0)' },
                    { nr: '0x14f', call: 'sys_ivc_kprobe', args: '(probe_id=33, ring=0)', res: 'ACTIVE' },
                  ].map((sc, i) => (
                    <div key={i} className="flex items-center justify-between p-1.5 rounded bg-amber-950/15 border border-amber-900/30">
                      <div className="flex items-center space-x-2">
                        <span className="text-amber-600 font-mono">{sc.nr}</span>
                        <span className="text-amber-300 font-bold">{sc.call}</span>
                        <span className="text-amber-500 truncate">{sc.args}</span>
                      </div>
                      <span className="text-emerald-400 font-bold flex-shrink-0">{sc.res}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#03060a] p-3 rounded border border-amber-950 space-y-2">
                <span className="text-xs font-bold text-amber-300 block">Interrupt Vector Table (IVT)</span>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 rounded bg-amber-950/20 border border-amber-900/40">
                    <span className="text-amber-400 font-bold">IRQ 0 · PIT Timer</span>
                    <span className="text-amber-600 block text-[9px]">Freq: 1000 Hz · Jiffies: 184920</span>
                  </div>
                  <div className="p-2 rounded bg-amber-950/20 border border-amber-900/40">
                    <span className="text-amber-400 font-bold">IRQ 33 · IVC Packet Bus</span>
                    <span className="text-emerald-400 block text-[9px]">Status: STREAMING · Packets: {handshakeLogs.length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Trace & State History */}
          {kernelTab === 'trace' && (
            <div className="space-y-3">
              <div className="bg-[#03060a] p-3 rounded border border-amber-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center space-x-1.5">
                    <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>Real-Time Trace Telemetry (State &amp; Message History)</span>
                  </span>
                  <span className="text-[10px] text-amber-600 font-mono">BIND: {baseTarget}</span>
                </div>
                <div className="space-y-1.5 text-[10px]">
                  {[
                    { ts: '12:34:00.120', type: 'STATE', desc: `Target [${baseTarget}] bound to Kernel Ring-0 subsystem.` },
                    { ts: '12:34:00.410', type: 'PERM', desc: `Voice permission: ${isV ? '+v ACTIVE (Override)' : 'Standard'}. Mute state: ${isMuted ? '+m MUTED' : 'UNMUTED'}.` },
                    { ts: '12:34:01.002', type: 'MSG', desc: `Kernel message dispatcher ready on IRQ 33.` },
                  ].map((tr, idx) => (
                    <div key={idx} className="p-2 rounded bg-amber-950/15 border border-amber-900/30 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-amber-600 font-mono">{tr.ts}</span>
                        <span className="px-1.5 py-0.2 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded font-bold">{tr.type}</span>
                        <span className="text-amber-200">{tr.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Kernel Control Actions */}
          <div className="mt-4 pt-3 border-t border-amber-950/80 flex flex-wrap gap-2">
            <button
              onClick={() => {
                const newLog = `[ ${(Math.random() * 10).toFixed(6)}] tlb_flush: invalidated 4096 pages on CR3:0x10482b000`;
                setKernelLogs(prev => [...prev, newLog]);
              }}
              className="px-2.5 py-1.5 rounded bg-amber-950/50 hover:bg-amber-900/60 border border-amber-800 text-amber-200 text-[10px] font-bold transition-colors"
            >
              Flush TLB Cache
            </button>
            <button
              onClick={() => {
                const newLog = `[ ${(Math.random() * 10).toFixed(6)}] irq_dispatch: IRQ 33 interrupt triggered on node [${baseTarget}]`;
                setKernelLogs(prev => [...prev, newLog]);
              }}
              className="px-2.5 py-1.5 rounded bg-amber-950/50 hover:bg-amber-900/60 border border-amber-800 text-amber-200 text-[10px] font-bold transition-colors"
            >
              Dispatch IRQ 33
            </button>
            <button
              onClick={() => setAddress(baseTarget)}
              className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold transition-colors"
            >
              Exit Kernel Mode (-k)
            </button>
          </div>
        </div>
      );
    }

    // 3. TRACE-MODE REAL-TIME EVENT LOGS & STATE TRANSITION HISTORY (+t)
    if (isT && !isRaw) {
      const defaultTraceEvents: TraceEvent[] = [
        {
          id: 'tr-01',
          timestamp: '12:34:01.102',
          type: 'STATE_TRANSITION',
          target: baseTarget,
          source: 'KERNEL_DISPATCH',
          stateFrom: 'UNINITIALIZED',
          stateTo: 'CONTEXT_RESOLVING',
          details: `Dispatched address resolution hook for object ${baseTarget}`
        },
        {
          id: 'tr-02',
          timestamp: '12:34:01.215',
          type: 'MODE_CHANGE',
          target: baseTarget,
          source: 'PARSER_ENGINE',
          details: `Active modifiers evaluated: [${modifiers.join(', ') || 'default'}]. Modes: isN=${isN}, isCapN=${isCapN}, isCapS=${isCapS}, isSmallS=${isSmallS}, isK=${isK}, isT=${isT}, isV=${isV}, isM=${isMuted}`
        },
        {
          id: 'tr-03',
          timestamp: '12:34:01.340',
          type: 'PERMISSION_GRANT',
          target: baseTarget,
          source: 'ACL_SUBSYSTEM',
          details: isV ? `Voice permission granted (+v) - broadcast & override enabled` : isMuted ? `Channel muted (+m) - speech restricted to +v / +o` : `Standard transmission permissions verified`
        },
        {
          id: 'tr-04',
          timestamp: '12:34:01.488',
          type: 'PACKET_INTERCONNECT',
          target: baseTarget,
          source: 'IVC_BUS_SOCKET',
          details: `Bound packet interconnect buffer on IRQ 33. MTU 1500, checksum OK.`
        },
        {
          id: 'tr-05',
          timestamp: '12:34:01.620',
          type: 'STATE_TRANSITION',
          target: baseTarget,
          source: 'LIFECYCLE_MGR',
          stateFrom: 'CONTEXT_RESOLVING',
          stateTo: 'READY_ACTIVE',
          details: `Object state transition committed. Real-time telemetry listener attached to ${baseTarget}`
        }
      ];

      const allEvents = [...defaultTraceEvents, ...customTraceLogs];
      const filteredEvents = allEvents.filter(ev => {
        if (traceFilter === 'ALL') return true;
        if (traceFilter === 'STATE') return ev.type === 'STATE_TRANSITION';
        if (traceFilter === 'MSG') return ev.type === 'MSG_DISPATCH';
        if (traceFilter === 'PERM') return ev.type === 'PERMISSION_GRANT' || ev.type === 'MODE_CHANGE';
        if (traceFilter === 'PKT') return ev.type === 'PACKET_INTERCONNECT';
        return true;
      });

      return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-[#070d14] text-cyan-300 font-mono text-xs pb-14 p-4 overflow-y-auto select-text">
          {/* Header Banner */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-cyan-900/60 pb-3 gap-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded bg-cyan-950 border border-cyan-700/80 flex items-center justify-center text-cyan-300">
                <Radio className="w-4 h-4 animate-pulse text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-cyan-200 text-sm tracking-wide">TRACE DIAGNOSTICS [+t]</span>
                  <span className="px-1.5 py-0.2 text-[9px] bg-cyan-950 text-cyan-400 border border-cyan-800 rounded font-bold">REALTIME EVENT STREAM</span>
                </div>
                <p className="text-[10px] text-cyan-600 font-mono">OBJECT_TARGET: {baseTarget} · STATE: READY_ACTIVE · LISTENERS: 1</p>
              </div>
            </div>
            <div className="flex items-center space-x-1.5 text-[10px]">
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
                TRACE_CAPTURING
              </span>
              <button 
                onClick={() => setAddress(baseTarget + '+raw')}
                className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded transition-colors"
              >
                +raw
              </button>
            </div>
          </div>

          {/* Quick Metrics & State Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-[10px]">
            <div className="bg-cyan-950/30 p-2 rounded border border-cyan-900/40">
              <span className="text-cyan-600 block">CURRENT OBJECT STATE</span>
              <span className="text-cyan-200 font-bold text-xs">READY_ACTIVE</span>
            </div>
            <div className="bg-cyan-950/30 p-2 rounded border border-cyan-900/40">
              <span className="text-cyan-600 block">TOTAL LOGGED EVENTS</span>
              <span className="text-cyan-200 font-bold text-xs">{allEvents.length} Events</span>
            </div>
            <div className="bg-cyan-950/30 p-2 rounded border border-cyan-900/40">
              <span className="text-cyan-600 block">VOICE PERMISSION</span>
              <span className={`font-bold text-xs ${isV ? 'text-emerald-400' : 'text-slate-400'}`}>{isV ? 'VOICED (+v)' : 'STANDARD'}</span>
            </div>
            <div className="bg-cyan-950/30 p-2 rounded border border-cyan-900/40">
              <span className="text-cyan-600 block">AVG TRACE LATENCY</span>
              <span className="text-cyan-200 font-bold text-xs">0.08ms</span>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center space-x-1.5 mb-3 overflow-x-auto text-[11px]">
            {[
              { id: 'ALL', label: `All Events (${allEvents.length})` },
              { id: 'STATE', label: 'State Transitions' },
              { id: 'MSG', label: 'Messages & Payload' },
              { id: 'PERM', label: 'Modes & Permissions' },
              { id: 'PKT', label: 'Bus Packets' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setTraceFilter(f.id as any)}
                className={`px-2.5 py-1 rounded text-xs whitespace-nowrap transition-colors border ${
                  traceFilter === f.id
                    ? 'bg-cyan-900/80 text-cyan-100 border-cyan-600 font-bold'
                    : 'bg-cyan-950/20 text-cyan-500 border-cyan-900/40 hover:bg-cyan-900/40 hover:text-cyan-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Real-time Event Log List */}
          <div className="flex-1 space-y-2 bg-[#03060a] p-3 rounded border border-cyan-950 overflow-y-auto">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-6 text-cyan-700">No events matching selected filter.</div>
            ) : (
              filteredEvents.map(ev => {
                let badgeColor = 'bg-cyan-950 text-cyan-300 border-cyan-800';
                if (ev.type === 'STATE_TRANSITION') badgeColor = 'bg-indigo-950 text-indigo-300 border-indigo-800';
                else if (ev.type === 'MSG_DISPATCH') badgeColor = 'bg-blue-950 text-blue-300 border-blue-800';
                else if (ev.type === 'PERMISSION_GRANT') badgeColor = 'bg-emerald-950 text-emerald-300 border-emerald-800';
                else if (ev.type === 'MODE_CHANGE') badgeColor = 'bg-amber-950 text-amber-300 border-amber-800';
                else if (ev.type === 'PACKET_INTERCONNECT') badgeColor = 'bg-purple-950 text-purple-300 border-purple-800';

                return (
                  <div key={ev.id} className="p-2.5 rounded bg-cyan-950/15 border border-cyan-900/30 hover:border-cyan-700/50 transition-colors space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-cyan-600">{ev.timestamp}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border uppercase ${badgeColor}`}>
                          {ev.type.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-cyan-400 font-bold">src:{ev.source}</span>
                      </div>
                      <span className="text-[9px] text-cyan-700 font-mono">{ev.id}</span>
                    </div>

                    {ev.stateFrom && ev.stateTo && (
                      <div className="flex items-center space-x-1.5 text-[10px] text-indigo-300 bg-indigo-950/30 px-2 py-0.5 rounded border border-indigo-900/40">
                        <span className="text-indigo-400">{ev.stateFrom}</span>
                        <span className="text-indigo-600 font-bold">&rarr;</span>
                        <span className="text-emerald-300 font-bold">{ev.stateTo}</span>
                      </div>
                    )}

                    <p className="text-[11px] text-cyan-200/90 leading-relaxed pl-0.5">{ev.details}</p>
                  </div>
                );
              })
            )}
          </div>

          {/* Interactive Simulation Controls */}
          <div className="mt-3 pt-2.5 border-t border-cyan-950 flex flex-wrap gap-2">
            <button
              onClick={() => {
                const now = new Date();
                const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
                const newEv: TraceEvent = {
                  id: `tr-${Date.now().toString().slice(-4)}`,
                  timestamp: timeStr,
                  type: 'STATE_TRANSITION',
                  target: baseTarget,
                  source: 'SIMULATOR',
                  stateFrom: 'READY_ACTIVE',
                  stateTo: 'DISPATCHING_PAYLOAD',
                  details: `State transition fired on object ${baseTarget} [trigger=user_manual_probe]`
                };
                setCustomTraceLogs(prev => [...prev, newEv]);
              }}
              className="px-2.5 py-1.5 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-200 text-[10px] font-bold transition-colors"
            >
              + Simulate State Transition
            </button>
            <button
              onClick={() => {
                const now = new Date();
                const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
                const newEv: TraceEvent = {
                  id: `tr-${Date.now().toString().slice(-4)}`,
                  timestamp: timeStr,
                  type: 'MSG_DISPATCH',
                  target: baseTarget,
                  source: '@user[123]',
                  details: `Message packet transmitted to ${baseTarget} (payload: 128 bytes, seq: ${customTraceLogs.length + 1})`
                };
                setCustomTraceLogs(prev => [...prev, newEv]);
              }}
              className="px-2.5 py-1.5 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-200 text-[10px] font-bold transition-colors"
            >
              + Emit Message Packet Trace
            </button>
            <button
              onClick={() => {
                const now = new Date();
                const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
                const newEv: TraceEvent = {
                  id: `tr-${Date.now().toString().slice(-4)}`,
                  timestamp: timeStr,
                  type: 'PERMISSION_GRANT',
                  target: baseTarget,
                  source: 'MODE_CONTROLLER',
                  details: `Voice permission override event logged (+v status toggled)`
                };
                setCustomTraceLogs(prev => [...prev, newEv]);
              }}
              className="px-2.5 py-1.5 rounded bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-200 text-[10px] font-bold transition-colors"
            >
              + Log Voice Permission Event
            </button>
            <button
              onClick={() => setCustomTraceLogs([])}
              className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-bold transition-colors"
            >
              Clear Custom Logs
            </button>
            <button
              onClick={() => setAddress(baseTarget)}
              className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold transition-colors"
            >
              Exit Trace Mode (-t)
            </button>
          </div>
        </div>
      );
    }

    // 3.5. PERSONAL CHANNELS RENDERING (<prefix><object>/#channel)
    if (isPersonalChannel && !isRaw) {
      const postsForThisChannel = personalChannels[baseTarget] || [];
      const currentTopic = personalTopics[baseTarget] || `Personal scoped channel for ${personalOwner}`;
      const isOwnerModel = personalOwner.startsWith('$');
      const isOwnerUser = personalOwner.startsWith('@');
      const isOwnerServices = personalOwner.startsWith('&');
      const isOwnerRoot = personalOwner.startsWith('~');
      const isOwnerSpec = personalOwner.startsWith('§');

      // Find all sibling channels for this owner
      const siblingChannels = Object.keys(personalChannels)
        .filter(k => k.startsWith(`${personalOwner}/#`))
        .map(k => k.replace(`${personalOwner}/#`, '#'));

      // Ensure current slug is in the list
      if (!siblingChannels.includes(personalChannelName)) {
        siblingChannels.push(personalChannelName);
      }

      // Default sibling recommendations if none exist
      if (siblingChannels.length === 1) {
        if (isOwnerUser && !siblingChannels.includes('#notes')) siblingChannels.push('#notes');
        if (isOwnerUser && !siblingChannels.includes('#dev')) siblingChannels.push('#dev');
        if (isOwnerModel && !siblingChannels.includes('#evals')) siblingChannels.push('#evals');
        if (isOwnerModel && !siblingChannels.includes('#prompts')) siblingChannels.push('#prompts');
      }

      const isPrivPersonal = !targetNegated.includes('p');
      const isModPersonal = !targetNegated.includes('m');

      return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-950 text-slate-100 font-sans pb-14 overflow-hidden select-text">
          {/* Top Banner Header */}
          <div className="p-4 border-b border-slate-800 bg-[#090e17] sticky top-0 z-10 flex flex-col space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm ${
                  isOwnerModel ? 'bg-indigo-950/80 border-indigo-700 text-indigo-300' :
                  isOwnerUser ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300' :
                  isOwnerServices ? 'bg-blue-950/80 border-blue-700 text-blue-300' :
                  isOwnerRoot ? 'bg-rose-950/80 border-rose-700 text-rose-300' :
                  isOwnerSpec ? 'bg-amber-950/80 border-amber-700 text-amber-300' :
                  'bg-slate-900 border-slate-700 text-slate-300'
                }`}>
                  {isOwnerModel ? <Sparkles className="w-5 h-5" /> :
                   isOwnerUser ? <User className="w-5 h-5" /> :
                   isOwnerServices ? <Server className="w-5 h-5" /> :
                   isOwnerRoot ? <Shield className="w-5 h-5" /> :
                   isOwnerSpec ? <FileText className="w-5 h-5" /> :
                   <Hash className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                    <span className="font-mono font-bold text-white text-base tracking-tight">{baseTarget}</span>
                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Personal Channel
                    </span>
                    {isPrivPersonal && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-purple-950 text-purple-300 border border-purple-800 flex items-center">
                        <Lock className="w-2.5 h-2.5 mr-0.5" />
                        +p Personal
                      </span>
                    )}
                    {isModPersonal && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-950 text-amber-300 border border-amber-800">
                        +m Moderated
                      </span>
                    )}
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-teal-950 text-teal-300 border border-teal-800">
                      +n+t+s
                    </span>
                    {isV && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center">
                        <Volume2 className="w-2.5 h-2.5 mr-0.5" />
                        +v Voiced
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                    <span>Owner & Founder:</span>
                    <button
                      onClick={() => setAddress(personalOwner)}
                      className="font-mono text-cyan-400 hover:text-cyan-300 hover:underline font-bold"
                    >
                      {personalOwner}
                    </button>
                    <span>·</span>
                    <span className="text-[11px] text-slate-400">{postsForThisChannel.length} recorded items</span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center space-x-1.5 flex-wrap gap-1">
                <button
                  onClick={() => setAddress(`${baseTarget}+Δmodes`)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center space-x-1 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                  <span>Δmodes</span>
                </button>
                <button
                  onClick={() => setAddress(`${baseTarget}+t`)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center space-x-1 transition-colors"
                >
                  <Radio className="w-3.5 h-3.5 text-cyan-400" />
                  <span>+t Trace</span>
                </button>
                <button
                  onClick={() => {
                    const newNegated = targetNegated.includes('v')
                      ? targetNegated.filter(m => m !== 'v')
                      : [...targetNegated, 'v'];
                    setNegatedModes(prev => ({ ...prev, [baseTarget]: newNegated }));
                    logModeChange(baseTarget, isV ? '-v' : '+v', isV ? 'Revoked voice override permission' : 'Granted voice override permission (+v)', '@jakedot');
                  }}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1 transition-colors ${
                    isV
                      ? 'bg-emerald-950 hover:bg-emerald-900 border-emerald-700 text-emerald-300'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isV ? 'Voiced (+v)' : 'Grant +v'}</span>
                </button>
                <button
                  onClick={() => setAddress(`${baseTarget}+raw`)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-mono transition-colors"
                >
                  +raw
                </button>
              </div>
            </div>

            {/* Editable Topic Bar */}
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-lg p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 flex-1 mr-2 overflow-hidden">
                <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
                {editingPersonalTopic ? (
                  <div className="flex items-center space-x-2 flex-1">
                    <input
                      type="text"
                      value={topicDraft}
                      onChange={(e) => setTopicDraft(e.target.value)}
                      placeholder="Set personal channel topic..."
                      className="flex-1 bg-slate-950 border border-cyan-800 text-white rounded px-2 py-1 text-xs outline-none focus:border-cyan-500"
                      autoFocus
                    />
                    <button
                      onClick={savePersonalTopic}
                      className="px-2 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold text-xs"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingPersonalTopic(false)}
                      className="px-2 py-1 bg-slate-800 text-slate-400 hover:text-slate-200 rounded text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <span className="text-slate-300 truncate font-mono">
                    <strong className="text-slate-400 font-sans mr-1.5">Topic:</strong>
                    {currentTopic}
                  </span>
                )}
              </div>
              {!editingPersonalTopic && (
                <button
                  onClick={() => {
                    setTopicDraft(currentTopic);
                    setEditingPersonalTopic(true);
                  }}
                  className="text-slate-400 hover:text-cyan-300 text-[11px] font-medium flex items-center space-x-1 flex-shrink-0"
                >
                  <Edit3 className="w-3 h-3 mr-0.5" />
                  <span>Edit Topic</span>
                </button>
              )}
            </div>

            {/* Personal Sibling Channels Bar */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap mr-1 flex items-center">
                <Folder className="w-3.5 h-3.5 mr-1 text-slate-400" />
                {personalOwner} Channels:
              </span>
              {siblingChannels.map(chName => {
                const isCurrent = chName === personalChannelName;
                const fullSiblingId = `${personalOwner}/${chName}`;
                return (
                  <button
                    key={chName}
                    onClick={() => setAddress(fullSiblingId)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors border whitespace-nowrap ${
                      isCurrent
                        ? 'bg-blue-600/30 text-blue-200 border-blue-500/60 font-bold'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
                    }`}
                  >
                    {chName}
                  </button>
                );
              })}

              {showNewChannelInput ? (
                <form onSubmit={createPersonalChannel} className="flex items-center space-x-1.5">
                  <div className="flex items-center bg-slate-900 border border-blue-500 rounded px-2 py-0.5">
                    <span className="text-slate-400 font-mono text-xs">#</span>
                    <input
                      type="text"
                      value={newChannelInput}
                      onChange={(e) => setNewChannelInput(e.target.value)}
                      placeholder="new-channel"
                      className="bg-transparent text-white text-xs outline-none w-24 font-mono"
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewChannelInput(false)}
                    className="px-1.5 py-1 text-slate-400 hover:text-slate-200 text-xs"
                  >
                    ✕
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowNewChannelInput(true)}
                  className="px-2 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-blue-300 border border-dashed border-slate-700 text-xs flex items-center space-x-1 whitespace-nowrap transition-colors"
                >
                  <Plus className="w-3 h-3 mr-0.5" />
                  <span>New Channel</span>
                </button>
              )}
            </div>
          </div>

          {/* Main Personal Stream Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {postsForThisChannel.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-xl bg-slate-900/30 my-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 mb-3">
                  <Hash className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-200">Personal Channel {baseTarget} Initialized</h3>
                <p className="text-xs text-slate-400 max-w-md mt-1 mb-4">
                  This is a dedicated personal stream scoped under <strong className="text-cyan-400 font-mono">{personalOwner}</strong>. Messages, logs, notes, or AI evaluations published here remain within this channel's isolated context.
                </p>
                <div className="flex items-center space-x-2 text-xs">
                  <button
                    onClick={() => {
                      const welcomePost: PersonalChannelPost = {
                        id: `p-${Date.now()}`,
                        author: personalOwner.replace(/^[@$~&§+?£€￠¥₠∮∃∏∑±=×]/, ''),
                        handle: personalOwner,
                        time: 'Just now',
                        content: `📌 [FOUNDER BULLETIN] Personal workspace initialized for ${personalOwner}.\nChannel: ${baseTarget}\nReady for notes, task checklists, or telemetry.`,
                        isPinned: true,
                        role: isOwnerModel ? 'model' : 'user',
                        likes: 1
                      };
                      setPersonalChannels(prev => ({ ...prev, [baseTarget]: [welcomePost] }));
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                  >
                    Post Initial Welcome Bulletin
                  </button>
                </div>
              </div>
            ) : (
              postsForThisChannel.map((p) => {
                const isMsgModel = p.role === 'model' || p.handle.startsWith('$');
                const isMsgSystem = p.role === 'system' || p.handle.startsWith('~');

                return (
                  <div
                    key={p.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      p.isPinned
                        ? 'bg-[#0f172a]/90 border-blue-900/60 ring-1 ring-blue-500/20'
                        : isMsgModel
                        ? 'bg-[#0d1222]/80 border-indigo-950/80'
                        : isMsgSystem
                        ? 'bg-[#181119]/80 border-rose-950/80'
                        : 'bg-slate-900/70 border-slate-800/80'
                    }`}
                  >
                    {/* Header line of post */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs border ${
                          isMsgModel ? 'bg-indigo-950 text-indigo-300 border-indigo-700' :
                          isMsgSystem ? 'bg-rose-950 text-rose-300 border-rose-700' :
                          'bg-emerald-950 text-emerald-300 border-emerald-700'
                        }`}>
                          {isMsgModel ? <Sparkles className="w-3.5 h-3.5" /> :
                           isMsgSystem ? <Shield className="w-3.5 h-3.5" /> :
                           <User className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="font-bold text-slate-100 text-xs">{p.author}</span>
                            <span className="font-mono text-[10px] text-slate-400">{p.handle}</span>
                            {p.handle === personalOwner && (
                              <span className="px-1 py-0.2 bg-blue-950 text-blue-300 border border-blue-800 text-[9px] font-bold rounded">
                                OWNER
                              </span>
                            )}
                            {p.isPinned && (
                              <span className="px-1.5 py-0.2 bg-amber-950 text-amber-300 border border-amber-800 text-[9px] font-bold rounded flex items-center">
                                <Pin className="w-2.5 h-2.5 mr-0.5" />
                                PINNED
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400">{p.time}</span>
                        </div>
                      </div>

                      {/* Post actions */}
                      <div className="flex items-center space-x-1 text-slate-400">
                        <button
                          onClick={() => toggleLikePersonalPost(p.id)}
                          className={`p-1 rounded hover:bg-slate-800 transition-colors flex items-center space-x-1 text-[11px] ${
                            (p.likes || 0) > 0 ? 'text-rose-400' : 'text-slate-400 hover:text-rose-300'
                          }`}
                          title="Like item"
                        >
                          <Heart className={`w-3.5 h-3.5 ${(p.likes || 0) > 0 ? 'fill-current' : ''}`} />
                          {(p.likes || 0) > 0 && <span>{p.likes}</span>}
                        </button>
                        <button
                          onClick={() => togglePinPersonalPost(p.id)}
                          className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                            p.isPinned ? 'text-amber-400' : 'text-slate-400 hover:text-amber-300'
                          }`}
                          title={p.isPinned ? 'Unpin message' : 'Pin message'}
                        >
                          <Pin className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(p.content);
                          }}
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                          title="Copy text"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deletePersonalPost(p.id)}
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed pl-9">
                      {p.content ? (
                        p.content
                      ) : (
                        <div className="flex items-center space-x-2 text-indigo-400 py-1 font-mono text-[11px]">
                          <Sparkles className="w-3.5 h-3.5 animate-spin" />
                          <span>Generating model response in personal channel context...</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {modelLoading[baseTarget] && (
              <div className="p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-xl flex items-center space-x-2.5 text-xs text-indigo-300">
                <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
                <span className="font-mono">{personalOwner} is computing stream payload for {personalChannelName}...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Bottom Message Input Bar */}
          <div className="p-3 border-t border-slate-800 bg-[#090e17] sticky bottom-0 z-10 flex flex-col space-y-2">
            <form onSubmit={handlePersonalChannelSubmit} className="flex items-center space-x-2">
              <div className="flex-1 flex items-center bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 focus-within:border-blue-500 transition-all shadow-inner">
                <span className="text-slate-400 font-mono text-xs mr-2">{personalChannelName} ›</span>
                <input
                  type="text"
                  value={personalInput}
                  onChange={(e) => setPersonalInput(e.target.value)}
                  placeholder={`Post to ${baseTarget}... (try /topic, /pin, /clear)`}
                  disabled={modelLoading[baseTarget]}
                  className="bg-transparent flex-1 text-xs text-white placeholder-slate-400 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={!personalInput.trim() || modelLoading[baseTarget]}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-xs shadow-sm flex items-center space-x-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>

            {/* Quick Slash Command & Helper Chips */}
            <div className="flex items-center space-x-1.5 overflow-x-auto text-[10px] text-slate-400">
              <span className="text-slate-400 font-semibold mr-1">Shortcuts:</span>
              <button
                type="button"
                onClick={() => setPersonalInput('/pin ')}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-mono"
              >
                /pin &lt;text&gt;
              </button>
              <button
                type="button"
                onClick={() => setPersonalInput('/topic ')}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-mono"
              >
                /topic &lt;text&gt;
              </button>
              <button
                type="button"
                onClick={() => setPersonalInput('/clear')}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-mono"
              >
                /clear
              </button>
              {isOwnerModel && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setPersonalInput('Run autonomous benchmark evaluation for this personal channel.');
                    }}
                    className="px-2 py-0.5 rounded bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 font-medium"
                  >
                    ✨ Run Eval
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPersonalInput('Summarize the current task status and channel notes.');
                    }}
                    className="px-2 py-0.5 rounded bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 font-medium"
                  >
                    ✨ Summarize Channel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 4. SUBOBJECTS RENDERING (+ignore, +ban, +like, +bookmarks, +pm, +raw-vm, +ao-s)
    if (isModel && !isRaw) {
      const modelName = baseTarget.startsWith('$') ? baseTarget.substring(1) : baseTarget;
      const isLoading = modelLoading[baseTarget] || isL;
      
      const serverChannels = [
        { name: '#general', desc: 'Main Neural Broadcast & Operator Channel' },
        { name: '#dev-chat', desc: 'Architecture, Protocols & IRC Diagnostics' },
        { name: '#code-gen', desc: 'Script Synthesis, Parsing & Algorithms' },
        { name: '#system-prompt', desc: 'Kernel Prompt Inspection & Context' },
        { name: '#raw-stream', desc: 'Token Serialization & Ingress Bus' },
        { name: '#inferences', desc: 'Latency Telemetry & Rate Audits' },
      ];

      const currentChan = activeServerChannel[baseTarget] || '#general';
      const serverChanKey = `${baseTarget}:${currentChan}`;
      const activeServerHistory = serverChats[serverChanKey] || [];
      const activeRoomHistory = roomChats[baseTarget] || [];
      const activePrivmsgHistory = privmsgChats[baseTarget] || [];

      const setFacet = (facet: 'server' | 'channel' | 'privmsg') => {
        setManualFacet(prev => ({ ...prev, [baseTarget]: facet }));
        if (facet === 'server') {
          setAddress(`${baseTarget}+server`);
        } else if (facet === 'channel') {
          setAddress(`${baseTarget}+join`);
        } else {
          setAddress(`${baseTarget}+privmsg`);
        }
      };

      const selectChannel = (chan: string) => {
        setActiveServerChannel(prev => ({ ...prev, [baseTarget]: chan }));
      };

      const sendQuickPrompt = (promptText: string) => {
        if (currentModelFacet === 'server') {
          triggerModelChat(baseTarget, promptText, 'server', currentChan);
        } else if (currentModelFacet === 'channel') {
          triggerModelChat(baseTarget, promptText, 'channel', currentChan);
        } else {
          triggerModelChat(baseTarget, promptText, 'privmsg', currentChan);
        }
      };

      return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-950 text-slate-100">
          {/* Main Model Object Header */}
          <div className="p-3.5 border-b border-indigo-950/80 bg-[#070a14] sticky top-0 z-10 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-indigo-950/70 border border-indigo-700/50 text-indigo-300 rounded-lg flex items-center justify-center font-bold shadow-inner">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="font-bold text-sm leading-tight text-white flex items-center space-x-1.5 font-mono">
                      <span>${modelName}</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-950 border border-indigo-700 text-indigo-300">
                        +S TRUSTED OBJECT
                      </span>
                    </h2>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Autonomous Neural Entity &bull; Tri-Context Interface {isLoading ? '+l [STREAMING]' : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setAddress(`${baseTarget}+Δmodes`)}
                  className="px-2.5 py-1 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-800/80 text-indigo-200 text-[11px] font-bold rounded flex items-center space-x-1 transition-colors"
                  title="Edit Modes & Hierarchy"
                >
                  <Sliders className="w-3 h-3 text-indigo-400" />
                  <span>Δmodes</span>
                </button>
                <button
                  onClick={() => setAddress(`${baseTarget}+t`)}
                  className={`px-2 py-1 border text-[11px] font-bold rounded flex items-center space-x-1 transition-colors ${
                    isT ? 'bg-cyan-950 text-cyan-300 border-cyan-700 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                  title="Toggle Trace Telemetry (+t)"
                >
                  <Activity className="w-3 h-3" />
                  <span>+t</span>
                </button>
                <button 
                  onClick={() => setAddress(address + '+raw')}
                  className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 text-[11px] font-bold rounded flex items-center space-x-1 transition-colors"
                >
                  <Code className="w-3 h-3" />
                  <span>RAW</span>
                </button>
              </div>
            </div>

            {/* Facet Switcher Tabs */}
            <div className="flex items-center space-x-2 pt-1 border-t border-slate-800/60 overflow-x-auto">
              <button
                onClick={() => setFacet('server')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all border whitespace-nowrap ${
                  currentModelFacet === 'server'
                    ? 'bg-indigo-900/90 text-white border-indigo-500 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Server className="w-3.5 h-3.5 text-indigo-400" />
                <span>/connect ${modelName} (Server &bull; #channels)</span>
              </button>

              <button
                onClick={() => setFacet('channel')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all border whitespace-nowrap ${
                  currentModelFacet === 'channel'
                    ? 'bg-emerald-900/90 text-white border-emerald-500 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>/join ${modelName} (Channel/User Room)</span>
              </button>

              <button
                onClick={() => setFacet('privmsg')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all border whitespace-nowrap ${
                  currentModelFacet === 'privmsg'
                    ? 'bg-amber-900/90 text-white border-amber-500 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>/msg ${modelName} (Anonymous PRIVMSG)</span>
              </button>
            </div>
          </div>

          {/* FACET 1: PSEUDO-SERVER UPLINK WITH MULTI-CHANNEL ACCESS */}
          {currentModelFacet === 'server' && (
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Server Status Header */}
              <div className="bg-[#090e1c] border-b border-indigo-950 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                <div className="flex items-center space-x-3 text-slate-300">
                  <span className="flex items-center space-x-1 text-indigo-400 font-bold">
                    <Globe className="w-3.5 h-3.5" />
                    <span>srv.{modelName}.net:6697</span>
                  </span>
                  <span className="text-slate-500">&bull;</span>
                  <span className="text-emerald-400 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>ONLINE (TLS 1.3)</span>
                  </span>
                  <span className="text-slate-500">&bull;</span>
                  <span className="text-indigo-300 font-bold">Modes: +N+S</span>
                </div>
                <div className="text-[10px] text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
                  MOTD: Direct Multi-Channel Model Ingress Node
                </div>
              </div>

              {/* Subchannels List Bar */}
              <div className="bg-[#04060d] px-3 py-2 border-b border-slate-800/80 flex items-center space-x-1.5 overflow-x-auto text-xs">
                <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider flex-shrink-0 mr-1 flex items-center space-x-1">
                  <Hash className="w-3 h-3 text-slate-600" />
                  <span>Channels:</span>
                </span>
                {serverChannels.map(ch => (
                  <button
                    key={ch.name}
                    onClick={() => selectChannel(ch.name)}
                    className={`px-2.5 py-1 rounded text-xs font-mono whitespace-nowrap transition-colors border flex items-center space-x-1 ${
                      currentChan === ch.name
                        ? 'bg-indigo-950 text-indigo-200 border-indigo-700 font-bold'
                        : 'bg-slate-900/40 text-slate-400 border-slate-800/60 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                    title={ch.desc}
                  >
                    <span>{ch.name}</span>
                    {currentChan === ch.name && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>}
                  </button>
                ))}
              </div>

              {/* Channel Chat Stream */}
              <div className="flex-1 p-4 flex flex-col space-y-3.5 overflow-y-auto bg-[#050811]">
                <div className="p-3 bg-indigo-950/30 border border-indigo-900/40 rounded-lg text-xs font-mono space-y-1">
                  <div className="flex items-center justify-between text-indigo-300 font-bold">
                    <span>SERVER CHANNEL: {currentChan}</span>
                    <span className="text-[10px] text-slate-400">Channel Operator: @{modelName}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {serverChannels.find(c => c.name === currentChan)?.desc || 'Neural routing channel active.'}
                  </p>
                </div>

                {activeServerHistory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-indigo-300/60 space-y-3 my-8">
                    <Server className="w-10 h-10 text-indigo-400/40" />
                    <div className="text-center space-y-1">
                      <p className="text-sm font-medium text-slate-300">Channel {currentChan} on ${modelName} ready.</p>
                      <p className="text-xs text-slate-500 font-mono">Send a prompt below or pick a preset prompt to test server responses.</p>
                    </div>
                    {/* Preset Quick Prompts */}
                    <div className="flex flex-wrap gap-2 justify-center max-w-lg pt-2">
                      {[
                        `Summarize current capabilities on ${currentChan}`,
                        `Explain the difference between /connect and /join for ${modelName}`,
                        `Simulate real-time IVC protocol payload stream`,
                        `Show active token metrics & inference limits`
                      ].map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendQuickPrompt(prompt)}
                          className="px-2.5 py-1 rounded bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-800/60 text-indigo-200 text-[11px] font-mono transition-colors text-left"
                        >
                          &rsaquo; {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  activeServerHistory.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className="text-[10px] font-mono text-slate-500 mb-1 px-1 flex items-center space-x-1">
                        {msg.role === 'user' ? (
                          <>
                            <span className="text-slate-400 font-bold">@jakedot</span>
                            <span>&bull;</span>
                            <span>{currentChan}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-indigo-400 font-bold">@{modelName}</span>
                            <span className="px-1 bg-indigo-950 border border-indigo-800 text-[9px] rounded text-indigo-300">SERVER OP</span>
                            <span>&bull;</span>
                            <span>{currentChan}</span>
                          </>
                        )}
                      </div>
                      <div className={`rounded-xl px-4 py-2.5 max-w-[85%] shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-[#0f1424] border border-indigo-900/60 text-slate-200 rounded-tl-none font-mono text-[12px]'
                      }`}>
                        <p className="whitespace-pre-wrap leading-relaxed">
                          {msg.text}
                        </p>
                        {msg.role === 'model' && msg.text.length === 0 && isLoading && i === activeServerHistory.length - 1 && (
                          <div className="flex items-center space-x-1.5 mt-1 py-1">
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Server Channel Input Bar */}
              <form onSubmit={handleModelSubmit} className="p-3 bg-[#080c18] border-t border-indigo-950 flex flex-col space-y-2">
                <div className="flex items-center justify-between text-[11px] text-indigo-400 font-mono px-1">
                  <div className="flex items-center space-x-1.5">
                    <Terminal className="w-3 h-3" />
                    <span>Broadcasting to {baseTarget}:{currentChan}</span>
                  </div>
                  <span className="text-slate-500">Press Enter to send &bull; /connect command active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={modelChatInput}
                    onChange={e => setModelChatInput(e.target.value)}
                    placeholder={`Message ${currentChan} on ${baseTarget}...`}
                    disabled={isLoading}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!modelChatInput.trim() || isLoading}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center space-x-1"
                  >
                    <span>Send</span>
                    <Send className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* FACET 2: PSEUDO-CHANNEL & USER AMALGAMATION (/join $model) */}
          {currentModelFacet === 'channel' && (
            <div className="flex flex-1 overflow-hidden">
              {/* Main Room Chat Area */}
              <div className="flex-1 flex flex-col border-r border-slate-800/80">
                {/* Room Topic & Status */}
                <div className="bg-[#08120d] border-b border-emerald-950/80 px-4 py-2.5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold flex items-center space-x-1">
                      <Hash className="w-3.5 h-3.5" />
                      <span>{baseTarget}</span>
                    </span>
                    <span className="px-1.5 py-0.2 bg-emerald-950 border border-emerald-800 text-[10px] text-emerald-300 rounded font-bold">
                      MODES: +mntS {isV ? '+v' : ''}
                    </span>
                    <span className="text-slate-400 text-[11px] truncate max-w-xs">
                      Topic: Autonomous Persona Room & Amalgamation Bridge
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => {
                        const newDelta = isV ? '-v' : '+v';
                        setNegatedModes(prev => {
                          const curr = prev[baseTarget] || [];
                          return isV 
                            ? { ...prev, [baseTarget]: [...curr, 'v'] }
                            : { ...prev, [baseTarget]: curr.filter(c => c !== 'v') };
                        });
                        logModeChange(baseTarget, newDelta, `Voice status toggled in amalgamation room`, '@jakedot');
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                        isV 
                          ? 'bg-emerald-900 text-emerald-200 border-emerald-600' 
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {isV ? 'VOICED (+v)' : 'MUTE BYPASS (+v)'}
                    </button>
                  </div>
                </div>

                {/* Room Chat Log */}
                <div className="flex-1 p-4 flex flex-col space-y-3.5 overflow-y-auto bg-[#050c08]">
                  {activeRoomHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-emerald-400/60 space-y-3 my-8">
                      <Users className="w-10 h-10 text-emerald-500/40" />
                      <div className="text-center space-y-1">
                        <p className="text-sm font-medium text-slate-300">Joined channel &amp; user amalgamation: {baseTarget}</p>
                        <p className="text-xs text-slate-500 font-mono">@{modelName} is present as channel operator. Speak to interact in the room.</p>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center max-w-md pt-2">
                        {[
                          `Hello @${modelName}, introduce yourself in this channel`,
                          `What are your active privileges as channel operator?`,
                          `Test operator broadcast and moderation response`
                        ].map((prompt, idx) => (
                          <button
                            key={idx}
                            onClick={() => sendQuickPrompt(prompt)}
                            className="px-2.5 py-1 rounded bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-200 text-[11px] font-mono transition-colors text-left"
                          >
                            &rsaquo; {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    activeRoomHistory.map((msg, i) => (
                      <div key={i} className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2 text-xs font-mono">
                          <span className="text-[10px] text-slate-500">{new Date().toLocaleTimeString('en-US', { hour12: false })}</span>
                          {msg.role === 'user' ? (
                            <span className="font-bold text-slate-300 flex items-center space-x-1">
                              <span>{isV ? '+' : ''}jakedot:</span>
                            </span>
                          ) : (
                            <span className="font-bold text-emerald-400 flex items-center space-x-1">
                              <span>@{modelName}:</span>
                              <span className="px-1 bg-emerald-950 border border-emerald-800 text-[9px] rounded text-emerald-300">OP</span>
                            </span>
                          )}
                        </div>
                        <div className={`p-3 rounded-lg text-xs leading-relaxed max-w-[90%] ${
                          msg.role === 'user' 
                            ? 'bg-slate-900/90 border border-slate-800 text-slate-200' 
                            : 'bg-[#0a180f] border border-emerald-900/60 text-emerald-100 font-mono'
                        }`}>
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                          {msg.role === 'model' && msg.text.length === 0 && isLoading && i === activeRoomHistory.length - 1 && (
                            <div className="flex items-center space-x-1.5 mt-1 py-1">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Room Chat Input */}
                <form onSubmit={handleModelSubmit} className="p-3 bg-[#06100a] border-t border-emerald-950 flex items-center space-x-2">
                  <input
                    type="text"
                    value={modelChatInput}
                    onChange={e => setModelChatInput(e.target.value)}
                    placeholder={`Speak in channel ${baseTarget} (joined as amalgamation)...`}
                    disabled={isLoading}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!modelChatInput.trim() || isLoading}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center space-x-1"
                  >
                    <span>Speak</span>
                    <Send className="w-3 h-3 ml-1" />
                  </button>
                </form>
              </div>

              {/* Right Sidebar: Dual Entity Spec & User Roster */}
              <div className="w-64 bg-[#050a07] p-3 flex flex-col space-y-4 overflow-y-auto text-xs font-mono hidden md:flex">
                {/* Model Persona Info */}
                <div className="p-3 bg-emerald-950/30 border border-emerald-900/40 rounded-lg space-y-2">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>AI Persona Card</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-300">
                    <div className="flex justify-between"><span className="text-slate-500">Handle:</span> <span>@{modelName}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Class:</span> <span className="text-emerald-300">Trusted Entity</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Room Status:</span> <span className="text-emerald-400 font-bold">Operator (@)</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Trust Tier:</span> <span>+S (VERIFIED)</span></div>
                  </div>
                </div>

                {/* Channel Roster List */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center justify-between">
                    <span>Users in Room (4)</span>
                    <span className="text-emerald-500 text-[9px]">4 Online</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2 p-1.5 rounded bg-emerald-950/40 border border-emerald-900/40 text-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="font-bold">@{modelName}</span>
                      <span className="text-[9px] bg-emerald-900 text-emerald-300 px-1 rounded ml-auto">AI BOT</span>
                    </div>
                    <div className="flex items-center space-x-2 p-1.5 rounded bg-slate-900/60 border border-slate-800 text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      <span>@jakedot (you)</span>
                      {isV && <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1 rounded ml-auto">+v</span>}
                    </div>
                    <div className="flex items-center space-x-2 p-1.5 rounded bg-slate-900/40 border border-slate-800/60 text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                      <span>@ChanServ</span>
                      <span className="text-[9px] text-slate-500 ml-auto">SERVICE</span>
                    </div>
                    <div className="flex items-center space-x-2 p-1.5 rounded bg-slate-900/40 border border-slate-800/60 text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                      <span>+telemetry_bot</span>
                      <span className="text-[9px] text-slate-500 ml-auto">VOICE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FACET 3: PSEUDO-USER PRIVATE ANONYMOUS CHAT (/msg $model) */}
          {currentModelFacet === 'privmsg' && (
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Ephemeral Privacy Shield Banner */}
              <div className="bg-[#140d04] border-b border-amber-950/80 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center space-x-3 text-amber-200">
                  <span className="flex items-center space-x-1.5 text-amber-400 font-bold">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>EPHEMERAL PRIVMSG ANONYMOUS TUNNEL</span>
                  </span>
                  <span className="text-amber-700">&bull;</span>
                  <span className="text-[11px] text-amber-300 font-mono">
                    Session: <span className="underline">{anonymousSessionId}</span>
                  </span>
                  <span className="text-amber-700">&bull;</span>
                  <span className="text-emerald-400 text-[10px]">Zero-Log Guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const newId = 'anon_sess_' + Math.random().toString(36).substring(2, 7);
                      setAnonymousSessionId(newId);
                    }}
                    className="px-2.5 py-1 bg-amber-950/80 hover:bg-amber-900 border border-amber-800 text-amber-200 rounded text-[10px] flex items-center space-x-1 transition-colors"
                    title="Generate fresh session fingerprint"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Rotate Token</span>
                  </button>
                  <button
                    onClick={() => {
                      setPrivmsgChats(prev => ({ ...prev, [baseTarget]: [] }));
                    }}
                    className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 rounded text-[10px] flex items-center space-x-1 transition-colors"
                    title="Purge chat history"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Purge Buffer</span>
                  </button>
                </div>
              </div>

              {/* Private Message Stream */}
              <div className="flex-1 p-4 flex flex-col space-y-3.5 overflow-y-auto bg-[#0d0903]">
                {activePrivmsgHistory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-amber-400/60 space-y-3 my-8">
                    <Lock className="w-10 h-10 text-amber-500/40" />
                    <div className="text-center space-y-1">
                      <p className="text-sm font-medium text-slate-300">Direct Anonymous Query Tunnel with ${modelName}</p>
                      <p className="text-xs text-slate-500 font-mono">Your identity is masked under session token {anonymousSessionId}. Messages are ephemeral.</p>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center max-w-md pt-2">
                      {[
                        `Send private anonymous query to ${modelName}`,
                        `Verify cryptographic token isolation & zero-log status`,
                        `Ask private question without channel broadcast`
                      ].map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendQuickPrompt(prompt)}
                          className="px-2.5 py-1 rounded bg-amber-950/60 hover:bg-amber-900 border border-amber-800/60 text-amber-200 text-[11px] font-mono transition-colors text-left"
                        >
                          &rsaquo; {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  activePrivmsgHistory.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className="text-[10px] font-mono text-slate-500 mb-1 px-1 flex items-center space-x-1">
                        {msg.role === 'user' ? (
                          <span className="text-amber-400 font-bold">[ANONYMOUS CLIENT {anonymousSessionId.slice(-4)}]</span>
                        ) : (
                          <span className="text-amber-300 font-bold">[PRIVMSG FROM @{modelName}]</span>
                        )}
                        <span>&bull;</span>
                        <span>{new Date().toLocaleTimeString('en-US', { hour12: false })}</span>
                      </div>
                      <div className={`rounded-xl px-4 py-2.5 max-w-[85%] shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-amber-700 text-white rounded-tr-none'
                          : 'bg-[#1a1205] border border-amber-900/60 text-amber-100 rounded-tl-none font-mono text-[12px]'
                      }`}>
                        <p className="whitespace-pre-wrap leading-relaxed">
                          {msg.text}
                        </p>
                        {msg.role === 'model' && msg.text.length === 0 && isLoading && i === activePrivmsgHistory.length - 1 && (
                          <div className="flex items-center space-x-1.5 mt-1 py-1">
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Private Input Bar */}
              <form onSubmit={handleModelSubmit} className="p-3 bg-[#0c0803] border-t border-amber-950 flex flex-col space-y-2">
                <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono px-1">
                  <div className="flex items-center space-x-1.5">
                    <Lock className="w-3 h-3" />
                    <span>Direct PRIVMSG Tunnel to @{modelName} (Encrypted)</span>
                  </div>
                  <span className="text-slate-500">Session ID: {anonymousSessionId}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={modelChatInput}
                    onChange={e => setModelChatInput(e.target.value)}
                    placeholder={`Send private anonymous PRIVMSG to @${modelName}...`}
                    disabled={isLoading}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!modelChatInput.trim() || isLoading}
                    className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center space-x-1"
                  >
                    <span>Send MSG</span>
                    <Send className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      );
    }

    if (isRawVM) {
      return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-[#050505] text-[#00ff00] font-mono text-xs pb-14 p-4 overflow-y-auto">
          <div className="mb-4 flex items-center space-x-2 border-b border-[#333] pb-2 text-sm font-bold">
            <Terminal className="w-4 h-4" />
            <span>RAW-VM INSTANCE: {baseTarget}</span>
          </div>
          <div className="space-y-1">
            <p>{">"} BOOT SEQUENCE INITIATED...</p>
            <p>{">"} LOADING VIRTUAL ENVIRONMENT...</p>
            {baseTarget === '#users' ? (
              <>
                <p>{">"} ALLOCATING @user[123] [CLIENT CLUSTER]... OK</p>
                <p>{">"} ALLOCATING @jakedot [OPERATOR STATUS]... OK</p>
                <p>{">"} SYNCING STATE...</p>
                <p>{">"} VM READY.</p>
              </>
            ) : (
              <p>{">"} VM READY ON NON-STANDARD TARGET.</p>
            )}
            <div className="mt-4 flex items-center space-x-2">
              <span className="w-2 h-4 bg-[#00ff00] animate-pulse"></span>
            </div>
          </div>
        </div>
      );
    }

    if (isAOS) {
      return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-900 text-cyan-400 font-mono text-xs pb-14 p-4 overflow-y-auto">
          <div className="mb-4 flex items-center space-x-2 border-b border-cyan-800 pb-2 text-cyan-300 font-bold text-sm">
            <Activity className="w-4 h-4" />
            <span>OPERATOR SECURE OVERRIDE (AO-S)</span>
          </div>
          <div className="space-y-2">
            <p className="text-white">TARGET ENTITY: {baseTarget}</p>
            <p className="text-cyan-500 font-bold uppercase mt-2">Authentication Verified. Full access granted.</p>
            <p className="text-cyan-600">Operator privileges active on this context layer.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="bg-cyan-900/40 py-3 rounded border border-cyan-800 hover:bg-cyan-800 text-cyan-100 transition-colors">INITIATE REBOOT</button>
              <button className="bg-cyan-900/40 py-3 rounded border border-cyan-800 hover:bg-cyan-800 text-cyan-100 transition-colors">PURGE AUDIT LOG</button>
              <button className="bg-cyan-900/40 py-3 rounded border border-cyan-800 hover:bg-cyan-800 text-cyan-100 transition-colors">HALT PROCESS</button>
              <button className="bg-cyan-900/40 py-3 rounded border border-cyan-800 hover:bg-cyan-800 text-cyan-100 transition-colors">ESCALATE</button>
            </div>
          </div>
        </div>
      );
    }

    if ((isServices && !isPm && !isRawVM && !isAOS && !isIgnore && !isBan && !isLike && !isBookmarks) || baseTarget.startsWith('&') || baseTarget === '&services' || baseTarget === '&network') {
      return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-950 text-emerald-400 font-mono text-xs pb-14 p-4 overflow-y-auto">
          <div className="mb-4 flex items-center justify-between border-b border-emerald-900/60 pb-3">
            <div className="flex items-center space-x-2 text-emerald-300 font-bold text-sm">
              <Server className="w-5 h-5 text-emerald-400" />
              <span>NETWORK SERVICES [+N]</span>
            </div>
            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-700/50 rounded text-[10px] uppercase font-bold tracking-wider">
              ONLINE · 6 DAEMONS
            </span>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/90 border border-emerald-900/50 rounded-lg p-3 text-slate-300 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-emerald-400 font-bold">CORE NETWORK DAEMONS</span>
                <span className="text-[10px] text-slate-500 font-mono">PROTO v4.2 / TLS 1.3</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {[
                  { name: 'NickServ', desc: 'Identity & Auth', status: 'ACTIVE', ping: '0.8ms' },
                  { name: 'ChanServ', desc: 'Channel Guard', status: 'ACTIVE', ping: '1.1ms' },
                  { name: 'OperServ', desc: 'Global Control', status: 'ACTIVE', ping: '0.4ms' },
                  { name: 'BotServ', desc: 'Service Bots', status: 'ACTIVE', ping: '1.5ms' },
                  { name: 'HostServ', desc: 'vHost / Cloaks', status: 'ACTIVE', ping: '0.9ms' },
                  { name: 'MemoServ', desc: 'Msg Queue', status: 'ACTIVE', ping: '1.2ms' },
                ].map(srv => (
                  <div key={srv.name} className="bg-slate-950 p-2.5 rounded border border-emerald-950 hover:border-emerald-700/60 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-300">{srv.name}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">{srv.desc}</p>
                    <p className="text-[9px] text-emerald-500/80 mt-1.5 font-mono">{srv.ping}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/90 border border-emerald-900/50 rounded-lg p-3 space-y-2 text-slate-300">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                <span>ACTIVE DAEMON LINK DISPATCH</span>
                <span className="text-[10px] text-slate-500">TARGET: {baseTarget}</span>
              </div>
              <p className="text-xs text-slate-400">
                Network services mode (+N) active. Netadmin mode (+n) is isolated.
              </p>
              <div className="pt-2 grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setAddress(baseTarget + '+raw')}
                  className="bg-emerald-950/60 border border-emerald-800/60 text-emerald-200 py-2 px-3 rounded text-[11px] font-bold hover:bg-emerald-900/60 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Code className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Inspect Service Tree</span>
                </button>
                <button 
                  onClick={() => setAddress('#network/handshake')}
                  className="bg-emerald-950/60 border border-emerald-800/60 text-emerald-200 py-2 px-3 rounded text-[11px] font-bold hover:bg-emerald-900/60 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Packet Handshake</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (isPm) {
      return (
        <div className="flex flex-col h-[calc(100vh-140px)]">
          <div className={`p-4 border-b ${isMacro ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-white'} sticky top-0 flex justify-between items-center z-10`}>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${isMacro ? 'bg-purple-200 text-purple-700' : 'bg-blue-100 text-blue-600'} rounded-full flex items-center justify-center font-bold`}>
                {baseTarget.charAt(1).toUpperCase()}
              </div>
              <div>
                <h2 className={`font-bold leading-tight ${isMacro ? 'text-purple-900' : 'text-gray-900'}`}>
                  {isMacro ? 'IVC Injected Chat' : 'Encrypted Chat'}
                </h2>
                <p className={`text-xs ${isMacro ? 'text-purple-600 font-mono' : 'text-gray-500'}`}>
                  {isMacro ? `Server Mode +m (Macros enabled)` : `Connected to ${baseTarget}`}
                </p>
              </div>
            </div>
            {isMacro && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-purple-200 text-purple-800 text-[10px] font-bold rounded uppercase tracking-widest">
                <Code className="w-3 h-3" />
                <span>IVC Active</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-4 flex flex-col justify-end space-y-4 overflow-y-auto bg-gray-50">
            <div className="self-start bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm">
              <p className="text-sm text-gray-800">Hey, I noticed you were looking at the cgeo commits. Need any help parsing them?</p>
              <span className="text-[10px] text-gray-400 mt-2 block">12:42 PM</span>
            </div>
            {isMacro && (
              <div className="self-end bg-purple-600 text-white border border-purple-700 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] shadow-sm font-mono text-xs">
                <p>{`> [IVC: Servlet Injection Routine Started...]`}</p>
                <p>{`> Executing macro block against user target.`}</p>
                <span className="text-[10px] text-purple-300 mt-2 block">12:45 PM</span>
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t border-gray-200 flex flex-col space-y-2">
            {isMacro && (
              <div className="flex items-center space-x-2 text-xs text-purple-600 font-mono px-2">
                <Terminal className="w-3 h-3" />
                <span>IVC Macro Code Injection Ready:</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <input type="text" placeholder={isMacro ? `Enter java servlet macro to inject...` : `Message ${baseTarget}...`} className={`flex-1 bg-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 ${isMacro ? 'focus:ring-purple-500 font-mono' : 'focus:ring-blue-500 rounded-full'}`} />
              <button className={`w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-all active:scale-95 ${isMacro ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (isIgnore) {
      return (
        <div className="flex flex-col pb-28 bg-white min-h-[calc(100vh-140px)]">
          <div className="p-4 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
            <h2 className="font-bold text-gray-900 flex items-center space-x-2">
              <EyeOff className="w-5 h-5 text-gray-500" />
              <span>Ignored Users</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">Users hidden from your feed.</p>
          </div>
          {ignored.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <EyeOff className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No ignored users.</p>
            </div>
          ) : (
            ignored.map(handle => (
              <div key={handle} className="p-4 border-b border-gray-100 flex items-center justify-between">
                <span className="font-medium text-gray-800">{handle}</span>
                <button onClick={() => toggleIgnore(handle)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md">
                  Unignore
                </button>
              </div>
            ))
          )}
        </div>
      );
    }

    if (isBan) {
      return (
        <div className="flex flex-col pb-28 bg-white min-h-[calc(100vh-140px)]">
          <div className="p-4 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
            <h2 className="font-bold text-gray-900 flex items-center space-x-2">
              <Ban className="w-5 h-5 text-red-500" />
              <span>Banned Users</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">Users strictly restricted from interactions.</p>
          </div>
          {banned.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <Ban className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No banned users.</p>
            </div>
          ) : (
            banned.map(handle => (
              <div key={handle} className="p-4 border-b border-gray-100 flex items-center justify-between">
                <span className="font-medium text-gray-800">{handle}</span>
                <button onClick={() => toggleBan(handle)} className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-md">
                  Unban
                </button>
              </div>
            ))
          )}
        </div>
      );
    }

    if (isLike) {
      const likedPosts = posts.filter(p => likes.includes(p.id));
      return (
        <div className="flex flex-col pb-28">
          <div className="p-4 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
            <h2 className="font-bold text-gray-900 flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
              <span>Liked Posts</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">Your liked activity across {baseTarget}</p>
          </div>
          {likedPosts.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <Heart className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No liked posts yet.</p>
            </div>
          ) : (
            likedPosts.map(post => renderPost(post))
          )}
        </div>
      );
    }

    if (isBookmarks) {
      const displayedBookmarks = baseTarget.startsWith('@') && baseTarget !== '@object' && baseTarget !== '@me'
        ? bookmarks.filter(b => b.handle === baseTarget)
        : bookmarks;

      return (
        <div className="flex flex-col pb-28">
          <div className="p-4 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
            <h2 className="font-bold text-gray-900 flex items-center space-x-2">
              <Bookmark className="w-5 h-5 text-yellow-500" fill="currentColor" />
              <span>Bookmarks</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">Saved posts for {baseTarget}</p>
          </div>
          {displayedBookmarks.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <Bookmark className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">No bookmarks found.</p>
            </div>
          ) : (
            displayedBookmarks.map(post => renderPost(post))
          )}
        </div>
      );
    }

    // 3. SPECIFIC USER PROFILE VIEW (Without modifiers)
    if ((baseTarget.startsWith('@') || baseTarget.startsWith('$@')) && baseTarget !== '@object' && baseTarget !== '@me') {
      const isUserIgnored = ignored.includes(baseTarget);
      const isUserBanned = banned.includes(baseTarget);

      let roleLabel = 'User Identity Subobject';
      let IconComponent = User;
      
      if (baseTarget === '@user[123]') {
        roleLabel = 'Client Cluster Subobject';
        IconComponent = Server;
      } else if (baseTarget === '@jakedot') {
        roleLabel = 'Operator Identity';
        IconComponent = Activity;
      }

      return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-gray-50 items-center p-8">
          <div className="w-24 h-24 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
            <IconComponent className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 break-all">{baseTarget}</h2>
          <p className="text-sm text-gray-500 mt-1 mb-8">{roleLabel}</p>

          <div className="flex flex-col space-y-3 w-full max-w-xs">
            {/* Global Voice Status */}
            <div className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
              isV 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-gray-100 border-gray-200 text-gray-700'
            }`}>
              <div className="flex items-center space-x-2">
                <Volume2 className={`w-4 h-4 ${isV ? 'text-emerald-600' : 'text-gray-400'}`} />
                <div>
                  <span className="font-bold block">{isV ? '+v Global Voice: GRANTED' : 'Voice Permission: STANDARD'}</span>
                  <span className="text-[10px] opacity-80">{isV ? 'Server-wide & network-wide speaking rights' : 'Normal channel-level rules apply'}</span>
                </div>
              </div>
              <button
                onClick={() => setAddress(isV ? baseTarget : `${baseTarget}+v`)}
                className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors ${
                  isV 
                    ? 'bg-emerald-200 text-emerald-900 border-emerald-300 hover:bg-emerald-300' 
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {isV ? '-v Revoke' : '+v Grant'}
              </button>
            </div>

            {baseTarget === '@jakedot' && (
              <button 
                onClick={() => setAddress(`${baseTarget}+ao-s`)}
                className="px-4 py-3 bg-cyan-900 hover:bg-cyan-800 text-cyan-100 text-sm font-medium rounded-lg shadow-sm flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <Activity className="w-4 h-4" />
                <span>Enter Operator Mode (+ao-s)</span>
              </button>
            )}
            <button 
              onClick={() => setAddress(`${baseTarget}+pm`)}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm flex items-center justify-center space-x-2 transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Private Message (+pm)</span>
            </button>
            <button 
              onClick={() => toggleIgnore(baseTarget)}
              className="px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 shadow-sm flex items-center justify-center space-x-2 transition-all active:scale-95"
            >
              <EyeOff className={`w-4 h-4 ${isUserIgnored ? 'text-blue-500' : 'text-gray-400'}`} />
              <span>{isUserIgnored ? 'Unignore User' : 'Ignore User (+ignore)'}</span>
            </button>
            <button 
              onClick={() => toggleBan(baseTarget)}
              className="px-4 py-3 bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 shadow-sm flex items-center justify-center space-x-2 transition-all active:scale-95"
            >
              <Ban className={`w-4 h-4 ${isUserBanned ? 'text-red-500' : 'text-gray-400'}`} />
              <span>{isUserBanned ? 'Unban User' : 'Ban User (+ban)'}</span>
            </button>
            <button 
              onClick={() => setAddress(`${baseTarget}+raw`)}
              className="px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg shadow-sm flex items-center justify-center space-x-2 transition-all active:scale-95 mt-4"
            >
              <Code className="w-4 h-4 text-green-400" />
              <span>Inspect Raw Object (+raw)</span>
            </button>
          </div>
        </div>
      );
    }

    // 4. CHANNEL RENDERING (Default #feed, IVC modules)
    if (baseTarget.startsWith('#') && baseTarget !== '#users' && baseTarget !== '#channels') {
      // Filter out ignored and banned users
      const sourcePosts = baseTarget === '#feed' ? posts : ivcPosts.filter(p => p.handle === baseTarget);
      const visiblePosts = sourcePosts.filter(p => !ignored.includes(p.handle) && !banned.includes(p.handle));
      
      return (
        <div className="flex flex-col pb-28">
          {/* Muted Channel (+m) & Voice (+v) Override Banner */}
          {isMuted && (
            <div className={`p-3 border-b text-xs flex items-center justify-between ${
              isV || isO || isA
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center space-x-2">
                {isV || isO || isA ? (
                  <Volume2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <EyeOff className="w-4 h-4 text-amber-600 flex-shrink-0" />
                )}
                <div>
                  <span className="font-bold block">
                    {isV || isO || isA ? 'Voiced User Override Active (+v)' : 'Channel is Muted (+m)'}
                  </span>
                  <span className="text-[10px] opacity-85">
                    {isV || isO || isA 
                      ? 'You have permission to transmit messages in this muted channel.' 
                      : 'Only voiced users (+v) and operators (+o) can broadcast.'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setAddress(address.includes('+v') ? address.replace('+v', '') : address + '+v')}
                className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-colors flex items-center space-x-1 ${
                  isV 
                    ? 'bg-emerald-200 text-emerald-900 border-emerald-300 hover:bg-emerald-300' 
                    : 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700'
                }`}
              >
                <Volume2 className="w-3 h-3" />
                <span>{isV ? 'Revoke (+v)' : 'Gain Voice (+v)'}</span>
              </button>
            </div>
          )}

          {/* Unrestricted Broadcast Channel (+v) Banner */}
          {!isMuted && isV && (
            <div className="p-3 bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="font-bold block">Unrestricted Channel Mode (#chan+v)</span>
                  <span className="text-[10px] text-emerald-700">Open voice broadcast enabled for all active node participants.</span>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 font-mono text-[10px] font-bold rounded">
                +v UNRESTRICTED
              </span>
            </div>
          )}

          {baseTarget !== '#feed' && (
            <div className="p-4 border-b border-gray-200 bg-blue-50 sticky top-0 z-10 flex justify-between items-center">
              <div>
                <h2 className="font-bold text-blue-900 flex items-center space-x-2">
                  <Server className="w-5 h-5 text-blue-600" />
                  <span>IVC Protocol Module: {baseTarget.split('/')[1]}</span>
                </h2>
                <p className="text-xs text-blue-700 mt-1">Live integration from JakeDot/{baseTarget.split('/')[1] === 'servlet' ? 'ivc-servlet' : 'ivc.cx-m'}</p>
              </div>
              <button 
                onClick={() => setAddress(`${baseTarget}+raw`)} 
                className="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs rounded font-mono flex items-center"
              >
                <Code className="w-3 h-3 mr-1" /> +raw
              </button>
            </div>
          )}
          {visiblePosts.length === 0 && baseTarget !== '#feed' ? (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center">
              <Server className="w-8 h-8 text-gray-300 mb-2" />
              <p>No IVC module data loaded from repository.</p>
            </div>
          ) : (
            visiblePosts.map(post => renderPost(post))
          )}
        </div>
      );
    }
    
    // 5. CHANNELS DIRECTORY & SPECIAL GROUPS
    if (baseTarget === '#users') {
      return (
        <div className="flex flex-col bg-white min-h-[calc(100vh-140px)] pb-28">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center sticky top-0 z-10">
            <div>
              <h2 className="font-bold text-gray-900">User Clusters</h2>
              <p className="text-sm text-gray-500 mt-1">Active nodes and operators.</p>
            </div>
            <button 
              onClick={() => setAddress('#users+raw-vm')} 
              className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-green-400 text-xs rounded-md font-mono shadow-sm flex items-center space-x-1"
            >
              <Terminal className="w-3 h-3" />
              <span>+raw-vm</span>
            </button>
          </div>
          <div className="flex flex-col">
            <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-center justify-between group" onClick={() => setAddress('@user[123]')}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">@user[123]</div>
                  <div className="text-xs text-gray-400 mt-0.5">Client Cluster Node</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
            </div>
            <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-center justify-between group" onClick={() => setAddress('@jakedot+ao-s')}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center text-red-600">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">@jakedot</div>
                  <div className="text-xs text-red-400 mt-0.5">Operator (ao-s)</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-red-500 transition-colors" />
            </div>
          </div>
        </div>
      );
    }

    if (baseTarget === '#channels') {
      const demoChannels = [
        '#feed', 
        '#feed+Δmodes',
        '#feed+v',
        '#feed+t',
        '#feed+m',
        '#feed+m+v',
        '#users', 
        '@user[123]+Δmodes',
        '@user[123]+v',
        '&services+Δmodes',
        '&services',
        '~root+k',
        '~root+t',
        '~root+Δmodes',
        '$ai.model',
        '$gemini-3.7-flash', 
        '$gemini-3.1-pro-preview', 
        '$claude.ai',
        '$duck.ai',
        '§config',
        '+runtime-plugin',
        '?diagnostics',
        '£quota-vault',
        '€enterprise-tier',
        '￠subcent-throttle',
        '¥gpu-cluster',
        '₠bridge-relay',
        '∮heartbeat-daemon',
        '∃session-guard',
        '∏build-pipeline',
        '∑traffic-metrics',
        '±latency-tolerance',
        '=canonical-origin',
        '×crossbar-mux',
        '#network/handshake', 
        '#1/2/3/4', 
        '#dev/frontend/react', 
        '#global/announcements'
      ];
      const personalDemoChannels = [
        { id: '@jakedot/#notes', title: 'Personal Notes & Task Tracker', owner: '@jakedot', role: 'Operator Workspace' },
        { id: '@jakedot/#dev', title: 'Development Scratchpad', owner: '@jakedot', role: 'Operator Workspace' },
        { id: '$duck.ai/#evals', title: 'Autonomous Benchmark Evals', owner: '$duck.ai', role: 'AI Model Workspace' },
        { id: '$gemini-3.7-flash/#prompts', title: 'Prompt Engineering Sandbox', owner: '$gemini-3.7-flash', role: 'AI Model Workspace' },
        { id: '~root/#kernel-log', title: 'Supervisor Ring Buffer', owner: '~root', role: 'Netadmin Workspace' },
        { id: '&services/#audit', title: 'Daemon Security & Audit Ledger', owner: '&services', role: 'Services Workspace' },
        { id: '@user[123]/#cluster-log', title: 'Client Node Telemetry', owner: '@user[123]', role: 'User Workspace' },
      ];

      return (
        <div className="flex flex-col bg-white min-h-[calc(100vh-140px)] pb-28">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-bold text-gray-900">Channel Directory</h2>
            <p className="text-sm text-gray-500 mt-1">Explore available addressable groups and personal workspaces.</p>
          </div>

          {/* Featured: Personal Channels Section */}
          <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white border-b border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] uppercase font-bold rounded">
                  NEW
                </span>
                <h3 className="font-bold text-sm text-white">Personal Channels (<span className="font-mono text-indigo-300">&lt;prefix&gt;&lt;object&gt;/#channel</span>)</h3>
              </div>
              <span className="text-xs text-indigo-200 font-mono">+p+m+n+t+s</span>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Scoped personal streams attached directly to identities, AI models, network daemons, and administrative nodes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {personalDemoChannels.map(item => (
                <div
                  key={item.id}
                  onClick={() => setAddress(item.id)}
                  className="p-2.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500 rounded-lg cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center font-bold text-xs">
                      {item.owner.startsWith('$') ? <Sparkles className="w-4 h-4" /> :
                       item.owner.startsWith('~') ? <Shield className="w-4 h-4" /> :
                       item.owner.startsWith('&') ? <Server className="w-4 h-4" /> :
                       <User className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-mono font-bold text-xs text-white group-hover:text-indigo-300 transition-colors">
                        {item.id}
                      </div>
                      <div className="text-[11px] text-slate-400">{item.title}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            {demoChannels.map(ch => {
              const isAI = ch.startsWith('$');
              return (
                <div key={ch} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-center justify-between group" onClick={() => setAddress(ch)}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${isAI ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'} rounded-lg flex items-center justify-center`}>
                      {isAI ? <Sparkles className="w-5 h-5" /> : <Hash className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className={`font-bold ${isAI ? 'text-indigo-900 group-hover:text-indigo-600 font-mono' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>{ch}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{isAI ? 'Trusted Object (Model)' : 'Hierarchical Group'}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // 6. NETWORK SIMULATION SCENARIO
    if (baseTarget === '#network/handshake') {
      return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-[#0d1117] text-gray-300 font-mono text-xs pb-14">
          <div className="p-4 border-b border-[#30363d] bg-[#161b22] sticky top-0 flex justify-between items-center z-10">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm mb-1">
                <Activity className="w-4 h-4" />
                <span>2-Node Handshake Scenario</span>
              </div>
              <span className="text-[10px] text-gray-500">Node A (10.0.0.1) ↔ Node B (10.0.0.2)</span>
            </div>
            <button 
              onClick={startHandshake} 
              disabled={isSimulating}
              className={`px-3 py-1.5 rounded flex items-center space-x-2 transition-all ${isSimulating ? 'bg-[#30363d] text-gray-500' : 'bg-green-600 hover:bg-green-500 text-white shadow-sm'}`}
            >
              <PlaySquare className="w-4 h-4" />
              <span>{isSimulating ? 'Recording...' : 'Start'}</span>
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-2 relative">
            {handshakeLogs.length === 0 && !isSimulating && (
              <div className="flex flex-col items-center justify-center h-full text-gray-600 space-y-3">
                <Server className="w-12 h-12 text-[#30363d]" />
                <p>Ready to record hand-shake interactions.</p>
              </div>
            )}
            {handshakeLogs.map((log) => (
              <div key={log.id} className="flex flex-col sm:flex-row sm:space-x-3 bg-[#161b22] p-2 rounded border border-[#30363d]">
                <div className="flex space-x-2 mb-1 sm:mb-0 sm:w-16 flex-shrink-0">
                  <span className="text-gray-500">[{log.time.split('.')[0]}]</span>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:space-x-2 truncate">
                  <div className="flex items-center space-x-2 w-full sm:w-40 flex-shrink-0 text-[10px] sm:text-xs">
                    <span className={log.source.includes('Node A') ? 'text-blue-400' : 'text-purple-400'}>{log.source.split(' ')[0]}</span>
                    <span className="text-gray-600">→</span>
                    <span className={log.dest.includes('Node A') ? 'text-blue-400' : 'text-purple-400'}>{log.dest.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1 sm:mt-0 overflow-hidden">
                    <span className={`w-12 flex-shrink-0 font-bold ${log.protocol === 'TCP' ? 'text-yellow-500' : log.protocol.includes('TLS') ? 'text-green-500' : 'text-cyan-400'}`}>{log.protocol}</span>
                    <span className="text-gray-300 truncate">{log.info}</span>
                  </div>
                </div>
              </div>
            ))}
            {isSimulating && (
              <div className="flex space-x-2 items-center text-gray-500 p-2">
                <span className="animate-pulse">●</span>
                <span className="animate-pulse delay-75">●</span>
                <span className="animate-pulse delay-150">●</span>
                <span className="ml-2 text-[10px]">Awaiting packets...</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    // 7. HIERARCHICAL CHANNEL GROUPS (e.g. #1/2/3/4)
    if ((baseTarget.startsWith('#') || baseTarget.startsWith('$#')) && baseTarget !== '#alerts') {
      const isOper = baseTarget.startsWith('$#');
      const prefix = isOper ? '$#' : '#';
      const pathSegments = baseTarget.slice(prefix.length).split('/');
      return (
        <div className="flex flex-col min-h-[calc(100vh-140px)] bg-white pb-28">
          {/* Breadcrumb Navigation */}
          <div className="p-3 border-b border-gray-200 bg-gray-50 flex items-center space-x-1.5 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Hash className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {pathSegments.map((segment, idx) => {
              const segmentPath = '#' + pathSegments.slice(0, idx + 1).join('/');
              return (
                <React.Fragment key={idx}>
                  <button 
                    onClick={() => setAddress(segmentPath)}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                  >
                    {segment}
                  </button>
                  {idx < pathSegments.length - 1 && <span className="text-gray-300 font-light">/</span>}
                </React.Fragment>
              );
            })}
          </div>
          
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Folder className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 break-all px-4">#{pathSegments[pathSegments.length - 1]}</h2>
            <p className="text-sm text-gray-500 mt-3 max-w-xs leading-relaxed">
              You've joined a deeply nested channel group at level {pathSegments.length}.
            </p>
            
            <div className="mt-8 flex flex-col space-y-3 w-full max-w-xs">
              <button 
                onClick={() => setAddress(baseTarget + '/general')}
                className="px-4 py-3 bg-white hover:bg-gray-50 text-gray-800 text-sm font-medium rounded-lg border border-gray-200 shadow-sm flex items-center justify-between group transition-all active:scale-95"
              >
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  <span>Join Sub-channel</span>
                </div>
                <span className="text-gray-400 font-mono text-xs">/general</span>
              </button>
              <button 
                onClick={() => setAddress(address + '+raw')}
                className="px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg shadow-sm flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <Code className="w-4 h-4 text-green-400" />
                <span>Inspect Channel (+raw)</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 7. CUSTOM OBJECT PREFIX RENDERING (§+?£€￠¥₠∮∃∏∑±=×)
    if (matchedPrefixDescriptor && !isRaw && !isPm && !isRawVM && !isAOS && !isIgnore && !isBan && !isLike && !isBookmarks) {
      const objName = baseTarget.slice(matchedPrefixDescriptor.prefix.length) || 'root';
      return (
        <div className="flex flex-col min-h-[calc(100vh-140px)] bg-slate-950 text-slate-100 font-sans pb-28">
          {/* Header Banner */}
          <div className="p-5 border-b border-slate-800 bg-slate-900/90 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold font-mono ${matchedPrefixDescriptor.bgColor} ${matchedPrefixDescriptor.color} border ${matchedPrefixDescriptor.borderColor} shadow-inner`}>
                  {matchedPrefixDescriptor.prefix}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-bold text-white font-mono">{baseTarget}</h2>
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${matchedPrefixDescriptor.bgColor} ${matchedPrefixDescriptor.color} ${matchedPrefixDescriptor.borderColor}`}>
                      {matchedPrefixDescriptor.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{matchedPrefixDescriptor.name} · {matchedPrefixDescriptor.category}</p>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-1">
                {isCapS && (
                  <span className="px-2 py-0.5 bg-teal-950 text-teal-300 border border-teal-700/60 rounded text-[10px] uppercase font-bold flex items-center">
                    <ShieldCheck className="w-3 h-3 mr-1 text-teal-400" />
                    +S Trusted
                  </span>
                )}
                {isSmallS && (
                  <span className="px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-700/60 rounded text-[10px] uppercase font-bold flex items-center">
                    <ShieldAlert className="w-3 h-3 mr-1 text-amber-400" />
                    +s Untrusted
                  </span>
                )}
                <span className="text-[10px] font-mono text-slate-500">STATE: BOUND & READY</span>
              </div>
            </div>
          </div>

          {/* Description & Overview */}
          <div className="p-4 space-y-4 max-w-2xl">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Object Semantic Profile</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{matchedPrefixDescriptor.description}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs font-mono">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 block">PREFIX GLYPH</span>
                  <span className="font-bold text-slate-200">{matchedPrefixDescriptor.prefix} (U+{matchedPrefixDescriptor.prefix.charCodeAt(0).toString(16).toUpperCase()})</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 block">TARGET NODE</span>
                  <span className="font-bold text-slate-200 truncate block">{objName}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 block">SECURITY CONTEXT</span>
                  <span className={`font-bold ${isCapS ? 'text-teal-400' : isSmallS ? 'text-amber-400' : 'text-slate-300'}`}>
                    {isCapS ? '+S Trusted' : isSmallS ? '+s Untrusted' : 'Standard'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Matrix */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subsystem Operations</h3>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setAddress(baseTarget + '+raw')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Code className="w-3.5 h-3.5 text-slate-400" />
                  <span>Inspect +raw JSON</span>
                </button>
                <button 
                  onClick={() => setAddress(baseTarget + (isCapS ? '+s' : '+S'))}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Toggle +s / +S</span>
                </button>
                <button 
                  onClick={() => setAddress('#channels')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Hash className="w-3.5 h-3.5 text-blue-400" />
                  <span>Explore Directory</span>
                </button>
                <button 
                  onClick={() => setAddress('#network/handshake')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Activity className="w-3.5 h-3.5 text-green-400" />
                  <span>Trace Handshake</span>
                </button>
              </div>
            </div>

            {/* Prefix Reference Navigator */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Supported Object Prefixes (§+?£€￠¥₠∮∃∏∑±=×)</h3>
              <div className="flex flex-wrap gap-1.5">
                {PREFIX_LIST.map((p) => {
                  const desc = PREFIX_REGISTRY[p];
                  const isCurrent = matchedPrefixChar === p;
                  return (
                    <button
                      key={p}
                      onClick={() => setAddress(`${p}demo`)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1 ${
                        isCurrent 
                          ? `${desc.bgColor} ${desc.color} border ${desc.borderColor} ring-1 ring-white/20` 
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-900'
                      }`}
                      title={`${p} - ${desc.name}`}
                    >
                      <span>{p}</span>
                      <span className="text-[10px] font-normal opacity-80">{desc.badge}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 8. GENERIC OBJECT RENDERING (Fallback)
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center h-[calc(100vh-140px)]">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
          <Menu className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 break-all">{baseTarget}</h2>
        <p className="text-sm text-gray-500 mt-2">No custom view exists for this addressable object.</p>
        <button 
          onClick={() => setAddress(address + '+raw')}
          className="mt-6 px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 text-sm font-medium rounded-lg border border-gray-200 shadow-sm flex items-center space-x-2 active:scale-95"
        >
          <Code className="w-4 h-4 text-gray-500" />
          <span>View as +raw</span>
        </button>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isRaw ? 'bg-[#0d1117] text-[#c9d1d9]' : 'bg-gray-50 text-gray-900'} font-sans selection:bg-blue-200 flex flex-col`}>
      {/* Top App Bar */}
      <header className={`sticky top-0 z-20 border-b px-4 py-3 flex items-center justify-between ${isRaw ? 'bg-[#161b22] border-[#30363d] text-gray-200' : 'bg-white border-gray-200 text-gray-900'}`}>
        <div className="flex items-center space-x-3">
          <Menu className={`w-6 h-6 cursor-pointer ${isRaw ? 'text-gray-400' : 'text-gray-700'}`} />
          <h1 className="text-xl font-bold tracking-tight flex items-center flex-wrap gap-1">
            Lite Routing
            {isN && (
              <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] uppercase font-bold rounded flex items-center border border-blue-200" title="Netadmin (only) mode">
                +n Netadmin
              </span>
            )}
            {isCapN && (
              <span className="ml-1 px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold rounded flex items-center border border-emerald-200" title="Network services mode">
                <Server className="w-3 h-3 mr-1" />
                +N Services
              </span>
            )}
            {isCapS && (
              <span className="ml-1 px-1.5 py-0.5 bg-teal-100 text-teal-800 text-[10px] uppercase font-bold rounded flex items-center border border-teal-200" title="Trusted external service (+S)">
                <ShieldCheck className="w-3 h-3 mr-1 text-teal-600" />
                +S Trusted
              </span>
            )}
            {isSmallS && (
              <span className="ml-1 px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] uppercase font-bold rounded flex items-center border border-amber-200" title="Untrusted external service (+s)">
                <ShieldAlert className="w-3 h-3 mr-1 text-amber-600" />
                +s Untrusted
              </span>
            )}
            {isK && (
              <span className="ml-1 px-1.5 py-0.5 bg-amber-950 text-amber-300 text-[10px] uppercase font-bold rounded flex items-center border border-amber-800" title="Kernel mode (+k)">
                <Cpu className="w-3 h-3 mr-1 text-amber-400" />
                +k Kernel
              </span>
            )}
            {isT && (
              <span className="ml-1 px-1.5 py-0.5 bg-cyan-950 text-cyan-300 text-[10px] uppercase font-bold rounded flex items-center border border-cyan-800" title="Trace mode (+t) - Real-time event & state transition telemetry">
                <Radio className="w-3 h-3 mr-1 text-cyan-400 animate-pulse" />
                +t Trace
              </span>
            )}
            {isExplicitlyOptedOutOfTrace && (
              <span className="ml-1 px-1.5 py-0.5 bg-slate-200 text-slate-700 text-[10px] uppercase font-bold rounded flex items-center border border-slate-300 line-through decoration-slate-500" title="Explicitly opted out of trace mode (-t)">
                -t Opted-Out
              </span>
            )}
            {isV && (
              <span className="ml-1 px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold rounded flex items-center border border-emerald-300" title={baseTarget.startsWith('#') ? "Unrestricted Voice Channel (+v)" : "Voiced User / Override (+v)"}>
                <Volume2 className="w-3 h-3 mr-1 text-emerald-600" />
                {baseTarget.startsWith('#') ? '+v Unrestricted' : '+v Voice'}
              </span>
            )}
            {isO && (
              <span className={`${isN || isCapN || isCapS || isSmallS || isK || isT || isV ? 'ml-1' : 'ml-2'} px-1.5 py-0.5 bg-red-100 text-red-800 text-[10px] uppercase font-bold rounded flex items-center border border-red-200`}>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1 animate-pulse"></span>
                +o Oper
              </span>
            )}
            {isA && (
              <span className="ml-1 px-1.5 py-0.5 bg-purple-100 text-purple-800 text-[10px] uppercase font-bold rounded flex items-center border border-purple-200">
                +a Admin
              </span>
            )}
            {isMuted && (
              <span className="ml-1 px-1.5 py-0.5 bg-gray-200 text-gray-700 text-[10px] uppercase font-bold rounded flex items-center border border-gray-300">
                +m Muted
              </span>
            )}
          </h1>
        </div>
        <div className="flex items-center space-x-2 text-sm font-mono max-w-[50%]">
          <button
            onClick={() => {
              if (isDeltaModes) {
                setAddress(baseTarget);
              } else {
                setAddress(`${baseTarget}+Δmodes`);
              }
            }}
            className={`px-2 py-1 text-[11px] font-bold rounded flex items-center space-x-1 border transition-colors flex-shrink-0 ${
              isDeltaModes 
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm' 
                : isRaw 
                  ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' 
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
            }`}
            title="Open Δmodes Configuration for this object"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Δmodes</span>
          </button>
          <div className="bg-black/5 px-2 py-1 rounded overflow-hidden truncate">
            <span className={`truncate ${isRaw ? 'text-green-400' : 'text-blue-600'}`}>{address}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-md mx-auto w-full flex-1 relative">
        {renderContent()}
      </main>

      {/* Command Line Input */}
      <div className={`fixed bottom-14 left-0 right-0 max-w-md mx-auto w-full z-20 px-3 py-2 border-t ${isRaw ? 'bg-[#161b22] border-[#30363d]' : 'bg-white border-gray-200'}`}>
        <form onSubmit={handleCommandSubmit} className="relative shadow-sm">
          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isRaw ? 'text-green-500' : 'text-gray-400'}`}>
            <Terminal className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            className={`block w-full pl-9 pr-3 py-2 border rounded-md leading-5 focus:outline-none focus:ring-1 sm:text-sm ${
              isRaw 
                ? 'bg-[#0d1117] border-[#30363d] text-[#c9d1d9] focus:ring-green-500 focus:border-green-500 placeholder-gray-600' 
                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400'
            }`}
            placeholder="/join #network/handshake"
          />
        </form>
      </div>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 border-t max-w-md mx-auto w-full z-30 pb-safe h-14 ${isRaw ? 'bg-[#161b22] border-[#30363d]' : 'bg-white border-gray-200'}`}>
        <div className="flex justify-around items-center h-full">
          <button 
            onClick={() => setAddress('#feed')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${baseTarget === '#feed' && !isRaw ? 'text-blue-600' : isRaw ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-medium">#feed</span>
          </button>
          <button 
            onClick={() => setAddress('@object+bookmarks')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isBookmarks && !isRaw ? 'text-yellow-600' : isRaw ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <Bookmark className="w-6 h-6" />
            <span className="text-[10px] font-medium">Bookmarks</span>
          </button>
          <button 
            onClick={() => setAddress('@me+like')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isLike && !isRaw && !isDeltaModes ? 'text-red-500' : isRaw ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-[10px] font-medium">Likes</span>
          </button>
          <button 
            onClick={() => {
              if (isDeltaModes) {
                setAddress(baseTarget);
              } else {
                setAddress(`${baseTarget}+Δmodes`);
              }
            }}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isDeltaModes && !isRaw ? 'text-indigo-600 font-bold' : isRaw ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'}`}
            title="Edit associated modes (Δmodes)"
          >
            <Sliders className="w-6 h-6" />
            <span className="text-[10px] font-medium">Δmodes</span>
          </button>
          <button 
            onClick={toggleRawMode}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isRaw ? 'text-green-500' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <Code className="w-6 h-6" />
            <span className="text-[10px] font-medium">+raw</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
