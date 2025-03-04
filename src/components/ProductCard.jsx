// Card Component
const ProductCard = ({ imageSrc, title, description, link, external }) => {
    return (
      <div className="rounded-lg shadow-lg overflow-hidden bg-[#0e0e0e] relative">
        <div
        className="h-48 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageSrc})`,
        }}
      ></div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
            {title}
            {external && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6m9-3l-9 9"
                />
              </svg>
            )}
          </h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          {link && (
            <a
              href={link}
              className="text-blue-700 hover:underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          )}
        </div>
      </div>
    );
  };

export default ProductCard;