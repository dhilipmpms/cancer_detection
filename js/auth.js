/**
 * Authentication & Access Control System
 * Handles login, logout, and page protection based on user roles.
 */

const Auth = {
    // User Roles
    ROLES: {
        DOCTOR: 'doctor',
        CLIENT: 'client'
    },

    // Initialize - Run this on page load
    init: function () {
        this.checkAuth();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    },

    setupEventListeners: function () {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
    },

    // Login Function
    login: function (role, name, email) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        console.log('Logging in:', { role, name, email });

        // Redirect based on role
        if (role === this.ROLES.DOCTOR) {
            window.location.href = 'dashboard.html';
        } else if (role === this.ROLES.CLIENT) {
            window.location.href = 'analysis.html';
        }
    },

    // Logout Function
    logout: function () {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = 'index.html';
    },

    // Check Authentication & Enforce Access
    checkAuth: function () {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userRole = localStorage.getItem('userRole');
        const path = window.location.pathname;
        const currentPage = path.split('/').pop();

        // Pages that don't require login
        const publicPages = ['index.html', 'login_doctor.html', 'login_client.html', ''];

        console.log('Auth Check:', { isLoggedIn, userRole, currentPage });

        if (!isLoggedIn) {
            // If not logged in and trying to access a protected page, redirect to landing
            if (!publicPages.includes(currentPage)) {
                console.warn('Access denied. Not logged in. Redirecting to index.');
                window.location.href = 'index.html';
            }
        } else {
            // If logged in

            // 1. If on a public page (Landing, Login), REMAIN THERE.
            // Do NOT auto-redirect to dashboard/analysis. This prevents loops.
            if (publicPages.includes(currentPage)) {
                return;
            }

            // 2. If on a protected page, enforce Role Access
            if (userRole === this.ROLES.CLIENT) {
                // Clients can ONLY access analysis.html
                const allowedPages = ['analysis.html'];

                if (!allowedPages.includes(currentPage)) {
                    // Redirect to safe page for client
                    window.location.href = 'analysis.html';
                }

                this.adjustUIForClient();
            }
            // Doctors have access to all protected pages, so no else block needed
        }
    },

    // Adjust UI elements for Clients
    adjustUIForClient: function () {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this._hideSidebarLinks());
        } else {
            this._hideSidebarLinks();
        }
    },

    _hideSidebarLinks: function () {
        const restrictedLinks = ['dashboard.html', 'patients.html', 'analytics.html', 'system.html'];

        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (restrictedLinks.includes(href)) {
                link.style.display = 'none';
            }
        });

        // Update user info
        const userName = localStorage.getItem('userName');

        const nameElements = document.querySelectorAll('#doctorName, .user-name-display');
        nameElements.forEach(el => el.textContent = userName);
    }
};

// Run init immediately
Auth.init();
