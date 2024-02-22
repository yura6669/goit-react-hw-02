import { Description } from './components/description/Description';
import { Option } from './components/options/Option';
import { Feedback } from './components/feetback/Feedback';
import { Notification } from './components/notification/Notification';
import { useState, useEffect } from "react";

function App() {
  //set initial state
  const [goodReview, setGoodsReview] = useState(() => {
    const savedGoodReview = window.localStorage.getItem('goodReview');
    if (savedGoodReview !== null) {
      return parseInt(savedGoodReview);
    }
    return 0;
  });
  const [neutralReview, setNeutralReview] = useState(() => {
    const savedNeutralReview = window.localStorage.getItem('neutralReview');
    if (savedNeutralReview !== null) {
      return parseInt(savedNeutralReview);
    }
    return 0;
  });
  const [badReview, setBadReview] = useState(() => {
    const savedBadReview = window.localStorage.getItem('badReview');
    if (savedBadReview !== null) {
      return parseInt(savedBadReview);
    }
    return 0;
  });

  //use effect to save state to local storage
  useEffect(() => {
    window.localStorage.setItem('goodReview', goodReview);
  }, [goodReview]);
  
  useEffect(() => { 
    window.localStorage.setItem('neutralReview', neutralReview);
  }, [neutralReview]);

  useEffect(() => { 
    window.localStorage.setItem('badReview', badReview);
  }, [badReview]);

  const totalFeedback = goodReview + neutralReview + badReview;

  let positiveResult = 100;

  positiveResult = countPositiveResult();

    const updateFeedback = feedbackType => { 
      switch (feedbackType) {
        case 'good':
          setGoodsReview(goodReview + 1);
          break;
        case 'neutral':
          setNeutralReview(neutralReview + 1);
          break;
        case 'bad':
          setBadReview(badReview + 1);
          break;
        default:
          break;
      }
    };
  
  const resetFeedback = () => { 
    setGoodsReview(0);
    setNeutralReview(0);
    setBadReview(0);
  };

  function countPositiveResult() {
    if (totalFeedback > 0) {
      positiveResult = Math.round(((goodReview + neutralReview) / totalFeedback) * 100)
      return positiveResult;
    } else { 
      return 0;
    }
  }
  return (
    <>
      <Description />
      <Option totalFeedback={totalFeedback} handleAddGoodReviewClick={() => updateFeedback('good')} handleAddNeutralReviewClick= {() => updateFeedback('neutral')} handleAddBadReviewClick={() => updateFeedback('bad')} handleResetFeedbackClick={() => resetFeedback()}/>
      {totalFeedback === 0 ? <Notification /> : <Feedback good={goodReview} neutral={neutralReview} bad={badReview} positiveResult={ positiveResult} />
      }
    </>
  )
}

export default App
