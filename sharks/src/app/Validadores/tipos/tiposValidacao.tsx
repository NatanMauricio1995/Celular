// Tipos e interfaces para validações de documentos (sem mensagens de texto)

export interface ResultadoValidacao {
  valido: boolean;
  dados?: any;
}

export interface ResultadoValidacaoMatematica {
  valido: boolean;
}

export interface ResultadoValidacaoApi {
  valido: boolean;
  dados?: DadosReceita | DadosEndereco;
}

export interface DadosReceita {
  cnpj?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  situacao?: string;
  dataAbertura?: string;
  endereco?: {
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    municipio?: string;
    uf?: string;
    cep?: string;
  };
}

export interface DadosEndereco {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
}

export interface EstadoCampo {
  valor: string;
  valido: boolean;
  carregando?: boolean;
}

export interface ConfiguracaoValidacao {
  validarMatematica: boolean;
  validarApi: boolean;
  preencherAutomatico?: boolean;
}

// Classes CSS para estados dos campos
export const CLASSES_VALIDACAO = {
  ERRO: 'campo-invalido',
  VALIDO: 'campo-valido', 
  CARREGANDO: 'campo-carregando',
  NEUTRO: ''
} as const;

