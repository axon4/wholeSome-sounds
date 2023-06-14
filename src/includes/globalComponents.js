import _ from 'lodash';
// import upperFirst from 'lodash/upperFirst';
// import camelCase from 'lodash/camelCase';

// const _ = { upperFirst, camelCase };

const GlobalComponentsPlugIn = {
	install(application) {
		const globalComponents = import.meta.glob('../components/base/*.vue', {eager: true});

		Object.entries(globalComponents).forEach(([path, module]) => {
			const componentName = _.upperFirst(_.camelCase(path.split('/').pop().replace(/\.\w+$/, '')));

			application.component(componentName, module.default);
		});
	}
};

export default GlobalComponentsPlugIn;