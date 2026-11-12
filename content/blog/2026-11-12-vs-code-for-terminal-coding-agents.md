---
title: "How I Got My Project Habit Back: Claude Code in VS Code"
date: "2026-11-12"
excerpt: "When I moved from Cursor to Claude Code, my progress stalled. The agent wasn't the problem: my projects had dropped out of view. This is the VS Code setup that brought them back."
author: "Swarup Donepudi"
tags: ["claude-code", "vs-code", "coding-agents", "projects", "developer-tools"]
cover_embed: "projects-mode"
featured_image: "/blog/images/2026-11-12-vs-code-for-terminal-coding-agents.cover.png"
share_kicker: "Claude Code · VS Code · projects"
---

> The simple goal of completing the projects is what helped me to make constant progress.

I wrote that line in my journal one morning this week, while trying to work out why I felt stuck.

Until the middle of October, I was using Cursor, and I kept making progress. Every piece of work that takes more than one session lives in my repo as a project: a folder named by the date it started and the outcome it's for, with a `next.md` file that says where it stands and what comes next. In Cursor, that projects folder was always there in the file explorer, right beside the agent chats. I'd look at the list, pick a project, drag its `next.md` into a chat, and work it to the end. The list kept me honest. The goal was simply to complete the projects.

Then I moved to Claude Code, in the terminal. I feel like coding agents in the terminal have an edge in capabilities over the agents built into IDEs, and Claude Code was proving great at executing the work. But ever since I moved, my progress stalled.

When I wrote it out, the root cause was clear. The terminal took away the project completion habit I built in Cursor. The file explorer that always showed me my projects was no longer in my field of view, so I was picking up random things through the day, based on whatever goals I wrote down that morning. There is a lot of work to be completed, and Claude Code can complete all of it. I just needed to get back to that "complete the projects" mindset.

That discovery led me to the fix. I brought Claude Code into VS Code's terminal. The projects folder sits in the explorer on the left, the agents run in terminal tabs on the right, and I drag a project's `next.md` straight into an agent session. It's the same experience I enjoyed in Cursor for months, now with Claude Code, and honestly, it's ridiculously powerful. I feel like I got back into my Iron Man suit once again.

> [!TIP] Dragging a file into a terminal tab
> Drag a file from VS Code's explorer onto a terminal tab, and VS Code types the file's path into it. In a Claude Code session, that's how a project's `next.md` becomes the next instruction.

Getting there took a day of work. VS Code's terminal didn't feel like my terminal: the colours were different, the font was different, and none of my iTerm shortcuts worked. And every time I quit VS Code, every agent session I had open was gone. In Cursor, my agent chats came back after a restart. In a plain terminal, quitting means starting over.

So I made VS Code's terminal work like iTerm, plus one thing iTerm doesn't do: bring every agent back after a restart. I start Claude with `claude --chrome`, which lets it work in my Chrome browser, and that works exactly the same way in VS Code's terminal. This post is what I did, what broke along the way, and, at the end, a prompt you can hand to your own coding agent to get the same setup on your Mac.

## What I ended up with

