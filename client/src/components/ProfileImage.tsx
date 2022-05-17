import "../styling/ProfileImage.scss"
import { useNavigate } from "react-router-dom"

const ProfileImage = ({ user }: { user: { id:string, profileImage?: string, firstName: string } }) => {
  const navigate = useNavigate()
  
  return (
    <div onClick={()=> navigate(`/profile/${user.id}`)} className="ProfileImage" style={{ backgroundImage: user.profileImage ? `url("${user.profileImage}")` : `url("https://gradient-avatar.glitch.me/${user.id}")` }}>
      <span>
        {user.profileImage ? '' : user.firstName[0]}
      </span>
    </div>
  )
}

export default ProfileImage 