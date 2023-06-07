import { configure, defineRule, ErrorMessage, Field, Form } from 'vee-validate';
import { alpha_dash, alpha_spaces, confirmed, email, max, max_value, min, min_value, not_one_of, required } from '@vee-validate/rules';

const VeeValidatePlugIn = {
	install(application) {
		application.component('Field', Field);
		application.component('Form', Form);
		application.component('ErrorMessage', ErrorMessage);

		defineRule('required', required);
		defineRule('termsAndConditions', required);
		defineRule('min', min);
		defineRule('max', max);
		defineRule('alpha_dash', alpha_dash);
		defineRule('alpha_spaces', alpha_spaces);
		defineRule('eMail', email);
		defineRule('min_value', min_value);
		defineRule('max_value', max_value);
		defineRule('confirmed', confirmed);
		defineRule('not_one_of', not_one_of);

		configure({
			generateMessage: context => {
				const messages = {
					required: `'${context.field}' is required`,
					min: `'${context.field}' is too short`,
					max: `'${context.field}' is too long`,
					alpha_dash: `'${context.field}' may only contain alphanumerics/dashes/underscores`,
					alpha_spaces: `'${context.field}' may only contain alphabetics/spaces`,
					eMail: `'${context.field}' is an invalid eMail`,
					min_value: `'${context.field}' is too low`,
                    max_value: `'${context.field}' is too high`,
					confirmed: 'the passwords misMatch',
					not_one_of: 'registrants from this location are not permitted',
					termsAndConditions: 'Terms and Conditions Must be Accepted'
				};

				const message = messages[context.rule.name] ?? `'${context.field}' is invalid`;

				return message;
			}
		});
	}
};

export default VeeValidatePlugIn;