<template>
    <main :style="{'background-color': styles.generalBg[darkmode]}">
        <nav class="nav">
            <div class="nav__exit" @click="this.$emit('close')">
                <svg v-if="darkmode == 0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
            </div>
            
        </nav>
        <h1 :style="{'color': styles.generaltext[darkmode]}">Create New Project</h1>
        <input type="text" placeholder="Project Title" v-model="title">
        <textarea type="text" placeholder="Project Description" rows="4" cols="40" v-model="description"></textarea>
        <div class="double">
            <input type="text" placeholder="Project Duration" v-model="duration">
            <input type="text" placeholder="Max #of Volunteers" v-model="maxVolunteers">
        </div>
        
        <div class="permissions">
            <div class="left">
                <div class="check">
                <input type="checkbox" value="" v-model="checkedPerm">
                <p>Plain Language Communication</p>
            </div>
            <div class="check">
                <input type="checkbox">
                <p>Red Cap Consulting</p>
            </div>
            <div class="check">
                <input type="checkbox">
                <p>Videography</p>
            </div>
            <div class="check">
                <input type="checkbox">
                <p>Photography</p>
            </div>
            <div class="check">
                <input type="checkbox">
                <p>Literature Review</p>
            </div>
             <div class="check">
                <input type="checkbox">
                <p>Web Development</p>
            </div>
            </div>
             <div class="right">
                <div class="check">
                <input type="checkbox">
                <p>Graphic Design</p>
            </div>
            <div class="check">
                <input type="checkbox">
                <p>Organizing Events</p>
            </div>
            <div class="check">
                <input type="checkbox">
                <p>Writing</p>
            </div>
            <div class="check">
                <input type="checkbox">
                <p>Social Media</p>
            </div>
            <div class="check">
                <input type="checkbox">
                <p>Data Analytics</p>
            </div>
            </div>
            
        
        </div>
        
        <button @click="submit()">Create</button>
    </main>
</template>
<script>
import dark from "@/assets/dark.json";

export default {
    name: "CreateProject",
    data(){
        return{
            styles: dark,
            title: "",
            description: "",
            duration: "",
            maxVolunteers: "",
            checkedPerm: []

        }
    },
    props:{
     
        darkmode: Number,
        data: Object,


    },
    methods:{
        submit(){
            console.log(this.title)
            let thing = {
                title: this.title,
                description: this.description,
                projectManagerId: "041001fe-367a-4f9c-a5ee-5d10273447e9",
                permissionsArray:[
                    {"permissions_plainLanguageCommunication": false},
       
                    {"permissions_REDCapConsulting": true},
                    {"permissions_videography": false},

                    
                    {"permissions_photography": true},
                    {"permissions_literatureReview": false},
                
                    {"permissions_websiteDevelopment": false},
            
                    {"permissions_graphicDesign": true},
                    {"permissions_planningAndOrganizingEvents": true},
                
                    {"permissions_grantWriting": false},
            
                    {"permissions_socialMedia": false},
                
                    {"permissions_dataAnalytics": true},
                    {"permissions_other": false},
                ],
                projectLength: this.duration,
                projectMaxVolunteers: parseInt(this.maxVolunteers),

            }
            fetch(`http://localhost:3000/projects/create`, {
                method: 'POST',
                headers: {
                   'Content-Type': 'application/json',
                },
				body: JSON.stringify(thing),
            }).then(response => response.json()).then(data => {console.log(data)});
        }
    },
 

}
</script>

<style lang="scss" scoped>
main{
    background-color: white;
    width: 800px;
    height: 600px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    border-radius: 10px;
   
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

.permissions{
    display: flex;
    width: 75%;
    margin:auto;
    margin-top: 20px;
    gap: 20px;

    justify-content: center;
}
input{
    margin: auto;
    margin-top: 20px;
    border-radius: 0;
    border-bottom: solid 2px rgb(218, 218, 218);
}

textarea{
    padding: 10px 10px;
    border: solid 2px rgb(218, 218, 218);
    margin-top: 10px;
}
.check{
    width: fit-content;
    height: fit-content;

    display: flex;
    flex-direction: row;

    justify-content: center;
    align-items: center;
    gap: 10px;
    & > input{
        width: 25px;
        height: 25px;
        padding: 0;
        margin: 0;
    }
    & > p{

    }
    
}

.double{
    display: flex;
    gap: 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-top: 20px;

    & > input{
        margin: 0;

    }
}

button{
    background-color: #4337ee;
    color: white;
    padding: 10px 20px;
    margin: auto;
    margin-top: 20px;
}
</style>