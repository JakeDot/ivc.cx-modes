import re
with open("src/App.tsx", "r") as f:
    content = f.read()

# Insert the allModeDefinitionsMemo hook below the other new hooks
new_hook = """
  const allModeDefinitionsMemo = useMemo(() => {
    // 0. ΔMODES VIEW: Object Mode Configuration & Inheritance Matrix
    const activeBase = (baseTarget === 'Δmodes' || baseTarget === '#Δmodes' || baseTarget === 'modes') ? '#feed' : baseTarget;
    const targetNegs = negatedModes[activeBase] || [];

    const defaultO = activeBase.startsWith('$') || activeBase.startsWith('|') || activeBase.startsWith('@');
    const defaultA = activeBase.startsWith('$@') || activeBase.startsWith('|');
    const defaultN = activeBase.startsWith('~');
    const defaultCapN = activeBase.startsWith('&') || activeBase === '#network';
    const defaultCapS = activeBase.startsWith('$') || activeBase.startsWith('[') || activeBase.startsWith('&') || activeBase.startsWith('@');

    return [
      {
        flag: 'm',
        name: 'Channel Muted / Moderated',
        category: 'channel',
        desc: 'Restricts channel transmissions to voiced users (+v) and operators (+o).',
        active: derivedState.isMuted,
        inherited: derivedState.isOpersEvent,
        inheritedSource: derivedState.isOpersEvent ? '§opers event session' : undefined,
        negated: targetNegs.includes('m')
      },
      {
        flag: 'v',
        name: 'Voice & Broadcast Override',
        category: 'channel',
        desc: 'Grants speaking permission in muted (+m) channels, or sets unrestricted mode on #chan+v.',
        active: derivedState.isV,
        inherited: false,
        inheritedSource: undefined,
        negated: targetNegs.includes('v')
      },
      {
        flag: 'o',
        name: 'Channel Operator Privileges',
        category: 'channel',
        desc: 'Grants channel management rights, kick/ban capabilities, and bypasses channel restrictions.',
        active: derivedState.isO,
        inherited: Boolean(defaultO || derivedState.isOpersEvent),
        inheritedSource: defaultO ? 'Object Prefix ($ or |)' : derivedState.isOpersEvent ? 'Operator Event Bus' : undefined,
        negated: targetNegs.includes('o')
      },
      {
        flag: 'a',
        name: 'Channel Administrator',
        category: 'channel',
        desc: 'Highest channel administrative authority and governance.',
        active: derivedState.isA,
        inherited: Boolean(defaultA || derivedState.isOpersEvent),
        inheritedSource: defaultA ? 'Object Prefix ($@ or |)' : derivedState.isOpersEvent ? 'Operator Event Bus' : undefined,
        negated: targetNegs.includes('a')
      },
      {
        flag: 'k',
        name: 'Kernel Ring-0 Sandbox',
        category: 'diagnostic',
        desc: 'Enables direct low-level kernel diagnostics, register inspection, and page table view.',
        active: derivedState.isK,
        inherited: false,
        inheritedSource: undefined,
        negated: targetNegs.includes('k')
      },
      {
        flag: 't',
        name: 'Trace Telemetry Stream',
        category: 'diagnostic',
        desc: 'Captures real-time state transitions, message packets, and event dispatch telemetry.',
        active: derivedState.isT,
        inherited: Boolean(derivedState.isInheritedT),
        inheritedSource: derivedState.isInheritedT ? 'Diagnostic Probe (?*) Scope' : undefined,
        negated: targetNegs.includes('t')
      },
      {
        flag: 'n',
        name: 'Netadmin Superuser Only',
        category: 'network',
        desc: 'Restricts object interaction exclusively to verified network administrators.',
        active: derivedState.isN,
        inherited: Boolean(defaultN || derivedState.isOpersEvent),
        inheritedSource: defaultN ? 'Superuser Scope (~root)' : undefined,
        negated: targetNegs.includes('n')
      },
      {
        flag: 'N',
        name: 'Network Services Daemon',
        category: 'network',
        desc: 'Enables network services (NickServ, ChanServ, OperServ) daemon bindings.',
        active: derivedState.isCapN,
        inherited: Boolean(defaultCapN),
        inheritedSource: defaultCapN ? '&services or #network cluster' : undefined,
        negated: targetNegs.includes('N')
      },
      {
        flag: 'S',
        name: 'Trusted External Service',
        category: 'security',
        desc: 'Verified trusted service tier. Auto-applied to $ai.model and [$@&] objects.',
        active: derivedState.isCapS,
        inherited: Boolean(defaultCapS),
        inheritedSource: defaultCapS ? 'Auto-applied (AI model / [$@&] scope)' : undefined,
        negated: targetNegs.includes('S')
      },
      {
        flag: 's',
        name: 'Untrusted Origin / Remote',
        category: 'security',
        desc: 'Untrusted client stream flag. Auto-applied unless +S is present.',
        active: derivedState.isSmallS,
        inherited: false,
        inheritedSource: undefined,
        negated: targetNegs.includes('s')
      }
    ];
  }, [baseTarget, negatedModes, derivedState]);

  const activeModeDefinitionsMemo = useMemo(() => {
    return allModeDefinitionsMemo.filter(m => m.active && !m.negated).map(m => `+${m.flag}`).join('');
  }, [allModeDefinitionsMemo]);
"""

content = content.replace("  const filteredTargetSubObjectsMemo = useMemo(() => {", new_hook + "\n  const filteredTargetSubObjectsMemo = useMemo(() => {")

# Delete the inline allModeDefinitions block
regex = r"      const allModeDefinitions = \[\s+{(?:[^{}]*|{[^{}]*})*}\s+\];"
content = re.sub(r"      // Mode matrix definitions\s+const allModeDefinitions = \[[\s\S]*?\}\n      \];", "", content)

# Fix references in renderContent
content = content.replace("allModeDefinitions.map(", "allModeDefinitionsMemo.map(")
content = content.replace("allModeDefinitions.filter(m => m.active && !m.negated).map(m => `+${m.flag}`).join('')", "activeModeDefinitionsMemo")

with open("src/App.tsx", "w") as f:
    f.write(content)
print("Replaced!")
