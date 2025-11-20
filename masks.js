/**
 * Input Masks for Casa do Saber Forms
 * Implements masks for CPF, Phone, and CEP fields
 */

class InputMasks {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupMasks());
        } else {
            this.setupMasks();
        }
    }

    setupMasks() {
        // CPF Mask
        const cpfInputs = document.querySelectorAll('input[data-mask="000.000.000-00"]');
        cpfInputs.forEach(input => {
            input.addEventListener('input', (e) => this.applyCPFMask(e.target));
            input.addEventListener('keydown', (e) => this.handleBackspace(e));
        });

        // Phone Mask  
        const phoneInputs = document.querySelectorAll('input[data-mask="(00) 00000-0000"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', (e) => this.applyPhoneMask(e.target));
            input.addEventListener('keydown', (e) => this.handleBackspace(e));
        });

        // CEP Mask
        const cepInputs = document.querySelectorAll('input[data-mask="00000-000"]');
        cepInputs.forEach(input => {
            input.addEventListener('input', (e) => this.applyCEPMask(e.target));
            input.addEventListener('keydown', (e) => this.handleBackspace(e));
            input.addEventListener('blur', (e) => this.lookupCEP(e.target));
        });
    }

    applyCPFMask(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
        
        input.value = value;
        this.validateCPF(input);
    }

    applyPhoneMask(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            if (value.length === 14) {
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
            } else {
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
            }
        }
        
        input.value = value;
    }

    applyCEPMask(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length <= 8) {
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
        
        input.value = value;
    }

    handleBackspace(event) {
        // Allow backspace to work properly with masks
        if (event.key === 'Backspace') {
            const input = event.target;
            const cursorPosition = input.selectionStart;
            const value = input.value;
            
            // If cursor is after a separator, move back one more position
            if (cursorPosition > 0) {
                const charBefore = value.charAt(cursorPosition - 1);
                if (['.', '-', '(', ')', ' '].includes(charBefore)) {
                    setTimeout(() => {
                        input.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
                    }, 0);
                }
            }
        }
    }

    validateCPF(input) {
        const cpf = input.value.replace(/\D/g, '');
        
        if (cpf.length === 11) {
            if (this.isValidCPF(cpf)) {
                input.classList.remove('error');
                input.classList.add('success');
                this.removeErrorMessage(input);
            } else {
                input.classList.add('error');
                input.classList.remove('success');
                this.showErrorMessage(input, 'CPF inválido');
            }
        } else {
            input.classList.remove('error', 'success');
            this.removeErrorMessage(input);
        }
    }

    isValidCPF(cpf) {
        // Basic CPF validation algorithm
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        let sum = 0;
        let remainder;

        // Validate first digit
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        // Validate second digit
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    async lookupCEP(input) {
        const cep = input.value.replace(/\D/g, '');
        
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                
                if (!data.erro) {
                    this.fillAddressFields(data);
                    input.classList.add('success');
                    input.classList.remove('error');
                    this.removeErrorMessage(input);
                } else {
                    this.showErrorMessage(input, 'CEP não encontrado');
                    input.classList.add('error');
                }
            } catch (error) {
                console.warn('Erro ao buscar CEP:', error);
                // Silently fail - don't show error to user for API issues
            }
        }
    }

    fillAddressFields(addressData) {
        const cityField = document.getElementById('cidade');
        const stateField = document.getElementById('estado');
        
        if (cityField && addressData.localidade) {
            cityField.value = addressData.localidade;
            cityField.classList.add('success');
        }
        
        if (stateField && addressData.uf) {
            stateField.value = addressData.uf;
            stateField.classList.add('success');
        }

        // Show notification
        if (window.CasaDoSaber) {
            window.CasaDoSaber.prototype.showNotification('Endereço preenchido automaticamente!', 'success');
        }
    }

    showErrorMessage(input, message) {
        this.removeErrorMessage(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.setAttribute('role', 'alert');
        
        input.parentNode.appendChild(errorDiv);
    }

    removeErrorMessage(input) {
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
}

// Enhanced CPF validation with complete algorithm
function validateCPFComplete(cpf) {
    const cleaned = cpf.replace(/\D/g, '');
    
    if (cleaned.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleaned)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleaned.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleaned.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.charAt(10))) return false;

    return true;
}

// Phone validation
function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 11;
}

// CEP validation
function validateCEP(cep) {
    const cleaned = cep.replace(/\D/g, '');
    return cleaned.length === 8;
}

// Initialize masks when DOM is ready
const inputMasks = new InputMasks();

// Export functions for external use
window.InputMasks = InputMasks;
window.validateCPFComplete = validateCPFComplete;
window.validatePhone = validatePhone;
window.validateCEP = validateCEP;