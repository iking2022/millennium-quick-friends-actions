local logger     = require("logger")
local millennium = require("millennium")
local http       = require("http")
local json       = require("json")

---@ffi
function remove_friend_native(args)
    local sessionID = nil
    local steamID = nil

    if type(args) == "table" then
        sessionID = args.sessionID or args.sessionid
        steamID = args.steamID or args.steamid
    end

    if not steamID or not sessionID then
        logger:error("Missing steamID or sessionID for friend removal")
        return json.encode({ success = false, error = "Missing parameters" })
    end

    logger:info("Attempting to remove friend: " .. tostring(steamID))

    local url = "https://steamcommunity.com/actions/RemoveFriendAjax"
    local payload = string.format("sessionID=%s&steamid=%s", sessionID, steamID)

    local res, err = http.post(url, payload, {
        headers = {
            ["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8",
            ["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        },
        timeout = 10
    })

    if not res then
        logger:error("Network error removing friend: " .. tostring(err))
        return json.encode({ success = false, error = "Network error" })
    end

    return json.encode({ success = res.status == 200, status = res.status })
end

local function on_load()
    logger:info("Quick Friends Actions Plugin loaded with Millennium " .. millennium.version())
    millennium.ready()
end

local function on_unload()
    logger:info("Quick Friends Actions Plugin unloaded")
end

local function on_frontend_loaded()
    logger:info("Frontend loaded for Quick Friends Actions")
end

return {
    on_load = on_load,
    on_unload = on_unload,
    on_frontend_loaded = on_frontend_loaded
}
