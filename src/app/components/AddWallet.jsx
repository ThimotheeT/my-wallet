import { useState } from 'react';
import { IoWalletOutline, IoAddCircleOutline } from "react-icons/io5";

export default function AddWallet({ session, fetchWallet, setMessage }) {
  const [balance, setBalance] = useState(0);

  const handleAddWallet = async () => {
    const response = await fetch('/api/wallets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: session.user.id,
        balance: balance,
      }),
    });

    if (response.ok) {
      await fetchWallet();
      setMessage('Wallet added successfully!');
      setBalance(0);
    } else {
      const errorData = await response.json();
      setMessage(`Error: ${errorData.error}`);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-greenBrand mb-6 flex items-center">
        <IoWalletOutline className="mr-2" />
        Add a New Wallet
      </h2>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="number"
          placeholder="Initial balance"
          value={balance}
          onChange={(e) => setBalance(Number(e.target.value))}
          className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-whiteBrand rounded focus:outline-none focus:ring-2 focus:ring-greenBrand"
        />
        <button 
          onClick={handleAddWallet}
          className="w-full sm:w-auto bg-greenBrand hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300"
        >
          <IoAddCircleOutline className="mr-2" />
          Add Wallet
        </button>
      </div>
    </div>
  );
}