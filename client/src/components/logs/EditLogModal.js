import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearCurrent, updateLog } from '../../actions/logActions';
import TechSelectOptions from '../techs/TechSelectOptions';
import M from 'materialize-css/dist/js/materialize.min.js';

const EditLogModal = ({ current, clearCurrent, updateLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
    //eslint-disable-next-line
  }, [current]);

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      console.log(message, attention, tech);
    }

    const updatedLog = {
      id: current.id,
      message,
      attention,
      tech,
      date: new Date(),
    };
    updateLog(updatedLog);
    M.toast({ html: `Log updated by ${tech}.` });
    clearCurrent();
  };

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></input>
          </div>
          <div className="row">
            <div className="input-field">
              <select
                name="tech"
                value={tech}
                className="browser-default"
                onChange={(e) => setTech(e.target.value)}
              >
                <option disable value="">
                  Select Technician
                </option>
                <TechSelectOptions />
              </select>
            </div>
          </div>
          <div className="row">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(!attention)}
                ></input>
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <footer className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close yellow darken-2 btn"
        >
          Submit
        </a>
      </footer>
    </div>
  );
};

const modalStyle = {
  width: '75%',
  height: '75%',
};

EditLogModal.propTypes = {
  current: PropTypes.object,
  clearCurrent: PropTypes.func.isRequired,
  updateLog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.log.current,
});

export default connect(mapStateToProps, { clearCurrent, updateLog })(
  EditLogModal
);
