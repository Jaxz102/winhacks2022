<template>
	<main>
		<nav>
			<h1 class="logo">JIRA</h1>
			<ul>
				<a>Features</a>
				<a>Customers</a>
				<a>Pricing</a>
				<a>About Us</a>
			</ul>
		</nav>
		<div class="line"></div>
		<section>
			<div class="heading">
				<h1>Recruit members for your made easier.</h1>
				<p>Getting volunteers for your projects could be a pain in the ass, Jira can solve your problem today!</p>
			</div>
			<div class="picture"></div>
		</section>
	</main>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
<style scoped lang="scss">
@import "../assets/styles.scss";
main{
	height: 100%;
	width: 100%;
	background: rgb(83,175,237);
	background: linear-gradient(208deg, rgba(83,175,237,1) 0%, rgba(100,106,202,1) 90%);

}
nav{
	position: relative;
	height: 80px;
	// padding: 10px 0px;
	// background-color: red;
	
	
}
.logo{
	font-size: 40px;
	color: white;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 100px;
	&:hover{
		cursor: pointer;
	}
}

ul{
	
	display: flex;
	flex-direction: row;
	
	height: min-content;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 100px;

}
a{
	padding: 10px 25px;
	color: white;
	&:hover{
		cursor: pointer;
	}
}
.line{
	height: 1px;
	background-color: white;
	width: 90%;
	margin: auto;
}
section{
	display: flex;
	flex-direction: row;
	& > .heading{
		width: 60%;
		background-color: red;
		& > h1{
			font-size: 80px;
			color: white;
			text-align: left;
		}
	}
	& > .picture{
		width: 40%;
	}
}
</style>
