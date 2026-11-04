const MILLENNIUM_IS_CLIENT_MODULE = !1, pluginName = "quick_friends_actions";
function InitializePlugins() {
    var n;
    (n = window.PLUGIN_LIST || (window.PLUGIN_LIST = {}))[pluginName] || (n[pluginName] = {}),
    window.MILLENNIUM_SIDEBAR_NAVIGATION_PANELS || (window.MILLENNIUM_SIDEBAR_NAVIGATION_PANELS = {})
}
InitializePlugins();
const __call_server_method__ = (n, A) => Millennium.callServerMethod(pluginName, n, A);

const STYLES = `
/* Quick Friends Actions - Compact Icon-Only Buttons */
.friend_block_v2 {
    position: relative !important;
}

/* Only friend cards that have action buttons get right padding */
.friend_block_v2.has_quick_actions .friend_block_content {
    padding-right: 72px !important;
}

.friend_quick_actions {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 5px;
    z-index: 99 !important;
    pointer-events: auto !important;
}

.friend_quick_btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    padding: 0;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none !important;
    transition: all 0.15s ease-in-out;
    user-select: none;
    box-sizing: border-box;
    outline: none;
}

.friend_quick_btn svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    fill: currentColor;
}

/* Chat Icon Button (Steam Blue) */
.friend_quick_btn_chat {
    background: rgba(102, 192, 244, 0.15);
    border: 1px solid rgba(102, 192, 244, 0.4);
    color: #66c0f4 !important;
}

.friend_quick_btn_chat:hover {
    background: rgba(102, 192, 244, 0.35);
    border-color: #66c0f4;
    color: #ffffff !important;
    box-shadow: 0 0 8px rgba(102, 192, 244, 0.45);
    transform: translateY(-1px);
}

.friend_quick_btn_chat:active {
    transform: translateY(0);
}

/* Remove Friend Icon Button (Crimson) */
.friend_quick_btn_remove {
    background: rgba(235, 75, 75, 0.12);
    border: 1px solid rgba(235, 75, 75, 0.35);
    color: #ff6b6b !important;
}

.friend_quick_btn_remove:hover {
    background: rgba(235, 75, 75, 0.35);
    border-color: #ff4747;
    color: #ffffff !important;
    box-shadow: 0 0 8px rgba(235, 75, 75, 0.45);
    transform: translateY(-1px);
}

.friend_quick_btn_remove:active {
    transform: translateY(0);
}

/* Modal Confirmation Dialog */
.steam_quick_modal_backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999 !important;
    backdrop-filter: blur(3px);
    animation: steamModalFadeIn 0.15s ease-out;
}

@keyframes steamModalFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.steam_quick_modal_card {
    background: linear-gradient(135deg, #1b2838 0%, #171a21 100%);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(102, 192, 244, 0.1);
    width: 380px;
    max-width: 90vw;
    color: #e1e5e9;
    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    overflow: hidden;
    position: relative;
}

.steam_quick_modal_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.steam_quick_modal_header span {
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.steam_quick_modal_close {
    background: transparent;
    border: none;
    color: #8f98a0;
    font-size: 16px;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 3px;
    transition: all 0.15s ease;
}

.steam_quick_modal_close:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
}

.steam_quick_modal_body {
    padding: 18px 16px;
    display: flex;
    align-items: center;
    gap: 14px;
}

.steam_quick_modal_avatar {
    width: 48px;
    height: 48px;
    border-radius: 4px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    object-fit: cover;
    flex-shrink: 0;
}

.steam_quick_modal_text {
    font-size: 13px;
    line-height: 1.4;
    color: #c6d4df;
}

.steam_quick_modal_text strong {
    color: #ffffff;
}

.steam_quick_modal_footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.steam_quick_modal_btn {
    padding: 6px 16px;
    border-radius: 3px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s ease;
    border: 1px solid transparent;
}

.steam_quick_modal_btn_cancel {
    background: rgba(255, 255, 255, 0.1);
    color: #c6d4df;
    border-color: rgba(255, 255, 255, 0.15);
}

.steam_quick_modal_btn_cancel:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
}

.steam_quick_modal_btn_confirm {
    background: #eb4b4b;
    color: #ffffff;
    border-color: #ff3333;
}

.steam_quick_modal_btn_confirm:hover {
    background: #ff3333;
    box-shadow: 0 0 10px rgba(235, 75, 75, 0.5);
}

.steam_quick_modal_btn_confirm:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
`;

