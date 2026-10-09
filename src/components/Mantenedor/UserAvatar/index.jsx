function UserAvatar({ userData }) {
  return (
    <div class="d-flex align-items-center gap-3">
      <div class="text-end">
        <p class="fs-7 fw-semibold mb-0">{userData.username}</p>
        <p class="fs-8 text-body-secondary fw-medium mt-0 mb-0">
          {userData.role}
        </p>
      </div>
      <div class="bg-white rounded-circle shadow d-flex align-items-center justify-content-center avatar-circle">
        <i class="bi bi-person-fill text-info fs-2 lh-1"></i>
      </div>
    </div>
  );
}

export default UserAvatar;
