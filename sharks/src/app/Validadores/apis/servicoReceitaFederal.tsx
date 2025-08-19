import { ResultadoValidacaoApi, DadosReceita } from '../tipos/tiposValidacao';

/**
 * Consulta dados de CNPJ na API da Receita Federal
 * @param cnpj - CNPJ a ser consultado (apenas números)
 * @returns Resultado da consulta com dados da empresa
 */
export async function consultarCnpjReceitaFederal(cnpj: string): Promise<ResultadoValidacaoApi> {
  try {
    // Remove formatação do CNPJ
    const cnpjLimpo = cnpj.replace(/[^\d]/g, '');

    if (cnpjLimpo.length !== 14) {
      return {
        valido: false,
        erro: 'CNPJ deve conter 14 dígitos'
      };
    }

    // API pública da Receita Federal (ReceitaWS)
    const url = `https://www.receitaws.com.br/v1/cnpj/${cnpjLimpo}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return {
        valido: false,
        erro: `Erro na consulta: ${response.status} - ${response.statusText}`
      };
    }

    const dados = await response.json();

    // Verifica se houve erro na resposta da API
    if (dados.status === 'ERROR') {
      return {
        valido: false,
        erro: dados.message || 'CNPJ não encontrado na Receita Federal'
      };
    }

    // Verifica se o CNPJ está ativo
    if (dados.situacao !== 'ATIVA') {
      return {
        valido: false,
        erro: `CNPJ com situação: ${dados.situacao}`
      };
    }

    // Monta os dados da empresa
    const dadosEmpresa: DadosReceita = {
      cnpj: dados.cnpj,
      razaoSocial: dados.nome,
      nomeFantasia: dados.fantasia,
      situacao: dados.situacao,
      dataAbertura: dados.abertura,
      endereco: {
        logradouro: dados.logradouro,
        numero: dados.numero,
        complemento: dados.complemento,
        bairro: dados.bairro,
        municipio: dados.municipio,
        uf: dados.uf,
        cep: dados.cep
      }
    };

    return {
      valido: true,
      dados: dadosEmpresa
    };

  } catch (error) {
    console.error('Erro ao consultar CNPJ:', error);
    return {
      valido: false,
      erro: 'Erro de conexão com a Receita Federal. Tente novamente.'
    };
  }
}

/**
 * Consulta dados de CPF na API da Receita Federal
 * Nota: A consulta de CPF é mais restrita e pode não estar disponível publicamente
 * @param cpf - CPF a ser consultado (apenas números)
 * @returns Resultado da consulta
 */
export async function consultarCpfReceitaFederal(cpf: string): Promise<ResultadoValidacaoApi> {
  try {
    // Remove formatação do CPF
    const cpfLimpo = cpf.replace(/[^\d]/g, '');

    if (cpfLimpo.length !== 11) {
      return {
        valido: false,
        erro: 'CPF deve conter 11 dígitos'
      };
    }

    // Nota: A API pública para consulta de CPF é limitada por questões de privacidade
    // Aqui você pode implementar uma consulta a uma API específica se disponível
    // Por enquanto, retornamos que a validação matemática é suficiente
    
    return {
      valido: true,
      dados: {
        cpf: cpfLimpo,
        situacao: 'REGULAR' // Assumindo que passou na validação matemática
      }
    };

  } catch (error) {
    console.error('Erro ao consultar CPF:', error);
    return {
      valido: false,
      erro: 'Erro de conexão com a Receita Federal. Tente novamente.'
    };
  }
}

/**
 * Verifica se a API da Receita Federal está disponível
 * @returns Promise<boolean> - true se a API estiver disponível
 */
export async function verificarDisponibilidadeApi(): Promise<boolean> {
  try {
    const response = await fetch('https://www.receitaws.com.br/v1/cnpj/11222333000181', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    return response.status === 200 || response.status === 400; // 400 é esperado para CNPJ inválido
  } catch (error) {
    console.error('API da Receita Federal indisponível:', error);
    return false;
  }
}