const STORAGE_KEY = "steam_quick_friends_my_ids_v1";
let myFriendsSet = new Set();
let backgroundFetchDone = false;

function loadSavedFriends() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const arr = JSON.parse(raw);
            if (Array.isArray(arr)) {
                arr.forEach(id => {
                    if (id && typeof id === "string") {
                        myFriendsSet.add(id);
                    }
                });
            }
        }
    } catch (e) {
        console.warn("[Quick Friends] Failed to parse friends cache:", e);
    }
}

function saveFriendsCache() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(myFriendsSet)));
    } catch (e) {
        console.warn("[Quick Friends] Failed to save friends cache:", e);
    }
}

function injectStyles() {
    let el = document.getElementById("steam-quick-friends-css");
    if (!el) {
        el = document.createElement("style");
        el.id = "steam-quick-friends-css";
        document.head.appendChild(el);
    }
    el.innerText = STYLES;
}

function getSessionID() {
    if (window.g_sessionID) {
        return window.g_sessionID;
    }
    const match = document.cookie.match(/sessionid=([a-zA-Z0-9_-]+)/);
    if (match) {
        return match[1];
    }
    const input = document.querySelector('input[name="sessionid"]');
    if (input && input.value) {
        return input.value;
    }
    return null;
}

function getLoggedInSteamID() {
    if (window.g_steamID) {
        return String(window.g_steamID);
    }
    const match = document.cookie.match(/steamLoginSecure=(\d{17})/);
    if (match) {
        return match[1];
    }
    return null;
}

function getPageProfileSteamID() {
    if (window.g_rgProfileData && window.g_rgProfileData.steamid) {
        return String(window.g_rgProfileData.steamid);
    }
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
        const content = scripts[i].textContent || "";
        if (content.includes("g_rgProfileData")) {
            const m = content.match(/"steamid"\s*:\s*"(\d{17})"/);
            if (m) return m[1];
        }
    }
    return null;
}

function isCommonFriendsTab() {
    return window.location.pathname.toLowerCase().includes("/friends/common");
}

function isOwnFriendsPage() {
    const pathname = window.location.pathname.toLowerCase();
    if (pathname.startsWith("/my/friends")) {
        return true;
    }
    if (document.getElementById("manage_friends_control") || 
        document.getElementById("manage_friends") || 
        document.querySelector(".manage_friends_btn")) {
        return true;
    }
    const myId = getLoggedInSteamID();
    const pageId = getPageProfileSteamID();
    if (myId && pageId && myId === pageId) {
        return true;
    }
    return false;
}

async function ensureMyFriendsLoaded() {
    if (backgroundFetchDone) return;
    if (isOwnFriendsPage()) return;

    backgroundFetchDone = true;
    try {
        console.log("[Quick Friends] Fetching user's own friend list in background...");
        const res = await fetch("https://steamcommunity.com/my/friends/", { credentials: "include" });
        if (res.ok) {
            const html = await res.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const friendNodes = doc.querySelectorAll("[data-steamid]");
            let addedCount = 0;
            friendNodes.forEach(node => {
                const sid = node.getAttribute("data-steamid");
                if (sid && /^\d{17}$/.test(sid)) {
                    if (!myFriendsSet.has(sid)) {
                        myFriendsSet.add(sid);
                        addedCount++;
                    }
                }
            });
            console.log(`[Quick Friends] Loaded ${myFriendsSet.size} friends (${addedCount} newly added).`);
            if (addedCount > 0) {
                saveFriendsCache();
            }
            scanAndInject();
        }
    } catch (err) {
        console.warn("[Quick Friends] Background fetch of my friends list failed:", err);
    }
}

function harvestFriendsFromDOM() {
    const cards = document.querySelectorAll(".friend_block_v2, .friendBlock, [data-steamid].selectable");
    let newlyFound = 0;
    cards.forEach(card => {
        const sid = extractSteamIdFromCard(card);
        if (sid && /^\d{17}$/.test(sid)) {
            if (!myFriendsSet.has(sid)) {
                myFriendsSet.add(sid);
                newlyFound++;
            }
        }
    });
    if (newlyFound > 0) {
        saveFriendsCache();
    }
}

