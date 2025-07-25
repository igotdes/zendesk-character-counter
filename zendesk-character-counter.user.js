// ==UserScript==
// @name         Zendesk Character Counter
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Zendesk character counter with configurable limits and optional keyword filtering
// @author       igotdes
// @match        https://*.zendesk.com/*
// @match        https://*.zendeskgov.com/*
// @grant        none
// ==/UserScript==

// ===== USER CONFIGURATION =====
// Character limit thresholds:
const WARNING_THRESHOLD = 300;  // When to show warning color
const DANGER_THRESHOLD = 350;   // When to show danger color

// Colors for different states:
const NORMAL_COLOR = '#666';    // Gray for normal count
const WARNING_COLOR = '#ff8800'; // Orange for approaching limit
const DANGER_COLOR = '#cc0000';  // Dark red for over limit

// Show warnings only for tickets containing these keywords
const TRIGGER_KEYWORDS = [
    'social media',
    'twitter',
    'facebook',
    'instagram',
    'public response'
];
// ===== END USER CONFIGURATION =====

// Check if current ticket subject matches trigger keywords
    function shouldShowColorWarnings() {
        // If no keywords configured, always show warnings
        if (TRIGGER_KEYWORDS.length === 0) {
            return true;
        }

        // Look for ticket subject in various possible locations
        const subjectSelectors = [
            '[data-test-id="omni-header-subject"]', // Modern Zendesk subject input
            '[data-test-id="ticket-pane-subject"]',
            '[data-test-id="ticket-subject"]',
            '.ticket-subject',
            'h1[title]',
            '.pane_header h2',
            '.subject'
        ];

        for (let selector of subjectSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                // Get subject text from different possible sources
                const subject = (
                    element.value ||           // For input fields
                    element.textContent ||
                    element.title ||
                    ''
                ).toLowerCase();

                if (subject.trim() === '') {
                    continue; // Try next selector if subject is empty
                }

                // Check if any keyword matches
                const hasMatch = TRIGGER_KEYWORDS.some(keyword =>
                    subject.includes(keyword.toLowerCase())
                );

                return hasMatch;
            }
        }

        // Default to showing warnings if subject not found
        return true;
    }    // Find the container to position the counter relative to (fallback function)
    function findEditorContainer(textElement) {
        let container = textElement;
        const containerSelectors = [
            '.zendesk-editor',
            '.composer',
            '.comment-input',
            '.rich-text-editor',
            '[data-test-id="composer"]',
            '.editor-container'
        ];

        // Look for parent containers
        let parent = textElement.parentElement;
        while (parent && parent !== document.body) {
            for (let selector of containerSelectors) {
                if (parent.matches && parent.matches(selector)) {
                    return parent;
                }
            }
            parent = parent.parentElement;
        }

        // If no specific container found, use the text element's closest positioned parent
        parent = textElement.parentElement;
        while (parent && parent !== document.body) {
            const style = window.getComputedStyle(parent);
            if (style.position === 'relative' || style.position === 'absolute') {
                return parent;
            }
            parent = parent.parentElement;
        }

        return textElement.parentElement || textElement;
    }

