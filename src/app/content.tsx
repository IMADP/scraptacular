import classes from './content.module.css';

export const Content = () => {
  return (
    <main className={classes.main}>
      <textarea className={classes.textarea} placeholder="Start scrappin..."></textarea>
    </main>
  );
}