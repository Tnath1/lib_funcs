import '../index.css';
import { useState } from 'react';

export const Modal_step = () => {
  const [modalStack, setModalStack] = useState<string[]>([]);

  const openModal = (view: string) => {
    setModalStack((prev) => [...prev, view]);
  };

  const goBack = () => {
    setModalStack((prev) => prev.slice(0, -1));
  };

  const closeModal = () => {
    setModalStack([]);
  };

  const currentView = modalStack[modalStack.length - 1];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <button
        onClick={() => openModal('login')}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Open Login Modal
      </button>

      {modalStack.length > 0 && (
        <Modal onClose={closeModal}>
          {currentView === 'login' && (
            <LoginModal
              onNext={() => openModal('register')}
              onClose={closeModal}
              onBack={goBack}
            />
          )}
          {currentView === 'register' && (
            <RegisterModal
              onNext={() => openModal('forgotPassword')}
              onClose={closeModal}
              onBack={goBack}
            />
          )}
          {currentView === 'forgotPassword' && (
            <ForgotPasswordModal
              // onNext={() => openModal('forgotPassword')}
              onClose={closeModal}
              onBack={goBack}
            />
          )}
        </Modal>
      )}
    </div>
  );
};


type ModalProps = {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
};

const LoginModal = ({ onNext, onBack, onClose }: ModalProps) => (
  <div className="text-center space-y-4">
    <h2 className="text-2xl font-bold text-gray-800">Login</h2>
    <div className="flex justify-center gap-2">
      <button
        onClick={onNext}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Go to Register
      </button>
      <button
        onClick={onBack}
        disabled
        className="bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed"
      >
        Back
      </button>
      <button
        onClick={onClose}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Close
      </button>
    </div>
  </div>
);


const RegisterModal = ({ onNext, onBack, onClose }: ModalProps) => (
  <div className="text-center space-y-4">
    <h2 className="text-2xl font-bold text-gray-800">Register</h2>
    <div className="flex justify-center gap-2">
      <button
        onClick={onNext}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Go to Forgot Password
      </button>
      <button
        onClick={onBack}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
      >
        Back
      </button>
      <button
        onClick={onClose}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Close
      </button>
    </div>
  </div>
);

const ForgotPasswordModal = ({  onBack, onClose }: Omit<ModalProps, 'onNext'>) => (
  <div className="text-center space-y-4">
    <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
    <div className="flex justify-center gap-2">
      <button
        onClick={onBack}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
      >
        Back
      </button>
      <button
        onClick={onClose}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Close
      </button>
    </div>
  </div>
);

type ModalWrapperProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ children, onClose }: ModalWrapperProps) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 relative w-[90%] max-w-md shadow-lg">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
      >
        &times;
      </button>
      {children}
    </div>
  </div>
);
