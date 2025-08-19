/**
 * Utilitário para validação de CNPJ e CPF
 * Inclui validação matemática e consulta à API da Receita Federal
 */

class DocumentValidator {
  /**
   * Remove caracteres não numéricos de uma string
   */
  static removeFormatting(document) {
    return document.replace(/\D/g, '');
  }

  /**
   * Valida CNPJ matematicamente
   */
  static validateCNPJMath(cnpj) {
    const cleanCNPJ = this.removeFormatting(cnpj);
    
    // Verifica se tem 14 dígitos
    if (cleanCNPJ.length !== 14) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cleanCNPJ)) return false;
    
    // Validação do primeiro dígito verificador
    let sum = 0;
    let weight = 5;
    
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanCNPJ[i]) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    
    let digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(cleanCNPJ[12]) !== digit1) return false;
    
    // Validação do segundo dígito verificador
    sum = 0;
    weight = 6;
    
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanCNPJ[i]) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    
    let digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return parseInt(cleanCNPJ[13]) === digit2;
  }

  /**
   * Valida CPF matematicamente
   */
  static validateCPFMath(cpf) {
    const cleanCPF = this.removeFormatting(cpf);
    
    // Verifica se tem 11 dígitos
    if (cleanCPF.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cleanCPF)) return false;
    
    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF[i]) * (10 - i);
    }
    
    let digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(cleanCPF[9]) !== digit1) return false;
    
    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF[i]) * (11 - i);
    }
    
    let digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return parseInt(cleanCPF[10]) === digit2;
  }

  /**
   * Consulta CNPJ na API da Receita Federal
   */
  static async validateCNPJAPI(cnpj) {
    const cleanCNPJ = this.removeFormatting(cnpj);
    
    try {
      const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cleanCNPJ}`);
      const data = await response.json();
      
      // Verifica se a consulta foi bem-sucedida
      if (data.status === 'ERROR') {
        return {
          valid: false,
          message: 'CNPJ não encontrado na Receita Federal',
          data: null
        };
      }
      
      return {
        valid: true,
        message: 'CNPJ válido e ativo na Receita Federal',
        data: {
          razaoSocial: data.nome,
          nomeFantasia: data.fantasia || '',
          situacao: data.situacao,
          atividade: data.atividade_principal?.[0]?.text || ''
        }
      };
      
    } catch (error) {
      return {
        valid: false,
        message: 'Erro ao consultar CNPJ na Receita Federal',
        data: null
      };
    }
  }

  /**
   * Consulta CPF na API (usando serviço alternativo, pois Receita Federal não tem API pública para CPF)
   */
  static async validateCPFAPI(cpf) {
    // Nota: A Receita Federal não possui API pública para consulta de CPF
    // Esta função retorna apenas a validação matemática como válida
    // Para implementação real, seria necessário usar um serviço pago como Serasa, SPC, etc.
    
    const cleanCPF = this.removeFormatting(cpf);
    
    // Simulação de consulta (em produção, usar um serviço real)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          valid: true,
          message: 'CPF com formato válido (consulta na Receita Federal não disponível via API pública)',
          data: {
            cpf: cleanCPF,
            formatted: this.formatCPF(cleanCPF)
          }
        });
      }, 500);
    });
  }

  /**
   * Validação completa de CNPJ (matemática + API)
   */
  static async validateCNPJ(cnpj) {
    // Passo 1: Validação matemática
    const mathValidation = this.validateCNPJMath(cnpj);
    
    if (!mathValidation) {
      return {
        valid: false,
        step: 1,
        message: 'CNPJ inválido - formato ou dígitos verificadores incorretos',
        data: null
      };
    }

    // Passo 2: Validação na API da Receita Federal
    const apiValidation = await this.validateCNPJAPI(cnpj);
    
    return {
      valid: apiValidation.valid,
      step: 2,
      message: apiValidation.message,
      data: apiValidation.data
    };
  }

  /**
   * Validação completa de CPF (matemática + API)
   */
  static async validateCPF(cpf) {
    // Passo 1: Validação matemática
    const mathValidation = this.validateCPFMath(cpf);
    
    if (!mathValidation) {
      return {
        valid: false,
        step: 1,
        message: 'CPF inválido - formato ou dígitos verificadores incorretos',
        data: null
      };
    }

    // Passo 2: Validação na API (simulada)
    const apiValidation = await this.validateCPFAPI(cpf);
    
    return {
      valid: apiValidation.valid,
      step: 2,
      message: apiValidation.message,
      data: apiValidation.data
    };
  }

  /**
   * Formata CNPJ
   */
  static formatCNPJ(cnpj) {
    const clean = this.removeFormatting(cnpj);
    return clean.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }

  /**
   * Formata CPF
   */
  static formatCPF(cpf) {
    const clean = this.removeFormatting(cpf);
    return clean.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }

  /**
   * Aplica máscara de CNPJ em tempo real
   */
  static applyCNPJMask(value) {
    const clean = this.removeFormatting(value);
    return clean
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  }

  /**
   * Aplica máscara de CPF em tempo real
   */
  static applyCPFMask(value) {
    const clean = this.removeFormatting(value);
    return clean
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2')
      .substring(0, 14);
  }
}

export default DocumentValidator;

// Exemplo de uso:
/*

// Validação de CNPJ
const resultCNPJ = await DocumentValidator.validateCNPJ('11.222.333/0001-81');
console.log(resultCNPJ);
// {
//   valid: false,
//   step: 1,
//   message: 'CNPJ inválido - formato ou dígitos verificadores incorretos',
//   data: null
// }

// Validação de CPF
const resultCPF = await DocumentValidator.validateCPF('123.456.789-09');
console.log(resultCPF);

// Aplicar máscaras
const maskedCNPJ = DocumentValidator.applyCNPJMask('11222333000181');
const maskedCPF = DocumentValidator.applyCPFMask('12345678909');

*/