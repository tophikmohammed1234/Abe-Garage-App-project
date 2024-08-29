// components 👉
import classes from "./header.module.css";
import LowerHeader from "./LowerHeader";

function Header() {
  return (
    <section className={classes.Header}>
      <header className={classes.header}>
        <div className={classes.Header_above}>
          <div className={classes.Header_above_left}>
            <p>Enjoy the Beso while we fix your car</p>
          </div>
          <div className={classes.Header_above_right}>
            <p className={classes.Header_above_right_week_time}>
              Monday - Saturday 7:00AM 6:00AM
            </p>
            <p className={classes.Header_above_right_welcome}>Welcome: Admin</p>
          </div>
        </div>
      </header>
      <div>
        <LowerHeader />
      </div>
    </section>
  );
}

export default Header;
