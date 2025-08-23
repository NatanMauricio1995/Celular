"use client";

import { useState } from "react";
import styles from "./ImagensCarrossel.module.css";

interface ImagensCarrosselProps {
    setUrlImagem: (url: string) => void;
}

export default function ImagensCarrossel({ setUrlImagem }: ImagensCarrosselProps) {
    const [urls, setUrls] = useState<string[]>([""]);
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});
    const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

    const adicionarCampo = () => setUrls([...urls, ""]);

    const removerCampo = (index: number) => {
        if (urls.length > 1) {
            const novasUrls = urls.filter((_, i) => i !== index);
            setUrls(novasUrls);
            if (indiceAtual >= novasUrls.length) setIndiceAtual(Math.max(0, novasUrls.length - 1));
        }
    };

    const atualizarUrl = (index: number, valor: string) => {
        const novasUrls = [...urls];
        novasUrls[index] = valor;
        setUrls(novasUrls);

        if (imageErrors[index]) setImageErrors(prev => ({ ...prev, [index]: false }));

        // Atualiza a URL principal (primeira válida)
        const primeiraValida = novasUrls.find(url => url && !imageErrors[novasUrls.indexOf(url)]);
        setUrlImagem(primeiraValida || "");
    };

    const proximo = () => {
        const validUrls = urls.filter(url => url && !imageErrors[urls.indexOf(url)]);
        if (validUrls.length > 0) {
            setIndiceAtual(prev => {
                let next = (prev + 1) % urls.length;
                while ((!urls[next] || imageErrors[next]) && next !== prev) next = (next + 1) % urls.length;
                return next;
            });
        }
    };

    const anterior = () => {
        const validUrls = urls.filter(url => url && !imageErrors[urls.indexOf(url)]);
        if (validUrls.length > 0) {
            setIndiceAtual(prev => {
                let next = (prev - 1 + urls.length) % urls.length;
                while ((!urls[next] || imageErrors[next]) && next !== prev) next = (next - 1 + urls.length) % urls.length;
                return next;
            });
        }
    };

    const handleImageLoad = (index: number) => {
        setIsLoading(prev => ({ ...prev, [index]: false }));
        setImageErrors(prev => ({ ...prev, [index]: false }));
    };

    const handleImageError = (index: number) => {
        setIsLoading(prev => ({ ...prev, [index]: false }));
        setImageErrors(prev => ({ ...prev, [index]: true }));
    };

    const handleImageLoadStart = (index: number) => {
        setIsLoading(prev => ({ ...prev, [index]: true }));
    };

    const validUrls = urls.filter(url => url && !imageErrors[urls.indexOf(url)]);

    return (
        <div className={styles.container}>
            {/* Input URLs */}
            <div className={styles.inputsSection}>
                {urls.map((url, index) => (
                    <div key={index} className={styles.inputWrapper}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <input
                                type="url"
                                placeholder={`URL da imagem ${index + 1}`}
                                value={url}
                                onChange={(e) => atualizarUrl(index, e.target.value)}
                                className={`${styles.urlInput} ${imageErrors[index] ? styles.inputError : ''}`}
                            />
                        </div>
                        {urls.length > 1 && (
                            <button type="button" onClick={() => removerCampo(index)} className={styles.removeButton}>✕</button>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.buttonsSection}>
                <button type="button" onClick={adicionarCampo} className={styles.addButton}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Adicionar URL
                </button>
            </div>

            {/* Carousel */}
            {validUrls.length > 0 && (
                <div className={styles.carrosselWrapper}>
                    <div className={styles.carrosselContainer}>
                        <div className={styles.carrossel}>
                            {isLoading[indiceAtual] && (
                                <div className={styles.loadingSpinner}>
                                    <div className={styles.spinner}></div>
                                </div>
                            )}

                            <div className={styles.slides} style={{ transform: `translateX(-${indiceAtual * 100}%)` }}>
                                {urls.map((url, index) => (
                                    <div key={index} className={styles.slide}>
                                        {url && !imageErrors[index] ? (
                                            <img
                                                src={url}
                                                alt={`Imagem ${index + 1}`}
                                                className={styles.imagemPrincipal}
                                                onLoad={() => handleImageLoad(index)}
                                                onError={() => handleImageError(index)}
                                                onLoadStart={() => handleImageLoadStart(index)}
                                            />
                                        ) : (
                                            <div className={styles.placeholderImage}>
                                                <p>Imagem não disponível</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {validUrls.length > 1 && (
                                <>
                                    <button onClick={anterior} className={`${styles.navButton} ${styles.prev}`} disabled={isLoading[indiceAtual]}>◀</button>
                                    <button onClick={proximo} className={`${styles.navButton} ${styles.next}`} disabled={isLoading[indiceAtual]}>▶</button>
                                </>
                            )}

                            {validUrls.length > 1 && (
                                <div className={styles.indicadores}>
                                    {urls.map((url, index) =>
                                        url && !imageErrors[index] ? (
                                            <div key={index} className={`${styles.indicador} ${index === indiceAtual ? styles.indicadorAtivo : ''}`} onClick={() => setIndiceAtual(index)} />
                                        ) : null
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
