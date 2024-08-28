import React from "react";
import bgImg from "../../../assets/images/banner/banner.jpg";

const Tuneup = () => {
  const styles = {
    backgroundImage: `url('${bgImg}')`,
  };
  return (
    <>
      <section class="video-section">
        <div data-parallax='{"y": 50}' class="sec-bg" style={styles}></div>
        <div class="auto-container">
          <h5>Working since 1992</h5>
          <h2>
            Tuneup Your Car <br /> to Next Level
          </h2>
          <div class="video-box">
            <div class="video-btn">
              <a href="#feature">
                <i class="flaticon-play"></i>
              </a>
            </div>
            <div class="text">
              Descover The <br /> Core Features
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tuneup;
