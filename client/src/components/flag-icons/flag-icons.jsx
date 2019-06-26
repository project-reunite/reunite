/* your-app/your-components-directory/FlagIcon.js */
// @flow
import * as React from 'react';
import FlagIconFactory from 'react-flag-icon-css';


const FlagIcon = FlagIconFactory(React, { useCssModules: false });
// If you are not using css modules, write the following:
// const FlagIcon = FlagIconFactory(React, { useCssModules: false })

export default FlagIcon;
