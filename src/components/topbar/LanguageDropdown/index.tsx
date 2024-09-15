import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import classNames from 'classnames';
import i18next from 'i18next';
import { languages, LanguageType } from 'src/i18n';
import { getItem, setItem } from 'src/utils/localStorage';

// flags

const LanguageDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const getCurrentLanguage = (): LanguageType => {
    const currentLang: string = getItem('i18nextLng') || i18next.language;
    return languages.find(item => item.key === currentLang) || languages[0];
  };
  const currentLanguage = getCurrentLanguage();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleChangeLanguage = (lang: string) => {
    i18next.changeLanguage(lang, err => {
      if (err) {
        message.error('Error while changing language. Please try again!');
        return;
      }
      setItem('i18nextLng', lang);
    });
  };
  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id='dropdown-languages'
        as='a'
        onClick={toggleDropdown}
        className={classNames('nav-link', 'waves-effect', 'waves-light', {
          show: dropdownOpen,
        })}
      >
        <img src={currentLanguage.flag} alt={currentLanguage.key} height='14' />
      </Dropdown.Toggle>
      <Dropdown.Menu className='dropdown-menu-end'>
        <div onClick={toggleDropdown}>
          {(languages || []).map((lang, i) => {
            return (
              <Link
                to='#'
                className='dropdown-item notify-item'
                key={i + '-lang'}
                onClick={() => handleChangeLanguage(lang.key)}
              >
                <img
                  src={lang.flag}
                  alt={lang.name}
                  className='me-1'
                  height='12'
                />{' '}
                <span className='align-middle'>{lang.name}</span>
              </Link>
            );
          })}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;
