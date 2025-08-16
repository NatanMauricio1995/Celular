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
                required
              />  
            </li>

            <li>
              <label htmlFor="NOME_FANTASIA">Nome Fantasia: </label>
              <input 
                type="text" 
                id="NOME_FANTASIA" 
                name="NOME_FANTASIA" 
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
        
      </form>
      
      <p>Já tem uma conta? <Link href="/Login">Faça login aqui!</Link></p>
    </div>
  );
}