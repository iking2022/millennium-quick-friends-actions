const MILLENNIUM_IS_CLIENT_MODULE = !0, pluginName = "quick_friends_actions";
function InitializePlugins() {
    var n;
    (n = window.PLUGIN_LIST || (window.PLUGIN_LIST = {}))[pluginName] || (n[pluginName] = {}),
    window.MILLENNIUM_SIDEBAR_NAVIGATION_PANELS || (window.MILLENNIUM_SIDEBAR_NAVIGATION_PANELS = {})
}
InitializePlugins();
const __call_server_method__ = (n, e) => Millennium.callServerMethod(pluginName, n, e);

let PluginEntryPointMain = function() {
    return function(n) {
        "use strict";
        return n.default = async function() {
            console.log("[Quick Friends Actions] Front End Loaded in Steam UI.");
        }, Object.defineProperty(n, "__esModule", { value: !0 }), n
    }({})
};

async function ExecutePluginModule() {
    let n = PluginEntryPointMain();
    Object.assign(window.PLUGIN_LIST[pluginName], { ...n, __millennium_internal_plugin_name_do_not_use_or_change__: pluginName });
    await n.default();
    if (typeof MILLENNIUM_BACKEND_IPC !== "undefined" && MILLENNIUM_BACKEND_IPC.postMessage) {
        MILLENNIUM_BACKEND_IPC.postMessage(1, { pluginName: pluginName });
    }
}
ExecutePluginModule();
