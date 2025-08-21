"use client";

import { useState } from "react";
import styles from "./ImagensCarrossel.module.css";

export default function ImagensCarrossel() {
    const [urls, setUrls] = useState<string[]>([""]);
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});
    const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

    const adicionarCampo = () => {
        setUrls([...urls, ""]);
    };

    const removerCampo = (index: number) => {
        if (urls.length > 1) {
            const novasUrls = urls.filter((_, i) => i !== index);
            setUrls(novasUrls);
            
            // Ajustar índice atual se necessário
            if (indiceAtual >= novasUrls.length) {
                setIndiceAtual(Math.max(0, novasUrls.length - 1));
            }
        }
    };

    const atualizarUrl = (index: number, valor: string) => {
        const novasUrls = [...urls];
        novasUrls[index] = valor;
        setUrls(novasUrls);
        
        // Reset error state when URL changes
        if (imageErrors[index]) {
            setImageErrors(prev => ({ ...prev, [index]: false }));
        }
    };

    const proximo = () => {
        const validUrls = urls.filter(url => url && !imageErrors[urls.indexOf(url)]);
        if (validUrls.length > 0) {
            setIndiceAtual((prev) => {
                let next = (prev + 1) % urls.length;
                // Skip empty or error URLs
                while ((!urls[next] || imageErrors[next]) && next !== prev) {
                    next = (next + 1) % urls.length;
                }
                return next;
            });
        }
    };

    const anterior = () => {
        const validUrls = urls.filter(url => url && !imageErrors[urls.indexOf(url)]);
        if (validUrls.length > 0) {
            setIndiceAtual((prev) => {
                let next = (prev - 1 + urls.length) % urls.length;
                // Skip empty or error URLs
                while ((!urls[next] || imageErrors[next]) && next !== prev) {
                    next = (next - 1 + urls.length) % urls.length;
                }
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
                            <button
                                type="button"
                                onClick={() => removerCampo(index)}
                                className={styles.removeButton}
                                title="Remover campo"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.buttonsSection}>
                <button
                    type="button"
                    onClick={adicionarCampo}
                    className={styles.addButton}
                >
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
                        {/* Main Carousel Container */}
                        <div className={styles.carrossel}>
                            {/* Loading Spinner */}
                            {isLoading[indiceAtual] && (
                                <div className={styles.loadingSpinner}>
                                    <div className={styles.spinner}></div>
                                </div>
                            )}

                            {/* Slides Container */}
                            <div 
                                className={styles.slides}
                                style={{ transform: `translateX(-${indiceAtual * 100}%)` }}
                            >
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
                                                <svg className={styles.placeholderIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                                                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p>Imagem não disponível</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Buttons */}
                            {validUrls.length > 1 && (
                                <>
                                    <button
                                        onClick={anterior}
                                        className={`${styles.navButton} ${styles.prev}`}
                                        disabled={isLoading[indiceAtual]}
                                    >
                                        <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={proximo}
                                        className={`${styles.navButton} ${styles.next}`}
                                        disabled={isLoading[indiceAtual]}
                                    >
                                        <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}

                            {/* Indicators */}
                            {validUrls.length > 1 && (
                                <div className={styles.indicadores}>
                                    {urls.map((url, index) =>
                                        url && !imageErrors[index] ? (
                                            <div 
                                                key={index} 
                                                className={`${styles.indicador} ${index === indiceAtual ? styles.indicadorAtivo : ''}`}
                                                onClick={() => setIndiceAtual(index)}
                                            />
                                        ) : null
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Progress Bar */}
                        {validUrls.length > 1 && (
                            <div className={styles.progressBar}>
                                <div 
                                    className={styles.progressFill}
                                    style={{ width: `${((indiceAtual + 1) / validUrls.length) * 100}%` }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {validUrls.length > 1 && (
                        <div className={styles.miniaturas}>
                            {urls.map((url, index) =>
                                url && !imageErrors[index] ? (
                                    <div key={index} className={styles.miniaturaWrapper}>
                                        <img
                                            src={url}
                                            className={`${styles.miniatura} ${
                                                index === indiceAtual ? styles.miniaturaAtiva : ''
                                            }`}
                                            onClick={() => setIndiceAtual(index)}
                                            alt={`Miniatura ${index + 1}`}
                                        />
                                        {isLoading[index] && (
                                            <div className={styles.miniaturaLoading}>
                                                <div className={styles.miniSpinner}></div>
                                            </div>
                                        )}
                                    </div>
                                ) : null
                            )}
                        </div>
                    )}

                    {/* Counter */}
                    <div className={styles.infoSection}>
                        <span className={styles.contador}>
                            {validUrls.length > 0 ? indiceAtual + 1 : 0} / {validUrls.length}
                        </span>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {validUrls.length === 0 && urls.some(url => url) && (
                <div className={styles.errorMessage}>
                    <svg className={styles.errorIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <p>Erro ao carregar as imagens. Verifique as URLs fornecidas.</p>
                </div>
            )}
        </div>
    );
}