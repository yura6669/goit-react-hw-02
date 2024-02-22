import css from './Feedback.module.css';
export const Feedback = ({  good, neutral, bad, positiveResult }) => {
    return (
        <div className={css.feedback}>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
            <p>Positive: {positiveResult }%</p>
        </div>
        
    );
 };