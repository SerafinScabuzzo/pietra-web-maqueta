interface OffersLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onBecomeClient: () => void;
}

const OffersLoginModal = ({
  isOpen,
  onClose,
  onLogin,
  onBecomeClient,
}: OffersLoginModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="offers-gate-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50"
        aria-label="Cerrar"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-lg border border-slate-200 p-6">
        <h2 id="offers-gate-title" className="text-xl font-bold text-brandBlue mb-3">
          Ofertas para clientes
        </h2>
        <p className="text-gray-700 mb-6">
          Las ofertas completas están disponibles para clientes. Iniciá sesión o
          solicitá ser cliente para continuar.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button type="button" className="btn-primary flex-1" onClick={onLogin}>
            Ingresar
          </button>
          <button type="button" className="btn-accent flex-1" onClick={onBecomeClient}>
            Quiero ser cliente
          </button>
        </div>
        <button
          type="button"
          className="mt-4 w-full text-sm text-slate-600 hover:text-blue-800"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default OffersLoginModal;
