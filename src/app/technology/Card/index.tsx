import Link from 'next/link';
import React from 'react';

const TechCard: React.FC<ITechCard> = ({ link, background, color, Icon, title, subtitle, text }: ITechCard) => {
  return (
    <Link href={link} target="_blank" className='flex flex-col w-full'>
      <div 
        className='flex justify-center items-center w-full h-full rounded p-8'
        style={{background, color}}
      >
        <Icon className='w-20 h-20'/>
      </div>
      <div className='flex flex-col w-full'>
        <h3 className='text-2xl bold mt-2'>{title}</h3>
        <span className='c-highlight text-xs mb-4'>{subtitle}</span>
        <p className='c-light-2 text-sm'>{text}</p>
      </div>
    </Link>
  );
}

export default TechCard;