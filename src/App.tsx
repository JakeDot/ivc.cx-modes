import React, { useState, useEffect, useRef } from 'react';
import { Home, Search, Bell, Menu, User, MessageSquare, Heart, Share2, MoreHorizontal, GitCommit, Code, Terminal, Send, Hash, ChevronRight, Folder, Bookmark, EyeOff, Ban, Server, Activity, PlaySquare, Sparkles, Settings, Database, ShieldCheck, ShieldAlert, Cpu, Coins, Layers, Zap, Workflow, Binary, GitFork, Gauge, Radio, Volume2, Mic, CheckCircle2, Sliders, SlidersHorizontal, RotateCcw, Check, Copy, Plus, Minus, ArrowRight, Shield, Info, History, Clock, UserCheck, Filter } from 'lucide-react';

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

  // Model Chat States
  const [modelChats, setModelChats] = useState<Record<string, {role: string, text: string}[]>>(() => {
    try { return JSON.parse(localStorage.getItem('lite_modelChats') || '{}'); } catch { return {}; }
  });
  const [modelChatInput, setModelChatInput] = useState('');
  const [modelLoading, setModelLoading] = useState<Record<string, boolean>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

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
  useEffect(() => {
    localStorage.setItem('lite_bookmarks', JSON.stringify(bookmarks));
    localStorage.setItem('lite_likes', JSON.stringify(likes));
    localStorage.setItem('lite_ignored', JSON.stringify(ignored));
    localStorage.setItem('lite_banned', JSON.stringify(banned));
    localStorage.setItem('lite_modelChats', JSON.stringify(modelChats));
    localStorage.setItem('lite_negatedModes', JSON.stringify(negatedModes));
  }, [bookmarks, likes, ignored, banned, modelChats, negatedModes]);

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

  const isRaw = modifiers.includes('raw');
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
  
  // Object hierarchy logic (~ for Netadmin only, $ for Oper, | for Admin, & for Network Services)
  const isModel = baseTarget.startsWith('$') && !baseTarget.startsWith('$@') && !baseTarget.startsWith('$#');
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
  }, [modelChats, baseTarget]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commandInput.trim().startsWith('/join ')) {
      const target = commandInput.trim().slice(6);
      setAddress(target);
    } else if (commandInput.trim() === '/mode' || commandInput.trim() === '/modes' || commandInput.trim() === '/delta' || commandInput.trim() === '/Δmodes') {
      setAddress(`${baseTarget}+Δmodes`);
    } else if (commandInput.trim().startsWith('/mode ')) {
      const rawCmd = commandInput.trim().slice(6).trim();
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
    }
    setCommandInput('');
  };

  const toggleRawMode = () => {
    if (isRaw) {
      setAddress(address.replace('+raw', ''));
    } else {
      setAddress(address + '+raw');
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

  const handleModelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentTarget = baseTarget;
    if (!modelChatInput.trim() || modelLoading[currentTarget]) return;
    
    const userMsg = modelChatInput;
    setModelChatInput('');
    setModelLoading(prev => ({ ...prev, [currentTarget]: true }));

    // Temporarily add +l modifier to current address
    setAddress(prev => {
      if (prev.split('+')[0] === currentTarget && !prev.split('+').includes('l')) {
        return prev + '+l';
      }
      return prev;
    });

    const modelName = currentTarget.substring(1); // strip '$'
    
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
        })
      });
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to fetch response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      setModelChats(prev => {
        const currentHistory = prev[currentTarget] || [];
        return { ...prev, [currentTarget]: [...currentHistory, { role: 'model', text: '' }] };
      });

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
                setModelChats(prev => {
                  const currentHistory = prev[currentTarget] || [];
                  const newHistory = [...currentHistory];
                  newHistory[newHistory.length - 1].text = chunkText;
                  return { ...prev, [currentTarget]: newHistory };
                });
              } catch (e) {}
            }
          }
        }
      }
    } catch (err: any) {
      console.error(err);
      setModelChats(prev => {
        const currentHistory = prev[currentTarget] || [];
        return { ...prev, [currentTarget]: [...currentHistory, { role: 'model', text: `Error: ${err.message || 'Connection failed'}` }] };
      });
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

              <button
                onClick={() => setAddress(activeBase)}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded text-xs font-bold transition-colors flex items-center space-x-1"
              >
                <span>Exit Δmodes</span>
              </button>
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

    // 1. RAW MODE RENDERING
    if (isRaw) {
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

      return (
        <div className="p-4 overflow-x-auto h-full">
          <div className="mb-4 flex items-center space-x-2 text-[#7ee787] border-b border-[#30363d] pb-2">
            <Code className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-wider">Object Inspector: {address}</span>
          </div>
          <pre className="text-[10px] sm:text-[11px] font-mono text-[#7ee787] leading-relaxed">
            {JSON.stringify(debugObj, null, 2)}
          </pre>
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

    // 4. SUBOBJECTS RENDERING (+ignore, +ban, +like, +bookmarks, +pm, +raw-vm, +ao-s)
    if (isModel && !isRaw) {
      const history = modelChats[baseTarget] || [];
      const modelName = baseTarget.substring(1);
      const isLoading = modelLoading[baseTarget] || isL;
      
      return (
        <div className="flex flex-col h-[calc(100vh-140px)]">
          <div className="p-4 border-b border-indigo-200 bg-indigo-50 sticky top-0 flex justify-between items-center z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-200 text-indigo-700 rounded-lg flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold leading-tight text-indigo-900">
                  Trusted Object
                </h2>
                <p className="text-xs text-indigo-600 font-mono">
                  {modelName}{isLoading ? '+l' : ''} (Bi-directional)
                </p>
              </div>
            </div>
            <button 
              onClick={() => setAddress(address + '+raw')}
              className="flex items-center space-x-1 px-2 py-1 bg-indigo-200 text-indigo-800 text-[10px] font-bold rounded uppercase tracking-widest hover:bg-indigo-300 transition-colors"
            >
              <Code className="w-3 h-3" />
              <span>RAW</span>
            </button>
          </div>
          
          <div className="flex-1 p-4 flex flex-col space-y-4 overflow-y-auto bg-gray-50 pb-20">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-indigo-300">
                <Sparkles className="w-12 h-12 mb-3 text-indigo-200" />
                <p className="text-sm font-medium">Session initialized. Send a message to invoke {modelName}.</p>
              </div>
            ) : (
              history.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`rounded-2xl px-4 py-3 max-w-[85%] shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-sm' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                  }`}>
                    <p className={`text-[13px] leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? '' : 'font-mono'}`}>
                      {msg.text}
                    </p>
                    {msg.role === 'model' && msg.text.length === 0 && isLoading && i === history.length - 1 && (
                      <div className="flex items-center space-x-1 mt-1">
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

          <form onSubmit={handleModelSubmit} className="p-3 bg-white border-t border-gray-200 flex flex-col space-y-2 relative">
            <div className="flex items-center space-x-2 text-xs text-indigo-600 font-mono px-2">
              <Terminal className="w-3 h-3" />
              <span>Input stream active:</span>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                value={modelChatInput}
                onChange={e => setModelChatInput(e.target.value)}
                placeholder="Type your message..." 
                disabled={isLoading}
                className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono disabled:opacity-50" 
              />
              <button 
                type="submit"
                disabled={!modelChatInput.trim() || isLoading}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0 transition-all active:scale-95 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </form>
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
      return (
        <div className="flex flex-col bg-white min-h-[calc(100vh-140px)] pb-28">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-bold text-gray-900">Channel Directory</h2>
            <p className="text-sm text-gray-500 mt-1">Explore available addressable groups.</p>
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
