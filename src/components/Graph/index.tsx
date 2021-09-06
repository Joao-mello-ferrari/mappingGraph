import { Radar } from 'react-chartjs-2' 

import styles from './styles.module.scss'

export interface GraphData{
  labels: string[];
  data: number[];
  redDots: number[];
  isReady: boolean;
}

// Configurações do gráfico
const options={
  scales: {
    r: {
      // Linhas angulares (ligam o centro à borda)
      angleLines: { display: false },

      // Label de cada ponto (o número do ponto)
      pointLabels:{ 
        color: '#000',
        padding: 15,
        font: {size: 13, weight: 'bold'}
      },

      // Índices das distâncias (valor)
      ticks: { 
        display: true,
        stepSize: 20,
        color: '#37a528',
        backdropColor: '#cad1c9',
        font:{size:18, weight: 'bold'}
      },
      
      // Linhas do grid (da circunferência)
      grid:{ 
        color: '#596159',
        circular: true,
        lineWidth: 0.8,
        // borderDash: [4]
      },

      // Mínimo e máximo sugeridos para os índices
      suggestedMin: 0 , 
      suggestedMax: 200, 
    },
  },

  elements:{
    // Linhas que ligam os pontos
    line:{ 
      backgroundColor: 'transparent',
      borderColor: 'transparent'
    },
  },  

  // Animações
  animation: false,
  events: [],
  // pointHoverRadius: 8,
  // tooltips: {enabled: false},
  // hover: false,
}

export function Graph( { labels, data, redDots, isReady } : GraphData ){
  // Criar o vetor dos pontos amarelos
  const yellowDots = []
  if(isReady){
    redDots.map((dot: number)=>{yellowDots.push(4)})
  }

  return(
    <div 
      className={styles.graphContainer} 
      style={{ opacity: isReady ? 1 : 0.3, transition: 'opacity 2s'}}
    >
      <Radar
        data={{ 
          labels, 
          datasets: [
            { // Pontos amarelos
              data: yellowDots, 
              label: '', 
              elements:{
                point:{ 
                  pointBackgroundColor: 'yellow',
                  pointBorderColor: 'transparent',  
                  pointRadius: 6.4,
                } 
              }
            },
            { // Pontos vermelhos
              data: redDots, 
              label: ' ', 
              elements:{
                point:{ 
                  pointBackgroundColor: '#FF3933',
                  pointBorderColor: '#FF0000',  
                  pointRadius: 5.5,
                } 
              }
            },
            { // Pontos pretos
              data, 
              label: '  ', 
              elements:{
                point:{ 
                  pointBackgroundColor: '#1f1e1e',
                  pointBorderColor: '#000000',
                  pointRadius: 5.5,
                } 
              }
            }
          ]
        }}
        type="radar"
        options={options}
      />
    </div>
  )
}