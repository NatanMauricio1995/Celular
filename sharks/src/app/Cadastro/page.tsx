import Link from 'next/link';
import '../styles/Cadastro.css';

export default function Cadastro() {
  return (
    <div>
      <h1>Cadastro</h1>
      <form>
        <fieldset>
          <legend>Dados da empresa</legend>
          
          <ul>
            <li>
              <label htmlFor='RAZAO_SOCIAL'>Razão Social: </label>
              <input
                type='text'
                id='RAZAO_SOCIAL' 
                name='RAZAO_SOCIAL'
                max={100}
                required
              />  
            </li>

            <li>
              <label htmlFor="NOME_FANTASIA">Nome Fantasia: </label>
              <input 
                type="text" 
                id="NOME_FANTASIA" 
                name="NOME_FANTASIA"
                max={100} 
              />
            </li>

            <li>
              <label htmlFor="CNPJ">CNPJ: </label>
              <input  
                type="text" 
                id="CNPJ" 
                name="CNPJ" 
                pattern="\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}"
                title="Formato: 00.000.000/0000-00"
                maxLength={18}
                required
              />
            </li>

            <li>
              <label htmlFor="INSCRICAO_ESTADUAL">Inscrição Estadual: </label>
              <input
                type="text" 
                id="INSCRICAO_ESTADUAL" 
                name="INSCRICAO_ESTADUAL"
                pattern="\d{3}\.\d{3}\.\d{3}\.\d{3}"
                maxLength={20}
                required
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
                <option value="ASSISTENCIA_TECNICA">Assitência Técnica</option>
                <option value="OUTRO">Outro</option>
              </select>
            </li>
          </ul>
        </fieldset>
 
        <fieldset>
          <legend>Enderço da Empresa</legend>
          <ul>
            <li>
              <label htmlFor='CEP'>CEP: </label>
              <input
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
              <label htmlFor='ENDERECO'>Endereço: </label>
              <input
                type='text'
                id='ENDERECO' 
                name='ENDERECO'
                max={100}
                required
              />
            </li>

            <li>
              <label htmlFor='NUMERO'>Número: </label>
              <input
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
                type='text'
                id='COMPLEMENTO' 
                name='COMPLEMENTO'
                max={50}
              />
            </li>

            <li>
              <label htmlFor='BAIRRO'>Bairro: </label>
              <input
                type='text'
                id='BAIRRO' 
                name='BAIRRO'
                max={50}
                required
              />
            </li>

            <li>
              <label htmlFor='CIDADE'>Cidade: </label>
              <input
                type='text'
                id='CIDADE' 
                name='CIDADE'
                max={50}
                required
              />
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
      </form>
      
      <p>Já tem uma conta? <Link href="/Login">Faça login aqui!</Link></p>
    </div>
  );
}