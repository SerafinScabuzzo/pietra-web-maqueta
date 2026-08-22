import BrandGrid from '../components/BrandGrid';
import { getBrands } from '../store/adminStore';

const Marcas = () => {
  const brands = getBrands();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-brandBlue mb-8 text-center">
        MARCAS CON LAS QUE TRABAJAMOS
      </h1>
      <BrandGrid brands={brands} />
    </div>
  );
};

export default Marcas;
