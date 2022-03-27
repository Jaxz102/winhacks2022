<template>
    <PmCard v-show="show" @close="openCard()" :darkmode="darkmode"/>
    <div class="shadow" v-show="show" @click="openCard()"></div>
    <main :style="{'background-color': styles.generalBg[darkmode]}" class="projmain">
        <nav :style="{'background-color': styles.navbg[darkmode], 'border-bottom': styles.navborder[darkmode]}">
            <h1 :style="{'color': styles.text[darkmode]}">Project Manager</h1>
            <section class="tool">
                <div class="tool__dark">
                    <div class="switch">
                        <label class="theme-switch" for="checkbox">
                            <input type="checkbox" id="checkbox" v-model="checked" @click="changeMode()"/>
                            <div class="slider round"></div>
                        </label>
                        <p :style="{'color': styles.text[darkmode]}">Dark Mode</p>
                    </div>
                </div>
                

                <div class="tool__logout" @click="logout()">
                    <p :style="{'color': styles.navlogout[darkmode]}">Logout</p> 
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg>
                </div>

            </section>
           
        </nav>
        <section >
            <div class="col" style=" border-left: solid 1px rgb(224, 224, 224);">
                <header class="col__head">
                    <h2 class="col__head--name" :style="{'color': styles.generaltext[darkmode]}">Pending Approval</h2>
                    <div class="col__head--crumb">3</div>
                </header>
                <div class="col__project" @click="openCard()" :style="{'--hoverproj': styles.projhover[darkmode]}">
                    <h2 class="col__project--title" :style="{'color': styles.generaltext[darkmode]}">Pizza Maker</h2>
                    <p class="col__project--desc" :style="{'color': styles.generaltext[darkmode]}">Making another pizza for the community</p>
                </div>
                
            </div>
            <div class="col">
                <header class="col__head">
                    <h2 class="col__head--name" :style="{'color': styles.generaltext[darkmode]}">Listed</h2>
                    <div class="col__head--crumb">3</div>
                </header>

                
            </div>
            <div class="col">
                <header class="col__head">
                    <h2 class="col__head--name" :style="{'color': styles.generaltext[darkmode]}">In Progress</h2>
                    <div class="col__head--crumb">3</div>
                </header>
                
            </div>
            <div class="col">
                <header class="col__head">
                    <h2 class="col__head--name" :style="{'color': styles.generaltext[darkmode]}">Completed</h2>
                    <div class="col__head--crumb">3</div>
                </header>
                
            </div>
        </section>
    </main>
</template>
<script>
import PmCard from "@/components/PmCard.vue"
import dark from "@/assets/dark.json";

export default {
    name: "PmDash",
    components:{
        PmCard
    },
    data(){
        return{
            styles: dark,
            show: false,
            checked: "false",
            darkmode: 0,
        }
    },
    methods:{
        logout(){
            this.$router.push("/");
        },
        openCard(){
            if(this.show == false){
                this.show = true;
            }else{
                this.show = false;
            }
        },
        changeMode(){
			
			if(this.darkmode == 0){
				this.$store.commit("changeMode", 1);
				this.darkmode = 1;
				
			}else{
				this.$store.commit("changeMode", 0);
				this.darkmode = 0;
			}
			
		},

    },
    mounted(){
        this.darkmode = this.$store.state.mode;
        if(this.darkmode == 1){
			this.checked = "true";
		}else{
			this.checked = "false";
		}
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles.scss";
@import "../assets/dark.scss";
.projmain{
    height: 100%;
    width: 100%;

}
nav{
    position: relative;
    height: 60px;
    
  
    
}
h1{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 100px;
    font-size: 40px;
    color: white;
}
section{
    display: flex;
    flex-direction: row;
    padding: 20px 50px;
    align-items: stretch;
    

    & > div{
        width: 25%;
    }
}
.col{
    border-right: solid 1px rgb(224, 224, 224);
    padding: 0px 20px;
    &__head{
        display: flex;
        justify-content:space-between;
        align-items: center;

        &--name{
            text-align: left;
            font-size: 20px;
        }
        &--crumb{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #4337ee;
            padding: 5px;
            color: white;
            font-weight: 800;
        }
    }
    &__project{
        &:hover{
            cursor: pointer;
            transform: scale(1.05);
            // background-color: #bbb6ff;
            box-shadow: 0px 0px 1px 2px var(--hoverproj);
        }
        width: 100%;
        height: fit-content;
        padding: 10px 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 1px 1px rgb(214, 214, 214);
        margin-top: 20px;
        transition: all .4s;

        &--title{
            text-align: left;
        }

        &--desc{
            text-align: left;
        }
        
    }
}
.tool{
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    // background-color: red;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 30px;
    height: 100%;

    &__logout{
        &:hover{
            cursor: pointer;
        }
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100px;
        & > svg{
          
        }
        & > p{
            font-size: 20px;
            font-weight: 600;
        }

    }

    &__dark{
       
        padding: 0px 10px;
        width: fit-content;
    }
}
.mainsection{
    height: calc(100% - 60px);
}
</style>
