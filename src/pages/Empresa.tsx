const Empresa = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-brandBlue mb-8">Empresa</h1>
      
      <div className="space-y-8">
        {/* Información general */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sobre nosotros</h2>
          <p className="text-gray-600 leading-relaxed">
            PietraItaly es una empresa especializada en la distribución de productos para la construcción, 
            ferretería y sanitarios. Trabajamos con clientes mayoristas y comerciales, ofreciendo 
            productos de calidad y un servicio personalizado.
          </p>
        </section>

        {/* Contacto */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contacto</h2>
          <div className="bg-brandGray rounded-lg p-6 space-y-3">
            <p className="text-gray-700">
              <strong className="text-brandBlue">Dirección:</strong><br />
              Av. Del Rosario 154, Rosario, Santa Fe
            </p>
            <p className="text-gray-700">
              <strong className="text-brandBlue">Email:</strong><br />
              <a href="mailto:distcentro@yahoo.com.ar" className="text-brandBlue hover:text-brandBlue-dark">
                distcentro@yahoo.com.ar
              </a>
            </p>
          </div>
        </section>

        {/* Horarios */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Horarios de atención</h2>
          <div className="bg-white border-2 border-brandGray rounded-lg p-6">
            <div className="space-y-2 text-gray-700">
              <p><strong>Lunes:</strong> 9:00 a 17:00</p>
              <p><strong>Martes a Viernes:</strong> 8:00 a 17:00</p>
              <p><strong>Sábado y Domingo:</strong> No trabajamos</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Empresa;
