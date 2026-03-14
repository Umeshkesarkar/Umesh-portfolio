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
              Built React Native fintech app with user authentication, push
              notifications, and interactive financial charts for retail investors. 
              Engineered PDF export, CSV download workflow automation. Built responsive UI
              using Flexbox. Shipped app to both App Store and Google Play Store.
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
              Architected and built a cross-platform React Native app enabling
              real-time encrypted parcel tracking. Developed React.js admin
              dashboard using Tailwind CSS. Implemented global state management
              with Redux Toolkit and managed full deployment pipeline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
