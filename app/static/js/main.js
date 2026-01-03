<<<<<<< HEAD
/* Gap2Growth - Main JavaScript */

document.addEventListener('DOMContentLoaded', function () {
    const alerts = document.querySelectorAll('.alert:not(.persistent)');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-10px)';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    });

    const cards = document.querySelectorAll('.card, .stat-card, .activity-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
        card.classList.add('fade-in');
    });

    document.querySelectorAll('.form-select').forEach(select => {
        select.addEventListener('change', function () {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
});


const api = {
    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        } catch (error) {
            console.error('API GET Error:', error);
            throw error;
        }
    },

    async post(url, data = {}) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        } catch (error) {
            console.error('API POST Error:', error);
            throw error;
        }
    }
};


// Mark a notification as read
function markNotificationRead(notificationId) {
    api.post(`/student/notifications/${notificationId}/read`)
        .then(() => {
            const item = document.querySelector(`[data-notification-id="${notificationId}"]`);
            if (item) item.classList.remove('unread');
        })
        .catch(err => console.error('Failed to mark notification as read:', err));
}

function markAllNotificationsRead() {
    api.post('/api/notifications/read-all')
        .then(() => {
            document.querySelectorAll('.notification-item.unread')
                .forEach(item => item.classList.remove('unread'));
            showToast('All notifications marked as read', 'success');
        })
        .catch(err => console.error('Failed to mark all notifications as read:', err));
}


// Start an activity
function startActivity(activityId) {
    api.post(`/student/activity/${activityId}/start`)
        .then(data => {
            if (data.success) {
                showToast('Activity started! Good luck!', 'success');
                sessionStorage.setItem('currentActivityLog', data.log_id);
                // Refresh the page to show updated status
                setTimeout(() => location.reload(), 1500);
            }
        })
        .catch(err => {
            console.error('Failed to start activity:', err);
            showToast('Failed to start activity. Please try again.', 'danger');
        });
}

function completeActivity(logId) {
    api.post(`/student/activity/${logId}/complete`)
        .then(data => {
            if (data.success) {
                showToast('Activity completed! Great job! 🎉', 'success');
                sessionStorage.removeItem('currentActivityLog');
                setTimeout(() => location.reload(), 1500);
            }
        })
        .catch(err => {
            console.error('Failed to complete activity:', err);
            showToast('Failed to complete activity. Please try again.', 'danger');
        });
}


// Show toast notification
function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;';
        document.body.appendChild(container);
    }


    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;


    const icons = {
        success: '✅',
        danger: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-text">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;

    toast.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 18px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        font-size: 14px;
        animation: slideIn 0.3s ease;
        border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'danger' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
    `;

    container.appendChild(toast);


    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}


// Initialize toast styles
if (!document.querySelector('#toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .toast-close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #9ca3af;
            padding: 0;
            line-height: 1;
        }
        .toast-close:hover { color: #374151; }
    `;
    document.head.appendChild(style);
}


// Format time string
function formatTime(timeString) {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
=======

// ========== UTILITY FUNCTIONS ==========
// These are helper functions used throughout the app

/**
 * Show a toast notification message
 * @param {string} message - The message to display
 * @param {string} type - Type of toast: 'success', 'error', 'warning', 'info'
 */
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
        `;
        document.body.appendChild(container);
    }

    // Create the toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        background: ${type === 'success' ? '#06d6a0' : type === 'error' ? '#ef476f' : type === 'warning' ? '#ffd166' : '#4361ee'};
        color: ${type === 'warning' ? '#1a1a2e' : 'white'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;

    // Add icon based on type
    const icons = {
        success: '<i class="bi bi-check-circle-fill"></i>',
        error: '<i class="bi bi-x-circle-fill"></i>',
        warning: '<i class="bi bi-exclamation-triangle-fill"></i>',
        info: '<i class="bi bi-info-circle-fill"></i>'
    };

    toast.innerHTML = `${icons[type] || ''} <span>${message}</span>`;
    container.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Format a date object to a readable string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-IN', options);
}

/**
 * Format time in 12-hour format
 * @param {string} time24 - Time in 24-hour format (HH:MM)
 * @returns {string} Time in 12-hour format
 */
function formatTime(time24) {
    const [hours, minutes] = time24.split(':');
>>>>>>> 8feacbf6adc2f63a8f778ae9cd2d236f7e181b12
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

<<<<<<< HEAD

// Format duration in minutes
function formatDuration(minutes) {
    if (!minutes || minutes <= 0) return '0 mins';
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}


// Show confirmation dialog
function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}


// Delete item with confirmation
function deleteItem(url, itemName) {
    confirmAction(`Are you sure you want to delete ${itemName}?`, () => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
        document.body.appendChild(form);
        form.submit();
    });
}


// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


// Initialize table search
function initializeTableSearch(searchInputId, tableId) {
    const searchInput = document.getElementById(searchInputId);
    const table = document.getElementById(tableId);

    if (!searchInput || !table) return;

    searchInput.addEventListener('input', debounce(function (e) {
        const query = e.target.value.toLowerCase();
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query) ? '' : 'none';
        });
    }, 200));
}


// Format relative time
function formatRelativeTime(dateString) {
    if (!dateString) return 'Just now';

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString();
}


window.gap2growth = {
    api,
    showToast,
    formatTime,
    formatDuration,
    formatRelativeTime,
    confirmAction,
    debounce,
    startActivity,
    completeActivity,
    markNotificationRead,
    markAllNotificationsRead
};
=======
/**
 * Calculate duration between two times
 * @param {string} start - Start time (HH:MM)
 * @param {string} end - End time (HH:MM)
 * @returns {string} Duration in human-readable format
 */
function calculateDuration(start, end) {
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);

    let totalMinutes = (endH * 60 + endM) - (startH * 60 + startM);

    if (totalMinutes < 0) totalMinutes += 24 * 60; // Handle overnight

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours} hr`;
    return `${hours} hr ${minutes} min`;
}

