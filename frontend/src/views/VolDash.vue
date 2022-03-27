<template>
    <PmCard v-show="show" @close="openCard()" :darkmode="darkmode" :data="chosenProject" :userType="2"/>
    <CreateProj v-show="showCreate"/>
    <div class="shadow" v-show="show || showCreate" @click="close()"></div>
    <main :style="{'background-color': styles.generalBg[darkmode]}" class="projmain">
        <nav :style="{'background-color': styles.navbgVol[darkmode], 'border-bottom': styles.navborder[darkmode]}">
            <h1 :style="{'color': styles.textVol[darkmode]}">Volunteer</h1>
            <section class="tool">
                <div class="tool__dark">
                    <div class="switch">
                        <label class="theme-switch" for="checkbox">
                            <input type="checkbox" id="checkbox" v-model="checked" @click="changeMode()"/>
                            <div class="slider round"></div>
                        </label>
                        <p :style="{'color': styles.textVol[darkmode]}">Dark Mode</p>
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
                    <h2 class="col__head--name" :style="{'color': styles.generaltext[darkmode]}">Project's Listed</h2>
                    <div class="col__head--crumb">{{projectsListed.length}}</div>
                </header>
                <div class="col__project" @click="openCard(item.projectId)" v-for="item in projectsListed" :style="{'--hoverproj': styles.projhover[darkmode]}">
                    <h2 class="col__project--title" :style="{'color': styles.generaltext[darkmode]}">{{item.title}}</h2>
                    <p class="col__project--desc" :style="{'color': styles.generaltext[darkmode]}">Spots Left: {{item.projectCurrentVolunteerCount}}/{{item.projectMaxVolunteers}}</p>
                    <p class="col__project--desc" :style="{'color': styles.generaltext[darkmode]}">{{item.prettyDate}}</p>
                </div>

            </div>
            <div class="col">
                <header class="col__head">
                    <h2 class="col__head--name" :style="{'color': styles.generaltext[darkmode]}">Pending Approval</h2>
                    <div class="col__head--crumb">{{volApproval.length}}</div>
                </header>

                <div class="col__project" @click="openCard(item.projectId)" v-for="item in volApproval" :style="{'--hoverproj': styles.projhover[darkmode]}">
                    <h2 class="col__project--title" :style="{'color': styles.generaltext[darkmode]}">{{item.title}}</h2>
                    <p class="col__project--desc" :style="{'color': styles.generaltext[darkmode]}">Spots Left: {{item.projectCurrentVolunteerCount}}/{{item.projectMaxVolunteers}}</p>
                    <p class="col__project--desc" :style="{'color': styles.generaltext[darkmode]}">{{item.prettyDate}}</p>

                </div>

                
            </div>
            <div class="col">
                <header class="col__head">
                    <h2 class="col__head--name" :style="{'color': styles.generaltext[darkmode]}">In Progress</h2>
                    <div class="col__head--crumb">{{inProgress.length}}</div>
                </header>
                <div class="col__project" @click="openCard(item.projectId)" v-for="item in inProgress" :style="{'--hoverproj': styles.projhover[darkmode]}">
                    <h2 class="col__project--title" :style="{'color': styles.generaltext[darkmode]}">{{item.title}}</h2>
                    <p class="col__project--desc" :style="{'color': styles.generaltext[darkmode]}">Spots Left: {{item.projectCurrentVolunteerCount}}/{{item.projectMaxVolunteers}}</p>
                    <p class="col__project--desc" :style="{'color': styles.generaltext[darkmode]}">{{item.prettyDate}}</p>

                </div>
                
            </div>
            <div class="col">
                <header class="col__head">
                    <h2 class="col__head--name" :style="{'color': styles.generaltext[darkmode]}">Completed</h2>
                    <div class="col__head--crumb">{{projectsCompleted.length}}</div>
                </header>

                <div class="col__project" @click="openCard(item.projectId)" v-for="item in projectsCompleted" :style="{'--hoverproj': styles.projhover[darkmode]}">
                    <h2 class="col__project--title" :style="{'color': styles.generaltext[darkmode]}">{{item.title}}</h2>
                    <p class="col__project--desc" :style="{'color': styles.generaltext[darkmode]}">Spots Left: {{item.projectCurrentVolunteerCount}}/{{item.projectMaxVolunteers}}</p>
                    <p class="col__project--desc" :style="{'color': styles.generaltext[darkmode]}">{{item.prettyDate}}</p>

                </div>
                
            </div>
        </section>
        
    </main>
</template>
<script>
import PmCard from "@/components/PmCard.vue"
import CreateProj from "@/components/CreateProject.vue"
import dark from "@/assets/dark.json";

export default {
    name: "PmDash",
    components:{
        PmCard,
        CreateProj
    },
    data(){
        return{
            styles: dark,
            show: false,
            showCreate: false,
            checked: "false",
            darkmode: 0,
            volApproval: [],
            projectsListed: [],
            inProgress:[],
            projectsCompleted: [],
            chosenProject: {},
        

        }
    },
    methods:{
        logout(){
            this.$router.push("/");
        },
        openCard(id){
            this.chosenProject = id;
            console.log(id)

            if(this.show == false){
                fetch(`http://localhost:3000/projects/getProject/${id}`, {method: 'GET'}).then(response => response.json()).then(data => {
                    console.log(data)
                    this.chosenProject = data;
                })
                this.show = true;
                console.log("OPENIN")
            }else{
                this.show = false;
                console.log("CLOSING")
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
        createProjModal(){
            if(this.showCreate == false){
                console.log("Showing show create")
                this.showCreate = true;
                
            }else{
                this.showCreate = false;
           
            }
        },
        close(){
            this.show = false
            this.showCreate = false
        }

    },
    mounted(){
        this.darkmode = this.$store.state.mode;
        if(this.darkmode == 1){
			this.checked = "true";
		}else{
			this.checked = "false";
		}
    

        fetch("http://localhost:3000/volunteers/dashboard/867fb218-36c5-4c81-85a6-66fc92919c10", {method: 'GET'}).then(response => response.json()).then(data => {
            console.log(data)
            this.volApproval = data.projectsPendingVolunteerApproval;
            this.projectsListed = data.projectsListed;
            this.inProgress = data.projectsInProgess;
            this.projectsCompleted = data.projectsCompleted;


        
        })
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
            background-color: #9637ee;
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
.newproj{
    font-size: 25px;
    color: white;
    background-color: #9637ee;
    padding: 10px 20px;
    position: absolute;
    bottom: 50px;
    right: 50px;
    font-weight: 600;
    border-radius: 20px;
    transition: all .4s;
    &:hover{
        cursor: pointer;
        transform: scale(1.1);
    }
}
</style>
