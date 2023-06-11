const IconDirective = {
	beforeMount(el, binding) {
		const iconClass = `fa fa-${binding.value} float-right text-green-400 text-xl`;

		el.innerHTML += `<i class='${iconClass}'></i>`;
	}
};

export default IconDirective;