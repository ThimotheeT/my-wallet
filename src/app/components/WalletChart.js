import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const WalletChart = ({ balance }) => {

  const data = {
     //Etiquette pour chaque segment
    labels: ['Wallet Balance'],
     //tableau de données 
    datasets: [
      {
        data: [balance], //Valeur a afficher
        backgroundColor: ['#36A2EB', '#FF6384'], //Couleurs utilisées
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],//Couleurs utilisées hover
      },
    ],
  };

  return (
    <div style={{ width: '200px', height: '200px' }}>
      <Doughnut data={data} />
    </div>
  );
};

export default WalletChart;