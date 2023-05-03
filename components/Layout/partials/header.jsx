function Header(props) {
  // console.log(props.text);
  return (
    <div id="inner_header" className="inner-header">
      <div className="only-pc">
        <div className="header-pc">
          <div className="header-title">
                {!props.text ? 'Advertising Management' : props.text}
          </div>
          <div className="my-info">
            <div className="info-wrap">
              <div className="my-photo">
                <img
                  src="http://localhost/icarus-frontend/wp-content/themes/icarus/assets/images/inner-header/img-my-pic.png"
                  alt=""
                  className="img"
                />
              </div>
              <div className="my-company">
                <div className="company-name">Must FinTech
                </div>
                <div className="email">mufincrew@mail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="only-mb">
        <div className="header-mb">
          <h1 className="logo-wrap">
            <a href="home" className="link">
              <img
                src="http://localhost/icarus-frontend/wp-content/themes/icarus/assets/images/uikit/logo-mb.svg"
                alt=""
              />
            </a>
          </h1>
          <div className="util-wrap">
            <a href="/my-info" className="info-btn"></a>
            <button
              type="button"
              id="side_mb_btn"
              className="side-mb-btn"
            ></button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Header;