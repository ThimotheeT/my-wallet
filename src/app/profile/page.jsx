'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProfileHeader from '../components/ProfileHeader';
import ProfilePicture from '../components/ProfilePicture';
import ImageSelector from '../components/ImageSelector';
import ProfileActions from '../components/ProfileActions';
import { FaCamera } from 'react-icons/fa';

export default function Profile() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [walletAmount, setWalletAmount] = useState(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/');
    } else {
      setProfilePictureUrl(session.user.profile_picture_url);
      fetchWallet();
    }
  }, [session, status, router]);

  const fetchWallet = async () => {
    try {
      const response = await fetch(`/api/wallets?userId=${session.user.id}`);
      if (response.ok) {
        const data = await response.json();
        setWalletAmount(data.wallet.balance);
      } else {
        console.error('Error retrieving wallet');
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

  const handleImageChange = async (newImageUrl) => {
    try {
      const response = await fetch('/api/update-profile-picture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id, newImageUrl }),
      });

      if (response.ok) {
        setProfilePictureUrl(newImageUrl);
        setShowImageSelector(false);
        
        await update({
          ...session,
          user: {
            ...session.user,
            profile_picture_url: newImageUrl
          }
        });
      } else {
        console.error('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  if (!session) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-whiteBrand p-4">
      <h1 className="sm:text-6xl text-5xl font-bold mb-10 text-greenBrand">Your Profile</h1>
      <div className="w-full max-w-md bg-blackBrand rounded-lg shadow-lg p-6">

        <div className="relative mb-6">
          <ProfilePicture url={profilePictureUrl} />
          <div className="group">
            <button 
              onClick={() => setShowImageSelector(!showImageSelector)}
              className="absolute top-0 right-0 bg-greenBrand text-white p-2 rounded-full hover:bg-green-700 transition duration-300"
            >
              <FaCamera />
            </button>
            <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-10 right-0 bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              Change profile picture
            </span>
          </div>
          <ProfileHeader name={session.user.name} walletAmount={walletAmount} />
        </div>
        {showImageSelector && (
          <div className="mb-6">
            <ImageSelector onSelect={handleImageChange} />
          </div>
        )}
        <ProfileActions />
      </div>
    </div>
  );
}