<template>
	<div>
		<tawk-header></tawk-header>
		<router-view />
	</div>
</template>

<script>
import Header from './components/Header.vue'

export default {
	components:{
		'tawk-header': Header
	}
}
</script>

<style lang="scss" scoped>
	@import 'scss/main.scss';
</style>