import '../styling/Header.scss';
import curbside from './../assets/CurbsideSmall.png';
import { useNavigate } from 'react-router-dom';
import tree from "../assets/tree.gif"

export default function Header({ prevRoute, }: HeaderProps) {
  const navigate = useNavigate();
  const baseDate = new Date(2022, 4, 17, 10, 21, 32); // May 17, 2022
  const now = new Date();
  let diffInHours = Math.round(Math.abs(baseDate.getTime() - now.getTime()) / (60*60*1000));
  const treesPlanted = 1053 + diffInHours;  

  function PrevRoute() {
    return ( 
      <button 
        className='PrevRoute'
        onClick={()=> navigate(-1)}
      >
        <i className="bi bi-arrow-left"></i>
      </button> 
    )
  }
  return (
    <div className='Header'>
      {prevRoute && <PrevRoute /> }
      <button className="curbside-home" onClick={() => navigate('/')}>
        <img src={curbside} alt='Curbside' />
      </button>
      <p className='treesPlanted'><img src={tree} alt="trees" />{treesPlanted}!</p>
    </div>
  )
}



interface HeaderProps {
  prevRoute?: boolean;
}