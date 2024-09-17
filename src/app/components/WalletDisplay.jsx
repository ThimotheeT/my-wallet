import WalletChart from "./WalletChart";
import AddFunds from "./AddFunds.jsx";
import WithdrawFunds from "./WithdrawFunds";
import {
  IoWalletOutline,
  IoAddCircleOutline,
  IoRemoveCircleOutline,
  IoRefreshOutline,
} from "react-icons/io5";

export default function WalletDisplay({
  session,
  wallet,
  setWallet,
  fetchWallet,
  setMessage,
}) {
  const handleResetWallet = async () => {
    if (!wallet) {
      setMessage("No wallet to reset.");
      return;
    }

    const response = await fetch("/api/wallets", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id,
      }),
    });

    if (response.ok) {
      setMessage("Wallet deleted successfully. You can create a new one.");
      setWallet(null);
    } else {
      const errorData = await response.json();
      setMessage(`Error deleting wallet: ${errorData.error}`);
    }
  };

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
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-greenBrand flex flex-col sm:flex-row items-start sm:items-center">
          <span className="flex items-center mb-2 sm:mb-0">
            <IoWalletOutline className="mr-2" />
            Wallet Balance :
          </span>
          <span className="sm:ml-2">{formatAmount(wallet.balance)} €</span>
        </h2>
        <button
          onClick={handleResetWallet}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 sm:px-4 rounded flex items-center"
          title="Reset Wallet"
        >
          <IoRefreshOutline className="text-xl sm:mr-2" />
          <span className="hidden sm:inline">Reset Wallet</span>
        </button>
      </div>

      <div className="flex justify-center mb-8">
        <div className="w-full max-w-md">
          <WalletChart
            balance={wallet.balance}
            addedFunds={wallet.added_funds}
            withdrawnFunds={wallet.withdrawn_funds}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4 text-greenBrand flex items-center">
            <IoAddCircleOutline className="mr-2" />
            Add Funds
          </h3>
          <AddFunds
            wallet={wallet}
            fetchWallet={fetchWallet}
            setMessage={setMessage}
          />
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4 text-greenBrand flex items-center">
            <IoRemoveCircleOutline className="mr-2" />
            Withdraw Funds
          </h3>
          <WithdrawFunds
            wallet={wallet}
            fetchWallet={fetchWallet}
            setMessage={setMessage}
          />
        </div>
      </div>
    </div>
  );
}
