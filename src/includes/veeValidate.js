import { Field, Form } from 'vee-validate';

const VeeValidatePlugIn = {
    install(application) {
        application.component('VeeField', Field);
        application.component('VeeForm', Form);
    }
};

export default VeeValidatePlugIn;