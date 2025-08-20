import { ResultadoValidacaoMatematica } from '../tipos/tiposValidacao';

/**
 * Valida matematicamente um CNPJ
 * @param cnpj - CNPJ a ser validado (com ou sem formatação)
 * @returns Resultado da validação matemática (apenas boolean)
 */
export function validarCnpjMatematico(cnpj: string): ResultadoValidacaoMatematica {
  // Remove formatação
  const cnpjLimpo = cnpj.replace(/[^\d]/g, '');

  // Verifica se tem 14 dígitos
  if (cnpjLimpo.length !== 14) {
    return { valido: false };
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cnpjLimpo)) {
    return { valido: false };
  }

  // Validação do primeiro dígito verificador
  let soma = 0;
  let peso = 5;
  
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpjLimpo[i]) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }

  let resto = soma % 11;
  const primeiroDigito = resto < 2 ? 0 : 11 - resto;

  if (parseInt(cnpjLimpo[12]) !== primeiroDigito) {
    return { valido: false };
  }

  // Validação do segundo dígito verificador
  soma = 0;
  peso = 6;
  
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpjLimpo[i]) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }

  resto = soma % 11;
  const segundoDigito = resto < 2 ? 0 : 11 - resto;

  if (parseInt(cnpjLimpo[13]) !== segundoDigito) {
    return { valido: false };
  }

  return { valido: true };
}

/**
 * Formata um CNPJ adicionando pontos, barra e hífen
 * @param cnpj - CNPJ sem formatação
 * @returns CNPJ formatado (00.000.000/0000-00)
 */
export function formatarCnpj(cnpj: string): string {
  const cnpjLimpo = cnpj.replace(/[^\d]/g, '');
  
  if (cnpjLimpo.length !== 14) {
    return cnpj;
  }

  return cnpjLimpo.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
}

/**
 * Remove formatação do CNPJ
 * @param cnpj - CNPJ formatado
 * @returns CNPJ apenas com números
 */
export function limparCnpj(cnpj: string): string {
  return cnpj.replace(/[^\d]/g, '');
}

/**
 * Aplica máscara de CNPJ durante a digitação
 * @param valor - Valor atual do campo
 * @returns Valor com máscara aplicada
 */
export function aplicarMascaraCnpj(valor: string): string {
  const apenasNumeros = valor.replace(/[^\d]/g, '');
  
  if (apenasNumeros.length <= 2) {
    return apenasNumeros;
  } else if (apenasNumeros.length <= 5) {
    return apenasNumeros.replace(/^(\d{2})(\d{0,3})/, '$1.$2');
  } else if (apenasNumeros.length <= 8) {
    return apenasNumeros.replace(/^(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
  } else if (apenasNumeros.length <= 12) {
    return apenasNumeros.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
  } else {
    return apenasNumeros.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
  }
}

