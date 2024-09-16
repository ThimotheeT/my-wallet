export default function ProfileHeader({ name, walletAmount }) {
  return (
    <>
      <h2 className="sm:text-4xl text-3xl font-semibold mb-4 text-center">{name}</h2>
      <h3 className="sm:text-3xl text-2xl font-semibold mb-4 text-center">Balance : {walletAmount} €</h3>
    </>
  );
}