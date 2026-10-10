function UserAvatar({ userData }) {
  return (
    <div className="d-flex align-items-center gap-3">
      <div className="text-end">
        <p className="fs-7 fw-semibold mb-0">{userData.username}</p>
        <p className="fs-8 text-body-secondary fw-medium mt-0 mb-0">
          {userData.role}
        </p>
      </div>
      <div className="bg-white rounded-circle shadow d-flex align-items-center justify-content-center avatar-circle">
        <i className="bi bi-person-fill text-info fs-2 lh-1"></i>
      </div>
    </div>
  );
}

export default UserAvatar;
