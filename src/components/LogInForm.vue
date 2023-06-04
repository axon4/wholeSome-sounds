<template>
	<Form :validation-schema='schema' @submit='submit'>
		<div class='mb-3'>
			<label class='inline-block mb-2'>EMail</label>
			<Field type='email' name='eMail' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='EMail' />
			<ErrorMessage name='eMail' class='text-red-600' />
		</div>
		<div class='mb-3'>
			<label class='inline-block mb-2'>PassWord</label>
			<Field type='password' name='passWord' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='Password' />
			<ErrorMessage name='passWord' class='text-red-600' />
		</div>
		<button type='submit' class='block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700'>
			Submit
		</button>
	</Form>
</template>

<script>
	export default {
		name: 'LogInForm',
		data() {
			return {
				schema: {
					eMail: 'required|min:5|max:76|eMail',
					passWord: 'required|min:7|max:96'
				}
			}
		},
		methods: {
			submit(values) {
				console.log(values);
			}
		}
	};
</script>