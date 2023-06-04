import { defineRule, ErrorMessage, Field, Form } from 'vee-validate';
import { alpha_spaces, confirmed, email, max, max_value, min, min_value, not_one_of, required } from '@vee-validate/rules';

const VeeValidatePlugIn = {
    install(application) {
        application.component('VeeField', Field);
        application.component('VeeForm', Form);
        application.component('ErrorMessage', ErrorMessage);

        defineRule('required', required);
        defineRule('min', min);
        defineRule('max', max);
        defineRule('alpha_spaces', alpha_spaces);
        defineRule('eMail', email);
        defineRule('min_value', min_value);
        defineRule('max_value', max_value);
        defineRule('confirmed', confirmed);
        defineRule('not_one_of', not_one_of);
    }
};

export default VeeValidatePlugIn;