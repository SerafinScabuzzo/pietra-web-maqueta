const QuieroSerCliente = () => {
  const whatsappLink = 'https://api.whatsapp.com/send/?phone=5493413589318&text&type=phone_number&app_absent=0';

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Título */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-brandBlue mb-4">Quiero ser cliente</h1>
        <p className="text-xl text-gray-600">Trabajamos con clientes mayoristas y comerciales.</p>
      </div>

      {/* Instructivo */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8 space-y-6">
        {/* Requisitos */}
        <section>
          <h2 className="text-2xl font-semibold text-brandBlue mb-4">Requisitos para ser cliente</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-brandOrange mr-2 font-bold">•</span>
              <span><strong>Compra mayorista:</strong> Compras superiores a $1.000.000 (como referencia).</span>
            </li>
            <li className="flex items-start">
              <span className="text-brandOrange mr-2 font-bold">•</span>
              <span><strong>CUIT:</strong> Debe contar con CUIT activo.</span>
            </li>
          </ul>
        </section>

        {/* Datos necesarios */}
        <section>
          <h2 className="text-2xl font-semibold text-brandBlue mb-4">Datos necesarios para el alta</h2>
          <p className="text-gray-700 mb-3">Para completar el proceso de alta, necesitamos la siguiente información:</p>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>Razón social</li>
            <li>Domicilio completo</li>
            <li>Datos de contacto (teléfono, email)</li>
            <li>Rubro de actividad</li>
            <li>Zona de entrega preferida</li>
            <li>CUIT</li>
            <li>Cualquier otra información relevante para la relación comercial</li>
          </ul>
        </section>

        {/* Proceso */}
        <section>
          <h2 className="text-2xl font-semibold text-brandBlue mb-4">Proceso de alta</h2>
          <p className="text-gray-700 mb-3">
            El alta de cliente se valida y se coordina exclusivamente por WhatsApp. 
            Nuestro equipo revisará la información proporcionada y se pondrá en contacto 
            para avanzar con el proceso.
          </p>
        </section>

        {/* Cierre */}
        <section className="bg-brandGray rounded-lg p-6">
          <p className="text-lg text-gray-800 font-medium text-center">
            Enviá toda la información completa por WhatsApp y te respondemos para avanzar.
          </p>
        </section>
      </div>

      {/* Botón WhatsApp */}
      <div className="text-center">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.386 1.262.617 1.694.789.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default QuieroSerCliente;
