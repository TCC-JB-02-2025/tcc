import React, { useState, forwardRef, useImperativeHandle, useCallback } from 'react';


// Usamos forwardRef para permitir que o componente pai obtenha uma referência a ele
const PopUpComponent = forwardRef((props, ref) => {
  // Estados para controlar a visibilidade e o conteúdo do pop-up
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState(null); // Armazena o Componente (tipo/função)
  const [contentProps, setContentProps] = useState({}); // Armazena as props para o Componente


  const hide = useCallback(() => {
    setIsVisible(false);
    // Opcional: remover classes do body para limpar o estado do modal do Bootstrap
    document.body.classList.remove('modal-open');
  }, []);

  // Recebe o Componente de conteúdo (seu tipo/função) e as props para ele
  const show = useCallback((ContentComponent, componentProps = {}) => {
    setContent(() => ContentComponent); // Armazena a referência do componente
    setContentProps(componentProps); // Armazena as props
    setIsVisible(true); // Torna o modal visível

    // Adicionar classe ao body para desativar scroll de fundo (comportamento padrão do Bootstrap)
    document.body.classList.add('modal-open');

  }, []);

  // Expõe as funções show e hide através da ref passada pelo componente pai
  useImperativeHandle(ref, () => ({
    show, // Torna a função show acessível via ref.current.show()
    hide, // Torna a função hide acessível via ref.current.hide()
  }));

  // O que o componente renderiza (o Modal principal que também serve como backdrop)
  // Renderizamos o modal principal condicionalmente com base no estado isVisible
  return (
    // O modal principal que também serve como backdrop
    // Usamos classes Bootstrap para a estrutura e estilos do modal
    <div
      className={`modal fade ${isVisible ? 'show' : ''}`} // Classes Bootstrap para transição e visibilidade
      tabIndex="-1"
      role="dialog" // Acessibilidade
      aria-labelledby="myBootstrapModalLabel"
      aria-hidden={!isVisible} // Acessibilidade
      // Aplicamos estilos locais para display, posicionamento, zIndex e o fundo transparente
      style={{
          display: isVisible ? 'block' : 'none',
          ...styles.fullScreenOverlay // Estilos combinados para cobrir a tela e ser o backdrop
      }}
      onClick={hide} // Fechar ao clicar no fundo transparente (este div)
    >
      {/* Adicionamos onClick com stopPropagation para evitar que cliques no conteúdo fechem o modal */}
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" aria-label="Close" onClick={hide}></button>
          </div>
          <div className="modal-body">
            {content ? React.createElement(content, { ...contentProps, onClose: hide }) : null}
          </div>
        </div>
      </div>
    </div>
  );
});

// Estilos para o componente, similar ao StyleSheet.create (objeto JavaScript)
const styles = {
  fullScreenOverlay: {
    // Estilos para o div principal que cobre a tela e serve como backdrop
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo transparente
    position: 'fixed', // Essencial para cobrir a tela
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // Z-index para o backdrop e o modal. O conteúdo do modal (modal-dialog/modal-content)
    // terá um z-index maior implicitamente pelas regras do Bootstrap ou podemos forçar se necessário.
    zIndex: 1040, // Z-index típico do backdrop do Bootstrap
    overflowX: 'hidden', // Garante que não haja scroll horizontal no backdrop
    overflowY: 'auto', // Permite scroll vertical se o conteúdo do modal for muito grande
    outline: 0, // Remove o outline ao focar
  },
  // Removemos o estilo modalBase separado, pois combinamos com fullScreenOverlay
  // modalBase: { ... }
};

export default PopUpComponent;
