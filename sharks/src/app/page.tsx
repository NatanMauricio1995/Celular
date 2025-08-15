import React from 'react';
import Header_Deslogado from './components/layout/Header_Deslogado/Header_Deslogado';
import styles from "./page.module.css";


export default function Home()
{
  return (
    <>
      <Header_Deslogado className="Header_Deslogado"/>
      <div className='Background'>
        <article className='Container'>
          <section className={styles.TextoContainer}>
            <h1>O Mar de Oportunidades em iPhones Importados para Revenda</h1>
            <p className='Texto'>
              Na Sharks Technology, navegamos no mercado global para trazer até você, 
              atacadista de eletrônicos, os mais desejados modelos de iPhones importados 
              com preços competitivos e qualidade garantida. Nossa missão é ser seu 
              parceiro estratégico, oferecendo produtos originais, entrega ágil e 
              condições especiais para que você amplie sua margem de lucro e fidelize 
              seus clientes.
            </p>
            <p className='Texto'>
              Com um portfólio atualizado e atendimento personalizado, transformamos cada 
              negociação em um passo seguro rumo ao crescimento do seu negócio. Aqui, você 
              encontra tecnologia de ponta com a confiança e a credibilidade que só um 
              verdadeiro predador do mercado pode oferecer.
            </p>
          </section>
          <img 
            className={styles.iPhone16ProMaxDourado}
            src="https://raw.githubusercontent.com/NatanMauricio1995/Fotos-Celulares/refs/heads/main/iPhone%2016%20Pro%20Max%20Dourado.png"
            alt="iPhone 16 Max Pro" />
        </article>
      </div>
    </>
  );
}