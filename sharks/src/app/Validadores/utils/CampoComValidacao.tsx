import React from 'react';
import { EstadoCampo } from '../tipos/tiposValidacao';
import './estilosValidacao.css';

interface PropriedadesCampoComValidacao {
  id: string;
  name: string;
  label: string;
  tipo?: 'text' | 'email' | 'password' | 'number';
  obrigatorio?: boolean;
  placeholder?: string;
  maxLength?: number;
  estado: EstadoCampo;
  onChange: (valor: string) => void;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Componente de campo de entrada com validação integrada
 */
export function CampoComValidacao({
  id,
  name,
  label,
  tipo = 'text',
  obrigatorio = false,
  placeholder,
  maxLength,
  estado,
  onChange,
  onBlur,
  className = '',
  disabled = false
}: PropriedadesCampoComValidacao) {
  
  // Determina a classe CSS baseada no estado
  const obterClasseCampo = () => {
    let classes = `Campo_Texto campo-validacao ${className}`;
    
    if (estado.carregando) {
      classes += ' campo-carregando';
    } else if (!estado.valido && estado.erro) {
      classes += ' campo-erro';
    } else if (estado.valor && estado.valido) {
      classes += ' campo-valido';
    }
    
    return classes;
  };

  // Determina o ícone de status
  const obterIconeStatus = () => {
    if (estado.carregando) {
      return <span className="indicador-status carregando">⏳</span>;
    } else if (!estado.valido && estado.erro) {
      return <span className="indicador-status erro">❌</span>;
    } else if (estado.valor && estado.valido) {
      return <span className="indicador-status sucesso">✅</span>;
    }
    return null;
  };

  // Determina a mensagem a ser exibida
  const obterMensagem = () => {
    if (estado.carregando) {
      return <div className="mensagem-carregando">Validando...</div>;
    } else if (!estado.valido && estado.erro) {
      return <div className="mensagem-erro">{estado.erro}</div>;
    }
    return null;
  };

  return (
    <li className="container-campo-validacao">
      <label 
        htmlFor={id} 
        className={obrigatorio ? 'label-obrigatorio' : ''}
      >
        {label}
        {obrigatorio && <span className="Asterisco"> *</span>}
      </label>
      
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          name={name}
          type={tipo}
          value={estado.valor}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          className={obterClasseCampo()}
          disabled={disabled || estado.carregando}
          required={obrigatorio}
        />
        {obterIconeStatus()}
      </div>
      
      {obterMensagem()}
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
  className?: string;
  disabled?: boolean;
}

/**
 * Componente de campo select
 */
export function CampoSelect({
  id,
  name,
  label,
  obrigatorio = false,
  opcoes,
  valor,
  onChange,
  className = '',
  disabled = false
}: PropriedadesCampoSelect) {
  return (
    <li>
      <label 
        htmlFor={id} 
        className={obrigatorio ? 'label-obrigatorio' : ''}
      >
        {label}
        {obrigatorio && <span className="Asterisco"> *</span>}
      </label>
      
      <select
        id={id}
        name={name}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className={className}
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

