// components/ui/ValidatedDocumentField/ValidatedDocumentField.js

import { useState } from 'react';

const ValidatedDocumentField = ({
  id,
  name,
  label,
  value,
  onChange,
  onValidationChange,
  validationState,
  type = 'text',
  required = false,
  ...props
}) => {
  const [isTouched, setIsTouched] = useState(false);

  const getValidationIcon = () => {
    if (!isTouched || !validationState) return null;
    
    if (validationState.isValidating) {
      return (
        <span style={{ 
          marginLeft: '8px', 
          color: '#f59e0b',
          animation: 'spin 1s linear infinite',
          fontSize: '14px'
        }}>
          ⟳
        </span>
      );
    }
    if (validationState.isValid === true) {
      return (
        <span style={{ 
          marginLeft: '8px', 
          color: '#10b981',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          ✓
        </span>
      );
    }
    if (validationState.isValid === false) {
      return (
        <span style={{ 
          marginLeft: '8px', 
          color: '#ef4444',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          ✗
        </span>
      );
    }
    return null;
  };

  const getInputStyle = () => {
    if (!isTouched || !validationState) return {};
    
    if (validationState.isValidating) {
      return {
        borderColor: '#f59e0b',
        backgroundColor: '#fffbeb'
      };
    }
    if (validationState.isValid === true) {
      return {
        borderColor: '#10b981',
        backgroundColor: '#f0fdf4'
      };
    }
    if (validationState.isValid === false) {
      return {
        borderColor: '#ef4444',
        backgroundColor: '#fef2f2'
      };
    }
    return {};
  };

  const handleChange = async (e) => {
    const newValue = e.target.value;
    setIsTouched(true);
    
    if (onChange) {
      const maskedValue = await onChange(newValue);
      if (maskedValue !== undefined) {
        e.target.value = maskedValue;
      }
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  return (
    <li>
      <label htmlFor={id}>
        {label}
        {required && <span className="Asterisco">*</span>}
        {getValidationIcon()}
      </label>
      
      <input
        className="Campo_Texto"
        style={getInputStyle()}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        {...props}
      />

      {/* Mensagem de validação usando o estilo do seu site */}
      {isTouched && validationState?.message && (
        <p className="Texto" style={{ 
          margin: '5px 0 0 0',
          fontSize: '12px',
          color: validationState.isValid ? '#10b981' : '#ef4444',
          fontStyle: 'italic'
        }}>
          {validationState.message}
        </p>
      )}

      {/* Informações da empresa usando o estilo do seu site */}
      {validationState?.data?.razaoSocial && (
        <p className="Texto" style={{ 
          margin: '8px 0 0 0',
          fontSize: '12px',
          color: '#6b7280',
          backgroundColor: '#f9fafb',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #e5e7eb'
        }}>
          <strong>Razão Social:</strong> {validationState.data.razaoSocial}
          {validationState.data.nomeFantasia && (
            <><br /><strong>Nome Fantasia:</strong> {validationState.data.nomeFantasia}</>
          )}
          <br /><strong>Situação:</strong> {validationState.data.situacao}
        </p>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </li>
  );
};

export default ValidatedDocumentField;