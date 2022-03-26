<template>
	<main>
		<nav>
			<h1 class="logo">JIRA</h1>
			<ul>
				<a>Features</a>
				<a>Customers</a>
				<a>Pricing</a>
				<a>About Us</a>
				<button @click="login('admin')">Admin Login</button>
			</ul>
		</nav>
		<div class="line"></div>
		<section>
			<div class="heading">
				<h1>Recruiting members for your projects made easy.</h1>
				<p>Getting volunteers for your projects could be a pain in the ass, Jira can solve your problem today!</p>
				<div class="buttons">
					<button class="buttons__pm" @click="login('pm')">PM Login</button>
					<button class="buttons__vol" @click="login('vol')">Volunteer Login</button>
				</div>
			</div>
			<div class="picture">
				<img src="../assets/images/headimg2.jpeg" alt="">
			</div>
		</section>

	</main>

</template>

<script>
// @ is an alias to /src


export default {
	name: 'HomeView',
	methods:{
		login(user){
			if(user == "pm"){
				this.$store.commit("changeUser", 1)
			}else if(user == "vol"){
				this.$store.commit("changeUser", 2)
			}else{
				this.$store.commit("changeUser", 0)
			}
			this.$router.push("/login")
		}
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

	& > button{
		background-color: transparent;
		border: 2px solid white;
		color: white;
		border-radius: 10px;
		font-size: 18px;

	
	}

}
a{
	padding: 10px 25px;
	color: white;
	&:hover{
		cursor: pointer;
		transform: scale(1.1);
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
	margin-top: 50px;
	& > .heading{
		width: 70%;

		padding: 20px 100px;
		& > h1{
			font-size: 70px;
			color: white;
			text-align: left;
			line-height: 80px;
		}
		& > p{
			font-size: 30px;
			color: white;
			text-align: left;
			margin-top: 10px;
		}

		
	}
	& > .picture{
		width: 40%;
		padding: 20px 0px;
		
		& > img{
			margin: auto;
			width: 80%;
			transform: translateX(-90px);

		}
	}
}
.buttons{
	margin-top: 20px;
	display: flex;
	gap: 20px;
	& > button{
		width: 200px;
		color: white;
		padding: 15px 0px;
	}
	&__pm{
		background-color: #4337ee;
		&:hover{
			background-color: #554ae9;
		}
	}
	&__vol{
		background-color: #9637ee;
		&:hover{
			background-color: #a55beb;
		}
	}
}

</style>
