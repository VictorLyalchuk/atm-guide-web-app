import React from 'react';
import MaskedInput from 'react-text-mask';
import { TextMaskCustomProps } from '../interfaces/Phone/State';


const TextMaskCustom = React.forwardRef<HTMLInputElement, TextMaskCustomProps>((props, ref) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(maskedInputRef: any) => {
                if (typeof inputRef === 'function') {
                    inputRef(maskedInputRef ? maskedInputRef.inputElement : null);
                }
                if (ref) {
                    if (typeof ref === 'function') {
                        ref(maskedInputRef ? maskedInputRef.inputElement : null);
                    } else {
                        (ref as React.MutableRefObject<HTMLInputElement | null>).current = maskedInputRef ? maskedInputRef.inputElement : null;
                    }
                }
            }}
            mask={['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
        />
    );
});

export default TextMaskCustom;