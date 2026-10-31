# Quick Friends Actions for Steam (Millennium Plugin)

[![Millennium Plugin](https://img.shields.io/badge/Millennium-Plugin-blue.svg)](https://steambrew.app/)

A lightweight Millennium plugin that injects quick interactive action buttons directly next to each friend in your Steam Community Friends list (`steamcommunity.com/my/friends`).

---

## ✨ Features

- 💬 **Quick Message (Chat):** Opens a direct Steam chat with the selected friend in one click using native Steam client protocol (`steam://friends/message/<steamid>`).
- ✕ **Quick Remove:** Displays a native Steam-styled confirmation modal dialog and seamlessly unfriends the user via `RemoveFriendAjax` with a smooth fade-out animation.
- 🎨 **Seamless Theme:** Custom styled to match the official Steam Community desktop & web interface.

---

## 📁 Repository Structure

```
quick_friends_actions/
├── plugin.json               # Millennium manifest (v1.0.0)
├── millennium.toml           # Starlight / Millennium configuration
├── metadata.json             # Internal plugin registration
├── backend/
│   └── main.lua              # LuaJIT backend (RPC calls)
└── dist/
    ├── index.js              # Frontend client bundle
    └── webkit.js             # Webkit DOM injector for Steam Friends
```

---

## 📥 Installation

### Via Millennium Plugin Database
1. Open Steam with Millennium installed.
2. Go to Millennium settings -> **Plugins**.
3. Search for **Quick Friends Actions** and click **Install**.

### Manual Installation
1. Place the `quick_friends_actions` folder into your Millennium plugins directory:
   - `C:\Program Files (x86)\Steam\plugins\quick_friends_actions`
2. Restart Steam.
3. Open your Friends list in Steam — the action buttons will appear on the right side of each friend card.
