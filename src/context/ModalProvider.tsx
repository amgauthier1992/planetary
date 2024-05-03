import { createContext, ReactNode, useCallback, useState } from 'react';

export type ModalContextType = {
  isModalOpen: boolean;
  toggleModal: () => void;
};

type ModalProviderProps = {
  children: ReactNode;
};

export const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  toggleModal: () => {},
});

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const toggleModal = useCallback(() => {
    setModalOpen((prevState) => !prevState);
  }, []);

  const contextValue: ModalContextType = {
    isModalOpen,
    toggleModal,
  };

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
