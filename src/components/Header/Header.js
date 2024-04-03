import Logo from '../../assets/images/logo.jpg'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header>
      <nav>
        <FontAwesomeIcon icon={faBars} data-testid='bars' />
        <Link to="/">
          <img src={Logo} alt="Little Lemon's logo" />
        </Link>
        <FontAwesomeIcon icon={faCartShopping} data-testid='cart' />
      </nav>
    </header>
  )
}
