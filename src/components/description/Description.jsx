import css from './Description.module.css';
export const Description = () => { 
    return (
        <div>
            <h1>Sip Happens Café</h1>
            <p className={css.description__paragraph}>Please leave your feedback about our service by selecting one of the options below.</p>
        </div>
    );
};