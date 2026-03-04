'use strict';

(function () {
    const VERSION_URL = 'https://github.com/Images-by-Olofsson/SparkPlus/raw/main/PROD/SparkPlus/version.txt';

    async function loadVersion() {
        const versionDisplay = document.getElementById('version-display');
        const changelogVersion = document.getElementById('changelog-version');
        const changelogDate = document.getElementById('changelog-date');

        try {
            const response = await fetch(VERSION_URL, { cache: 'no-store' });
            if (!response.ok) throw new Error('Version file not found');

            const raw = (await response.text()).trim();
            const version = raw || 'unknown';

            if (versionDisplay) versionDisplay.textContent = version;
            if (changelogVersion) changelogVersion.textContent = version;

            const dateMatch = version.match(/(\d{4})\.(\d{2})\.(\d{2})/);
            if (dateMatch && changelogDate) {
                changelogDate.textContent = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
            } else if (changelogDate) {
                changelogDate.textContent = new Date().toISOString().split('T')[0];
            }
        } catch (err) {
            console.warn('Could not load version:', err.message);
            if (versionDisplay) versionDisplay.textContent = '--';
            if (changelogVersion) changelogVersion.textContent = '--';
        }
    }

    function setFooterYear() {
        const el = document.getElementById('footer-year');
        if (el) el.textContent = new Date().getFullYear();
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        loadVersion();
        setFooterYear();
        initSmoothScroll();
    });
})();
