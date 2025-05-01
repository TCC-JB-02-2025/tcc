import React, { useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Usamos forwardRef para permitir que o componente pai obtenha uma referência a ele
const PopUpComponent = forwardRef((props, ref) => {
  // Estados para controlar a visibilidade e o conteúdo do pop-up
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState(null); // Armazena o Componente (tipo/função)
  const [contentProps, setContentProps] = useState({}); // Armazena as props para o Componente

  // Função para esconder o pop-up
  const hide = useCallback(() => {
    setIsVisible(false);
  }, []); // Dependências vazias significam que a função hide é criada uma vez e reutilizada

  // Função para mostrar o pop-up
  // Recebe o Componente de conteúdo (seu tipo/função) e as props para ele
  const show = useCallback((ContentComponent, componentProps = {}) => {
    setContent(() => ContentComponent); // Armazena a referência do componente. O () => é para garantir que o React armazene a referência da função, não a chame.
    setContentProps(componentProps); // Armazena as props
    setIsVisible(true); // Torna o modal visível
  }, []); // Dependências vazias significam que a função show é criada uma vez e reutilizada

  // Expõe as funções show e hide através da ref passada pelo componente pai
  useImperativeHandle(ref, () => ({
    show, // Torna a função show acessível via ref.current.show()
    hide, // Torna a função hide acessível via ref.current.hide()
  }));

  // O que o componente renderiza (o Modal)
  // O Modal é um componente que cobre toda a tela e exibe o conteúdo dentro dele
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={hide}
      statusBarTranslucent
    > 
      {/* O <TouchableWithoutFeedback> é usado para detectar toques fora do conteúdo do pop-up e fechar o modal */}
      <TouchableWithoutFeedback onPress={hide}>
        {/* O <View> é o contêiner do fundo*/}
        <View style={styles.overlay}> 

          {/* Previne o fechamento do modal ao tocar no conteúdo */}
          <TouchableWithoutFeedback onPress={() => {}}> 
            {/* View do popUp em si */}
            <View style={styles.popUpContainer}>
              <TouchableOpacity onPress={hide}>
                <Icon name="close" size={32} color="#000" />
              </TouchableOpacity>
              {/* Se tiver conteudo Renderiza o conteudo do popup */}
              {/* Se o conteúdo não estiver definido, renderiza null (nada) */}
              {content ? React.createElement(content, { ...contentProps, onClose: hide }) : null}
              
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});

// Estilos para o componente
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popUpContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%', // Exemplo
    maxWidth: 400, // Exemplo
  },
});

export default PopUpComponent;