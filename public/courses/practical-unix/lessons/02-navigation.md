---
title: Navigating the Filesystem
order: 2
duration: 20 min
objectives:
  - Understand the Unix filesystem hierarchy
  - Navigate between directories with cd
  - Use absolute and relative paths
  - Master shortcuts like ~ and ..
---

## The Filesystem Tree

Unix organizes everything in a tree structure starting from the **root** directory `/`. Everything - files, directories, devices, even running processes - lives somewhere in this tree.

```
/
├── home/          # User home directories
│   └── swarup/    # Your stuff lives here
├── etc/           # System configuration
├── var/           # Variable data (logs, databases)
├── usr/           # User programs and utilities
├── tmp/           # Temporary files
└── bin/           # Essential command binaries
```

<info>
Unlike Windows with its `C:\`, `D:\` drive letters, Unix has a single unified tree. External drives get "mounted" into this tree as directories.
</info>

## Where Am I? (`pwd`)

The `pwd` command (print working directory) tells you your current location:

```bash
pwd
```

You'll see something like `/home/swarup` or `/Users/swarup` on macOS.

## Moving Around (`cd`)

The `cd` command (change directory) moves you around:

```bash
cd /var/log
pwd
```

You're now in the system logs directory.

### Absolute vs Relative Paths

**Absolute paths** start from root (`/`):

```bash
cd /home/swarup/projects
```

**Relative paths** start from your current location:

```bash
cd projects/website
```

If you're in `/home/swarup`, this takes you to `/home/swarup/projects/website`.

## Essential Shortcuts

These shortcuts will save you thousands of keystrokes:

| Shortcut | Meaning |
|----------|---------|
| `~` | Your home directory |
| `.` | Current directory |
| `..` | Parent directory |
| `-` | Previous directory |

### Examples

```bash
cd ~
```

Go home, no matter where you are.

```bash
cd ..
```

Go up one level.

```bash
cd ../..
```

Go up two levels.

```bash
cd -
```

Toggle between current and previous directory. Super useful!

<tip>
Combine these! `cd ~/projects` takes you to the projects folder in your home directory from anywhere.
</tip>

## Listing Contents (`ls`)

We saw `ls` briefly. Let's explore it more:

```bash
ls
```

Basic listing.

```bash
ls -l
```

Long format with details.

```bash
ls -la
```

Long format including hidden files (those starting with `.`).

```bash
ls -lh
```

Long format with human-readable sizes (KB, MB, GB instead of bytes).

### Understanding `ls -l` Output

```
drwxr-xr-x  5 swarup staff  160 Dec 14 10:30 projects
-rw-r--r--  1 swarup staff 1234 Dec 14 09:15 notes.txt
```

| Part | Meaning |
|------|---------|
| `d` or `-` | Directory or file |
| `rwxr-xr-x` | Permissions (we'll cover this later) |
| `5` or `1` | Number of links |
| `swarup` | Owner |
| `staff` | Group |
| `160` | Size in bytes |
| `Dec 14 10:30` | Last modified |
| `projects` | Name |

## Tab Completion

This is a game-changer. Start typing a path and press `Tab`:

```bash
cd ~/Doc<Tab>
```

The shell completes it to `~/Documents/`. If there are multiple matches, press Tab twice to see options.

<warning>
Tab completion is your friend. If it doesn't complete, either the path doesn't exist or you need to type more characters to disambiguate.
</warning>

## Practice Exercise

1. Navigate to your home directory
2. Create a mental map: run `ls -la` and identify hidden files (hint: they start with `.`)
3. Navigate to `/var/log` and back home using `cd -`
4. Try tab-completing a long path

## Key Takeaways

- The filesystem is a tree starting at `/`
- `pwd` shows where you are, `cd` moves you around
- Use `~`, `..`, and `-` to navigate efficiently
- Tab completion saves time and prevents typos
- `ls -la` is your go-to for seeing what's in a directory

Next up: creating, copying, and moving files.
