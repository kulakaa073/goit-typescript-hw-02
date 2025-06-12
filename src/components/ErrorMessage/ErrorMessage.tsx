import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <div className={css.container}>
      <p className={css.message}>
        Sorry, we're encountered an error! Please, reload the page and try
        again.
      </p>
    </div>
  );
}
