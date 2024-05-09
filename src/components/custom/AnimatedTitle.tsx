import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';

interface AnimatedTitleProps {
  titles: string[];
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ titles }) => {
  const [index, setIndex] = useState(0);

  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0, transform: 'translate3d(-100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    config: { duration: 1000 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % titles.length);
    }, 4000); 

    return () => clearInterval(interval); 
  }, [titles.length]);

  return (
    <div>
      {transitions((style, i) => (
        <animated.div style={style} className="text-4xl">
          {titles[i]} <span className="font-bold">{titles[i] === "Votre prochain article" ? "de blog" : "site internet"}</span>
        </animated.div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
