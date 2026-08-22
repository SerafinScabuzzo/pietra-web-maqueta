const Footer = () => {
  return (
    <footer className="bg-gray-800/90 backdrop-blur-md text-white mt-auto border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brandOrange">Contacto</h3>
            <div className="space-y-2 text-gray-300">
              <p>Email: <a href="mailto:distcentro@yahoo.com.ar" className="hover:text-brandOrange transition-colors">distcentro@yahoo.com.ar</a></p>
              <p>Dirección: Av. Del Rosario 154, Rosario, Santa Fe</p>
            </div>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brandOrange">Seguinos</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/pietraitaly/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-brandOrange transition-colors"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://linktr.ee/PietraItalySA?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnUxkJhvOL_tWUmue7Uo_1LfsDtWP2XFPK81TRCI4FmQncT0pNHV_Pop0p1hI_aem__NHSbpI9arh3xN2aE1Qt6A"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-brandOrange transition-colors"
                aria-label="LinkTree"
              >
                LinkTree
              </a>
              <a
                href="https://www.tiktok.com/@pietraitaly?lang=es"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-brandOrange transition-colors"
                aria-label="TikTok"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Información */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brandOrange">Horarios</h3>
            <div className="space-y-2 text-gray-300">
              <p>Lunes: 9:00 a 17:00</p>
              <p>Martes a Viernes: 8:00 a 17:00</p>
              <p>Sábado y Domingo: No trabajamos</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">© 2024 PietraItaly. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
