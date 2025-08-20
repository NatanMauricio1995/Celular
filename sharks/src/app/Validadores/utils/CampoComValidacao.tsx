import React from 'react';

interface PropriedadesCampoComValidacao {
  id: string;
  name: string;
  label: string;
  tipo?: 'text' | 'email' | 'password' | 'number';
  obrigatorio?: boolean;
  placeholder?: string;
  maxLength?: number;
  valor: string;
  onChange: (valor: string) => void;
  onBlur?: () => void;
  classeCssOriginal?: string;
  classeCssValidacao?: string;
  disabled?: boolean;
}

/**
 * Componente de campo de entrada que aplica apenas classes CSS para validação
 * Não altera os estilos originais dos campos, apenas adiciona classes de estado
 */
export function CampoComValidacao({
  id,
  name,
  label,
  tipo = 'text',
  obrigatorio = false,
  placeholder,
  maxLength,
  valor,
  onChange,
  onBlur,
  classeCssOriginal = 'Campo_Texto',
  classeCssValidacao = '',
  disabled = false
}: PropriedadesCampoComValidacao) {
  
  // Combina a classe original com a classe de validação
  const classeCompleta = `${classeCssOriginal} ${classeCssValidacao}`.trim();

  return (
    <li>
      <label htmlFor={id}>
        {label}
        {obrigatorio && <span className="Asterisco"> *</span>}
      </label>
      
      <input
        id={id}
        name={name}
        type={tipo}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        className={classeCompleta}
        disabled={disabled}
        required={obrigatorio}
      />
    </li>
  );
}

interface PropriedadesCampoSelect {
  id: string;
  name: string;
  label: string;
  obrigatorio?: boolean;
  opcoes: { valor: string; texto: string }[];
  valor: string;
  onChange: (valor: string) => void;
  classeCssOriginal?: string;
  disabled?: boolean;
}

/**
 * Componente de campo select simples
 */
export function CampoSelect({
  id,
  name,
  label,
  obrigatorio = false,
  opcoes,
  valor,
  onChange,
  classeCssOriginal = '',
  disabled = false
}: PropriedadesCampoSelect) {
  return (
    <li>
      <label htmlFor={id}>
        {label}
        {obrigatorio && <span className="Asterisco"> *</span>}
      </label>
      
      <select
        id={id}
        name={name}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className={classeCssOriginal}
        disabled={disabled}
        required={obrigatorio}
      >
        <option value="">Selecione</option>
        {opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.texto}
          </option>
        ))}
      </select>
    </li>
  );
}

