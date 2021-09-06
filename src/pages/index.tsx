import { useEffect, useState } from 'react'
import { api } from '../services/api'

import { StartButton } from '../components/StartButton'
import { Graph } from '../components/Graph'
import { LoadingModal } from '../components/LoadingModal'


export default function Home() {
  const [isLoadfingModalOpen, setIsLoadingModalOpen] = useState<boolean>(false)
  const [readyToStart, setReadyToStart] = useState<boolean>(false)
  const [labels, setLabels] = useState<string[]>([])
  const [graphData, setGraphData] = useState<number[]>([])
  const [redDots, setRedDots] = useState<number[]>([])

  // Buscar os dados na api, setar os novos valores e labels (a cada 2000 ms)
  useEffect(()=>{
    const interval = setInterval(()=>{
      if(readyToStart){
        api.get('/data').then(response=>{
          const provisionalRedDots: number[] = []
          const newLabels = response.data.data.map((_, index: number) => index+1) 
          const newData = response.data.data.map((dot: number) => {
            if(dot > 2000){
              provisionalRedDots.push(200)
              return 0
            }
            else{
              provisionalRedDots.push(0)
              return (dot/10)+1.55
            }
          }) 
          
          setLabels(newLabels)
          setRedDots(provisionalRedDots)
          setGraphData(newData)
          setIsLoadingModalOpen(false)
        })
      }
    }, 250)

    return () => {
      clearInterval(interval)
    }
  }, [readyToStart])
  
  // Lidar com o clique do botão
  function handleStart(){
    // Se é para parar a exibição
    if(readyToStart){
      setGraphData([])
      setRedDots([])
    } else{
      setIsLoadingModalOpen(true)
    }
    setReadyToStart(!readyToStart)
  }

  return (
    <main style={{ display: 'flex' }}>
      <LoadingModal isOpen={isLoadfingModalOpen}/>
      <StartButton handleStartButtonClick={handleStart} color={readyToStart ? 'red': 'green'}/>
      <Graph labels={labels} data={graphData} redDots={redDots} isReady={readyToStart}/>
    </main>
  )
}
