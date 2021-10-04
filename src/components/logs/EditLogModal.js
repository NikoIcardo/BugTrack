import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const EditLogModal = () => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      console.log(message, attention, tech);
    }

    // Clear fields
    setMessage('');
    setTech('');
    setAttention(false);
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
            <label htmlFor="message" className="active">
              Log Message
            </label>
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
                <option value="Seymore">Seymore</option>
                <option value="John Doe">John Doe</option>
                <option value="Gabbagool">Gabbagool</option>
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

export default EditLogModal;
