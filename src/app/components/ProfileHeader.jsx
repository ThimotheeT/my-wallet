export default function ProfileHeader({ name, walletAmount }) {

  const formatAmount = (amount) => {
    // Formater pour obtenir les décimales correctes
    const formatted = new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    // Ensuite, remplacer manuellement les espaces
    return formatted.replace(/\s/g, ' ').replace(/,/g, ',');
  };

  return (
    <>
      <h2 className="sm:text-4xl text-3xl font-semibold mb-4 text-center">{name}</h2>
      <h3 className="sm:text-3xl text-2xl font-semibold mb-4 text-center">Balance : {formatAmount(walletAmount)} €</h3>
    </>
  );
}