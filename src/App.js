import { useCookies } from 'react-cookie'

import { useState, useEffect ,useRef} from 'react';
import './App.css';
import Coin from './Coin'

const App = () => {

  const [cookies, setCookie] = useCookies(['total_points'])



  const inputReferance = useRef(null);
  const [wordList,setWordList] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [pointByWord, setPointByWord] = useState(50);
  const [currentScore, setCurrentScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [totalTime, setTotalTime] = useState(5);
  const [timer,setTimer] = useState();

  
  const [value, setValue] = useState('');

  useEffect(() => {
    fetch(`https://random-word-api.herokuapp.com/word?number=500`)
    .then(res=>res.json())
    .then(res=>setWordList([...res]))
    
    setTopScore(cookies.total_points??0)
  }, [])

  const nextWord = () => {
    const newList = [...wordList].splice(1);
    setWordList(newList)
  }

  const gameRunner  = () => {
    setTotalTime(prevTotalTime => prevTotalTime-1)
  }

  useEffect(() => {
    if (totalTime<=0){
      setValue('');
      nextWord();
      clearInterval(timer)
      setIsEnded(true);
      if(currentScore > topScore) {
        setCookie("total_points",currentScore)
        setTopScore(currentScore)
      }
      
    }
    
  }, [totalTime])

  useEffect(() => {
    let intervalId;
    if (isStarted && !isEnded && totalTime!=0) {
        intervalId = setInterval(gameRunner, 1000);
      setTimer(intervalId)
    }
    else if(!isStarted || totalTime==0){
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId);
  }, [isStarted,totalTime])

  useEffect(() => {
      if(wordList[0]==value){
        nextWord();
          setCurrentScore(prevCurrentScore => prevCurrentScore  + pointByWord)
         setTotalTime(prevTotalTime => prevTotalTime+1)
        setValue('');
      }
  },[value])

  

  useEffect(() => {
    document.body.addEventListener(('keyup'),(e)=>{
      const targetKey = e.code.toLocaleLowerCase();
  
      if(targetKey=='enter'){
        setValue('');
        !isStarted && setIsStarted(true)
        inputReferance.current && inputReferance.current.focus();
      }
    
    })
  }, [totalTime]);


  return (
    <>
    { !isStarted && <h1>press enter to the start racing...</h1> }
    { isEnded && <h1>press f5 for play again...</h1> }
    <div className={'main-window'}>
      <div className={'time-area'}>{totalTime}</div>
      <div className={"score-area"}>
        <div>Your Score : {currentScore}</div>
        <div>Top Score : {topScore}</div>
      </div>
      <div className={'main-window-top-wrapper'}>
        <div className={"words"}>
          <ul>
            {wordList.length > 0 ? 
            wordList.slice(0,5).map((item,index) => <li key={index}>{item.toLocaleLowerCase()}</li>) : <h1>Almost here...</h1>}
          </ul>
        </div>

        <div className={"word-point"}>{pointByWord} <Coin /> </div>
      </div>

      <div className={"input-area"}>
        <input ref={inputReferance} disabled={isEnded} type={"text"} value={value} onChange={(e) => setValue(e.target.value)} />
      </div>

    </div>
    </>
  )
}

export default App;
