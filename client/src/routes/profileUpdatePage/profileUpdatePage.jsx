import "./profileUpdatePage.scss";

function ProfileUpdatePage() {
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Full Name</label>
            <input
              id="username"
              name="username"
              type="text"
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
            />
          </div>
          <div className="item">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="text"  />
          </div>
          <div className="item">
            <label htmlFor="whatsapp">WhatsApp</label>
            <input id="whatsapp" name="whatsapp" type="text" />
          </div>
          <button>Update</button>
        </form>

        <form>
          <h1>Update Password</h1>
          <div className="item">
            <label htmlFor="currentpassword">Current Password</label>
            <input
              id="currentpassword"
              name="currentpassword"
              type="password"
            />
          </div>
          <div className="item">
            <label htmlFor="newpassword">New Password</label>
            <input
              id="newpassword"
              name="newpassword"
              type="password"
            />
          </div>
          <div className="item">
            <label htmlFor="confirmNewpassword">Confirm New Password</label>
            <input
              id="confirmNewpassword"
              name="confirmNewpassword"
              type="password"
            />
          </div>
          <button>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src="" alt="" className="avatar" />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
