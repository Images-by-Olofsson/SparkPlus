'use strict';

(function () {
    const VERSION_URL = '/version.txt';
    const LOGO_IMAGES = [
        'assets/logos/Bird-1.png',
        'assets/logos/Bird-envelope.png',
        'assets/logos/Bird-flag.png',
        'assets/logos/Bird-folder.png'
    ];

    var currentLang = 'sv';

    var GREETINGS_SV = [
        'N\u00e4men tjena {name}!',
        'Tillbaka redan, {name}?',
        'Vet din chef vilka sidor du surfar till, {name}?',
        'Hej d\u00e4r, {name}!',
        'Kul att se dig igen, {name}!',
        'Jasss {name}, vad g\u00f6rs?',
        '{name}! L\u00e4nge sedan sist.',
        'Oj oj oj, {name} \u00e4r h\u00e4r!',
        'Hoppas du har en bra dag, {name}!',
        'Ah, {name}. Vi v\u00e4ntade p\u00e5 dig.'
    ];

    var GREETINGS_EN = [
        'Well hello there, {name}!',
        'Back already, {name}?',
        'Does your boss know what sites you visit, {name}?',
        'Hey {name}!',
        'Good to see you again, {name}!',
        'Sooo {name}, what\'s up?',
        '{name}! Long time no see.',
        'Oh oh oh, {name} is here!',
        'Hope you\'re having a great day, {name}!',
        'Ah, {name}. We\'ve been expecting you.'
    ];

    function getFirstName(displayName) {
        if (!displayName) return null;
        var parts = displayName.trim().split(' ');
        return parts[0];
    }

    function initGreeting() {
        var badge = document.getElementById('hero-badge');
        if (!badge) return;

        var displayName = null;
        try {
            displayName = localStorage.getItem('sparkUserDisplayName');
        } catch (e) {
            return;
        }

        var firstName = getFirstName(displayName);
        if (!firstName) return;

        var greetings = (currentLang === 'sv') ? GREETINGS_SV : GREETINGS_EN;
        var idx = Math.floor(Math.random() * greetings.length);
        var text = greetings[idx].replace('{name}', firstName);

        badge.textContent = text;
        badge.style.display = '';
        badge.setAttribute('data-greeting-idx', idx);
    }

    function setRandomLogo() {
        var logoBird = document.getElementById('logo-bird');
        if (logoBird) {
            var randomIndex = Math.floor(Math.random() * LOGO_IMAGES.length);
            logoBird.src = LOGO_IMAGES[randomIndex];
        }
    }

    function switchLanguage(lang) {
        currentLang = lang;
        var elements = document.querySelectorAll('[data-sv][data-en]');
        elements.forEach(function (el) {
            var text = el.getAttribute('data-' + lang);
            if (text) {
                el.innerHTML = text;
            }
        });
        var label = document.getElementById('lang-label');
        if (label) {
            label.textContent = (lang === 'sv') ? 'EN' : 'SV';
        }
        document.documentElement.lang = lang;
        initGreeting();
    }

    function initLangToggle() {
        var btn = document.getElementById('lang-toggle');
        if (btn) {
            btn.addEventListener('click', function () {
                var newLang = (currentLang === 'sv') ? 'en' : 'sv';
                switchLanguage(newLang);
            });
        }
    }

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
                changelogDate.textContent = dateMatch[1] + '-' + dateMatch[2] + '-' + dateMatch[3];
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
        setRandomLogo();
        loadVersion();
        setFooterYear();
        initSmoothScroll();
        initLangToggle();
        initGreeting();
    });
})();
