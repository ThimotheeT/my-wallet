import { useState } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";

export default function AddFunds({ wallet, fetchWallet, setMessage }) {
  const [amountToAdd, setAmountToAdd] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFunds = async () => {
    if (!wallet || isLoading) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const description = `Added ${amountToAdd} € to wallet`;

      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add',
          walletId: wallet.id,
          amount: amountToAdd,
          type: 'deposit', 
          description,
        }),
      });
       
      if (response.ok) {
        await fetchWallet();
        setMessage('Funds added successfully!');
        setAmountToAdd('');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="number"
          placeholder="Amount to add"
          value={amountToAdd}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || Number(value) > 0) {
              setAmountToAdd(value);
            }
          }}
          min="0"
          disabled={isLoading}
          className="w-full sm:w-2/3 px-4 py-2 bg-gray-800 text-whiteBrand rounded focus:outline-none focus:ring-2 focus:ring-greenBrand disabled:opacity-50"
        />
        <button 
          onClick={handleAddFunds}
          disabled={isLoading}
          className="w-full sm:w-1/3 bg-greenBrand hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="animate-spin mr-2">&#9696;</span>
          ) : (
            <IoAddCircleOutline className="mr-2" />
          )}
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </div>
    </div>
  );
}