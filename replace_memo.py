import re
with open("src/App.tsx", "r") as f:
    content = f.read()

# Insert the new hooks below visiblePostsMemo
new_hooks = """
  // ⚡ Bolt Optimization: Memoized TargetProps and TargetSubObjects to avoid redundant object generation and search filtering on every render tick
  const filteredTargetPropsMemo = useMemo(() => {
    const props = getObjectProps(baseTarget);
    if (!propsSearchFilter) return props;
    const lowerFilter = propsSearchFilter.toLowerCase();
    return props.filter(p => p.key.toLowerCase().includes(lowerFilter));
  }, [baseTarget, propsSearchFilter, objectPropsStore]);

  const filteredTargetSubObjectsMemo = useMemo(() => {
    const subs = getGeneratedSubObjects(baseTarget);
    if (!subObjectSearchFilter) return subs;
    const lowerFilter = subObjectSearchFilter.toLowerCase();
    return subs.filter(s => s.path.toLowerCase().includes(lowerFilter) || s.description.toLowerCase().includes(lowerFilter));
  }, [baseTarget, subObjectSearchFilter]);
"""

content = content.replace("  // Scroll to bottom of chat when it updates", new_hooks + "\n  // Scroll to bottom of chat when it updates")

# Fix references in renderContent
content = content.replace(
    "TargetProps.filter(p => p.key.toLowerCase().includes(propsSearchFilter.toLowerCase())).length === 0",
    "filteredTargetPropsMemo.length === 0"
)

content = content.replace(
    "TargetProps.filter(p => p.key.toLowerCase().includes(propsSearchFilter.toLowerCase())).map(prop => (",
    "filteredTargetPropsMemo.map(prop => ("
)

content = content.replace(
    "TargetSubObjects.filter(s => s.path.toLowerCase().includes(subObjectSearchFilter.toLowerCase()) || s.description.toLowerCase().includes(subObjectSearchFilter.toLowerCase())).length === 0",
    "filteredTargetSubObjectsMemo.length === 0"
)

content = content.replace(
    "TargetSubObjects.filter(s => s.path.toLowerCase().includes(subObjectSearchFilter.toLowerCase()) || s.description.toLowerCase().includes(subObjectSearchFilter.toLowerCase())).map((sub, idx) => (",
    "filteredTargetSubObjectsMemo.map((sub, idx) => ("
)

with open("src/App.tsx", "w") as f:
    f.write(content)
print("Replaced!")
