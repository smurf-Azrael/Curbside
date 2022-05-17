import "../styling/ProfileImage.scss"

const ProfileImage = ({ user }: { user: { id:string, profileImage?: string, firstName: string } }) => {
  return (
    <div className="ProfileImage" style={{ backgroundImage: user.profileImage ? `url("${user.profileImage}")` : `url("https://gradient-avatar.glitch.me/${user.id}")` }}>
      <span>
        {user.profileImage ? '' : user.firstName[0]}
      </span>
    </div>
  )
}

export default ProfileImage