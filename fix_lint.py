with open("src/App.tsx", "r") as f:
    content = f.read()

content = content.replace("allModeDefinitions.find", "allModeDefinitionsMemo.find")
with open("src/App.tsx", "w") as f:
    f.write(content)
