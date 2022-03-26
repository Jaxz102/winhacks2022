<template>
    <main :style="{'background-color': bgcolour[user]}">
        <h1>{{usertype[user]}} Log In</h1>
        <input type="username" placeholder="Your Username" required>
        <input type="password" placeholder="Password" required>
        <button @click="login(user)" :style="{'color': bgcolour[user]}">Log In</button>
    </main>
</template>
<script>
export default {
    name: "Login",
    methods: {
        login(user){
            if(user == 0){
                this.$router.push("/admindashboard");
            }else if(user == 1){
                this.$router.push("/pmdashboard");
            }else if(user == 2){
                this.$router.push("/voldashboard")
            }
        }
    },
    data(){
        return{
            bgcolour: ["#000000", "#4337ee", "#9637ee"],
            usertype:["Admin", "Project Manager", "Volunteer"],
            user: 0
        }
    },
    mounted(){
        this.user = this.$store.state.user
        console.log(this.user);
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles.scss";
main{
    position: fixed;
    width: 100%;
    height: 100%;

}
h1{
    width: clamp(200px, 400px, 1000px);
    text-align:left;
    color: white;
    margin: auto;
    font-size: 50px;
    margin-top: 10%;
}
input{
    margin: auto;
    margin-top: 20px;
    width: clamp(200px, 400px, 500px);
}
button{
    width: clamp(150px, 200px, 300px);
    background-color: white;

    margin: auto;
    margin-top: 20px;
   
}
</style>