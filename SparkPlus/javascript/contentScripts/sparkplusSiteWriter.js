/**
 * @file sparkplusSiteWriter.js
 * @description Content script that writes the cached user display name
 *              to sparkplus.se localStorage so the site can show a
 *              personalised greeting.
 *
 * Author: Linus Olofsson - Iver
 * Date: 2026-03-04
 *
 * @purpose Bridge chrome.storage.local data to sparkplus.se localStorage
 * @invoked_by Manifest V3 content_scripts on sparkplus.se
 * @note Only writes the display name — no tokens or sensitive data
 */

(async function () {
    try {
        const stored = await chrome.storage.local.get(['sparkUserDisplayName']);
        const name = stored.sparkUserDisplayName;

        if (name) {
            localStorage.setItem('sparkUserDisplayName', name);
        }
    } catch (e) {
        // Silently ignore — extension storage may not be available
    }
})();
