import Image from 'next/image';

const profileImages = [
  '/images/user-1.jpg',
  '/images/user-2.jpg',
  '/images/user-3.jpg',
  '/images/user-4.jpg',
  '/images/user-5.jpg',
  '/images/user-6.jpg',
];

export default function ImageSelector({ onSelect }) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-3 text-greenBrand">Choose a profile picture</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {profileImages.map((img, index) => (
          <div 
            key={index} 
            className="relative group"
            onClick={() => onSelect(img)}
          >
            <Image 
              src={img}
              alt={`Profile option ${index + 1}`}
              width={80}
              height={80}
              className="rounded-full cursor-pointer transition duration-300 transform group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-greenBrand bg-opacity-0 group-hover:bg-opacity-30 rounded-full transition duration-300 flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition duration-300">Select</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}