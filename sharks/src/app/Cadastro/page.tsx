'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../styles/Cadastro.css';
import { phoneUtils } from '../utils/phoneUtils'; // Ajuste o caminho conforme sua estrutura

export default function Cadastro() {
  const [termosAceitos, setTermosAceitos] = useState(false);
  const [isWhatsapp, setIsWhatsapp] = useState(false);

  // Inicializa os handlers quando o componente é montado
  useEffect(() => {
    phoneUtils.initPhoneHandlers();
  }, []);

  // Mostra ou oculta o campo WhatsApp
  useEffect(() => {
    const whatsappField = document.getElementById('whatsapp_field');
    if (whatsappField) {
      whatsappField.style.display = isWhatsapp ? 'block' : 'none';
    }
  }, [isWhatsapp]);

  return (
    <div>
      <h1>Cadastro</h1>
      <form>
        <fieldset>
          <legend>Dados da empresa</legend>
          <ul>
            <li>
              <label htmlFor='RAZAO_SOCIAL'>Razão Social: </label>
              <input type='text' id='RAZAO_SOCIAL' name='RAZAO_SOCIAL' maxLength={100} required />
            </li>

            <li>
              <label htmlFor="NOME_FANTASIA">Nome Fantasia: </label>
              <input type="text" id="NOME_FANTASIA" name="NOME_FANTASIA" maxLength={100} />
            </li>

            <li>
              <label htmlFor="CNPJ">CNPJ: </label>
              <input type="text" id="CNPJ" name="CNPJ"
                pattern="\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}"
                title="Formato: 00.000.000/0000-00"
                maxLength={18}
                required
              />
            </li>

            <li>
              <label htmlFor="INSCRICAO_ESTADUAL">Inscrição Estadual: </label>
              <input type="text" id="INSCRICAO_ESTADUAL" name="INSCRICAO_ESTADUAL"
                pattern="\d{3}\.\d{3}\.\d{3}\.\d{3}" maxLength={20} required
              />
            </li>

            <li>
              <label htmlFor="TIPO_EMPRESA">Tipo de Empresa: </label>        
              <select id="TIPO_EMPRESA" name="TIPO_EMPRESA" required>
                <option value="">Selecione</option>
                <option value="LOJA_FISICA">Loja Física</option>
                <option value="E-COMMERCE">E-commerce</option>
                <option value="DISTRIBUIDOR">Distribuidor</option>
                <option value="MARKETPLACE">Marketplace</option>
                <option value="ASSISTENCIA_TECNICA">Assistência Técnica</option>
                <option value="OUTRO">Outro</option>
              </select>
            </li>
          </ul>
        </fieldset>

        <fieldset>
          <legend>Endereço da Empresa</legend>
          <ul>
            <li>
              <label htmlFor='CEP'>CEP: </label>
              <input type='text' id='CEP' name='CEP' pattern="\d{5}-\d{3}" title="Formato: 00000-000" maxLength={9} required />
            </li>

            <li>
              <label htmlFor='ENDERECO'>Endereço: </label>
              <input type='text' id='ENDERECO' name='ENDERECO' maxLength={100} required />
            </li>

            <li>
              <label htmlFor='NUMERO'>Número: </label>
              <input type='text' id='NUMERO' name='NUMERO' maxLength={10} required />
            </li>

            <li>
              <label htmlFor='COMPLEMENTO'>Complemento: </label>
              <input type='text' id='COMPLEMENTO' name='COMPLEMENTO' maxLength={50} />
            </li>

            <li>
              <label htmlFor='BAIRRO'>Bairro: </label>
              <input type='text' id='BAIRRO' name='BAIRRO' maxLength={50} required />
            </li>

            <li>
              <label htmlFor='CIDADE'>Cidade: </label>
              <input type='text' id='CIDADE' name='CIDADE' maxLength={50} required />
            </li>

            <li>
              <label htmlFor='ESTADO'>Estado: </label>
              <select id='ESTADO' name='ESTADO' required>
                <option value="">Selecione</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </li>
          </ul>
        </fieldset>

        <fieldset>
          <legend>Dados do responsável</legend>
          <ul>
            <li>
              <label htmlFor='NOME_RESPONSAVEL'>Nome Completo: </label>
              <input type='text' id='NOME_RESPONSAVEL' name='NOME_RESPONSAVEL' maxLength={100} required />
            </li>

            <li>
              <label htmlFor='CPF'>CPF: </label>
              <input type='text' id='CPF' name='CPF' pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" title="Formato: 000.000.000-00" maxLength={14} required />
            </li>

            <li>
              <label htmlFor='EMAIL'>E-mail: </label>
              <input type='email' id='EMAIL' name='EMAIL' maxLength={100} required />
            </li>

            <li>
              <label htmlFor='TELEFONE'>Telefone: </label>
              <input type='text' id='TELEFONE' name='TELEFONE' placeholder="(00) 00000-0000" maxLength={15} required />
            </li>

            <li>
              <label>Este número é WhatsApp?</label>
              <div style={{ marginTop: '5px' }}>
                <label htmlFor='whatsapp_sim' style={{ marginRight: '15px', fontWeight: 'normal' }}>
                  <input
                    type='radio'
                    id='whatsapp_sim'
                    name='IS_WHATSAPP'
                    value='sim'
                    style={{ marginRight: '5px' }}
                    onChange={() => setIsWhatsapp(true)}
                  />
                  Sim
                </label>
                <label htmlFor='whatsapp_nao' style={{ fontWeight: 'normal' }}>
                  <input
                    type='radio'
                    id='whatsapp_nao'
                    name='IS_WHATSAPP'
                    value='nao'
                    style={{ marginRight: '5px' }}
                    onChange={() => setIsWhatsapp(false)}
                  />
                  Não
                </label>
              </div>
            </li>

            <li id='whatsapp_field' style={{ display: 'none' }}>
              <label htmlFor='WHATSAPP'>Número do WhatsApp: </label>
              <input type='text' id='WHATSAPP' name='WHATSAPP' placeholder="(00) 00000-0000" maxLength={15} />
            </li>

            <li>
              <label htmlFor='CARGO'>Cargo/Função: </label>
              <input type='text' id='CARGO' name='CARGO' maxLength={50} required />
            </li>
          </ul>
        </fieldset>

        <fieldset>
          <legend>Informações Comerciais</legend>
          <ul>
            <li>
              <label htmlFor="VOLUME_MENSAL">Volume de compras mensal estimado: </label>
              <input type="number" id="VOLUME_MENSAL" name="VOLUME_MENSAL" min="0" max="1000000" step="1" required />
            </li>

            <li>
              <label htmlFor="TEMPO_ATIVIDADE">Anos de atividade no ramo: </label>
              <input type="number" id="TEMPO_ATIVIDADE" name="TEMPO_ATIVIDADE" min="0" max="100" required />
            </li>

            <li>
              <label htmlFor="MODELOS_INTERESSE">Modelos de iPhone de interesse: </label>
              <textarea id="MODELOS_INTERESSE" name="MODELOS_INTERESSE" maxLength={500} rows={4}></textarea>
            </li>

            <li>
              <label htmlFor="OBSERVACOES">Observações adicionais: </label>
              <textarea id="OBSERVACOES" name="OBSERVACOES" maxLength={500} rows={4}></textarea>
            </li>
          </ul>
        </fieldset>

        <div>
          <p>Aceitar Termos e Condições </p>
          <input type="checkbox" id="TERMOS" name="TERMOS" value="TRUE" onChange={(e) => setTermosAceitos(e.target.checked)} />
          <label htmlFor="TERMOS">Li e aceito os termos e condições</label>
        </div>

        <button type="submit" disabled={!termosAceitos}>
          Enviar Cadastro
        </button>
      </form>

      <p>Já tem uma conta? <Link href="/Login">Faça login aqui!</Link></p>
    </div>
  );
}
