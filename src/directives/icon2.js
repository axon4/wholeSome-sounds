const Icon2Directive = {
	beforeMount(element, binding) {
		let iconClass = `fa fa-${binding.value.icon} text-green-400 text-xl`;

		if (binding.value.right) {
			iconClass += ' float-right';
		};

		element.innerHTML += `<i class='${iconClass}'></i>`;
	}
};

export default Icon2Directive;