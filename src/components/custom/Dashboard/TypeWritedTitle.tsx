import React from 'react';
import Typewriter from 'typewriter-effect';

const TypeWritedTitle: React.FC = () => {
    return (
        <h2 className='text-xlg'>
        <Typewriter
            options={{
                strings: ['boost', 'video', 'photo', 'site', 'blog'],
                autoStart: true,
                loop: true,
            }}
        />
        </h2>
    );
};

export default TypeWritedTitle;
