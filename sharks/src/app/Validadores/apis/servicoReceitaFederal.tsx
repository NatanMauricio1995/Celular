import { ResultadoValidacaoMatematica } from '../tipos/tiposValidacao';

/**
 * Valida matematicamente um CPF
 * @param cpf - CPF a ser validado (com ou sem formatação)
 * @returns Resultado da validação matemática (apenas boolean)
 */
export function validarCpfMatematico(cpf: string): ResultadoValidacaoMatematica {
  // Remove formatação
  const cpfLimpo = cpf.replace(/[^\d]/g, '');

  // Verifica se tem 11 dígitos
  if (cpfLimpo.length !== 11) {
    return { valido: false };
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpfLimpo)) {
    return { valido: false };
  }

  // Validação do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo[i]) * (10 - i);
  }

  let resto = soma % 11;
  const primeiroDigito = resto < 2 ? 0 : 11 - resto;

  if (parseInt(cpfLimpo[9]) !== primeiroDigito) {
    return { valido: false };
  }

  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo[i]) * (11 - i);
  }

  resto = soma % 11;
  const segundoDigito = resto < 2 ? 0 : 11 - resto;

  if (parseInt(cpfLimpo[10]) !== segundoDigito) {
    return { valido: false };
  }

  return { valido: true };
}

/**
 * Formata um CPF adicionando pontos e hífen
 * @param cpf - CPF sem formatação
 * @returns CPF formatado (000.000.000-00)
 */
export function formatarCpf(cpf: string): string {
  const cpfLimpo = cpf.replace(/[^\d]/g, '');
  
  if (cpfLimpo.length !== 11) {
    return cpf;
  }

  return cpfLimpo.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    '$1.$2.$3-$4'
  );
}

/**
 * Remove formatação do CPF
 * @param cpf - CPF formatado
 * @returns CPF apenas com números
 */
export function limparCpf(cpf: string): string {
  return cpf.replace(/[^\d]/g, '');
}

/**
 * Aplica máscara de CPF durante a digitação
 * @param valor - Valor atual do campo
 * @returns Valor com máscara aplicada
 */
export function aplicarMascaraCpf(valor: string): string {
  const apenasNumeros = valor.replace(/[^\d]/g, '');
  
  if (apenasNumeros.length <= 3) {
    return apenasNumeros;
  } else if (apenasNumeros.length <= 6) {
    return apenasNumeros.replace(/^(\d{3})(\d{0,3})/, '$1.$2');
  } else if (apenasNumeros.length <= 9) {
    return apenasNumeros.replace(/^(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
  } else {
    return apenasNumeros.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  }
}

