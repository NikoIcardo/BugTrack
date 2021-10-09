import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTechs } from '../../actions/techActions';

const TechSelectOptions = ({ techs, loading, getTechs }) => {
  useEffect(() => {
    getTechs();
    //eslint-disable-next-line
  }, []);
  return (
    techs !== null &&
    !loading &&
    techs.map((tech) => (
      <option key={tech._id} value={tech.firstName + ' ' + tech.lastName}>
        {tech.firstName + ' ' + tech.lastName}
      </option>
    ))
  );
};

TechSelectOptions.propTypes = {
  techs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getTechs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  techs: state.tech.techs,
  loading: state.tech.loading,
});

export default connect(mapStateToProps, { getTechs })(TechSelectOptions);
