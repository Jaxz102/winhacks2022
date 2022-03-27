// require() are imports
const express = require("express")
const cors = require("cors") // middleware to prevents malicious frontend software (ex. API) to access backend
const {v4} = require("uuid")
const bodyParser = require("body-parser")

const app = express() // want to create an express app
app.use(cors()) // want to use cors, no parameters: allow any frontend to use access backend
app.use(bodyParser.json()) // for data formatting. 
// Ex: have data as jpeg images, but file is png, bodyParser.json() takes file read as jpeg so iphone can read it

// firebase
var admin = require("firebase-admin");
var serviceAccount = require("./firebaseApiKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore()
const adminDB = db.collection("admin")
const volunteersDB = db.collection("volunteers")
const projectManagersDB = db.collection("projectManagers")

// for routing
app.use("/projects", require('./routes/projects'))
app.use("/adminApproval", require('./routes/adminApproval'))





app.get("/", (req, res) => { // just to check if backend is running
    return res.send("Backend Running")
})


// for testing & learning 
app.post("/nicole", async(req, res) => {
    const {name} = req.body
    // adding document called name, and its fields into firebase
    await mainKeyDB.doc(name).set({
        testField: "testing text",
        testField2: 123
    })
    return res.send(name)
})


app.post("/createAdmin", async(req, res) => {
    const adminId = v4()
    const { firstName, lastName } = req.body
    await adminDB.doc(adminId).set({
        adminId: adminId,
        firstName: firstName,
        lastName: lastName
    })
    return res.send("created admin")
})


app.post("/createVolunteer", async(req, res) => {
    const volunteerId = v4()
    const {
        firstName,
        lastName,
        permissions_dataAnalytics, 
        permissions_grantWriting, 
        permissions_graphicDesign, 
        permissions_literatureReview,
        permissions_photography,
        permissions_plainLanguageCommunication,
        permissions_planningAndOrganizingEvents,
        permissions_REDCapConsulting,
        permissions_socialMedia,
        permissions_videography,
        permissions_websiteDevelopment,
        permissions_other,
        profileApproved,
    } = req.body
    permissions_other.replace(/ /g,'')
    const otherpermissions = ( (permissions_other==="" || permissions_other==null) ? null : permissions_other)
    await volunteersDB.doc(volunteerId).set({
        volunteerId: volunteerId,
        firstName: firstName,
        lastName: lastName,
        permissions_dataAnalytics: permissions_dataAnalytics,
        permissions_grantWriting: permissions_grantWriting, 
        permissions_graphicDesign: permissions_graphicDesign, 
        permissions_literatureReview: permissions_literatureReview,
        permissions_photography: permissions_photography,
        permissions_plainLanguageCommunication: permissions_plainLanguageCommunication,
        permissions_planningAndOrganizingEvents: permissions_planningAndOrganizingEvents,
        permissions_REDCapConsulting: permissions_REDCapConsulting,
        permissions_socialMedia: permissions_socialMedia,
        permissions_videography: permissions_videography,
        permissions_websiteDevelopment: permissions_websiteDevelopment,
        permissions_other: otherpermissions,
        profileApproved: profileApproved,
        projectsPendingApproval: [],
        projectsInProgress: [],
        projectsCompleted: [],
    })
    return res.send("created volunteer")
})


app.post("/createProjectManager", async(req, res) => {
    const projectManagerId = v4()
    const{ firstName, lastName, email, primaryAffiliation, biography } = req.body
    await projectManagersDB.doc(projectManagerId).set({
        projectManagerId: projectManagerId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        primaryAffiliation: primaryAffiliation,
        biography: biography,
        projectsPendingApproval: [],
        projectsListed: [],
        projectsPendingVolunteers: [],
        projectsInProgress: [],
        projectsCompleted: []
    })
    return res.send("created project manager")
})



// function on high level does nothing but is necessary because does things in low level
app.listen(3000,() => { //3000 would be the port we're using
    console.log("Running on port 3000")
})