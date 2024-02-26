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
  const [reviewsState, setReviewsState] = useState(() => {
    const storageReviews = window.localStorage.getItem('reviews');
    if (storageReviews !== null) { 
      const savedReviews = JSON.parse(storageReviews);
      if (savedReviews !== null) {
      return savedReviews;
    }
    }
    return reviews;
  });

  //use effect to save state to local storage
  useEffect(() => {
    window.localStorage.setItem('reviews', JSON.stringify({ good: reviewsState.good, neutral: reviewsState.neutral, bad: reviewsState.bad }));
  }, [reviewsState.good]);
  
  useEffect(() => { 
    window.localStorage.setItem('reviews', JSON.stringify({ good: reviewsState.good, neutral: reviewsState.neutral, bad: reviewsState.bad }));
  }, [reviewsState.neutral]);

  useEffect(() => { 
    window.localStorage.setItem('reviews', JSON.stringify({ good: reviewsState.good, neutral: reviewsState.neutral, bad: reviewsState.bad }));
  }, [reviewsState.bad]);

  const totalFeedback = reviewsState.good + reviewsState.neutral + reviewsState.bad;

  let positiveResult;

  positiveResult = countPositiveResult();

    const updateFeedback = feedbackType => { 
      switch (feedbackType) {
        case 'good':
          setReviewsState({ ...reviewsState, good: reviewsState.good + 1 });
          break;
        case 'neutral':
          setReviewsState({ ...reviewsState, neutral: reviewsState.neutral + 1 });
          break;
        case 'bad':
          setReviewsState({ ...reviewsState, bad: reviewsState.bad + 1 });
          break;
        default:
          break;
      }
    };
  
  const resetFeedback = () => { 
    setReviewsState({ good: 0, neutral: 0, bad: 0 });
  };

  function countPositiveResult() {
    positiveResult = 100;
    if (totalFeedback > 0) {
      positiveResult = Math.round(((reviewsState.good + reviewsState.neutral) / totalFeedback) * 100)
      return positiveResult;
    }
  }
  return (
    <>
      <Description />
      <Options totalFeedback={totalFeedback} handleAddGoodReviewClick={() => updateFeedback('good')} handleAddNeutralReviewClick= {() => updateFeedback('neutral')} handleAddBadReviewClick={() => updateFeedback('bad')} handleResetFeedbackClick={() => resetFeedback()}/>
      {totalFeedback === 0 ? <Notification /> : <Feedback good={reviewsState.good} neutral={reviewsState.neutral} bad={reviewsState.bad} positiveResult={ positiveResult} />
      }
    </>
  )
}

export default App
