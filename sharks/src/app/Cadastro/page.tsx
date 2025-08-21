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

// Importa validadores
import { useValidacaoCnpj, useValidacaoCpf, useValidacaoCep, useValidacaoFormulario } from '../Validadores/utils/hooksValidacao';
import { CampoComValidacao, CampoSelect } from '../Validadores/utils/CampoComValidacao';
import { DadosEndereco } from '../validadores_v2/tipos/tiposValidacao';

export default function Cadastro() {
  const [termosAceitos, setTermosAceitos] = useState(false);
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  
  // Estados para campos de endereço
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  
  // Estados para outros campos
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [inscricaoEstadual, setInscricaoEstadual] = useState('');
  const [tipoEmpresa, setTipoEmpresa] = useState('');
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cargo, setCargo] = useState('');
  const [volumeMensal, setVolumeMensal] = useState('');
  const [tempoAtividade, setTempoAtividade] = useState('');
  const [modelosInteresse, setModelosInteresse] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  // Hooks de validação
  const validacaoCnpj = useValidacaoCnpj();
  const validacaoCpf = useValidacaoCpf();
  const validacaoCep = useValidacaoCep((dadosEndereco: DadosEndereco) => {
    // Preenche automaticamente os campos de endereço
    setEndereco(dadosEndereco.logradouro);
    setBairro(dadosEndereco.bairro);
    setCidade(dadosEndereco.localidade);
    setEstado(dadosEndereco.uf);
    if (dadosEndereco.complemento) {
      setComplemento(dadosEndereco.complemento);
    }
  });

  const { registrarValidacao, formularioValido } = useValidacaoFormulario();

  // Registra validações no gerenciador
  useEffect(() => {
    registrarValidacao('cnpj', validacaoCnpj.estado.valido);
  }, [validacaoCnpj.estado.valido, registrarValidacao]);

  useEffect(() => {
    registrarValidacao('cpf', validacaoCpf.estado.valido);
  }, [validacaoCpf.estado.valido, registrarValidacao]);

  useEffect(() => {
    registrarValidacao('cep', validacaoCep.estado.valido);
  }, [validacaoCep.estado.valido, registrarValidacao]);

  // Inicializa máscara de telefone (se existir)
  useEffect(() => {
    if (phoneUtils?.initPhoneHandlers) {
      phoneUtils.initPhoneHandlers();
    }
  }, []);

  // Submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se as senhas coincidem
    if (senha !== confirmaSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    // Verifica se os campos obrigatórios com validação estão válidos
    if (!validacaoCnpj.estado.valido || !validacaoCpf.estado.valido || !validacaoCep.estado.valido) {
      alert('Por favor, corrija os erros nos campos destacados.');
      return;
    }

    try {
      // Cria usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Prepara dados para salvar
      const dadosFormulario = {
        // Dados da empresa
        razaoSocial,
        nomeFantasia,
        cnpj: validacaoCnpj.estado.valor,
        inscricaoEstadual,
        tipoEmpresa,
        
        // Endereço
        cep: validacaoCep.estado.valor,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        
        // Dados do responsável
        nomeResponsavel,
        cpf: validacaoCpf.estado.valor,
        email,
        telefone,
        isWhatsapp: isWhatsapp ? 'nao' : 'sim',
        whatsapp: isWhatsapp ? whatsapp : '',
        cargo,
        
        // Informações comerciais
        volumeMensal: parseInt(volumeMensal),
        tempoAtividade: parseInt(tempoAtividade),
        modelosInteresse,
        observacoes,
        
        // Metadados
        uid: user.uid,
        criadoEm: new Date(),
        termosAceitos
      };

      // Salva dados complementares no Firestore
      await addDoc(collection(db, "cadastros"), dadosFormulario);

      alert("Cadastro realizado com sucesso!");
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  // Opções para select de tipo de empresa
  const opcoestipoEmpresa = [
    { valor: 'LOJA_FISICA', texto: 'Loja Física' },
    { valor: 'E-COMMERCE', texto: 'E-commerce' },
    { valor: 'DISTRIBUIDOR', texto: 'Distribuidor' },
    { valor: 'MARKETPLACE', texto: 'Marketplace' },
    { valor: 'ASSISTENCIA_TECNICA', texto: 'Assistência Técnica' },
    { valor: 'OUTRO', texto: 'Outro' }
  ];

  // Opções para select de estado
  const opcoesEstado = [
    { valor: 'AC', texto: 'Acre' },
    { valor: 'AL', texto: 'Alagoas' },
    { valor: 'AP', texto: 'Amapá' },
    { valor: 'AM', texto: 'Amazonas' },
    { valor: 'BA', texto: 'Bahia' },
    { valor: 'CE', texto: 'Ceará' },
    { valor: 'DF', texto: 'Distrito Federal' },
    { valor: 'ES', texto: 'Espírito Santo' },
    { valor: 'GO', texto: 'Goiás' },
    { valor: 'MA', texto: 'Maranhão' },
    { valor: 'MT', texto: 'Mato Grosso' },
    { valor: 'MS', texto: 'Mato Grosso do Sul' },
    { valor: 'MG', texto: 'Minas Gerais' },
    { valor: 'PA', texto: 'Pará' },
    { valor: 'PB', texto: 'Paraíba' },
    { valor: 'PR', texto: 'Paraná' },
    { valor: 'PE', texto: 'Pernambuco' },
    { valor: 'PI', texto: 'Piauí' },
    { valor: 'RJ', texto: 'Rio de Janeiro' },
    { valor: 'RN', texto: 'Rio Grande do Norte' },
    { valor: 'RS', texto: 'Rio Grande do Sul' },
    { valor: 'RO', texto: 'Rondônia' },
    { valor: 'RR', texto: 'Roraima' },
    { valor: 'SC', texto: 'Santa Catarina' },
    { valor: 'SP', texto: 'São Paulo' },
    { valor: 'SE', texto: 'Sergipe' },
    { valor: 'TO', texto: 'Tocantins' }
  ];

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
                <label htmlFor='RAZAO_SOCIAL'>Razão Social: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Texto"
                  type='text'
                  id='RAZAO_SOCIAL'
                  name='RAZAO_SOCIAL'
                  value={razaoSocial}
                  onChange={(e) => setRazaoSocial(e.target.value)}
                  maxLength={100}
                  required
                />
              </li>

              <li>
                <label htmlFor="NOME_FANTASIA">Nome Fantasia:</label>
                <input
                  className="Campo_Texto"
                  type="text"
                  id="NOME_FANTASIA"
                  name="NOME_FANTASIA"
                  value={nomeFantasia}
                  onChange={(e) => setNomeFantasia(e.target.value)}
                  maxLength={100}
                />
              </li>

              <CampoComValidacao
                id="CNPJ"
                name="CNPJ"
                label="CNPJ"
                obrigatorio={true}
                placeholder="00.000.000/0000-00"
                maxLength={18}
                valor={validacaoCnpj.estado.valor}
                onChange={validacaoCnpj.onChange}
                classeCssOriginal="Campo_Texto"
                classeCssValidacao={validacaoCnpj.classeCss}
              />

              <li>
                <label htmlFor="INSCRICAO_ESTADUAL">Inscrição Estadual: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Texto"
                  type="text"
                  id="INSCRICAO_ESTADUAL"
                  name="INSCRICAO_ESTADUAL"
                  value={inscricaoEstadual}
                  onChange={(e) => setInscricaoEstadual(e.target.value)}
                  maxLength={20}
                  required
                />
              </li>

              <CampoSelect
                id="TIPO_EMPRESA"
                name="TIPO_EMPRESA"
                label="Tipo de Empresa"
                obrigatorio={true}
                opcoes={opcoestipoEmpresa}
                valor={tipoEmpresa}
                onChange={setTipoEmpresa}
              />
            </ul>
            <p className='Texto'><span className='Asterisco'>*</span> - Campo obrigatório</p>
          </Box>

          {/* --- Endereço --- */}
          <Box>
            <h3 className="Titulo_Fieldset">Endereço da Empresa</h3>
            <ul className="Lista_Campos">
              <CampoComValidacao
                id="CEP"
                name="CEP"
                label="CEP"
                obrigatorio={true}
                placeholder="00000-000"
                maxLength={9}
                valor={validacaoCep.estado.valor}
                onChange={validacaoCep.onChange}
                classeCssOriginal="Campo_Texto"
                classeCssValidacao={validacaoCep.classeCss}
              />

              <li>
                <label htmlFor='ENDERECO'>Endereço: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Texto"
                  type='text'
                  id='ENDERECO'
                  name='ENDERECO'
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
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
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  maxLength={10}
                  required
                />
              </li>

              <li>
                <label htmlFor='COMPLEMENTO'>Complemento:</label>
                <input
                  className="Campo_Texto"
                  type='text'
                  id='COMPLEMENTO'
                  name='COMPLEMENTO'
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
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
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
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
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  maxLength={50}
                  required
                />
              </li>

              <CampoSelect
                id="ESTADO"
                name="ESTADO"
                label="Estado"
                obrigatorio={true}
                opcoes={opcoesEstado}
                valor={estado}
                onChange={setEstado}
              />
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
                  value={nomeResponsavel}
                  onChange={(e) => setNomeResponsavel(e.target.value)}
                  maxLength={100}
                  required
                />
              </li>

              <CampoComValidacao
                id="CPF"
                name="CPF"
                label="CPF"
                obrigatorio={true}
                placeholder="000.000.000-00"
                maxLength={14}
                valor={validacaoCpf.estado.valor}
                onChange={validacaoCpf.onChange}
                classeCssOriginal="Campo_Texto"
                classeCssValidacao={validacaoCpf.classeCss}
              />

              <li>
                <label htmlFor='EMAIL'>E-mail: <span className='Asterisco'>*</span></label>
                <input
                  className="Campo_Email"
                  type='email'
                  id='EMAIL'
                  name='EMAIL'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
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
                  <label htmlFor='WHATSAPP'>Número do WhatsApp:</label>
                  <input
                    className="Campo_Texto"
                    type='text'
                    id='WHATSAPP'
                    name='WHATSAPP'
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
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
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
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
                  value={volumeMensal}
                  onChange={(e) => setVolumeMensal(e.target.value)}
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
                  value={tempoAtividade}
                  onChange={(e) => setTempoAtividade(e.target.value)}
                  min="0"
                  max="100"
                  required
                />
              </li>

              <li>
                <label htmlFor="MODELOS_INTERESSE">Modelos de iPhone de interesse:</label>
                <textarea
                  className='Campo_TextArea'
                  id="MODELOS_INTERESSE"
                  name="MODELOS_INTERESSE"
                  value={modelosInteresse}
                  onChange={(e) => setModelosInteresse(e.target.value)}
                  maxLength={500}
                  rows={4}
                ></textarea>
              </li>

              <li>
                <label htmlFor="OBSERVACOES">Observações adicionais:</label>
                <textarea
                  className='Campo_TextArea'
                  id="OBSERVACOES"
                  name="OBSERVACOES"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
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
                <label htmlFor='SENHA'>Senha:</label>
                <input
                  type='password'
                  id='SENHA'
                  name='SENHA'
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  minLength={6}
                  maxLength={20}
                  required
                />
              </li>

              <li>
                <label htmlFor='CONFIRMA_SENHA'>Confirmar Senha:</label>
                <input
                  type='password'
                  id='CONFIRMA_SENHA'
                  name='CONFIRMA_SENHA'
                  value={confirmaSenha}
                  onChange={(e) => setConfirmaSenha(e.target.value)}
                  minLength={6}
                  maxLength={20}
                  required
                />
              </li>
            </ul>
          </Box>

          {/* --- Termos --- */}
          <Box>
            <h3 className="Titulo_Fieldset">Aceitar Termos e Condições</h3>
            <input
              type="checkbox"
              id="TERMOS"
              name="TERMOS"
              value="TRUE"
              onChange={(e) => setTermosAceitos(e.target.checked)}
            />
            <label htmlFor="TERMOS">Li e aceito os termos e condições<p></p></label>
          </Box>
          
          <Botao_Form_Grande
            className="Salvar"
            color="#10b981"
            type="submit"
            disabled={!termosAceitos}
          >
            Cadastrar
          </Botao_Form_Grande>

        </form>
      </div>
    </div>
  );
}

