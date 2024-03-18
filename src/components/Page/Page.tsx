import { ReactElement } from "react";
import styles from "./Page.module.css";

const Page = function ({ children }: { children: ReactElement }) {
  return <div className={styles.page}>{children}</div>;
};

export default Page;
