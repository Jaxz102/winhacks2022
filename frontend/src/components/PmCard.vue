<template>
    <main :style="{'background-color': styles.generalBg[darkmode]}" v-if="data && data.projectData">
        <nav class="nav">
            <div class="nav__exit" @click="this.$emit('close')">
                <svg v-if="darkmode == 0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
            </div>
            
        </nav>
        <h1 :style="{'color': styles.generaltext[darkmode]}">{{data.projectData.title}} <span style="font-size: 15px; ">{{data.projectData.prettyDate}}</span></h1>
        <p :style="{'color': styles.generaltext[darkmode]}">Duration: {{data.projectData.projectLength}}</p>
        <p :style="{'color': styles.generaltext[darkmode]}">Name: {{data.projectData.projectManagerFirstName}} {{data.projectData.projectManagerLastName}}</p>
        <p :style="{'color': styles.generaltext[darkmode]}">Project Manager Email: {{data.projectData.projectManagerEmail}}</p>
        <p :style="{'color': styles.generaltext[darkmode]}">{{data.projectData.description}}</p>
        <button @click="approve()" v-if="data.projectData.projectStatus=='pendingAdminApproval' && userType == 0">Approve</button>
        <button @click="approveVolunteer()" v-else-if="data.projectData.projectStatus=='pendingVolunteers' && userType == 0">Approve Volunteer</button>
        <button v-if="userType == 2" @click="apply()">Apply</button>
        <div class="permissions">
            <p :style="{'color': styles.generaltext[darkmode]}">Plain Language Communication: {{data.projectData.permissions_plainLanguageCommunication}}</p>
            <p :style="{'color': styles.generaltext[darkmode]}">Red Cap Consulting: {{data.projectData.permissions_REDCapConsulting}}</p>
            <p :style="{'color': styles.generaltext[darkmode]}">Videography: {{data.projectData.permissions_videography}}</p>
            <p :style="{'color': styles.generaltext[darkmode]}">Photography: {{data.projectData.permissions_photography}}</p>
            <p :style="{'color': styles.generaltext[darkmode]}">Literature Review: {{data.projectData.permissions_literatureReview}}</p>
            <p :style="{'color': styles.generaltext[darkmode]}">Web Development: {{data.projectData.permissions_websiteDevelopment}}</p>
            <p :style="{'color': styles.generaltext[darkmode]}">Graphic Design: {{data.projectData.permissions_graphicDesign}}</p>
            <p :style="{'color': styles.generaltext[darkmode]}">Organizing Events: {{data.projectData.permissions_planningAndOrganizingEvents}}</p>
            <p :style="{'color': styles.generaltext[darkmode]}">Writing: {{data.projectData.permissions_grantWriting}}</p>
            <p :style="{'color': styles.generaltext[darkmode]}">Social Media: {{data.projectData.permissions_socialMedia}}</p>
            <p :style="{'color': styles.generaltext[darkmode]}">Data Analytics: {{data.projectData.permissions_dataAnalytics}}</p>
    
        </div>
    </main>
</template>
<script>
import dark from "@/assets/dark.json";

export default {
    name: "PmCard",
    data(){
        return{
            styles: dark,

        }
    },
    props:{
     
        darkmode: Number,
        data: Object,
        userType: Number,

    },
    methods:{
        
        approve(){
            let thing = {
                projectId: this.data.projectData.projectId
            }
            console.log(this.data.projectData.projectId)
            fetch(`http://localhost:3000/adminApproval/approveProject/${this.data.projectData.projectId}`, {method:'PUT'}).then(response => response.json()).then(data => {
                console.log(data)
            })
        },

        approveVolunteer(){
            let thing = {
                projectId: this.data.projectData.projectId,
                volunteerId: "867fb218-36c5-4c81-85a6-66fc92919c10"
            }
            console.log(this.data.projectData.projectId)
            fetch(`http://localhost:3000/adminApproval/approveProjectVolunteer/`, {method:'PUT', body: JSON.stringify(thing)}).then(response => response.json()).then(data => {
                console.log(data)
            })
        },
        apply(){
            fetch(`http://localhost:3000/volunteers/apply/867fb218-36c5-4c81-85a6-66fc92919c10/${this.data.projectData.projectId}`, {method:'PUT'}).then(response => response.json()).then(data => {
                console.log(data)
            })
        }
    },
 

}
</script>

<style lang="scss" scoped>
main{
    position: relative;
    width: 800px;
    height: 600px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
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
p{
    text-align: left;
    margin-left: 30px;
    margin-top: 20px;
}
.permissions{
    position: absolute;
    top: 50px;
    right: 40px;

}

button{
    padding: 10px 20px;
    font-size: 25px;
    font-weight: 600;
    background-color: #4337ee;
    position: absolute;
    left: 30px;
    bottom: 30px;
}

</style>