/**
 * Debounce a function to limit how often it runs
 * @param {Function} func - The function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ========== DOM MANIPULATION HELPERS ==========

/**
 * Safely get an element by ID
 * @param {string} id - Element ID
 * @returns {HTMLElement|null}
 */
function getElement(id) {
    return document.getElementById(id);
}

/**
 * Safely get all elements matching a selector
 * @param {string} selector - CSS selector
 * @returns {NodeList}
 */
function getElements(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Add click event listener to element
 * @param {string} id - Element ID
 * @param {Function} handler - Click handler function
 */
function onClick(id, handler) {
    const element = getElement(id);
    if (element) {
        element.addEventListener('click', handler);
    }
}

// ========== FORM VALIDATION ==========

/**
 * Validate an email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to check
 * @returns {object} Validation result with score and feedback
 */
function validatePassword(password) {
    const result = {
        score: 0,
        feedback: []
    };

    if (password.length >= 8) {
        result.score++;
    } else {
        result.feedback.push('At least 8 characters');
    }

    if (/[A-Z]/.test(password)) {
        result.score++;
    } else {
        result.feedback.push('One uppercase letter');
    }

    if (/[a-z]/.test(password)) {
        result.score++;
    } else {
        result.feedback.push('One lowercase letter');
    }

    if (/[0-9]/.test(password)) {
        result.score++;
    } else {
        result.feedback.push('One number');
    }

    return result;
}

/**
 * Show validation error on a form field
 * @param {HTMLElement} field - The input field
 * @param {string} message - Error message
 */
function showFieldError(field, message) {
    // Remove any existing error
    clearFieldError(field);

    // Add error class
    field.classList.add('is-invalid');

    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;

    // Insert after the field
    field.parentNode.appendChild(errorDiv);
}

/**
 * Clear validation error from a form field
 * @param {HTMLElement} field - The input field
 */
function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

// ========== LOCAL STORAGE HELPERS ==========

/**
 * Save data to local storage
 * @param {string} key - Storage key
 * @param {any} data - Data to store
 */
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

/**
 * Get data from local storage
 * @param {string} key - Storage key
 * @returns {any} Retrieved data or null
 */
function getFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Error reading from localStorage:', e);
        return null;
    }
}

/**
 * Remove data from local storage
 * @param {string} key - Storage key
 */
function removeFromStorage(key) {
    localStorage.removeItem(key);
}

// ========== LOADING STATE MANAGEMENT ==========

/**
 * Show loading spinner in a button
 * @param {HTMLElement} button - The button element
 * @param {string} loadingText - Text to show while loading
 */
function showButtonLoading(button, loadingText = 'Loading...') {
    button.disabled = true;
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status"></span>
        ${loadingText}
    `;
}

/**
 * Hide loading spinner and restore button
 * @param {HTMLElement} button - The button element
 */
function hideButtonLoading(button) {
    button.disabled = false;
    button.innerHTML = button.dataset.originalText || button.innerHTML;
}

/**
 * Show page loading overlay
 */
function showPageLoading() {
    let overlay = getElement('page-loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'page-loading-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        overlay.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-primary mb-3" style="width: 3rem; height: 3rem;"></div>
                <p class="text-muted">Loading...</p>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    overlay.style.display = 'flex';
}

/**
 * Hide page loading overlay
 */
function hidePageLoading() {
    const overlay = getElement('page-loading-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// ========== DOCUMENT READY ==========
// This code runs when the page finishes loading

document.addEventListener('DOMContentLoaded', function () {
    console.log('Gap2Growth - Application Loaded');

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
>>>>>>> 8feacbf6adc2f63a8f778ae9cd2d236f7e181b12
