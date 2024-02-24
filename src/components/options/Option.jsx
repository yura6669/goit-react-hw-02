import css from './Option.module.css';
    
export const Options = ({ totalFeedback, handleAddGoodReviewClick, handleAddNeutralReviewClick, handleAddBadReviewClick, handleResetFeedbackClick }) => { 
    

    return (
        <div>
            <button className={css.option__btn} onClick={handleAddGoodReviewClick}>Good</button>
            <button className={css.option__btn} onClick={handleAddNeutralReviewClick}>Neutral</button>
            <button className={css.option__btn} onClick={handleAddBadReviewClick}>Bad</button>
            {totalFeedback > 0 ? <button className={css.option__btn} onClick={handleResetFeedbackClick}>Reset</button> : null}

        </div>
        

    );
};