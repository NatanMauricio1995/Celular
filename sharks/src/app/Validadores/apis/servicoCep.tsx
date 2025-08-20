import { ResultadoValidacaoApi, DadosEndereco } from '../tipos/tiposValidacao';

/**
 * Valida e consulta dados de CEP na API ViaCEP
 * @param cep - CEP a ser consultado (com ou sem formatação)
 * @returns Resultado da consulta (apenas boolean e dados)
 */
export async function consultarCep(cep: string): Promise<ResultadoValidacaoApi> {
  try {
    // Remove formatação do CEP
    const cepLimpo = cep.replace(/[^\d]/g, '');

    // Valida formato do CEP
    if (cepLimpo.length !== 8) {
      return { valido: false };
    }

    // Verifica se o CEP não é uma sequência inválida
    if (/^(\d)\1{7}$/.test(cepLimpo)) {
      return { valido: false };
    }

    // Formata CEP para consulta
    const cepFormatado = cepLimpo.replace(/^(\d{5})(\d{3})$/, '$1-$2');

    // Consulta na API ViaCEP
    const url = `https://viacep.com.br/ws/${cepLimpo}/json/`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return { valido: false };
    }

    const dados = await response.json();

    // Verifica se o CEP foi encontrado
    if (dados.erro) {
      return { valido: false };
    }

    // Monta os dados do endereço
    const dadosEndereco: DadosEndereco = {
      cep: cepFormatado,
      logradouro: dados.logradouro || '',
      complemento: dados.complemento || '',
      bairro: dados.bairro || '',
      localidade: dados.localidade || '',
      uf: dados.uf || '',
      ibge: dados.ibge,
      gia: dados.gia,
      ddd: dados.ddd,
      siafi: dados.siafi
    };

    return {
      valido: true,
      dados: dadosEndereco
    };

  } catch (error) {
    console.error('Erro ao consultar CEP:', error);
    return { valido: false };
  }
}

/**
 * Formata um CEP adicionando hífen
 * @param cep - CEP sem formatação
 * @returns CEP formatado (00000-000)
 */
export function formatarCep(cep: string): string {
  const cepLimpo = cep.replace(/[^\d]/g, '');
  
  if (cepLimpo.length !== 8) {
    return cep;
  }

  return cepLimpo.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}

/**
 * Remove formatação do CEP
 * @param cep - CEP formatado
 * @returns CEP apenas com números
 */
export function limparCep(cep: string): string {
  return cep.replace(/[^\d]/g, '');
}

/**
 * Aplica máscara de CEP durante a digitação
 * @param valor - Valor atual do campo
 * @returns Valor com máscara aplicada
 */
export function aplicarMascaraCep(valor: string): string {
  const apenasNumeros = valor.replace(/[^\d]/g, '');
  
  if (apenasNumeros.length <= 5) {
    return apenasNumeros;
  } else {
    return apenasNumeros.replace(/^(\d{5})(\d{0,3})/, '$1-$2');
  }
}

/**
 * Valida formato básico do CEP (sem consulta à API)
 * @param cep - CEP a ser validado
 * @returns true se o formato estiver correto
 */
export function validarFormatoCep(cep: string): boolean {
  const cepLimpo = cep.replace(/[^\d]/g, '');
  
  // Verifica se tem 8 dígitos
  if (cepLimpo.length !== 8) {
    return false;
  }

  // Verifica se não é uma sequência inválida
  if (/^(\d)\1{7}$/.test(cepLimpo)) {
    return false;
  }

  return true;
}

/**
 * Verifica se a API ViaCEP está disponível
 * @returns Promise<boolean> - true se a API estiver disponível
 */
export async function verificarDisponibilidadeViaCep(): Promise<boolean> {
  try {
    const response = await fetch('https://viacep.com.br/ws/01310-100/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    return response.status === 200;
  } catch (error) {
    console.error('API ViaCEP indisponível:', error);
    return false;
  }
}