function openChatWithFriend(steamId) {
    console.log("[Quick Friends] Opening chat with SteamID:", steamId);
    window.location.href = `steam://friends/message/${steamId}`;

    try {
        if (window.SteamClient && window.SteamClient.Friends && window.SteamClient.Friends.OpenChatWindow) {
            window.SteamClient.Friends.OpenChatWindow(steamId);
        }
    } catch (e) {
        console.log("[Quick Friends] SteamClient call fallback:", e);
    }
}

function showRemoveConfirmModal(friendName, avatarSrc, onConfirm) {
    const existing = document.getElementById("steam-quick-remove-modal");
    if (existing) existing.remove();

    const backdrop = document.createElement("div");
    backdrop.id = "steam-quick-remove-modal";
    backdrop.className = "steam_quick_modal_backdrop";

    backdrop.innerHTML = `
        <div class="steam_quick_modal_card">
            <div class="steam_quick_modal_header">
                <span>Удалить из друзей</span>
                <button class="steam_quick_modal_close" title="Закрыть">✕</button>
            </div>
            <div class="steam_quick_modal_body">
                <img class="steam_quick_modal_avatar" src="${avatarSrc || 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg'}" alt="Avatar" />
                <div class="steam_quick_modal_text">
                    Вы уверены, что хотите удалить <strong>${friendName}</strong> из списка друзей?
                </div>
            </div>
            <div class="steam_quick_modal_footer">
                <button class="steam_quick_modal_btn steam_quick_modal_btn_cancel">Отмена</button>
                <button class="steam_quick_modal_btn steam_quick_modal_btn_confirm">Удалить</button>
            </div>
        </div>
    `;

    document.body.appendChild(backdrop);

    const close = () => backdrop.remove();

    backdrop.querySelector(".steam_quick_modal_close").addEventListener("click", close);
    backdrop.querySelector(".steam_quick_modal_btn_cancel").addEventListener("click", close);

    backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) close();
    });

    const confirmBtn = backdrop.querySelector(".steam_quick_modal_btn_confirm");
    confirmBtn.addEventListener("click", async () => {
        confirmBtn.disabled = true;
        confirmBtn.textContent = "Удаление...";
        try {
            await onConfirm();
        } finally {
            close();
        }
    });
}

async function performRemoveFriend(steamId, friendCard) {
    const sessionID = getSessionID();
    if (!sessionID) {
        alert("Не удалось определить sessionID Steam. Попробуйте обновить страницу.");
        return;
    }

    console.log("[Quick Friends] Removing friend SteamID:", steamId);

    try {
        const formData = new URLSearchParams();
        formData.append("sessionID", sessionID);
        formData.append("steamid", steamId);

        const res = await fetch("https://steamcommunity.com/actions/RemoveFriendAjax", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: formData.toString()
        });

        if (res.ok) {
            console.log("[Quick Friends] Friend removed successfully!");
            myFriendsSet.delete(steamId);
            saveFriendsCache();
            if (friendCard) {
                friendCard.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
                friendCard.style.opacity = "0";
                friendCard.style.transform = "scale(0.85)";
                setTimeout(() => {
                    friendCard.remove();
                }, 300);
            }
        } else {
            console.error("[Quick Friends] Server returned error status:", res.status);
            await __call_server_method__("remove_friend_native", {
                sessionID: sessionID,
                steamID: steamId
            });
            myFriendsSet.delete(steamId);
            saveFriendsCache();
            if (friendCard) {
                friendCard.remove();
            }
        }
    } catch (err) {
        console.error("[Quick Friends] Exception removing friend:", err);
        alert("Ошибка при удалении друга: " + err.message);
    }
}

function extractSteamIdFromCard(card) {
    if (card.dataset && card.dataset.steamid) {
        return card.dataset.steamid;
    }
    const sidAttr = card.getAttribute("data-steamid");
    if (sidAttr) return sidAttr;

    const child = card.querySelector("[data-steamid]");
    if (child && child.getAttribute("data-steamid")) {
        return child.getAttribute("data-steamid");
    }

    const overlay = card.querySelector(".selectable_overlay");
    if (overlay && overlay.href) {
        const match = overlay.href.match(/\/profiles\/(\d{17})/);
        if (match) return match[1];
    }

    return null;
}

