import styles from "./loader.module.css";

export const PageLoader = () => {
  return (
    <div className="flex  items-center justify-center p-5">
      <div className={styles.loaderWrapper}>
        <div className="loader"></div>
      </div>
    </div>
  );
};
