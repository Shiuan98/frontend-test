<template>
	<div class="header">
		<div id="header-wrapper">
			<div id="header-text">
				<h1>Knowledge base doesn't have to be boring</h1>
				<h3>Everything you need to manage your messaging</h3>
			</div>
		</div>
		<div class="container">
			<div class="input-group">
				<input type="text" class="form-control" placeholder="Search for answers" v-model="search">
				<button class="btn btn-outline-secondary" type="button" @click="Search()"><i class="fas fa-search"></i></button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
		search: '',
		};
	},
}
</script>

<style lang="scss" scoped>
	@import '../scss/_variables.scss';

	#header-text{
		text-align: center;
		font-family: $font-family;
		color: $text-black;
		padding: 20px;

		h1{
			font-style: normal;
			font-weight: bold;
			font-size: 34px;
			line-height: 41px;
		}

		h3{
			font-style: normal;
			font-weight: normal;
			font-size: 20px;
			line-height: 24px;
		}
	}
	.header{margin-top:24px;}
	.header .container{margin-top: 9px;}
	.header .container .input-group{width: 720px;height: 60px;margin: 0 auto;}
	.header .container .input-group input{font-size: 16px;color: #9C9AA6;padding: 0 22px;border-radius: 4px;border: 1px solid #EEEEEE;}
	.header .container .input-group input:focus{outline: none;box-shadow: unset;}
	.header .container .input-group input::placeholder{color: #9C9AA6;}
	.header .container .input-group button{width: 80px;height: 100%;background: #03A84E;border-radius: 4px;border: none;}
	.header .container .input-group button i{font-size: 18px;color: #ffffff;font-weight: normal;}
@media (max-width: 767px){
  .header .container .input-group{width:80%;}
}
</style>