- **My projects are back in view.** The projects folder in the explorer, the agents in terminal tabs beside it, and a project's `next.md` dragged straight into a session.
- **It looks like my iTerm.** The Cursor Dark Midnight theme, SF Mono at 14, line spacing of 1.35, and calm blue-grey text (#8b97ae on #1e2127).
- **It works like iTerm on the keyboard.** `⌘T` opens a new tab that's already running `claude --chrome`. `⌘W` closes the tab. `⌘R` clears the screen and keeps the scrollback. `⌘1` to `⌘9` jump to a tab, `⌘0` focuses the terminal, and `⌘⇧↩` focuses it and maximises it, from anywhere in the window.
- **It's quiet.** No extension recommendations, no "History restored" banners, no Python interpreter popups, no screen reader prompt. `⌘W` asks before it closes the whole window, and the windows I had open come back when I reopen VS Code.
- **Agent tabs survive a restart.** I quit with five Claude tabs open, I reopen, and all five are back, each in its own conversation.
- **Any Mac gets it with one command.** The whole setup lives in a small public repo.

## How I did it

### 1. The look

I was coming from Cursor, so I wanted Cursor's Midnight theme. On this Mac I had a local copy of it, but I wanted to publish my setup, and that copy carried no license. So I looked for it on the Marketplace. [Cursor Themes for VS Code](https://marketplace.visualstudio.com/items?itemName=evanlong.cursor-themes) has a "Cursor Dark Midnight" too. I compared the two: all 240 UI colours and all 132 syntax colour rules, zero differences. Same theme, and anyone can install it.

Then I gave the terminal my iTerm colours. This is the difference:

![[terminal-before-after]]

VS Code lets you scope colour overrides to one theme, so they only apply when Midnight is on:

```json title="settings.json"
"workbench.colorTheme": "Cursor Dark Midnight",
"workbench.colorCustomizations": {
    "[Cursor Dark Midnight]": {
        "terminal.background": "#1e2127",
        "terminal.foreground": "#8b97ae",
        "terminal.selectionBackground": "#434c5e",
        "terminal.selectionForeground": "#eceff4",
        "terminalCursor.foreground": "#8fbcbb",
        "terminalCursor.background": "#1e2127"
    }
},
"terminal.integrated.fontFamily": "SF Mono",
"terminal.integrated.fontSize": 14,
"terminal.integrated.lineHeight": 1.35,
"terminal.integrated.minimumContrastRatio": 1,
"terminal.integrated.drawBoldTextInBrightColors": true
```

Two things here aren't obvious.

**SF Mono isn't available to apps by default.** macOS ships it, but only inside Terminal.app. You copy it out once:

```sh
cp /System/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/SF-Mono-*.otf ~/Library/Fonts/
```

**VS Code changes your colours on purpose.** By default it nudges terminal text colours to meet a contrast ratio, so my calm grey came out different from iTerm. Setting `minimumContrastRatio` to 1 turns that off, and the colours are exactly the ones you set.

> [!NOTE] One thing I couldn't match
> iTerm lets you pick a colour for bold text, and VS Code's terminal has no setting for that. `drawBoldTextInBrightColors` is the closest it gets.

### 2. The keys

This is where most of the time went. The iTerm shortcuts I use all day don't exist in VS Code's terminal, or they do something else. This is what I ended up with:

| Keys | What it does | Works from |
|---|---|---|
| `⌘T` | New tab, already running `claude --chrome` | Anywhere, even with no terminal open |
| `⌘W` | Close the terminal tab | The terminal |
| `⌘R` | Clear the screen, keep the scrollback | The terminal |
| `⌘1` … `⌘9` | Jump to terminal tab 1 to 9 | Anywhere |
| `⌘0` | Focus the terminal, the tab you were last in | Anywhere |
| `⌘⇧↩` | Focus the terminal and maximise it | Anywhere |

And here are the bindings behind them:

```json title="keybindings.json"
{ "key": "cmd+t", "command": "agentTabs.newTab" },
{ "key": "cmd+w", "command": "workbench.action.terminal.kill", "when": "terminalFocus" },
{ "key": "cmd+r", "command": "workbench.action.terminal.sendSequence", "when": "terminalFocus", "args": { "text": "\f" } },
{ "key": "cmd+0", "command": "workbench.action.terminal.focus" },
{ "key": "cmd+1", "command": "workbench.action.terminal.focusAtIndex1" },
{ "key": "cmd+shift+enter", "command": "workbench.action.toggleMaximizedPanel", "when": "terminalFocus" },
{ "key": "cmd+shift+enter", "command": "runCommands", "when": "!terminalFocus && !panelMaximized", "args": { "commands": ["workbench.action.terminal.focus", "workbench.action.toggleMaximizedPanel"] } },
{ "key": "cmd+shift+enter", "command": "workbench.action.terminal.focus", "when": "!terminalFocus && panelMaximized" }
```

`⌘2` to `⌘9` follow the same pattern as `⌘1`. A few of these taught me something.

**`⌘R` first wiped my history.** I bound it to VS Code's "clear terminal" command, and it cleared the scrollback too. In iTerm I can still scroll up after ⌘R, and I wanted that. The fix is to send Ctrl+L (the `\f` above) to whatever runs in the terminal instead. The shell clears the screen, and everything above is still there. Inside Claude Code, Ctrl+L redraws the screen.

**Shortcuts that only work in the terminal aren't enough.** My first bindings all had `"when": "terminalFocus"`, so they only worked while the terminal had focus. But half the time I'm in a file and want to jump to tab 3, or open a new tab when no terminal is open at all. So `⌘T`, `⌘0` and `⌘1` to `⌘9` have no `when`, and they work from anywhere. They replace VS Code's defaults for those keys (Go to Symbol in Workspace, and moving focus between editor groups and the side bar), which I never use.

**`⌘⇧↩` needed three bindings.** One maximises when you're already in the terminal. One focuses and maximises from anywhere else. The third covers the case where the panel is already maximised but you're somewhere else: it only brings focus back, instead of shrinking the panel.

**`⌘T` asked me for a folder.** My workspace has several folders, so VS Code's new terminal asked which one to open in, every time. I wanted `⌘T` to open straight into my main repo and start Claude there. That's now part of Agent Tabs, below: it opens in the folder you name, or in the first folder of the workspace.

### 3. The quiet

```json title="settings.json"
"extensions.ignoreRecommendations": true,
"window.confirmBeforeClose": "keyboardOnly",
"window.restoreWindows": "preserve",
"editor.accessibilitySupport": "off"
```

I hate those extension recommendations, and the first line turns them off for good. The Python popups came from the Python and Pylance extensions asking me to pick an interpreter. I don't write Python in VS Code, so I uninstalled them, along with a few other extensions I never use. My exact reaction to the Pylance notice isn't printable here.

`confirmBeforeClose` is there because `⌘W` in the wrong place closes the whole window. `restoreWindows` reopens the windows I had when I quit. `accessibilitySupport` stops VS Code asking whether I use a screen reader.

> [!WARNING] Using a screen reader?
> Leave the `accessibilitySupport` line out. It turns off what VS Code does for screen readers.

### 4. Agent tabs that survive a restart

This was the one I cared about most. I asked whether the terminal sessions could be preserved and reopened, because right now, if I quit and reopen, every terminal session is lost.

VS Code can restore terminals, but it can't bring back the processes inside them. What you get is a dead copy of each tab. When I thought about it, though, the conversation was never the process. Claude Code saves every conversation to disk, and `claude --resume <id>` brings one back with its full history. So nothing has to keep running. VS Code only has to remember which tab held which conversation.

The hard part is knowing which conversation runs in which tab. The session ID changes when you `/clear`, when you `/resume` another chat, or when you type `claude` again yourself. Guessing from the outside would break all the time. So I let Claude report it.

![[agent-tabs-replay]]

I built that into a small open-source tool called [Agent Tabs](https://github.com/swarupdonepudi/agent-tabs). It's a VS Code extension plus a Claude Code plugin, and this is how it works:

![[agent-tabs-flow]]

One detail mattered a lot: telling a close from a quit. VS Code tells an extension why a terminal went away. If I closed the tab, or the shell exited, Agent Tabs forgets it. If VS Code is shutting down, it keeps it for next time.

You also want VS Code's own terminal restore off, or you get a dead copy of every tab next to the live one:

```json title="settings.json"
"terminal.integrated.enablePersistentSessions": false,
"agentTabs.extraArgs": ["--chrome"]
```

`extraArgs` is how every tab starts as `claude --chrome`. The folder `⌘T` opens in is the `agentTabs.defaultFolder` setting, and without it, the first folder of the workspace. My settings file is shared between my Macs, so I set the folder with an environment variable instead, `AGENT_TABS_FOLDER`, and each Mac picks its own.

I wanted this open source from the start, in a way my team could use it elegantly, and maybe others in the broader community who want the same thing. It's MIT licensed, and it's agent-neutral: Claude Code is the first agent, and an adapter for another agent is about 15 lines.

> [!NOTE] One honest limit
> A reply the agent was in the middle of writing when you quit is lost. The conversation comes back at its last saved point, and you type "continue".

### 5. One repo for every Mac

Then I wanted my other Mac to behave exactly like this one. My first plans were bigger: Settings Sync plus a script, and then a whole "Mac as code" repo. That seemed like overkill. What I actually wanted was one repo called `vscode` that contains everything that sets up VS Code on any computer.

That's [swarupdonepudi/vscode](https://github.com/swarupdonepudi/vscode). It has four files that matter:

- `settings.json` and `keybindings.json`, linked into VS Code's settings folder, so any change I make in VS Code lands in the repo.
- `extensions.txt`, the Marketplace extensions.
- `setup.sh`, which installs VS Code if it's missing, copies SF Mono, links the two files (saving whatever was there), installs the extensions and Agent Tabs, and adds the Claude Code plugin.

`setup.sh` is safe to run again. On my other Mac it's `git pull && ./setup.sh`, and everything matches. Because the repo is public, it has no third-party files in it. The theme comes from the Marketplace, and the font comes from the Mac itself.

### 6. A bonus: the slow terminal

Once all this worked, I noticed every new tab took a moment before the prompt showed up. So I timed it. A new zsh took 0.57 seconds to start, and 0.44 of those were nvm, which checks your default Node version every time a shell starts.

The fix is to load nvm without that check and put the default version's `bin` folder on the PATH yourself:

```zsh title="~/.zshrc"
export NVM_DIR="$HOME/.nvm"
[ -s /opt/homebrew/opt/nvm/nvm.sh ] && . /opt/homebrew/opt/nvm/nvm.sh --no-use
if [[ -r "$NVM_DIR/alias/default" ]]; then
  nvm_default=$(<"$NVM_DIR/alias/default")
  nvm_bins=("$NVM_DIR"/versions/node/v${nvm_default#v}*/bin(N/nOn))
  (( $#nvm_bins )) && path=($nvm_bins[1] $path)
  unset nvm_default nvm_bins
fi
```

New tabs now start in 0.16 seconds, with the same Node version, and `nvm use` still works. This is zsh. It works when your default is a version number, like `24`. If it's a name like `lts/*`, keep the plain load.

## What didn't work the first time

| What broke | What fixed it |
|---|---|
| `⌘R` cleared my scrollback | Sending Ctrl+L to the shell instead |
| `⌘T` asked for a folder in a multi-folder workspace | Agent Tabs opens in a named folder |
| Shortcuts bound to `terminalFocus` did nothing from a file | The global ones have no `when` |
| The Python interpreter popup kept showing after I uninstalled the Python extensions | It went away after the window reloaded |
| I couldn't set a bold text colour | Nothing: VS Code's terminal has no setting for it |
| VS Code's own terminal restore brought back dead tabs | Turning it off, and letting Agent Tabs do the restore |
| The theme I had locally carried no license | The identical Marketplace version, so the public repo has no theme files |

## Want this setup? Give this to your coding agent

Copy the prompt below and paste it into Claude Code, Codex or Cursor on your Mac. Your agent checks what you already have, backs up every file before changing it, merges into your settings instead of replacing them, asks before anything risky or third-party, and keeps a manifest of what it changed, so you can undo it. It's safe to run twice. I had a fresh agent read the prompt cold and pick holes in it before I published it.

If you'd rather have my exact files, linked and kept in step with mine, clone [the repo](https://github.com/swarupdonepudi/vscode) and run `setup.sh`. The prompt is better if you have your own settings you want to keep.

```prompt
Set up VS Code on this Mac for running coding agents (Claude Code first) in VS Code's terminal. The goal: the terminal looks calm (the Cursor Dark Midnight theme, SF Mono), works like iTerm on the keyboard, stays quiet, and brings Claude Code tabs back after VS Code restarts. The setup is explained at https://donepudi.me/blog/vs-code-for-terminal-coding-agents/ and its files are at https://github.com/swarupdonepudi/vscode

RULES FOR THE WHOLE JOB
- macOS only. If this isn't macOS, stop and say so.
- Check before you change. For each step, first check whether it's already done. If it is, say "already in place" and move on. Running this prompt a second time must change nothing.
- Back up before you edit. The first time this run changes anything (a backup, a new file or folder, or an install), create one folder: $HOME/vscode-setup-backup-YYYYMMDD-HHMMSS (the current date and time). Copy every existing file into it before you change it. A run that changes nothing creates no folder.
- Keep a manifest. In that folder, keep manifest.txt up to date as you go: every file backed up (with its original path), every file or folder created, every extension installed or upgraded (with the version it had before, if any), every marketplace and plugin added, and the exact CODE path used.
- Merge, don't replace. Keep every setting and keybinding the user already has. When a value below would change one the user set, show both and ask which to keep.
- Ask before anything destructive, global or third-party: installing Homebrew or VS Code, overwriting a file, deleting anything, editing a shell startup file, or installing code from outside the VS Code Marketplace. Never uninstall anything.
- Verify each step right after it, using its check, and report pass or fail. If a step fails, say why, skip what depends on it, and carry on with the rest.
- Don't rely on python3 or node unless they already run without a prompt: on a stock Mac, python3 only opens the "install developer tools" popup. To check that a JSONC file parses, use the built-in JavaScript for Automation: run osascript -l JavaScript with a short script that reads the file, removes // and /* */ comments that are outside strings, removes trailing commas before } or ], and calls JSON.parse.
- VS Code's settings.json and keybindings.json are JSONC: they may contain comments and trailing commas. Don't load them with a strict parser and write them back, or the user's comments are lost. Edit them as text, then confirm they still parse (as above).
- The user doesn't need to quit VS Code while you work. They restart it at the end (step 9).

STEP 1. VS CODE AND ITS COMMAND LINE
- Check: "/Applications/Visual Studio Code.app" or "$HOME/Applications/Visual Studio Code.app" exists. Call the one found APP.
- If neither exists, ask the user whether to install it with Homebrew ("brew install --cask visual-studio-code", only if "brew" already exists) or to download it themselves from https://code.visualstudio.com. If they download it, stop and wait until they say it's installed, then check again. Don't install Homebrew yourself.
- The command line: CODE is "APP/Contents/Resources/app/bin/code". Use that full path, not a "code" on PATH, which may belong to another editor.
- Verify: CODE --version prints a version number.
- The VS Code profile. If the folder $HOME/Library/Application Support/Code/User/profiles/ exists, the user may use more than one VS Code profile. Ask which one to set up, and call it PROFILE (Default if there's only one). If PROFILE isn't Default, add --profile "<PROFILE>" to every CODE --list-extensions, --install-extension and --uninstall-extension call below, and edit that profile's settings.json and keybindings.json in steps 5 and 6.

STEP 2. ONE QUESTION UP FRONT: AGENT TABS
Agent Tabs (https://github.com/swarupdonepudi/agent-tabs, MIT) is what brings Claude Code tabs back after a restart. It has two parts:
- a VS Code extension, installed from a .vsix file on its GitHub releases page (not the Marketplace), and
- a Claude Code plugin whose hook runs whenever a Claude session starts or ends, and writes that tab's session ID to small files under $HOME/.agent-tabs/.
It needs Claude Code. Check "claude --version".
If swarupdonepudi.agent-tabs is already in CODE --list-extensions and "claude plugin list" shows agent-tabs@agent-tabs, set AGENT_TABS = yes, say "already in place" and don't ask.
Otherwise, tell the user what it is and does, as above, and ask whether to install it. If Claude Code is missing, say so, point them to https://claude.com/claude-code, and ask whether to skip Agent Tabs or wait while they install Claude Code. Remember the answer as AGENT_TABS = yes or no. Steps 5, 6 and 7 use it.

STEP 3. THE SF MONO FONT
- Check: SF-Mono-Regular.otf is in $HOME/Library/Fonts or /Library/Fonts.
- If not: macOS ships SF Mono inside Terminal.app. Copy each /System/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/SF-Mono-*.otf into $HOME/Library/Fonts/ (create the folder if needed), skipping files already there. Record the copied files in the manifest.
- If Terminal.app has no SF Mono files, say so. The font setting in step 5 falls back to Menlo by itself.
- Verify: SF-Mono-Regular.otf is in $HOME/Library/Fonts or /Library/Fonts.

STEP 4. EXTENSIONS
- Check: CODE --list-extensions (compare IDs case-insensitively).
- Install evanlong.cursor-themes (the Cursor Dark Midnight theme) if it's missing: CODE --install-extension evanlong.cursor-themes.
- Ask whether the user also wants yzhang.markdown-all-in-one (Markdown editing). It's part of the original setup but not needed for the terminal. Install it only with a yes.
- Verify: the installed IDs appear in CODE --list-extensions.

STEP 5. SETTINGS
- Which file: $HOME/Library/Application Support/Code/User/settings.json for the Default profile, or the chosen PROFILE's own settings.json under User/profiles/ (step 1). If Settings Sync is on (ask if unsure), tell the user that Sync will carry these changes to their other machines.
- If the folder doesn't exist, create it (mkdir -p). If the file doesn't exist, create it containing {}. If it's a symbolic link, tell the user where it points and ask before editing it.
- Merge in these keys:

    "workbench.colorTheme": "Cursor Dark Midnight",
    "workbench.colorCustomizations": {
        "[Cursor Dark Midnight]": {
            "terminal.background": "#1e2127",
            "terminal.foreground": "#8b97ae",
            "terminal.selectionBackground": "#434c5e",
            "terminal.selectionForeground": "#eceff4",
            "terminalCursor.foreground": "#8fbcbb",
            "terminalCursor.background": "#1e2127"
        }
    },
    "terminal.integrated.fontFamily": "'SF Mono', Menlo, monospace",
    "terminal.integrated.fontSize": 14,
    "terminal.integrated.lineHeight": 1.35,
    "terminal.integrated.minimumContrastRatio": 1,
    "terminal.integrated.drawBoldTextInBrightColors": true,
    "window.confirmBeforeClose": "keyboardOnly",
    "window.restoreWindows": "preserve",
    "extensions.ignoreRecommendations": true,
    "editor.accessibilitySupport": "off"

- Only if AGENT_TABS is yes, also merge:

    "terminal.integrated.enablePersistentSessions": false

  This turns off VS Code's own terminal restore. Otherwise every agent tab comes back twice after a restart: once live (from Agent Tabs) and once dead. Tell the user it also means ordinary, non-agent terminals no longer come back.
- If "workbench.colorCustomizations" already exists, add the "[Cursor Dark Midnight]" block inside it and keep everything else. If that block exists, merge these six keys into it.
- "editor.accessibilitySupport": "off" stops VS Code asking about screen readers. Ask the user first whether they use a screen reader. If they do, leave this key out.
- "terminal.integrated.minimumContrastRatio": 1 stops VS Code shifting the terminal colours.
- Verify: the file parses (see the rules), and each key has the value above or the one the user chose.

STEP 6. KEYBOARD SHORTCUTS
- File: keybindings.json in the same folder as the settings.json you used in step 5. If it doesn't exist, create it containing []. Same rules: back up, merge, keep comments.
- Add each entry below unless an identical entry is already there. Before adding, look for any existing entry with the same "key", whatever its "when", including removal entries (a "command" starting with "-"). Ignore entries identical to one in the list below; if you find any other, show it and ask what to do.
- The Cmd+T command: "agentTabs.newTab" if AGENT_TABS is yes, otherwise "workbench.action.terminal.new".
- In the cmd+r entry, "\f" is two characters, a backslash and the letter f, written exactly like that in the file. Don't let printf or echo turn it into a form-feed byte.

    { "key": "cmd+t", "command": "<the Cmd+T command above>" },
    { "key": "cmd+w", "command": "workbench.action.terminal.kill", "when": "terminalFocus" },
    { "key": "cmd+r", "command": "workbench.action.terminal.sendSequence", "when": "terminalFocus", "args": { "text": "\f" } },
    { "key": "cmd+shift+enter", "command": "workbench.action.toggleMaximizedPanel", "when": "terminalFocus" },
    { "key": "cmd+shift+enter", "command": "runCommands", "when": "!terminalFocus && !panelMaximized", "args": { "commands": ["workbench.action.terminal.focus", "workbench.action.toggleMaximizedPanel"] } },
    { "key": "cmd+shift+enter", "command": "workbench.action.terminal.focus", "when": "!terminalFocus && panelMaximized" },
    { "key": "cmd+0", "command": "workbench.action.terminal.focus" },
    { "key": "cmd+1", "command": "workbench.action.terminal.focusAtIndex1" },
    { "key": "cmd+2", "command": "workbench.action.terminal.focusAtIndex2" },
    { "key": "cmd+3", "command": "workbench.action.terminal.focusAtIndex3" },
    { "key": "cmd+4", "command": "workbench.action.terminal.focusAtIndex4" },
    { "key": "cmd+5", "command": "workbench.action.terminal.focusAtIndex5" },
    { "key": "cmd+6", "command": "workbench.action.terminal.focusAtIndex6" },
    { "key": "cmd+7", "command": "workbench.action.terminal.focusAtIndex7" },
    { "key": "cmd+8", "command": "workbench.action.terminal.focusAtIndex8" },
    { "key": "cmd+9", "command": "workbench.action.terminal.focusAtIndex9" }

- What they do: Cmd+T opens a new terminal tab (running Claude Code, with Agent Tabs). Cmd+W closes the terminal tab. Cmd+R sends Ctrl+L to whatever runs in the terminal: the shell clears the screen and keeps the scrollback, and Claude Code redraws its screen. Cmd+Shift+Enter focuses the terminal and maximises it, from anywhere. Cmd+0 focuses the terminal, and Cmd+1 to Cmd+9 jump to terminal tab 1 to 9, from anywhere.
- Tell the user these replace some VS Code defaults: Cmd+T was Go to Symbol in Workspace, and Cmd+0 to Cmd+9 moved focus between the side bar and editor groups.
- Verify: the file parses, every entry is present, and the cmd+r entry contains a backslash followed by f.

STEP 7. AGENT TABS (ONLY IF AGENT_TABS IS YES)
- The extension. Check: CODE --list-extensions --show-versions shows swarupdonepudi.agent-tabs@<version>. Read https://api.github.com/repos/swarupdonepudi/agent-tabs/releases/latest: "tag_name" is the latest version (strip the leading v), and the "browser_download_url" ending in .vsix is the file. Compare versions as major.minor.patch numbers. If it's missing or older, download the .vsix into a new temporary folder, run CODE --install-extension <that file> --force, delete the temporary folder, and record the old version (or "none") in the manifest. Never downgrade a newer install.
- The Claude Code plugin. If "claude plugin list" doesn't work (an older Claude Code), ask the user to update Claude Code, or to run /plugin inside Claude Code, and skip this part. Check: "claude plugin list" shows agent-tabs@agent-tabs. If not, run "claude plugin marketplace list". If a marketplace named agent-tabs is there, check its source is swarupdonepudi/agent-tabs; if it points somewhere else, stop and ask. If none is there, run "claude plugin marketplace add swarupdonepudi/agent-tabs" and record it in the manifest. Then run "claude plugin install agent-tabs@agent-tabs" and record it.
- Two settings, in the same settings.json as step 5. If a key is already set, show its value and treat it as already in place.
  a. "agentTabs.extraArgs": extra flags for every Claude tab. Ask, for example whether they want --chrome (Claude in Chrome). If they give any, set it, for example ["--chrome"]. If none, leave the key out.
  b. "agentTabs.defaultFolder": the folder Cmd+T opens Claude in. Empty means the first folder of the open workspace. Ask. It takes a workspace folder's name, an absolute path, or a path starting with ~/. Leave it out if they're happy with the first folder. (There's also an AGENT_TABS_FOLDER environment variable that overrides it on one machine. You don't need it here: don't edit any shell file for this.)
- Verify: CODE --list-extensions --show-versions shows swarupdonepudi.agent-tabs at the latest version or newer, "claude plugin list" shows agent-tabs@agent-tabs, and settings.json still parses.

STEP 8. SHELL START TIME (CHECK, CHANGE ONLY WITH A YES)
- Measure: time "zsh -i -c exit" three times (use the user's shell from $SHELL if it isn't zsh). Report the times.
- If the median is over 0.3 seconds, look for the usual cause in $HOME/.zshrc and $HOME/.zprofile: nvm loaded the plain way, a line that sources nvm.sh without --no-use. That one line usually costs about 0.4 seconds, because nvm checks the default Node version every time a shell starts. Also look for nvm loaded through a plugin (the oh-my-zsh nvm plugin, zsh-nvm). Report those, but offer a fix only for the plain line.
- Change nothing unless the user says yes. With a yes (zsh only): first record "node -v" and the start time. Back up the file, then replace the plain nvm load with this, keeping the nvm.sh path the file already uses:

     export NVM_DIR="$HOME/.nvm"
     [ -s "<path to nvm.sh>" ] && . "<path to nvm.sh>" --no-use
     if [[ -r "$NVM_DIR/alias/default" ]]; then
       nvm_default=$(<"$NVM_DIR/alias/default")
       nvm_bins=("$NVM_DIR"/versions/node/v${nvm_default#v}*/bin(N/nOn))
       (( $#nvm_bins )) && path=($nvm_bins[1] $path)
       unset nvm_default nvm_bins
     fi

  This only works when the default (the file $NVM_DIR/alias/default) is a version number, like 22 or v22.11.0. If it's a name like lts/* or node, skip the change and say why.
- Verify: in a new shell, "node -v" prints the version you recorded, and the start time went down.

STEP 9. FINISH
- Tell the user to quit VS Code completely (Cmd+Q) and open it again. A window reload isn't enough for a new font or a new extension.
- Ask them to test: Cmd+T opens a terminal tab (running claude, with Agent Tabs). With Agent Tabs: quit and reopen VS Code, and the tab comes back in the same conversation.
- Report a short table: each step, and "already in place", "changed" or "skipped". Then give the path of the backup folder and its manifest.txt, or say that nothing changed and no backup was made.
- How to undo, from manifest.txt (print the literal CODE path, not the word CODE):
  - For each backed-up file: compare it with the current file first, because the user may have changed it since. Then copy the backup back. Delete each file this run created.
  - Extensions this run installed: <CODE> --uninstall-extension <id> (with --profile if step 1 chose one). An extension this run only upgraded: reinstall the old version, or leave it.
  - The plugin, if this run installed it: "claude plugin uninstall agent-tabs@agent-tabs". The marketplace, only if this run added it: "claude plugin marketplace remove agent-tabs".
  - $HOME/.agent-tabs/ holds which conversation ran in which tab. Delete it if you remove Agent Tabs.
  - Delete the SF Mono files this run copied into $HOME/Library/Fonts.
  - Delete the backup folder when you no longer need it.
```

At the end of the day, the editor matters less than it used to. The agent does the work. What I needed back was the list of projects in front of me, a terminal that feels like home, and agents that don't vanish when I restart. The goal is simple again: complete the projects.

If you run your coding agents in a terminal too, how do you keep track of what you're finishing? I'd love to know what's in your setup that isn't in mine.
