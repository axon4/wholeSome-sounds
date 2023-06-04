import { defineRule, ErrorMessage, Field, Form } from 'vee-validate';
import { alpha_spaces, max, min, required } from '@vee-validate/rules';

const VeeValidatePlugIn = {
    install(application) {
        application.component('VeeField', Field);
        application.component('VeeForm', Form);
        application.component('ErrorMessage', ErrorMessage);

        defineRule('required', required);
        defineRule('min', min);
        defineRule('max', max);
        defineRule('alpha_spaces', alpha_spaces);
    }
};

export default VeeValidatePlugIn;