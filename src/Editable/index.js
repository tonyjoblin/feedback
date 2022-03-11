import { useEffect, useState } from 'react';

// TODO: on mouse over

const Editable = ({ text, placeholder, children, childRef, type='input', ...props }) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && isEditing) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ['Escape', 'Tab'];
    const enterKey = 'Enter';
    const allKeys = [...keys, enterKey];
    if (
      (type === 'textarea' && keys.indexOf(key) > -1) ||
      (type === 'input' && allKeys.indexOf(key) > -1)
    ) {
      setIsEditing(false);
    }
  };

  return (
    <>
      {isEditing ? (
        <span onBlur={() => setIsEditing(false)} onKeyDown={e => handleKeyDown(e, type)}>
          {children}
        </span>
      ): (
        <span onClick={() => setIsEditing(true)}>
          <span>{text || placeholder}</span>
        </span>
      )}
    </>
  );
};

export default Editable;
