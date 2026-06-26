import logo from '../assets/black-logo.png';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <img src={logo} alt="KANT" className="footer__logo" />
        </div>

        <p className="footer__copy">
          © {year} KANT Advertising. All rights reserved.
        </p>
      </div>
    </footer>
  );
}