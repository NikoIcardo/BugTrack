import React from 'react';
import { connect } from 'react-redux';
import { deleteTech } from '../../actions/techActions';
import PropTypes from 'prop-types';

const TechItem = ({ tech, deleteTech }) => {
  return (
    <li className="collection-item">
      <div>
        <span className="black-text">ID #{tech.id} </span>
        <span className="blue-text">
          {tech.firstName} {tech.lastName}
        </span>
        <a
          href="#!"
          className="secondary-content"
          onClick={() => deleteTech(tech.id)}
        >
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired,
};

export default connect(null, { deleteTech })(TechItem);
