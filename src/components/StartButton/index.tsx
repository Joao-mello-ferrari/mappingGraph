import styles from './styles.module.scss'

interface StartButtonProps{
  handleStartButtonClick: () => void;
  color: 'red' | 'green';
} 

export function StartButton({ handleStartButtonClick, color } : StartButtonProps){
  return(
    <div className={styles.button}>
      <h1>Gráfico do ambiente mapeado (cm)</h1>
      <button 
        style={{background: color === 'red' ? '#da4545' : '#39dd39'}}
        type="button" 
        onClick={handleStartButtonClick}
      >
        {color === 'green' ? 'Iniciar mostragem de dados': 'Parar mostragem de dados'}
      </button>
    </div>
  )
}