function extractNameFromCard(card) {
    const persona = card.querySelector(".friend_block_content .persona, .linkFriend_ms");
    if (persona && persona.textContent.trim()) {
        return persona.textContent.trim();
    }
    const searchAttr = card.getAttribute("data-search");
    if (searchAttr) return searchAttr.trim();

    const content = card.querySelector(".friend_block_content");
    if (content) {
        const text = content.firstChild ? content.firstChild.textContent.trim() : "";
        if (text) return text;
    }
    return "друга";
}

function extractAvatarFromCard(card) {
    const img = card.querySelector(".player_avatar img, .playerAvatar img");
    return img ? img.src : "";
}

function attachButtonsToCard(card) {
    const steamId = extractSteamIdFromCard(card);
    if (!steamId) {
        return;
    }

    // Never attach buttons to the logged-in user themselves
    const myId = getLoggedInSteamID();
    if (myId && String(steamId) === String(myId)) {
        const existing = card.querySelector(".friend_quick_actions");
        if (existing) existing.remove();
        card.classList.remove("has_quick_actions");
        return;
    }

    const isOwn = isOwnFriendsPage();
    const isCommon = isCommonFriendsTab();
    const isFriend = isOwn || isCommon || myFriendsSet.has(steamId);

    // If this person is NOT the user's friend (e.g. stranger on someone else's friends page), do NOT show actions!
    if (!isFriend) {
        const existing = card.querySelector(".friend_quick_actions");
        if (existing) existing.remove();
        card.classList.remove("has_quick_actions");
        return;
    }

    // Mark as having quick actions to apply right padding
    card.classList.add("has_quick_actions");

    if (card.querySelector(".friend_quick_actions")) {
        return;
    }

    const friendName = extractNameFromCard(card);
    const avatarSrc = extractAvatarFromCard(card);

    const actionContainer = document.createElement("div");
    actionContainer.className = "friend_quick_actions";

    // Chat Icon SVG
    const chatSvg = `<svg viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/></svg>`;

    // Cross / Remove Icon SVG
    const removeSvg = `<svg viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>`;

    actionContainer.innerHTML = `
        <button class="friend_quick_btn friend_quick_btn_chat" title="Написать сообщение (${friendName})">
            ${chatSvg}
        </button>
        <button class="friend_quick_btn friend_quick_btn_remove" title="Удалить из друзей (${friendName})">
            ${removeSvg}
        </button>
    `;

    // 1. Chat button handler
    const chatBtn = actionContainer.querySelector(".friend_quick_btn_chat");
    chatBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openChatWithFriend(steamId);
    });

    // 2. Remove button handler
    const removeBtn = actionContainer.querySelector(".friend_quick_btn_remove");
    removeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        showRemoveConfirmModal(friendName, avatarSrc, async () => {
            await performRemoveFriend(steamId, card);
        });
    });

    card.appendChild(actionContainer);
}

function scanAndInject() {
    if (isOwnFriendsPage() || isCommonFriendsTab()) {
        harvestFriendsFromDOM();
    }
    const cards = document.querySelectorAll(".friend_block_v2, .friendBlock, [data-steamid].selectable");
    for (let i = 0; i < cards.length; i++) {
        attachButtonsToCard(cards[i]);
    }
}

let scheduledScan = false;
function requestScan() {
    if (scheduledScan) return;
    scheduledScan = true;
    requestAnimationFrame(() => {
        scanAndInject();
        scheduledScan = false;
    });
}

let PluginEntryPointMain = function() {
    return function(n) {
        "use strict";
        n.default = async function() {
            const isFriendsPage = window.location.href.includes("/friends");
            if (!isFriendsPage) {
                return;
            }

            console.log("[Quick Friends Actions] Initializing on friends page:", window.location.href);

            loadSavedFriends();
            injectStyles();
            ensureMyFriendsLoaded();
            scanAndInject();

            const targetContainer = document.getElementById("friends_list") || document.body;
            const observer = new MutationObserver(() => {
                requestScan();
            });

            observer.observe(targetContainer, { childList: true, subtree: true });

            setInterval(requestScan, 1000);
        };
        Object.defineProperty(n, "__esModule", { value: !0 });
        return n;
    }({});
};

async function ExecutePluginModule() {
    let n = PluginEntryPointMain();
    Object.assign(window.PLUGIN_LIST[pluginName], {
        ...n,
        __millennium_internal_plugin_name_do_not_use_or_change__: pluginName
    });
    await n.default();
}
ExecutePluginModule();
