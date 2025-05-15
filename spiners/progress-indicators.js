// progress-indicators.js
// Web Components for reusable progress indicators

(function() {
    // Inject shared styles only once
    if (!document.getElementById('progress-indicators-styles')) {
        const style = document.createElement('style');
        style.id = 'progress-indicators-styles';
        style.textContent = `
        loading-bar, .loading-bar {
            display: block;
            width: 100%;
            height: var(--loading-bar-height, 6px);
            background: linear-gradient(90deg, var(--loading-bar-color, #4f8cff) 0%, #a0e9ff 100%);
            border-radius: 3px;
            position: relative;
            overflow: hidden;
        }
        loading-bar::after, .loading-bar::after {
            content: '';
            display: block;
            position: absolute;
            left: -40%;
            top: 0;
            width: 40%;
            height: 100%;
            background: rgba(255,255,255,0.5);
            animation: loading-bar-move 1.2s linear infinite;
        }
        @keyframes loading-bar-move {
            0% { left: -40%; }
            100% { left: 100%; }
        }
        loading-spinner, .loading-spinner {
            display: inline-block;
            width: var(--loading-spinner-size, 48px);
            height: var(--loading-spinner-size, 48px);
            position: relative;
        }
        loading-spinner img, .loading-spinner img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            animation: loading-spinner-spin 1s linear infinite;
        }
        /* Add hollow spinner style */
        loading-spinner .hollow-spinner {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border: 4px solid var(--loading-spinner-color, #4f8cff);
            border-top: 4px solid transparent;
            border-radius: 50%;
            animation: loading-spinner-spin 1s linear infinite;
        }
        @keyframes loading-spinner-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        loading-text, .loading-text {
            font-family: sans-serif;
            font-size: 1.2em;
            color: var(--loading-text-color, #4f8cff);
            margin: 12px 0;
            letter-spacing: 1px;
        }
        loading-jumping-container, .loading-jumping-container {
            display: flex;
            gap: 6px;
            align-items: flex-end;
            height: 32px;
        }
        loading-jumping, .loading-jumping {
            width: var(--loading-jumping-size, 8px);
            height: var(--loading-jumping-size, 8px);
            background: var(--loading-jumping-color, #4f8cff);
            border-radius: 50%;
            animation: loading-jumping-bounce 1s infinite;
        }
        loading-jumping:nth-child(2), .loading-jumping:nth-child(2) { animation-delay: 0.2s; }
        loading-jumping:nth-child(3), .loading-jumping:nth-child(3) { animation-delay: 0.4s; }
        loading-jumping:nth-child(4), .loading-jumping:nth-child(4) { animation-delay: 0.6s; }
        loading-jumping:nth-child(5), .loading-jumping:nth-child(5) { animation-delay: 0.8s; }
        @keyframes loading-jumping-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-16px); }
        }
        `;
        document.head.appendChild(style);
    }

    // <loading-bar>
    class LoadingBar extends HTMLElement {
        connectedCallback() {
            this.innerHTML = '';
            // Support color and height attributes
            const color = this.getAttribute('color') || '#4f8cff';
            const height = this.getAttribute('height') || '6px';
            this.style.setProperty('--loading-bar-color', color);
            this.style.setProperty('--loading-bar-height', height);
        }
    }
    customElements.define('loading-bar', LoadingBar);

    // <loading-spinner>
    class LoadingSpinner extends HTMLElement {
        connectedCallback() {
            const imgSrc = this.getAttribute('img');
            const color = this.getAttribute('color') || '#4f8cff';
            const size = this.getAttribute('size') || '48px';
            this.style.setProperty('--loading-spinner-color', color);
            this.style.setProperty('--loading-spinner-size', size);
            if (imgSrc) {
                this.innerHTML = `<img src="${imgSrc}" alt="">`;
            } else {
                this.innerHTML = `<div class="hollow-spinner"></div>`;
            }
        }
    }
    customElements.define('loading-spinner', LoadingSpinner);

    // <loading-text>
    class LoadingText extends HTMLElement {
        constructor() {
            super();
            this._dotCount = 0;
            this._interval = null;
        }
        connectedCallback() {
            this.text = this.getAttribute('text') || 'Loading';
            const color = this.getAttribute('color') || '#4f8cff';
            this.style.setProperty('--loading-text-color', color);
            this.render();
            this._interval = setInterval(() => {
                this._dotCount = (this._dotCount + 1) % 4;
                this.render();
            }, 500);
        }
        disconnectedCallback() {
            clearInterval(this._interval);
        }
        render() {
            this.textContent = this.text + '.'.repeat(this._dotCount);
        }
    }
    customElements.define('loading-text', LoadingText);

    // <loading-jumping-container> and <loading-jumping>
    class LoadingJumpingContainer extends HTMLElement {
        connectedCallback() {
            const count = parseInt(this.getAttribute('count')) || 5;
            const color = this.getAttribute('color') || '#4f8cff';
            const size = this.getAttribute('size') || '8px';
            this.style.setProperty('--loading-jumping-color', color);
            this.style.setProperty('--loading-jumping-size', size);
            this.innerHTML = '';
            for (let i = 0; i < count; i++) {
                const dot = document.createElement('loading-jumping');
                this.appendChild(dot);
            }
        }
    }
    customElements.define('loading-jumping-container', LoadingJumpingContainer);

    class LoadingJumping extends HTMLElement {
        connectedCallback() {
            // No content needed, style handles animation
        }
    }
    customElements.define('loading-jumping', LoadingJumping);

    // Easter egg: Listen for the key sequence 'GMS' and show a secret message
    const easterEggSequence = 'gms';
    let easterEggBuffer = '';
    window.addEventListener('keydown', function(e) {
        if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
        easterEggBuffer += e.key.toLowerCase();
        if (!easterEggSequence.startsWith(easterEggBuffer)) {
            easterEggBuffer = e.key.toLowerCase() === easterEggSequence[0] ? e.key.toLowerCase() : '';
        }
        if (easterEggBuffer === easterEggSequence) {
            easterEggBuffer = '';
            if (!document.getElementById('progress-easter-egg')) {
                const egg = document.createElement('div');
                egg.id = 'progress-easter-egg';
                egg.style.position = 'fixed';
                egg.style.bottom = '32px';
                egg.style.right = '32px';
                egg.style.zIndex = '9999';
                egg.style.background = 'rgba(255,255,255,0.95)';
                egg.style.border = '2px solid #4f8cff';
                egg.style.borderRadius = '12px';
                egg.style.padding = '24px 32px';
                egg.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)';
                egg.innerHTML = `
                    <loading-spinner color="#e91e63" size="32px"></loading-spinner>
                    <loading-text color="#e91e63" text="GMS: Gamemodstudios rocks!"></loading-text>
                    <loading-jumping-container color="#e91e63" size="10px" count="7"></loading-jumping-container>
                `;
                document.body.appendChild(egg);
                setTimeout(() => {
                    egg.remove();
                }, 5000);
            }
        }
    });
})();
