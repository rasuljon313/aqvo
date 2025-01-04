const Modal = () => {
    return (
      <>
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <button className="close-btn" >X</button>
          </div>
          <form  className="modal-body">
            <input
              type="text"
              placeholder="Input 1"
              className="modal-input"
            />
            <input
              type="text"
              placeholder="Input 2"
              className="modal-input"
            />
            <div className="modal-actions">
              <button type="submit" className="send-btn">Send</button>
            </div>
          </form>
        </div>
      </div>
      </>
    )
  }
  
  export default Modal