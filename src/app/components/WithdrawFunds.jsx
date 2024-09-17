import { useState } from 'react';
import { IoRemoveCircleOutline } from "react-icons/io5";

export default function WithdrawFunds({ wallet, fetchWallet, setMessage }) {
  const [amountToWithdraw, setAmountToWithdraw] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdrawFunds = async () => {
    if (!wallet || isLoading) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const withdrawAmount = Math.abs(Number(amountToWithdraw));
      const description = `Withdrawn ${withdrawAmount} € from wallet`;
    
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'withdraw',
          walletId: wallet.id,
          amount: withdrawAmount, 
          type: 'withdrawal',
          description,
        }),
      });
    
      if (response.ok) {
        await fetchWallet();
        setMessage('Funds withdrawn successfully!');
        setAmountToWithdraw('');
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
          placeholder="Amount to withdraw"
          value={amountToWithdraw}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || Number(value) > 0) {
              setAmountToWithdraw(value);
            }
          }}
          min="0"
          disabled={isLoading}
          className="w-full sm:w-2/3 px-4 py-2 bg-gray-800 text-whiteBrand rounded focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
        />
        <button 
          onClick={handleWithdrawFunds}
          disabled={isLoading}
          className="w-full sm:w-1/3 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="animate-spin mr-2">&#9696;</span>
          ) : (
            <IoRemoveCircleOutline className="mr-2" style={{ fontSize: '14px' }} />
          )}
          {isLoading ? 'Removing...' : 'Remove'}
        </button>
      </div>
    </div>
  );
}