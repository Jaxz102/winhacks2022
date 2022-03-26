<template>
    <main>
        <nav>
            <div class="exit">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
            </div>
            <h1>Pizza Maker</h1>
            <p>You make pizzas</p>
        </nav>
    </main>
</template>
<script>


export default {
    name: "PmCard",
    props:{
        title: String,
        desc: String,
        

    }

}
</script>

<style lang="scss" scoped>
    main{
        width: 800px;
        height: 600px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        border-radius: 10px;

    }
    nav{
        height: 40px;
        width: 100%;
        position: relative;
        
        & > .exit{
            position: absolute;
            top:50%;
            right: 50px;
            transform: translateY(-50%);
        }
        
    }
</style>