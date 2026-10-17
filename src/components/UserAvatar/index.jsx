import UserAvatarMenu from "./UserAvatarMenu";

function UserAvatar({ userData, showRole = false }) {
  return (
    <div className="dropdown ms-3">
      <button
        className="btn p-0 border-0 bg-transparent"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        aria-label="Menú de usuario"
      >
        <div className="d-flex align-items-center gap-3">
          <div className="text-end">
            {userData && (
              <>
                <p className="fs-7 fw-semibold mb-0">{userData.username}</p>

                {showRole && (
                  <p className="fs-8 text-body-secondary fw-medium mb-0">
                    {userData.role}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="bg-white rounded-circle shadow d-flex align-items-center justify-content-center avatar-circle">
            <i
              className={`bi ${
                userData ? "bi-person-fill text-info" : "bi-box-arrow-in-right"
              } fs-2 lh-1`}
            ></i>
          </div>
        </div>
      </button>

      <UserAvatarMenu userData={userData} />
    </div>
  );
}

export default UserAvatar;
