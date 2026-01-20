/**
 * AR MARKET OS - CORE ENGINE
 * Handles: Custom Cursor, Gaze Selection, and Navigation
 */

// 1. Initialize AR Cursor Safely
let cursor = document.getElementById('ar-cursor');
if (!cursor) {
    cursor = document.createElement('div');
    cursor.id = 'ar-cursor';
    document.body.appendChild(cursor);
}

// 2. Track Mouse Movement
document.addEventListener('mousemove', (e) => {
    // Uses requestAnimationFrame for smoother performance
    requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
});

// 3. Gaze Selection Logic
let gazeTimer;
const selectionDuration = 3000; // 3 Seconds

function initInteractiveElements() {
    const interactiveElements = document.querySelectorAll('.menu-item, .nav-btn');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Visual Feedback: Cursor reacts to hover
            cursor.classList.add('gaze-active');
            cursor.style.backgroundColor = 'rgba(0, 255, 255, 0.4)';

            // Start Selection Timer
            gazeTimer = setTimeout(() => {
                cursor.style.backgroundColor = '#ffffff'; // Success flash
                
                if (el.tagName === 'A' && el.getAttribute('href')) {
                    window.location.href = el.getAttribute('href');
                } else {
                    el.click();
                }
            }, selectionDuration);
        });

        el.addEventListener('mouseleave', () => {
            // Reset Cursor
            cursor.classList.remove('gaze-active');
            cursor.style.backgroundColor = 'transparent';
            
            // Cancel Selection
            clearTimeout(gazeTimer);
        });
    });
}

// 4. Modal Logic (Consolidated)
function initModals() {
    const helpTrigger = document.getElementById('help-trigger');
    const helpModal = document.getElementById('help-modal');

    if (helpTrigger && helpModal) {
        helpTrigger.onclick = (e) => {
            e.preventDefault();
            helpModal.style.display = 'block';
        };
    }
}

function closeHelp() {
    const helpModal = document.getElementById('help-modal');
    if (helpModal) helpModal.style.display = 'none';
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    initInteractiveElements();
    initModals();
});