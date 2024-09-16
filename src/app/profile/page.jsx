'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProfileHeader from '../components/ProfileHeader';
import ProfilePicture from '../components/ProfilePicture';
import ImageSelector from '../components/ImageSelector';
import ProfileActions from '../components/ProfileActions';

export default function Profile() {
   // Utilisation du hook useSession pour gérer l'état de la session
  const { data: session, status, update } = useSession();
  const router = useRouter();
   // États locaux pour gérer l'affichage du sélecteur d'image et l'URL de l'image de profil
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

   // Effet pour gérer la redirection et l'initialisation de l'image de profil
  useEffect(() => {
    if (status === 'loading') return; // Ne rien faire pendant le chargement
    if (!session) {
      router.push('/'); // Rediriger vers la page d'accueil si pas de session
    } else {
      setProfilePictureUrl(session.user.profile_picture_url); // Initialiser l'URL de l'image
    }
  }, [session, status, router]);

   // Fonction pour gérer le changement d'image de profil
  const handleImageChange = async (newImageUrl) => {
    try {
       // Appel à l'API pour mettre à jour l'image de profil
      const response = await fetch('/api/update-profile-picture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id, newImageUrl }),
      });

      if (response.ok) {
        setProfilePictureUrl(newImageUrl); // Mise à jour de l'état local
        setShowImageSelector(false); // Fermer le sélecteur d'image
        
         // Mise à jour de la session côté client
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

   // Si pas de session, ne rien afficher
  if (!session) return null;

  return (
    <div>
      <h1>Your profile</h1>
      <ProfileHeader name={session.user.name} />
      <ProfilePicture url={profilePictureUrl} />
      <button onClick={() => setShowImageSelector(!showImageSelector)}>
        Change Profile Picture
      </button>
      {showImageSelector && (
        <ImageSelector onSelect={handleImageChange} />
      )}
      <ProfileActions />
    </div>
  );
}