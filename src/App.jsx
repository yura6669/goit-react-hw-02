import { Description } from './components/description/Description';
import { Options } from './components/options/Option';
import { Feedback } from './components/feetback/Feedback';
import { Notification } from './components/notification/Notification';
import { useState, useEffect } from "react";

function App() {
  //set initial state
  let reviews = {
    good: 0,
    neutral: 0,
    bad: 0
  };
  const [goodReview, setGoodsReview] = useState(() => {
    const storageReviews = window.localStorage.getItem('reviews');
    if (storageReviews !== null) { 
      const savedGoodReview = JSON.parse(storageReviews)['good'];
      if (savedGoodReview !== null) {
      return parseInt(savedGoodReview);
    }
    }
    return reviews.good;
  });
  const [neutralReview, setNeutralReview] = useState(() => {
    const storageReviews = window.localStorage.getItem('reviews');
    if (storageReviews !== null) { 
      const savedNeutralReview = JSON.parse(storageReviews)['neutral'];
      if (savedNeutralReview !== null) {
      return parseInt(savedNeutralReview);
    }
    }
    return reviews.neutral;
  });
  const [badReview, setBadReview] = useState(() => {
    const storageReviews = window.localStorage.getItem('reviews');
    if (storageReviews !== null) { 
      const savedBadReview = JSON.parse(storageReviews)['bad'];
      if (savedBadReview !== null) {
      return parseInt(savedBadReview);
    }
    }

    return reviews.bad;
  });

  //use effect to save state to local storage
  useEffect(() => {
    window.localStorage.setItem('reviews', JSON.stringify({ good: goodReview, neutral: neutralReview, bad: badReview }));
  }, [goodReview]);
  
  useEffect(() => { 
    window.localStorage.setItem('reviews', JSON.stringify({ good: goodReview, neutral: neutralReview, bad: badReview }));
  }, [neutralReview]);

  useEffect(() => { 
    window.localStorage.setItem('reviews', JSON.stringify({ good: goodReview, neutral: neutralReview, bad: badReview }));
  }, [badReview]);

  const totalFeedback = goodReview + neutralReview + badReview;

  let positiveResult;

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
    positiveResult = 100;
    if (totalFeedback > 0) {
      positiveResult = Math.round(((goodReview + neutralReview) / totalFeedback) * 100)
      return positiveResult;
    }
  }
  return (
    <>
      <Description />
      <Options totalFeedback={totalFeedback} handleAddGoodReviewClick={() => updateFeedback('good')} handleAddNeutralReviewClick= {() => updateFeedback('neutral')} handleAddBadReviewClick={() => updateFeedback('bad')} handleResetFeedbackClick={() => resetFeedback()}/>
      {totalFeedback === 0 ? <Notification /> : <Feedback good={goodReview} neutral={neutralReview} bad={badReview} positiveResult={ positiveResult} />
      }
    </>
  )
}

export default App
