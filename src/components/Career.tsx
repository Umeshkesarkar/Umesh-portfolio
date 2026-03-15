import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Wealthbrain PVT Ltd</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Developed a React Native fintech app with authentication, push notifications, and financial charts. Implemented PDF export and CSV downloads, built responsive UI with Flexbox, and deployed to App Store and Google Play Store.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Nuvo Aeon Diamond & Jewellery LLP (The Mail Whale)</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Developed a cross-platform React Native app for secure last-mile parcel delivery with end-to-end encryption and real-time interaction. Built a React.js admin dashboard using Tailwind CSS and Redux Toolkit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
