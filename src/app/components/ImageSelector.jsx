import Image from 'next/image';

const profileImages = [
  '/images/image-1.webp',
  '/images/image-2.jpg',
];

export default function ImageSelector({ onSelect }) {
  return (
    <div>
      {profileImages.map((img, index) => (
        <Image 
          key={index}
          src={img}
          alt={`Profile option ${index + 1}`}
          width={50}
          height={50}
          onClick={() => onSelect(img)}
          style={{ cursor: 'pointer', margin: '5px' }}
          unoptimized
        />
      ))}
    </div>
  );
}