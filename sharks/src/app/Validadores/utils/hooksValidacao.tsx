import { useState, useCallback, useEffect } from 'react';
import { EstadoCampo, ConfiguracaoValidacao, DadosEndereco } from '../tipos/tiposValidacao';
import { validarCnpjMatematico, aplicarMascaraCnpj } from '../matematicos/validadorCnpj';
import { validarCpfMatematico, aplicarMascaraCpf } from '../matematicos/validadorCpf';
import { consultarCnpjReceitaFederal } from '../apis/servicoReceitaFederal';
import { consultarCep, aplicarMascaraCep } from '../apis/servicoCep';

/**
 * Hook para validação de CNPJ com verificação matemática e consulta à API
 */
export function useValidacaoCnpj(configuracao: ConfiguracaoValidacao = { validarMatematica: true, validarApi: true }) {
  const [estado, setEstado] = useState<EstadoCampo>({
    valor: '',
    valido: true
  });

  const validar = useCallback(async (valor: string) => {
    if (!valor.trim()) {
      setEstado(prev => ({ ...prev, valido: true, erro: undefined }));
      return;
    }

    // Primeira etapa: Validação matemática
    if (configuracao.validarMatematica) {
      const resultadoMatematico = validarCnpjMatematico(valor);
      
      if (!resultadoMatematico.valido) {
        setEstado(prev => ({
          ...prev,
          valido: false,
          erro: resultadoMatematico.erro,
          carregando: false
        }));
        return;
      }
    }

    // Segunda etapa: Validação na API (se a primeira passou)
    if (configuracao.validarApi) {
      setEstado(prev => ({ ...prev, carregando: true }));
      
      try {
        const resultadoApi = await consultarCnpjReceitaFederal(valor);
        
        setEstado(prev => ({
          ...prev,
          valido: resultadoApi.valido,
          erro: resultadoApi.valido ? undefined : resultadoApi.erro,
          carregando: false
        }));
        
        return resultadoApi.dados;
      } catch (error) {
        setEstado(prev => ({
          ...prev,
          valido: false,
          erro: 'Erro ao validar CNPJ',
          carregando: false
        }));
      }
    } else {
      setEstado(prev => ({ ...prev, valido: true, erro: undefined }));
    }
  }, [configuracao]);

  const onChange = useCallback((valor: string) => {
    const valorComMascara = aplicarMascaraCnpj(valor);
    setEstado(prev => ({ ...prev, valor: valorComMascara }));
    
    // Valida automaticamente quando o CNPJ estiver completo
    if (valorComMascara.replace(/[^\d]/g, '').length === 14) {
      validar(valorComMascara);
    }
  }, [validar]);

  return {
    estado,
    onChange,
    validar
  };
}

/**
 * Hook para validação de CPF com verificação matemática e consulta à API
 */
export function useValidacaoCpf(configuracao: ConfiguracaoValidacao = { validarMatematica: true, validarApi: true }) {
  const [estado, setEstado] = useState<EstadoCampo>({
    valor: '',
    valido: true
  });

  const validar = useCallback(async (valor: string) => {
    if (!valor.trim()) {
      setEstado(prev => ({ ...prev, valido: true, erro: undefined }));
      return;
    }

    // Primeira etapa: Validação matemática
    if (configuracao.validarMatematica) {
      const resultadoMatematico = validarCpfMatematico(valor);
      
      if (!resultadoMatematico.valido) {
        setEstado(prev => ({
          ...prev,
          valido: false,
          erro: resultadoMatematico.erro,
          carregando: false
        }));
        return;
      }
    }

    // Segunda etapa: Para CPF, geralmente a validação matemática é suficiente
    // A consulta à API da Receita Federal para CPF é mais restrita
    setEstado(prev => ({ ...prev, valido: true, erro: undefined, carregando: false }));
  }, [configuracao]);

  const onChange = useCallback((valor: string) => {
    const valorComMascara = aplicarMascaraCpf(valor);
    setEstado(prev => ({ ...prev, valor: valorComMascara }));
    
    // Valida automaticamente quando o CPF estiver completo
    if (valorComMascara.replace(/[^\d]/g, '').length === 11) {
      validar(valorComMascara);
    }
  }, [validar]);

  return {
    estado,
    onChange,
    validar
  };
}

/**
 * Hook para validação de CEP com preenchimento automático de endereço
 */
export function useValidacaoCep(
  onEnderecoEncontrado?: (endereco: DadosEndereco) => void
) {
  const [estado, setEstado] = useState<EstadoCampo>({
    valor: '',
    valido: true
  });

  const validar = useCallback(async (valor: string) => {
    if (!valor.trim()) {
      setEstado(prev => ({ ...prev, valido: true, erro: undefined }));
      return;
    }

    setEstado(prev => ({ ...prev, carregando: true }));

    try {
      const resultado = await consultarCep(valor);
      
      if (resultado.valido && resultado.dados) {
        setEstado(prev => ({
          ...prev,
          valido: true,
          erro: undefined,
          carregando: false
        }));
        
        // Chama callback para preencher campos de endereço
        if (onEnderecoEncontrado) {
          onEnderecoEncontrado(resultado.dados as DadosEndereco);
        }
      } else {
        setEstado(prev => ({
          ...prev,
          valido: false,
          erro: resultado.erro,
          carregando: false
        }));
      }
    } catch (error) {
      setEstado(prev => ({
        ...prev,
        valido: false,
        erro: 'Erro ao validar CEP',
        carregando: false
      }));
    }
  }, [onEnderecoEncontrado]);

  const onChange = useCallback((valor: string) => {
    const valorComMascara = aplicarMascaraCep(valor);
    setEstado(prev => ({ ...prev, valor: valorComMascara }));
    
    // Valida automaticamente quando o CEP estiver completo
    if (valorComMascara.replace(/[^\d]/g, '').length === 8) {
      validar(valorComMascara);
    }
  }, [validar]);

  return {
    estado,
    onChange,
    validar
  };
}

/**
 * Hook para gerenciar múltiplas validações
 */
export function useValidacaoFormulario() {
  const [validacoes, setValidacoes] = useState<Record<string, boolean>>({});

  const registrarValidacao = useCallback((campo: string, valido: boolean) => {
    setValidacoes(prev => ({
      ...prev,
      [campo]: valido
    }));
  }, []);

  const formularioValido = useCallback(() => {
    return Object.values(validacoes).every(valido => valido);
  }, [validacoes]);

  const limparValidacoes = useCallback(() => {
    setValidacoes({});
  }, []);

  return {
    validacoes,
    registrarValidacao,
    formularioValido,
    limparValidacoes
  };
}

