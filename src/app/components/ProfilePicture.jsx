import Image from 'next/image';

export default function ProfilePicture({ url }) {
  return (
    <Image 
      src={url}
      className="w-32 h-32 rounded-full mx-auto mb-4"
      alt="Profile Picture" 
      width={100} 
      height={100}
      unoptimized
    />
  );
}