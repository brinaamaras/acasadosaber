/**
 * Casa do Saber - Enhanced Website JavaScript
 * Comprehensive client-side functionality for all pages
 */

class CasaDoSaber {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        this.initNavigation();
        this.initScrollEffects();
        this.initImageLazyLoading();
        this.initFormHandling();
        this.initAccessibility();
        this.initPerformanceOptimizations();
        this.initAnimations();
    }

    // ============================
    // NAVIGATION ENHANCEMENTS
    // ============================
    initNavigation() {
        const nav = document.querySelector('#main-nav');
        if (!nav) return;

        // Mobile menu toggle (if needed for future responsive design)
        this.setupMobileMenu(nav);
        
        // Active page highlighting
        this.highlightCurrentPage();
        
        // Smooth scroll for internal links
        this.setupSmoothScroll();
    }

    setupMobileMenu(nav) {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (!navToggle || !navMenu) {
            // Create mobile menu button if it doesn't exist
            const mobileButton = document.createElement('button');
            mobileButton.className = 'nav-toggle';
            mobileButton.setAttribute('aria-expanded', 'false');
            mobileButton.setAttribute('aria-label', 'Abrir menu');
            mobileButton.setAttribute('aria-controls', 'nav-menu');
            mobileButton.innerHTML = '<span></span><span></span><span></span>';
            
            const heroInner = document.querySelector('.hero__inner');
            if (heroInner) {
                heroInner.appendChild(mobileButton);
            }
            
            this.setupMobileMenuEvents(mobileButton, navMenu);
            return;
        }

        this.setupMobileMenuEvents(navToggle, navMenu);
    }

    setupMobileMenuEvents(navToggle, navMenu) {
        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Update aria-label
            navToggle.setAttribute('aria-label', !isExpanded ? 'Fechar menu' : 'Abrir menu');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Abrir menu');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Abrir menu');
                navToggle.focus();
            }
        });

        // Handle resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Abrir menu');
            }
        });
    }

    highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('#main-nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================
    // SCROLL EFFECTS & ANIMATIONS
    // ============================
    initScrollEffects() {
        // Fade in elements on scroll
        this.observeElements();
        
        // Header scroll effects
        this.setupHeaderEffects();
    }

    observeElements() {
        const observerOptions = {
            threshold: [0, 0.1, 0.3, 0.5],
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation delay for smoother appearance
                    setTimeout(() => {
                        entry.target.classList.add('fade-in');
                        entry.target.style.animationDelay = `${index * 100}ms`;
                    }, index * 50);
                }
            });
        }, observerOptions);

        // Observe sections and cards with performance optimization
        requestAnimationFrame(() => {
            document.querySelectorAll('section, .card, form, .hero-section__content, .hero-section__img').forEach((el, index) => {
                el.classList.add('fade-in-element');
                el.style.animationDelay = `${index * 80}ms`;
                observer.observe(el);
            });
        });
    }

    setupHeaderEffects() {
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            const header = document.querySelector('header.hero');
            
            if (header && currentScrollY > 100) {
                const scrollDelta = currentScrollY - lastScrollY;
                
                if (scrollDelta > 5) {
                    // Scrolling down
                    header.style.transform = 'translateY(-100%)';
                    header.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                } else if (scrollDelta < -5) {
                    // Scrolling up
                    header.style.transform = 'translateY(0)';
                    header.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }
            } else if (header) {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    }

    // ============================
    // IMAGE OPTIMIZATION
    // ============================
    initImageLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    loadImage(img) {
        img.classList.add('loading');
        
        img.addEventListener('load', () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
        });

        img.addEventListener('error', () => {
            img.classList.add('error');
            img.alt = 'Imagem não pôde ser carregada';
        });
    }

    // ============================
    // ENHANCED FORM HANDLING
    // ============================
    initFormHandling() {
        const form = document.querySelector('form');
        if (!form) return;

        this.setupFormValidation(form);
        this.setupFormSubmission(form);
        this.setupFieldEnhancements(form);
    }

    setupFormValidation(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });

            // Enhanced accessibility
            input.addEventListener('focus', () => {
                this.showFieldHelp(input);
            });
        });

        // Form submission validation
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            message = 'Este campo é obrigatório.';
            isValid = false;
        }
        // Email validation
        else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            message = 'Digite um email válido.';
            isValid = false;
        }
        // Phone validation
        else if (field.type === 'tel' && value && !this.isValidPhone(value)) {
            message = 'Digite um telefone válido (formato: +5511999999999).';
            isValid = false;
        }
        // File validation
        else if (field.type === 'file' && field.hasAttribute('required') && field.files.length === 0) {
            message = 'Por favor, selecione um arquivo.';
            isValid = false;
        }
        // File type validation
        else if (field.type === 'file' && field.files.length > 0) {
            const file = field.files[0];
            const allowedTypes = field.accept.split(',').map(type => type.trim());
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            
            if (!allowedTypes.includes(fileExtension)) {
                message = 'Tipo de arquivo não permitido.';
                isValid = false;
            }
            
            // File size validation (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                message = 'Arquivo muito grande. Máximo 5MB.';
                isValid = false;
            }
        }

        if (!isValid) {
            this.showFieldError(field, message);
        } else {
            this.showFieldSuccess(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        field.classList.remove('success');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.setAttribute('role', 'alert');
        
        field.parentNode.appendChild(errorDiv);
        
        // Update aria-describedby
        field.setAttribute('aria-describedby', 'error-' + field.id);
        errorDiv.id = 'error-' + field.id;
    }

    showFieldSuccess(field) {
        field.classList.remove('error');
        field.classList.add('success');
    }

    clearFieldError(field) {
        field.classList.remove('error', 'success');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        field.removeAttribute('aria-describedby');
    }

    showFieldHelp(field) {
        const helpText = field.getAttribute('data-help');
        if (helpText && !field.parentNode.querySelector('.help-text')) {
            const helpDiv = document.createElement('div');
            helpDiv.className = 'help-text';
            helpDiv.textContent = helpText;
            field.parentNode.appendChild(helpDiv);
        }
    }

    setupFieldEnhancements(form) {
        // Phone number formatting
        const phoneInputs = form.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.startsWith('55')) {
                    value = '+' + value;
                }
                e.target.value = value;
            });
        });

        // File input enhancements
        const fileInputs = form.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            this.enhanceFileInput(input);
        });
    }

    enhanceFileInput(input) {
        const wrapper = document.createElement('div');
        wrapper.className = 'file-input-wrapper';
        
        const label = document.createElement('label');
        label.className = 'file-input-label';
        label.textContent = 'Escolher arquivo';
        
        const fileName = document.createElement('span');
        fileName.className = 'file-name';
        fileName.textContent = 'Nenhum arquivo selecionado';
        
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(label);
        wrapper.appendChild(fileName);
        wrapper.appendChild(input);
        
        input.addEventListener('change', () => {
            if (input.files.length > 0) {
                fileName.textContent = input.files[0].name;
                fileName.classList.add('selected');
            } else {
                fileName.textContent = 'Nenhum arquivo selecionado';
                fileName.classList.remove('selected');
            }
        });
    }

    handleFormSubmission(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm(form);
        } else {
            this.showNotification('Por favor, corrija os erros antes de enviar.', 'error');
            
            // Focus on first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    async submitForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        submitButton.classList.add('loading');

        try {
            // Simulate API call (replace with real endpoint)
            await this.simulateAPICall();
            
            // Success state
            submitButton.textContent = '✓ Enviado com sucesso!';
            submitButton.classList.remove('loading');
            submitButton.classList.add('success');
            
            this.showNotification('Formulário enviado com sucesso! Entraremos em contato em breve.', 'success');
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                submitButton.classList.remove('success');
                
                // Clear all field states
                form.querySelectorAll('.error, .success').forEach(field => {
                    this.clearFieldError(field);
                });
            }, 3000);
            
        } catch (error) {
            // Error state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.classList.remove('loading');
            
            this.showNotification('Erro ao enviar formulário. Tente novamente.', 'error');
        }
    }

    simulateAPICall() {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // 90% success rate simulation
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    // ============================
    // ACCESSIBILITY ENHANCEMENTS
    // ============================
    initAccessibility() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupScreenReaderEnhancements();
    }

    setupKeyboardNavigation() {
        // Escape key handling for modals/notifications
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeNotifications();
            }
        });

        // Tab navigation improvements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('click', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupFocusManagement() {
        // Skip to main content link
        this.addSkipLink();
        
        // Focus visible indicators
        const focusableElements = 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
        
        document.querySelectorAll(focusableElements).forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focus-visible');
            });
            
            element.addEventListener('blur', () => {
                element.classList.remove('focus-visible');
            });
        });
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Pular para o conteúdo principal';
        skipLink.className = 'skip-link';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    setupScreenReaderEnhancements() {
        // Add landmark roles if missing
        const main = document.querySelector('main');
        if (main && !main.hasAttribute('role')) {
            main.setAttribute('role', 'main');
        }

        // Announce dynamic content changes
        this.createLiveRegion();
    }

    createLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }

    // ============================
    // PERFORMANCE OPTIMIZATIONS
    // ============================
    initPerformanceOptimizations() {
        this.preloadCriticalResources();
        this.optimizeImages();
        this.setupServiceWorker();
    }

    preloadCriticalResources() {
        // Preload critical CSS and fonts
        const preloadResources = [
            { href: '/css/style.css', as: 'style' },
            { href: '/js/form-validation.js', as: 'script' }
        ];

        preloadResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            document.head.appendChild(link);
        });
    }

    optimizeImages() {
        // Add loading="lazy" to images without it
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.setAttribute('loading', 'lazy');
        });

        // Optimize image formats based on browser support
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            document.body.classList.add('supports-loading');
        }
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    // ============================
    // ANIMATIONS & VISUAL EFFECTS
    // ============================
    initAnimations() {
        this.setupHoverEffects();
        this.setupParallaxEffects();
        this.setupMicroAnimations();
        this.setupSmoothTransitions();
    }
    
    setupMicroAnimations() {
        // Add ripple effect to buttons
        document.querySelectorAll('button, .btn').forEach(button => {
            button.addEventListener('click', this.createRipple.bind(this));
        });
        
        // Smooth focus animations
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.transition = 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
            
            input.addEventListener('blur', (e) => {
                e.target.style.transform = 'scale(1)';
            });
        });
    }
    
    createRipple(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    setupSmoothTransitions() {
        // Add smooth page transitions
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (link && link.hostname === window.location.hostname && !link.hash) {
                e.preventDefault();
                
                // Fade out animation
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        });
        
        // Fade in on page load
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.5s ease';
        });
    }

    setupHoverEffects() {
        // Enhanced button and card hover effects with smooth transitions
        const interactiveElements = document.querySelectorAll('.btn, button, .card, nav a, input, textarea');
        
        interactiveElements.forEach(element => {
            element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            element.addEventListener('mouseenter', (e) => {
                if (e.target.matches('.btn, button')) {
                    e.target.style.transform = 'translateY(-3px) scale(1.02)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                } else if (e.target.matches('.card')) {
                    e.target.style.transform = 'translateY(-5px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.1)';
                } else if (e.target.matches('nav a')) {
                    e.target.style.transform = 'scale(1.05)';
                } else if (e.target.matches('input, textarea')) {
                    e.target.style.borderColor = 'var(--color-primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(11, 93, 184, 0.1)';
                }
            });
            
            element.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                if (e.target.matches('.card, .btn, button')) {
                    e.target.style.boxShadow = '';
                } else if (e.target.matches('input, textarea')) {
                    if (!e.target.matches(':focus')) {
                        e.target.style.borderColor = '';
                        e.target.style.boxShadow = '';
                    }
                }
            });
            
            // Add click animation
            element.addEventListener('mousedown', (e) => {
                if (e.target.matches('.btn, button')) {
                    e.target.style.transform = 'translateY(-1px) scale(0.98)';
                }
            });
            
            element.addEventListener('mouseup', (e) => {
                if (e.target.matches('.btn, button')) {
                    setTimeout(() => {
                        e.target.style.transform = 'translateY(-3px) scale(1.02)';
                    }, 100);
                }
            });
        });
    }

    setupParallaxEffects() {
        // Parallax effects disabled to keep images static
        const parallaxElements = document.querySelectorAll('.hero-section__img');
        
        if (parallaxElements.length > 0) {
            // Reset any existing transforms and ensure images stay static
            parallaxElements.forEach((element) => {
                element.style.transform = 'none';
                element.style.transition = 'none';
            });
        }
    }

    // ============================
    // UTILITY METHODS
    // ============================
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPhone(phone) {
        return /^\+?\d{10,13}$/.test(phone.replace(/\s/g, ''));
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close" aria-label="Fechar notificação">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto dismiss after 5 seconds
        setTimeout(() => {
            this.dismissNotification(notification);
        }, 5000);

        // Close button functionality
        notification.querySelector('.notification__close').addEventListener('click', () => {
            this.dismissNotification(notification);
        });

        // Announce to screen readers
        this.announceToScreenReader(message);
    }

    dismissNotification(notification) {
        notification.classList.add('notification--dismissing');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    closeNotifications() {
        document.querySelectorAll('.notification').forEach(notification => {
            this.dismissNotification(notification);
        });
    }
}

// Initialize the application
const casaDoSaber = new CasaDoSaber();

// Export for external use
window.CasaDoSaber = CasaDoSaber;