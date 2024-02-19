import { useContent } from './content-context';
import classes from './content.module.css';

export const Content = () => {
  const contentContext = useContent();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    contentContext.setContent(event.target.value);
  }

  return (
    <main className={classes.main}>
      <textarea autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
        className={classes.textarea} placeholder="Start scrappin..." onChange={handleChange} value={contentContext.content}></textarea>
    </main>
  );
}