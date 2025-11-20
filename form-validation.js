// Enhanced Form validation and UX for Casa do Saber
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const submitButton = document.querySelector('button[type="submit"]');
    
    if (form && submitButton) {
        // Add validation feedback
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });

        // Real-time validation for specific fields
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', function() {
                if (this.value.length === 14) { // Full CPF with mask
                    validateField(this);
                }
            });
        }

        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('blur', function() {
                validateField(this);
            });
        }

        // Form submission handling
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            let firstInvalidField = null;
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                    if (!firstInvalidField) {
                        firstInvalidField = input;
                    }
                }
            });
            
            // Validate availability checkboxes
            const availabilityCheckboxes = form.querySelectorAll('input[name="disponibilidade[]"]');
            const hasAvailability = Array.from(availabilityCheckboxes).some(checkbox => checkbox.checked);
            
            if (!hasAvailability) {
                showError('Selecione pelo menos um dia da semana para disponibilidade.');
                isValid = false;
            }
            
            if (isValid) {
                simulateSubmission();
            } else {
                showError('Por favor, corrija os campos destacados antes de enviar.');
                if (firstInvalidField) {
                    firstInvalidField.focus();
                    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove previous error messages
        removeErrorMessage(field);
        field.classList.remove('error', 'success');
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'Este campo é obrigatório.');
            return false;
        }
        
        // Specific validations based on field type and name
        switch (field.type) {
            case 'email':
                if (value && !isValidEmail(value)) {
                    showFieldError(field, 'Digite um email válido.');
                    isValid = false;
                }
                break;
                
            case 'tel':
                if (value && !isValidPhone(value)) {
                    showFieldError(field, 'Digite um telefone válido no formato (11) 99999-9999.');
                    isValid = false;
                }
                break;
                
            case 'date':
                if (field.name === 'nascimento' && value) {
                    const birthDate = new Date(value);
                    const today = new Date();
                    const age = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();
                    
                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
                    
                    if (age < 18) {
                        showFieldError(field, 'Você deve ter pelo menos 18 anos para se voluntariar.');
                        isValid = false;
                    }
                }
                break;
                
            case 'text':
                // CPF validation
                if (field.name === 'cpf' && value) {
                    if (!window.validateCPFComplete || !window.validateCPFComplete(value)) {
                        showFieldError(field, 'Digite um CPF válido.');
                        isValid = false;
                    }
                }
                
                // CEP validation
                if (field.name === 'cep' && value) {
                    if (!window.validateCEP || !window.validateCEP(value)) {
                        showFieldError(field, 'Digite um CEP válido no formato 00000-000.');
                        isValid = false;
                    }
                }
                
                // Name validation
                if (field.name === 'nome' && value) {
                    if (value.length < 2) {
                        showFieldError(field, 'Nome deve ter pelo menos 2 caracteres.');
                        isValid = false;
                    } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(value)) {
                        showFieldError(field, 'Nome deve conter apenas letras.');
                        isValid = false;
                    }
                }
                
                // City validation
                if (field.name === 'cidade' && value) {
                    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(value)) {
                        showFieldError(field, 'Nome da cidade deve conter apenas letras.');
                        isValid = false;
                    }
                }
                break;
                
            case 'file':
                if (value) {
                    const file = field.files[0];
                    const maxSize = 5 * 1024 * 1024; // 5MB
                    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                    
                    if (file.size > maxSize) {
                        showFieldError(field, 'Arquivo muito grande. Máximo permitido: 5MB.');
                        isValid = false;
                    } else if (!allowedTypes.includes(file.type)) {
                        showFieldError(field, 'Formato não suportado. Use PDF, DOC ou DOCX.');
                        isValid = false;
                    }
                }
                break;
        }
        
        // Required area selection validation
        if (field.name === 'area' && field.hasAttribute('required') && !value) {
            showFieldError(field, 'Selecione uma área de interesse.');
            isValid = false;
        }
        
        // Required radio group validation
        if (field.type === 'radio' && field.hasAttribute('required')) {
            const radioGroup = document.querySelectorAll(`input[name="${field.name}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            
            if (!isChecked) {
                showFieldError(field, 'Selecione uma opção.');
                isValid = false;
            }
        }
        
        if (isValid) {
            field.classList.add('success');
            
            // Auto-fill related fields for CEP
            if (field.name === 'cep' && value.length === 9) {
                // CEP validation and address lookup is handled in masks.js
            }
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        field.classList.remove('success');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: var(--color-error);
            font-size: var(--fs-xs);
            margin-top: var(--space-1);
            display: block;
            font-weight: 500;
            background: rgba(220, 38, 38, 0.1);
            padding: var(--space-1) var(--space-2);
            border-radius: var(--radius-sm);
        `;
        errorDiv.setAttribute('role', 'alert');
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function removeErrorMessage(field) {
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function isValidPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10 && cleaned.length <= 11;
    }
    
    function simulateSubmission() {
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        submitButton.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            submitButton.textContent = '✓ Enviado com sucesso!';
            submitButton.classList.remove('loading');
            submitButton.classList.add('success');
            
            setTimeout(() => {
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Inscrição';
                submitButton.classList.remove('success');
                
                // Clear all validation states
                const fields = form.querySelectorAll('input, textarea, select');
                fields.forEach(field => {
                    field.classList.remove('error', 'success');
                    removeErrorMessage(field);
                });
                
                showSuccess('Formulário enviado com sucesso! Entraremos em contato em breve.');
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
            }, 3000);
        }, 2000);
    }
    
    function showError(message) {
        showMessage(message, 'error');
    }
    
    function showSuccess(message) {
        showMessage(message, 'success');
    }
    
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: var(--space-4);
            right: var(--space-4);
            padding: var(--space-4) var(--space-5);
            border-radius: var(--radius);
            color: white;
            font-weight: 600;
            z-index: var(--z-notification);
            max-width: 400px;
            background: ${type === 'error' ? 'var(--color-error)' : 'var(--color-success)'};
            box-shadow: var(--shadow-lg);
            transform: translateX(100%);
            transition: transform var(--transition-base);
        `;
        messageDiv.setAttribute('role', 'alert');
        messageDiv.setAttribute('aria-live', 'polite');
        
        document.body.appendChild(messageDiv);
        
        // Animate in
        requestAnimationFrame(() => {
            messageDiv.style.transform = 'translateX(0)';
        });
        
        // Auto remove
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }, 5000);
    }
});