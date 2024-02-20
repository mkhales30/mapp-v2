import React from 'react';
import hollyImg from '../../assets/holly.jpeg';
import khalesImg from '../../assets/khales.png';
import duaaImg from '../../assets/duaa.png';
import reannImg from '../../assets/avatar.png';
import tiImg from '../../assets/avatar.png';

const teamMembers = [
  { name: 'Holly Boaz', imgSrc: hollyImg },
  { name: 'Khales Rahman', imgSrc: khalesImg },
  { name: 'Duaa Fatima Khawaja', imgSrc: duaaImg },
  { name: 'ReAnn Hollins', imgSrc: reannImg },
  { name: 'Ti Nguyen', imgSrc: tiImg },
];
const TeamMember = ({ imgSrc, name }) => (
  <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-solid border-opacity-25" 
  style={{ 
      borderColor: '#E5F4F2', 
      boxShadow: '25px 20px 38px 0px #3366FF0D' 
  }}>
    <img src={imgSrc} alt={name} className="w-20 h-20 rounded-full mb-2" />
    <p className="text-gray-600">{name}</p>
  </div>
);

const Team = () => (
  <div>
    <div className="text-2xl font-bold mb-6">Meet our team</div>
    <p>Get to know the faces behind the scenes and learn about the values that drive us.</p>
    <div className="items-center grid md:grid-cols-3 gap-8 mt-6">
      {teamMembers.map((member, index) => (
        <TeamMember key={index} name={member.name} imgSrc={`${member.imgSrc}`} />
      ))}
    </div>
  </div>
);

export default Team;
