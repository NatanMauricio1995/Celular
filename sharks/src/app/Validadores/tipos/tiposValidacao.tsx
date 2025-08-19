// Tipos e interfaces para validações de documentos

export interface ResultadoValidacao {
  valido: boolean;
  erro?: string;
  dados?: any;
}

export interface ResultadoValidacaoMatematica {
  valido: boolean;
  erro?: string;
}

export interface ResultadoValidacaoApi {
  valido: boolean;
  erro?: string;
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
  erro?: string;
  carregando?: boolean;
}

export interface ConfiguracaoValidacao {
  validarMatematica: boolean;
  validarApi: boolean;
  preencherAutomatico?: boolean;
}

