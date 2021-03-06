import React from 'react';
import { connect } from 'react-redux';
import { deleteTech } from '../../actions/techActions';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

const TechItem = ({ tech, deleteTech }) => {
  const onDelete = () => {
    deleteTech(tech._id);
    M.toast({ html: 'Technician Deleted!' });
  };

  return (
    <li className="collection-item">
      <div>
        <span className="black-text">ID #{tech._id} </span>
        <span className="blue-text">
          {tech.firstName} {tech.lastName}
        </span>
        <a href="#!" className="secondary-content" onClick={onDelete}>
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
