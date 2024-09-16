import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

 // Définition du composant WalletChart
const WalletChart = ({ balance, withdrawnFunds }) => {
   // Initialisation des variables pour le solde total et les fonds retirés
  const totalBalance = balance;
  const safeWithdrawnFunds = withdrawnFunds || 0; // Utilise 0 si withdrawnFunds est null ou undefined

   // Définition des couleurs en fonction du solde (positif ou négatif)
  const balanceColor = totalBalance >= 0 ? "#36A2EB" : "#FF9800";
  const balanceHoverColor = totalBalance >= 0 ? "#2196F3" : "#F57C00";

   // Initialisation des tableaux pour stocker les données du graphique
  const chartData = [];
  const chartColors = [];
  const chartHoverColors = [];
  const chartLabels = [];

  if (totalBalance !== 0) {
    chartData.push(Math.abs(totalBalance)); // Utilise la valeur absolue pour l'affichage
    chartColors.push(balanceColor);
    chartHoverColors.push(balanceHoverColor);
    chartLabels.push(totalBalance >= 0 ? "Available Balance" : "Negative Balance");
  }

   // Ajout des données des fonds retirés
  if (safeWithdrawnFunds > 0) {
    chartData.push(safeWithdrawnFunds);
    chartColors.push("#FF6384"); // Couleur pour les fonds retirés
    chartHoverColors.push("#FF4757");
    chartLabels.push("Withdrawn Funds");
  }

  // Définit les données pour le graphique
  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        backgroundColor: chartColors,
        hoverBackgroundColor: chartHoverColors,
      },
    ],
  };

  // Options de configuration pour le graphique
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
           // Personnalisation de l'affichage des tooltips
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
               // Formatage du montant en euros
              label += new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(Math.abs(context.parsed));
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "300px", height: "300px", margin: "20px auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default WalletChart;
