import { useRef } from 'react';
import Editable from '../Editable';

function TextInput({ value, placeholder, name, size, onChange }) {
  const inputRef = useRef();

  return (
    <Editable
      text={value}
      placehold={placeholder}
      childRef={inputRef}
    >
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        size={size}
        onBlur={onChange}
        ref={inputRef}
      />
    </Editable>
  );
}

export default TextInput;
