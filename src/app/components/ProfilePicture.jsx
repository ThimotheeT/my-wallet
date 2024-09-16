import Image from 'next/image';

export default function ProfilePicture({ url }) {
  return (
    <Image 
      src={url}
      alt="Profile Picture" 
      width={100} 
      height={100}
      unoptimized
    />
  );
}