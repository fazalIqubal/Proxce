import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from './settings';

export default ({ collapsed, menuId}) => {
  let siteName =  '';
  switch (menuId) {
    case 1:
      siteName =  'Face Vault';
      break;
    case 2:
      siteName =  'Users';
      break;
    case 3:
      siteName =  'Endpoints';
      break;
    default:
      siteName =  'Admin';
      break;
  }

  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard">
              <i className={siteConfig.siteIcon} />
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/dashboard">{siteName}</Link>
        </h3>
      )}
    </div>
  );
};
