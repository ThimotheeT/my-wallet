import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

 // Définition du composant WalletChart
const WalletChart = ({ balance, withdrawnFunds }) => {
   // Initialisation des variables pour le solde total et les fonds retirés
  const totalBalance = balance;
  const safeWithdrawnFunds = withdrawnFunds || 0; // Utilise 0 si withdrawnFunds est null ou undefined

   // Définition des couleurs en fonction du solde (positif ou négatif)
  const balanceColor = totalBalance >= 0 ? "#00AD85": "#DC2626";
  const balanceHoverColor = totalBalance >= 0 ? "#16A34A" : "#FF4757";

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
    chartColors.push("#DC2626"); // Couleur pour les fonds retirés
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
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          boxWidth: 15,
          font: {
            size: 14
          }
        }
      },
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
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-64 md:h-80 lg:h-96 my-8">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default WalletChart;
