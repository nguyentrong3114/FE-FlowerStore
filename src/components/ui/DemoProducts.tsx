import Image from "next/image";

interface Product {
  title: string;
  href: string;
  img: string;
  imageAlt?: string;
  description?: string;
}

interface DemoProductsProps {
  items: Product[];
}

const DemoProducts: React.FC<DemoProductsProps> = ({ items }) => {
  return (
    <div className="py-12 px-4">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold">
          ELEVATING YOUR FRAGRANCE EXPERIENCE
        </h1>
        <p className="mt-4">
          Discover the perfect scent for every occasion with our exclusive perfume collection. Explore deals on classic, niche, and designer fragrances.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
        {/* COLUMN 1 */}
        <div className="grid gap-4">
          {items.slice(0, 2).map((item, index) => (
            <div key={index} className="rounded-lg border overflow-hidden text-center p-4">
              {index === 0 && (
                <>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm mt-1">{item.description}</p>
                  <Image
                    src={item.img}
                    alt={item.imageAlt || "Product image"}
                    width={300}
                    height={150}
                    className="w-full object-cover mt-2 rounded-md"
                  />
                </>
              )}
              {index === 1 && (
                <>
                  <Image
                    src={item.img}
                    alt={item.imageAlt || "Product image"}
                    width={300}
                    height={150}
                    className="w-full object-cover mb-2 rounded-md"
                  />
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm mt-1">{item.description}</p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* COLUMN 2 */}
        <div className="rounded-lg border overflow-hidden text-center p-4 flex flex-col">
          {items[2] && (
            <>
              <Image
                src={items[2].img}
                alt={items[2].imageAlt || "Product image"}
                width={400}
                height={300}
                className="w-full object-cover mb-2 rounded-md"
              />
              <h2 className="text-lg font-semibold">{items[2].title}</h2>
              <p className="text-sm mt-1">{items[2].description}</p>
              <Image
                src={items[2].img}
                alt={items[2].imageAlt || "Product image"}
                width={400}
                height={300}
                className="w-full object-cover mb-2 rounded-md"
              />
            </>
          )}
        </div>

        {/* COLUMN 3 */}
        <div className="grid gap-4">
          {items.slice(3, 5).map((item, index) => (
            <div key={index} className="rounded-lg border overflow-hidden text-center p-4">
              <Image
                src={item.img}
                alt={item.imageAlt || "Product image"}
                width={300}
                height={150}
                className="w-full object-cover mb-2 rounded-md"
              />
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoProducts;