(function() {
    'use strict';

    let counter = null;
    let currentTextArea = null;

    // Create counter display element
    function createCounter() {
        if (counter) {
            counter.remove();
        }

        counter = document.createElement('div');
        counter.id = 'char-counter';
        counter.style.cssText = `
            position: absolute;
            top: 0;
            bottom: 0;
            right: 10px;
            margin: auto 10px auto 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 12px;
            font-weight: normal;
            z-index: 10000;
            transition: color 0.2s ease;
            text-align: center;
            pointer-events: none;
            display: flex;
            align-items: center;
        `;
        counter.textContent = '0';
        return counter;
    }

    // Update counter display
    function updateCounter(charCount) {
        if (!counter) return;

        counter.textContent = charCount;

        // Check if we should show color warnings based on subject
        const showWarnings = shouldShowColorWarnings();

        if (showWarnings && charCount > DANGER_THRESHOLD) {
            counter.style.color = DANGER_COLOR;
        } else if (showWarnings && charCount > WARNING_THRESHOLD) {
            counter.style.color = WARNING_COLOR;
        } else {
            counter.style.color = NORMAL_COLOR;
        }
    }

    // Get text content from various input types
    function getTextContent(element) {
        if (!element) return '';

        if (element.tagName === 'TEXTAREA') {
            return element.value || '';
        } else if (element.contentEditable === 'true' || element.isContentEditable) {
            // Get plain text, removing HTML tags and trimming whitespace
            let text = element.textContent || element.innerText || '';
            // Remove any zero-width characters, non-breaking spaces, and trim whitespace/newlines
            text = text.replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '').trim();
            return text;
        }
        return '';
    }

    // Find the toolbar container for positioning the counter
    function findToolbarContainer() {
        // First try to find the omnichannel-composer-toolbar by data-test-id
        const toolbar = document.querySelector('[data-test-id="omnichannel-composer-toolbar"]');
        if (toolbar) {
            return toolbar;
        }

        // Fallback selectors for other toolbar elements
        const fallbackSelectors = [
            '.omnichannel-composer-toolbar',
            '[class*="composer-toolbar"]',
            '[class*="editor-toolbar"]',
            '.zendesk-editor .toolbar',
            '.composer .toolbar'
        ];

        for (let selector of fallbackSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                return element;
            }
        }

        return null;
    }

    // Setup monitoring for an element
    function setupMonitoring(element) {
        if (currentTextArea === element) return;

        currentTextArea = element;
        console.log('Setting up monitoring for:', element);

        // Remove existing counter
        if (counter) {
            counter.remove();
            counter = null;
        }

        // Create new counter and position it in the toolbar
        const newCounter = createCounter();
        const toolbar = findToolbarContainer();

        if (toolbar) {
            // Make sure toolbar has relative positioning
            if (window.getComputedStyle(toolbar).position === 'static') {
                toolbar.style.position = 'relative';
            }
            toolbar.appendChild(newCounter);
            console.log('Counter added to toolbar:', toolbar);
        } else {
            // Fallback: position relative to editor container
            const container = findEditorContainer(element);
            if (window.getComputedStyle(container).position === 'static') {
                container.style.position = 'relative';
            }
            container.appendChild(newCounter);
            console.log('Counter added to fallback container:', container);
        }
        counter = newCounter;

        const updateCharCount = () => {
            const text = getTextContent(element);
            const charCount = text.length;
            updateCounter(charCount);
        };

        // Remove existing event listeners by cloning the element
        const events = ['input', 'keyup', 'keydown', 'paste', 'cut', 'change'];

        events.forEach(eventType => {
            element.addEventListener(eventType, updateCharCount);
        });

        // For contenteditable elements, also use MutationObserver
        if (element.contentEditable === 'true' || element.isContentEditable) {
            const observer = new MutationObserver(updateCharCount);
            observer.observe(element, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }

        // Initial count
        setTimeout(updateCharCount, 100);
    }

    // Find active text input elements
    function findActiveTextInput() {
        // More comprehensive selectors for different Zendesk interfaces
        const selectors = [
            // Modern Zendesk
            'textarea[data-test-id="composer-text-area"]',
            'div[data-test-id="composer-text-area"]',
            'textarea[data-test-id="omni-log-text-area"]',
            '[data-test-id="composer"] textarea',
            '[data-test-id="composer"] [contenteditable="true"]',

            // Rich text editors
            '.zendesk-editor [contenteditable="true"]',
            '.DraftEditor-editorContainer [contenteditable="true"]',
            '.rich-text-editor [contenteditable="true"]',

            // Classic Zendesk
            'textarea[name="comment[body]"]',
            'textarea.comment',
            '#comment_body',

            // Generic fallbacks
            'textarea:focus',
            '[contenteditable="true"]:focus',

            // Any textarea or contenteditable in composer/editor areas
            '.composer textarea',
            '.composer [contenteditable="true"]',
            '.editor-container textarea',
            '.editor-container [contenteditable="true"]'
        ];

        for (let selector of selectors) {
            const elements = document.querySelectorAll(selector);
            for (let element of elements) {
                // Check if element is visible and not disabled
                const style = window.getComputedStyle(element);
                if (style.display !== 'none' &&
                    style.visibility !== 'hidden' &&
                    !element.disabled &&
                    element.offsetHeight > 0) {
                    console.log('Found active text input:', selector, element);
                    return element;
                }
            }
        }

        return null;
    }

    // Main initialization and monitoring
    function init() {
        console.log('Zendesk Character Counter initialized');

        function checkForTextInput() {
            const activeInput = findActiveTextInput();
            if (activeInput && activeInput !== currentTextArea) {
                setupMonitoring(activeInput);
            }
        }

        // Initial check
        setTimeout(checkForTextInput, 1000);

        // Regular checks for new text inputs
        setInterval(checkForTextInput, 3000);

        // Check when user focuses on elements
        document.addEventListener('focusin', (e) => {
            const target = e.target;
            if ((target.tagName === 'TEXTAREA' || target.contentEditable === 'true' || target.isContentEditable) &&
                target !== currentTextArea) {
                console.log('Focus event on text input:', target);
                setTimeout(() => setupMonitoring(target), 100);
            }
        });

        // Check for URL changes (SPA navigation)
        let currentUrl = window.location.href;
        setInterval(() => {
            if (window.location.href !== currentUrl) {
                console.log('URL changed, reinitializing...');
                currentUrl = window.location.href;
                currentTextArea = null;
                if (counter) {
                    counter.remove();
                    counter = null;
                }
                setTimeout(checkForTextInput, 2000);
            }
        }, 1000);
    }

    // Wait for page to load then initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 500);
    }
})();
