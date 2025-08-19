'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../styles/Cadastro.css';
import { phoneUtils } from '../utils/phoneUtils';
import Header_Cadastro from "../components/layout/Header_Cadastro/Header_Cadastro";
import Box from "../components/layout/Box/Box";
import Botao_Form_Grande from '../components/ui/Botao_Form_Grande/Botao_Form_Grande';

// Importa Firebase do arquivo de configuração
import { auth, db } from '../utils/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

export default function Cadastro() {
  const [termosAceitos, setTermosAceitos] = useState(false);
  const [isWhatsapp, setIsWhatsapp] = useState(false);

  // Inicializa máscara de telefone (se existir)
  useEffect(() => {
    if (phoneUtils?.initPhoneHandlers) {
      phoneUtils.initPhoneHandlers();
    }
  }, []);

  // Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.SENHA !== data.CONFIRMA_SENHA) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      // Cria usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, data.EMAIL, data.SENHA);
      const user = userCredential.user;

      // Salva dados complementares no Firestore
      await addDoc(collection(db, "cadastros"), {
        ...data,
        uid: user.uid,
        criadoEm: new Date()
      });

      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <div>
      <Header_Cadastro className="Header_Cadastro" />
      <h1>Cadastro</h1>
      <div className='Corpo'>
        <form className='Formulario' onSubmit={handleSubmit}>

          {/* --- Dados da empresa --- */}
          <Box className="Box">
            <h3 className="Titulo_Fieldset">Dados da empresa</h3>
            <ul className='Lista_Campos'>
              <li>
                <label htmlFor='RAZAO_SOCIAL'>Razão Social: <span className='Asterisco'>*</span> </label>
                <input
                  className="Campo_Texto"
                  type='text'
                  id='RAZAO_SOCIAL'
                  name='RAZAO_SOCIAL'
                  maxLength={100}
                  required
                />
              </li>

              <li>
                <label htmlFor="NOME_FANTASIA">Nome Fantasia: </label>
                <input
                  className="Campo_Texto"
                  type="text"
                  id="NOME_FANTASIA"
                  name="NOME_FANTASIA"
                  maxLength={100}
                />
              </li>

              <li>
                <label htmlFor="CNPJ">CNPJ: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Texto"
                  type="text"
                  id="CNPJ"
                  name="CNPJ"
                  title="Formato: 00.000.000/0000-00"
                  maxLength={18}
                  required
                />
              </li>

              <li>
                <label htmlFor="INSCRICAO_ESTADUAL">Inscrição Estadual: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Texto"
                  type="text"
                  id="INSCRICAO_ESTADUAL"
                  name="INSCRICAO_ESTADUAL"
                  maxLength={20}
                  required
                />
              </li>

              <li>
                <label htmlFor="TIPO_EMPRESA">Tipo de Empresa: <span className='Asterisco'>*</span></label>
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
            <p className='Texto'><span className='Asterisco'>*</span> - Campo obrigatório</p>
          </Box>

          {/* --- Endereço --- */}
          <Box>
            <h3 className="Titulo_Fieldset">Endereço da Empresa</h3>
            <ul className="Lista_Campos">
              <li>
                <label htmlFor='CEP'>CEP: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Texto"
                  type='text'
                  id='CEP'
                  name='CEP'
                  pattern="\d{5}-\d{3}"
                  title="Formato: 00000-000"
                  maxLength={9}
                  required
                />
              </li>

              <li>
                <label htmlFor='ENDERECO'>Endereço: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Texto"
                  type='text'
                  id='ENDERECO'
                  name='ENDERECO'
                  maxLength={100}
                  required
                />
              </li>

              <li>
                <label htmlFor='NUMERO'>Número: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Texto"
                  type='text'
                  id='NUMERO'
                  name='NUMERO'
                  maxLength={10}
                  required
                />
              </li>

              <li>
                <label htmlFor='COMPLEMENTO'>Complemento: </label>
                <input
                  className="Campo_Texto"
                  type='text'
                  id='COMPLEMENTO'
                  name='COMPLEMENTO'
                  maxLength={50}
                />
              </li>

              <li>
                <label htmlFor='BAIRRO'>Bairro: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Texto"
                  type='text'
                  id='BAIRRO'
                  name='BAIRRO'
                  maxLength={50}
                  required
                />
              </li>

              <li>
                <label htmlFor='CIDADE'>Cidade: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Texto"
                  type='text'
                  id='CIDADE'
                  name='CIDADE'
                  maxLength={50}
                  required
                />
              </li>

              <li>
                <label htmlFor="ESTADO">Estado: <span className='Asterisco'>*</span></label>
                <select id="ESTADO" name="ESTADO" required>
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
            <p className='Texto'><span className='Asterisco'>*</span> - Campo obrigatório</p>
          </Box>

          {/* --- Dados do responsável --- */}
          <Box className="Box">
            <h3 className="Titulo_Fieldset">Dados do responsável</h3>
            <ul className="Lista_Campos">
              <li>
                <label htmlFor='NOME_RESPONSAVEL'>Nome Completo: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Texto"
                  type='text'
                  id='NOME_RESPONSAVEL'
                  name='NOME_RESPONSAVEL'
                  maxLength={100}
                  required
                />
              </li>

              <li>
                <label htmlFor='CPF'>CPF: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Texto"
                  type='text'
                  id='CPF'
                  name='CPF'
                  pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                  title="Formato: 000.000.000-00"
                  maxLength={14}
                  required
                />
              </li>

              <li>
                <label htmlFor='EMAIL'>E-mail: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Email"
                  type='email'
                  id='EMAIL'
                  name='EMAIL'
                  maxLength={100}
                  required
                />
              </li>

              <li>
                <label htmlFor='TELEFONE'>Telefone: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Texto"
                  type='text'
                  id='TELEFONE'
                  name='TELEFONE'
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  required
                />
              </li>

              <li>
                <label>Este número é WhatsApp?<span className='Asterisco'>*</span></label>
                <div style={{ marginTop: '5px' }}>
                  <label htmlFor='whatsapp_sim' style={{ marginRight: '15px', fontWeight: 'normal' }}>
                    <input
                      className='Botao_Radio'
                      type='radio'
                      id='whatsapp_sim'
                      name='IS_WHATSAPP'
                      value='sim'
                      style={{ marginRight: '5px' }}
                      onChange={() => setIsWhatsapp(false)}
                    />
                    Sim
                  </label>
                  <label htmlFor='whatsapp_nao' style={{ fontWeight: 'normal' }}>
                    <input
                      className='Botao_Radio'
                      type='radio'
                      id='whatsapp_nao'
                      name='IS_WHATSAPP'
                      value='nao'
                      style={{ marginRight: '5px' }}
                      onChange={() => setIsWhatsapp(true)}
                    />
                    Não
                  </label>
                </div>
              </li>

              {isWhatsapp && (
                <li id='whatsapp_field'>
                  <label htmlFor='WHATSAPP'>Número do WhatsApp: </label>
                  <input
                    className="Campo_Texto"
                    type='text'
                    id='WHATSAPP'
                    name='WHATSAPP'
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                  />
                </li>
              )}

              <li>
                <label htmlFor='CARGO'>Cargo/Função: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Texto"
                  type='text'
                  id='CARGO'
                  name='CARGO'
                  maxLength={50}
                  required
                />
              </li>
            </ul>
            <p className='Texto'><span className='Asterisco'>*</span> - Campo obrigatório</p>
          </Box>

          {/* --- Comerciais --- */}
          <Box className="Box">
            <h3 className="Titulo_Fieldset">Informações Comerciais</h3>
            <ul className="Lista_Campos">
              <li>
                <label htmlFor="VOLUME_MENSAL">Volume de compras mensal estimado: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Numero"
                  type="number"
                  id="VOLUME_MENSAL"
                  name="VOLUME_MENSAL"
                  min="0"
                  max="1000000"
                  step="1"
                  required
                />
              </li>

              <li>
                <label htmlFor="TEMPO_ATIVIDADE">Anos de atividade no ramo: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Numero"
                  type="number"
                  id="TEMPO_ATIVIDADE"
                  name="TEMPO_ATIVIDADE"
                  min="0"
                  max="100"
                  required
                />
              </li>

              <li>
                <label htmlFor="MODELOS_INTERESSE">Modelos de iPhone de interesse: </label>
                <textarea
                  className='Campo_TextArea'
                  id="MODELOS_INTERESSE"
                  name="MODELOS_INTERESSE"
                  maxLength={500}
                  rows={4}
                ></textarea>
              </li>

              <li>
                <label htmlFor="OBSERVACOES">Observações adicionais: </label>
                
                <textarea
                  className='Campo_TextArea'
                  id="OBSERVACOES"
                  name="OBSERVACOES"
                  maxLength={500}
                  rows={4}
                ></textarea>
                
              </li>
            </ul>
            <p className='Texto'><span className='Asterisco'>*</span> - Campo obrigatório</p>
          </Box>

          {/* --- Conta --- */}
          <Box className="Box">
            <h3 className="Titulo_Fieldset">Criação de Conta</h3>
            <ul className="Lista_Campos">
              <li>
                <label htmlFor='SENHA'>Senha: </label>
                <input
                  type='password'
                  id='SENHA'
                  name='SENHA'
                  minLength={6}
                  maxLength={20}
                  required
                />
              </li>

              <li>
                <label htmlFor='CONFIRMA_SENHA'>Confirmar Senha: </label>
                <input
                  type='password'
                  id='CONFIRMA_SENHA'
                  name='CONFIRMA_SENHA'
                  minLength={6}
                  maxLength={20}
                  required
                />
              </li>
            </ul>
          </Box>

          {/* --- Termos --- */}
          <Box>
            <h3 className="Titulo_Fieldset">Aceitar Termos e Condições </h3>
            <input
              type="checkbox"
              id="TERMOS"
              name="TERMOS"
              value="TRUE"
              onChange={(e) => setTermosAceitos(e.target.checked)}
            />
            <label htmlFor="TERMOS">Li e aceito os termos e condições</label>
          </Box>
          
          <Botao_Form_Grande
            color = "#10b981"
            type = "submit"
            disabled={!termosAceitos}
          >
            Enviar Cadastro
          </Botao_Form_Grande>
        </form>

        <p className='Texto'>Já tem uma conta? <Link href="/Login">Faça login aqui!</Link></p>
      </div>
    </div>
  );
}
