// phoneUtils.js
export const phoneUtils = {
  // Máscara para telefone brasileiro
  formatPhone: (value) => {
    if (!value) return '';
    
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara baseada no tamanho
    if (numbers.length <= 10) {
      // Telefone fixo: (00) 0000-0000
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
    } else {
      // Celular: (00) 00000-0000
      return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
    }
  },

  // Valida se o telefone tem formato correto
  validatePhone: (phone) => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.length >= 10 && numbers.length <= 11;
  },

  // Gerencia a exibição do campo WhatsApp
  toggleWhatsAppField: (isWhatsApp, whatsAppFieldId, whatsAppInputId) => {
    const whatsAppField = document.getElementById(whatsAppFieldId);
    const whatsAppInput = document.getElementById(whatsAppInputId);
    
    if (whatsAppField && whatsAppInput) {
      if (isWhatsApp) {
        whatsAppField.style.display = 'none';
        whatsAppInput.removeAttribute('required');
        whatsAppInput.value = '';
      } else {
        whatsAppField.style.display = 'block';
        whatsAppInput.setAttribute('required', 'required');
      }
    }
  },

  // Inicializa os event listeners
  initPhoneHandlers: () => {
    const phoneInput = document.getElementById('TELEFONE');
    const whatsAppYes = document.getElementById('whatsapp_sim');
    const whatsAppNo = document.getElementById('whatsapp_nao');

    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        e.target.value = phoneUtils.formatPhone(e.target.value);
      });
    }

    if (whatsAppYes) {
      whatsAppYes.addEventListener('change', () => {
        phoneUtils.toggleWhatsAppField(true, 'whatsapp_field', 'WHATSAPP');
      });
    }

    if (whatsAppNo) {
      whatsAppNo.addEventListener('change', () => {
        phoneUtils.toggleWhatsAppField(false, 'whatsapp_field', 'WHATSAPP');
      });
    }
  }
};