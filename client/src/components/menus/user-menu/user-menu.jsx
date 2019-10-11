import React from 'react';
import PropTypes from 'prop-types';

import Button from 'mineral-ui/Button';
import { PoseGroup } from 'react-pose';
import IconCancel from 'mineral-ui-icons/IconCancel';

import { AnimatedUserButton } from '../../animations/list-animations';

const UserMenu = (props) => {
  const {
    users,
    setCurrentUser,
    removeUser,
    currentUser,
  } = props;

  return (
    <ul>
      <PoseGroup>
        {users.map(user => (
          <AnimatedUserButton onClick={() => setCurrentUser(user)} key={user}>
            <div>
              <Button
                className="remove-user-button"
                onClick={() => removeUser(user)}
                iconStart={<IconCancel className="cancel-icon" />}
              />
              {user === currentUser
                ? (
                  <button className="user-button selected-button" type="submit">
                    {user}
                  </button>
                )
                : (
                  <button className="user-button " type="submit">
                    {user}
                  </button>
                )}
            </div>
          </AnimatedUserButton>
        ))}

      </PoseGroup>
    </ul>
  );
};

UserMenu.defaultProps = {
  users: [],
  setCurrentUser: () => {},
  removeUser: () => {},
  currentUser: '',
};

UserMenu.propTypes = {
  users: PropTypes.arrayOf(PropTypes.any),
  setCurrentUser: PropTypes.func,
  removeUser: PropTypes.func,
  currentUser: PropTypes.string,
};

export default UserMenu;
