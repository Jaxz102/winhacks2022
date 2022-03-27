<template>
    <main>
        <nav class="nav">
            <div class="nav__exit" @click="this.$emit('close')">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
            </div>
            
        </nav>
        <h1>Pizza Maker</h1>
        <p>You make pizzas</p>
    </main>
</template>
<script>


export default {
    name: "PmCard",
    props:{
        title: String,
        desc: String,


    },
    methods:{
        
    }

}
</script>

<style lang="scss" scoped>
main{
    width: 600px;
    height: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0px 0px 1px 2px rgb(202, 202, 202);
  

}
.nav{
    height: 40px;
    width: 100%;
    position: relative;

    
    &__exit{
        position: absolute;
        top:50%;
        right: 20px;
        transform: translateY(-50%);
        &:hover{
            cursor: pointer;
        }
    }
    
}
h1{
    position: absolute;
    left: 30px;
    transform: translateY(-40px);
    text-align: left;
}
p{
    text-align: left;
    margin-left: 30px;
    margin-top: 20px;
}

</style>