// hooks/useDocumentValidation.js

import { useState } from 'react';
import DocumentValidator from '../utils/documentValidator';

export const useDocumentValidation = () => {
  const [validationState, setValidationState] = useState({
    cnpj: {
      isValidating: false,
      isValid: null,
      message: '',
      step: 0,
      data: null
    },
    cpf: {
      isValidating: false,
      isValid: null,
      message: '',
      step: 0,
      data: null
    }
  });

  /**
   * Valida CNPJ com feedback em tempo real
   */
  const validateCNPJ = async (cnpj) => {
    if (!cnpj || cnpj.length < 14) {
      setValidationState(prev => ({
        ...prev,
        cnpj: {
          isValidating: false,
          isValid: null,
          message: '',
          step: 0,
          data: null
        }
      }));
      return;
    }

    setValidationState(prev => ({
      ...prev,
      cnpj: { ...prev.cnpj, isValidating: true }
    }));

    try {
      const result = await DocumentValidator.validateCNPJ(cnpj);
      
      setValidationState(prev => ({
        ...prev,
        cnpj: {
          isValidating: false,
          isValid: result.valid,
          message: result.message,
          step: result.step,
          data: result.data
        }
      }));

      return result;
    } catch (error) {
      setValidationState(prev => ({
        ...prev,
        cnpj: {
          isValidating: false,
          isValid: false,
          message: 'Erro ao validar CNPJ',
          step: 0,
          data: null
        }
      }));
      return { valid: false, message: 'Erro ao validar CNPJ' };
    }
  };

  /**
   * Valida CPF com feedback em tempo real
   */
  const validateCPF = async (cpf) => {
    if (!cpf || cpf.length < 11) {
      setValidationState(prev => ({
        ...prev,
        cpf: {
          isValidating: false,
          isValid: null,
          message: '',
          step: 0,
          data: null
        }
      }));
      return;
    }

    setValidationState(prev => ({
      ...prev,
      cpf: { ...prev.cpf, isValidating: true }
    }));

    try {
      const result = await DocumentValidator.validateCPF(cpf);
      
      setValidationState(prev => ({
        ...prev,
        cpf: {
          isValidating: false,
          isValid: result.valid,
          message: result.message,
          step: result.step,
          data: result.data
        }
      }));

      return result;
    } catch (error) {
      setValidationState(prev => ({
        ...prev,
        cpf: {
          isValidating: false,
          isValid: false,
          message: 'Erro ao validar CPF',
          step: 0,
          data: null
        }
      }));
      return { valid: false, message: 'Erro ao validar CPF' };
    }
  };

  /**
   * Aplica máscara e valida CNPJ
   */
  const handleCNPJChange = async (value) => {
    const masked = DocumentValidator.applyCNPJMask(value);
    
    // Só valida quando o CNPJ estiver completo
    if (DocumentValidator.removeFormatting(masked).length === 14) {
      await validateCNPJ(masked);
    } else {
      // Limpa validação se CNPJ incompleto
      setValidationState(prev => ({
        ...prev,
        cnpj: {
          isValidating: false,
          isValid: null,
          message: '',
          step: 0,
          data: null
        }
      }));
    }
    
    return masked;
  };

  /**
   * Aplica máscara e valida CPF
   */
  const handleCPFChange = async (value) => {
    const masked = DocumentValidator.applyCPFMask(value);
    
    // Só valida quando o CPF estiver completo
    if (DocumentValidator.removeFormatting(masked).length === 11) {
      await validateCPF(masked);
    } else {
      // Limpa validação se CPF incompleto
      setValidationState(prev => ({
        ...prev,
        cpf: {
          isValidating: false,
          isValid: null,
          message: '',
          step: 0,
          data: null
        }
      }));
    }
    
    return masked;
  };

  /**
   * Reseta estado de validação
   */
  const resetValidation = () => {
    setValidationState({
      cnpj: {
        isValidating: false,
        isValid: null,
        message: '',
        step: 0,
        data: null
      },
      cpf: {
        isValidating: false,
        isValid: null,
        message: '',
        step: 0,
        data: null
      }
    });
  };

  /**
   * Verifica se todos os documentos são válidos
   */
  const areDocumentsValid = () => {
    return validationState.cnpj.isValid === true && 
           validationState.cpf.isValid === true;
  };

  return {
    validationState,
    validateCNPJ,
    validateCPF,
    handleCNPJChange,
    handleCPFChange,
    resetValidation,
    areDocumentsValid
  };
};

export default useDocumentValidation;