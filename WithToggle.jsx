import React, { useState } from 'react';
// HOC pattern
export function UserDate({ user }) {
    return (
        <ul>
            {Object.keys(user).map((key, index) => {
                return <li key={index}>{key}: {user[key]}</li>;
            })}
        </ul>
    );
}

export function WithToggle(WrappedComponent) {
    return function(props) {
        const [isVisible, setIsVisible] = useState(true);
        const handleVisible = () => setIsVisible(!isVisible);
        return (
            <div>
                {isVisible && <WrappedComponent {...props} />}
                <button onClick={handleVisible}>
                    Click to {isVisible ? 'hide' : 'show'} user data!
                </button>
            </div>
        );
    };
}

const ProductWithToggle = WithToggle(UserDate);
export default ProductWithToggle;
