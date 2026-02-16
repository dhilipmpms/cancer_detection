// ===== Shared App Module =====
// Navigation, auth state, sidebar toggle, utilities shared across all pages.

const App = (() => {
    // --- Auth ---
    // --- Auth ---
    function checkAuth() {
        // Auth.js handles redirects. This function now just returns user info for UI.
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            return {
                name: localStorage.getItem('userName'),
                email: localStorage.getItem('userEmail'),
                role: localStorage.getItem('userRole')
            };
        }
        return null;
    }

    // login and logout are handled by Auth.js


    // --- Sidebar ---
    function initSidebar() {
        const hamburger = document.getElementById('hamburger');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                overlay.classList.toggle('active');
            });
        }

        if (overlay) {
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            });
        }

        // Mark active link
        const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
        document.querySelectorAll('.sidebar-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // --- Top Nav ---
    function initTopNav() {
        const user = checkAuth();
        const doctorNameEl = document.getElementById('doctorName');
        const dateTimeEl = document.getElementById('dateTime');
        const logoutBtn = document.getElementById('logoutBtn');

        if (doctorNameEl && user) {
            doctorNameEl.textContent = user.name;
        }

        if (dateTimeEl) {
            const updateTime = () => {
                const now = new Date();
                dateTimeEl.textContent = now.toLocaleDateString('en-IN', {
                    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
                }) + '  •  ' + now.toLocaleTimeString('en-IN', {
                    hour: '2-digit', minute: '2-digit', second: '2-digit'
                });
            };
            updateTime();
            setInterval(updateTime, 1000);
        }


    }

    // --- Counter Animation ---
    function animateCounter(element, target, duration = 1500, suffix = '') {
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.floor(start + (target - start) * eased);

            if (suffix === '%') {
                element.textContent = (start + (target - start) * eased).toFixed(1) + '%';
            } else {
                element.textContent = current.toLocaleString() + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    // --- Init ---
    function init() {
        initSidebar();
        initTopNav();
    }

    return { checkAuth, init, animateCounter };
})();

// Auto-init on DOMContentLoaded for dashboard pages
// Auto-init on DOMContentLoaded for dashboard pages
document.addEventListener('DOMContentLoaded', () => {
    // Only init App (sidebar/topbar) on protected pages
    const path = window.location.pathname;
    const page = path.split('/').pop();
    const protectedPages = ['dashboard.html', 'patients.html', 'analytics.html', 'system.html', 'analysis.html'];

    if (protectedPages.includes(page)) {
        App.init();
    }
});
