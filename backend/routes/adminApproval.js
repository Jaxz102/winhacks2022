// think of these as imports
const express = require("express")
const router = express.Router()
const {v4} = require("uuid")
var admin = require("firebase-admin");
const { FieldValue } = require("firebase/firestore");

// starting to get collections, to use db.collections
const db = admin.firestore()
const volunteersDB = db.collection("volunteers")
const projectsDB = db.collection("projects")

router.put("/approveVolunteer", async (req, res) => {
    const { volunteerId } = req.body
    const updateApproval = await volunteersDB.doc(volunteerId).update({
        profileApproved: true
    })
    return res.send("admin approved volunteer")
})

router.put("/approveProject", async (req, res) => {
    const {projectId} = req.body
    await projectsDB.doc(projectId).update({
        projectStatus: "listed"
    })
    return res.send("Project set to listed")
})

router.put("/approveProjectVolunteer", async (req, res) => {
    const {projectId, volunteerId} = req.body
    await projectsDB.doc(projectId).update({
        projectPendingVolunteers: FieldValue.arrayRemove(volunteerId),
        projectCurrentVolunteers: FieldValue.arrayUnion(volunteerId),
        [volunteerId]: "approved"
    })
    await volunteersDB.doc(volunteerId).update({
        projectsPendingApproval: FieldValue.arrayRemove(projectId),
        projectsInProgress: FieldValue.arrayUnion(projectId)
    })
    return res.send("Volunteer Approved")
})


router.get("/admin", async (req, res) => {
    const projectsPendingApproval = []
    const projectsListed = []
    const projectsPendingVolunteers = []
    const projectInProgress = []
    let querySet
    querySet = await projectsDB.where("projectStatus", "==", "pendingAdminApproval").get()
    querySet.forEach((query) => {
        const projectData = query.data()
        const projectCardData = {
            projectManagerFirstName: projectData.projectManagerFirstName,
            projectManagerLastName: projectData.projectManagerLastName,
            prettyDate: projectData.prettyDate,
            projectLength: projectData.projectLength,
            projectCurrentVolunteerCount: projectData.projectCurrentVolunteerCount,
            projectMaxVolunteers: projectData.projectMaxVolunteers,
            title: projectData.title,
            projectManagerPrimaryAffiliation: projectData.projectManagerPrimaryAffiliation,
            projectId: projectData.projectId
        }
        projectsPendingApproval.push(projectCardData)
    })
    querySet = await projectsDB.where("projectStatus", "==", "listed").get()
    querySet.forEach((query) => {
        const projectData = query.data()
        const projectCardData = {
            projectManagerFirstName: projectData.projectManagerFirstName,
            projectManagerLastName: projectData.projectManagerLastName,
            prettyDate: projectData.prettyDate,
            projectLength: projectData.projectLength,
            projectCurrentVolunteerCount: projectData.projectCurrentVolunteerCount,
            projectMaxVolunteers: projectData.projectMaxVolunteers,
            title: projectData.title,
            projectManagerPrimaryAffiliation: projectData.projectManagerPrimaryAffiliation,
            projectId: projectData.projectId
        }
        projectsListed.push(projectCardData)
    })
    querySet = await projectsDB.where("projectStatus", "==", "pendingAdminApproval").get()
    querySet.forEach((query) => {
        const projectData = query.data()
        const projectCardData = {
            projectManagerFirstName: projectData.projectManagerFirstName,
            projectManagerLastName: projectData.projectManagerLastName,
            prettyDate: projectData.prettyDate,
            projectLength: projectData.projectLength,
            projectCurrentVolunteerCount: projectData.projectCurrentVolunteerCount,
            projectMaxVolunteers: projectData.projectMaxVolunteers,
            title: projectData.title,
            projectManagerPrimaryAffiliation: projectData.projectManagerPrimaryAffiliation,
            projectId: projectData.projectId
        }
        projectsPendingVolunteers.push(projectCardData)
    })
    querySet = await projectsDB.where("projectStatus", "==", "inProgress").get()
    querySet.forEach((query) => {
        const projectData = query.data()
        const projectCardData = {
            projectManagerFirstName: projectData.projectManagerFirstName,
            projectManagerLastName: projectData.projectManagerLastName,
            prettyDate: projectData.prettyDate,
            projectLength: projectData.projectLength,
            projectCurrentVolunteerCount: projectData.projectCurrentVolunteerCount,
            projectMaxVolunteers: projectData.projectMaxVolunteers,
            title: projectData.title,
            projectManagerPrimaryAffiliation: projectData.projectManagerPrimaryAffiliation,
            projectId: projectData.projectId
        }
        projectInProgress.push(projectCardData)
    })
    return res.json({
    projectsPendingApproval: projectsPendingApproval,
    projectsListed: projectsListed,
    projectsPendingVolunteers: projectsPendingVolunteers,
    projectInProgress: projectInProgress
    })
})




router.get("/dashboard/projectManager/:projectManagerId", async (req, res) => {
    const querySet = await projectsDB.where("projectManagerId", "==", projectManagerId).get()
    // querySet.forEach((query) => {console.log(query.data())})
    querySet.forEach((query) => {
        const projectData = query.data()
        const projectCardData = {
            projectManagerFirstName: projectData.projectManagerFirstName,
            projectManagerLastName: projectData.projectManagerLastName,
            prettyDate: projectData.prettyDate,
            projectLength: projectData.projectLength,
            projectCurrentVolunteerCount: projectData.projectCurrentVolunteerCount,
            projectMaxVolunteers: projectData.projectMaxVolunteers,
            title: projectData.title,
            projectManagerPrimaryAffiliation: projectData.projectManagerPrimaryAffiliation,
            projectId: projectData.projectId
        }
        if (projectData.projectStatus === "pendingAdminApproval") {
            projectsPendingApproval.push(projectCardData)
        } else if (projectData.projectStatus === "pendingVolunteers" || projectData.projectStatus === "listed") {
            projectsListed.push(projectCardData)
        } else if (projectData.projectStatus === "inProgress") {
            projectsPendingVolunteers.push(projectCardData)
        } else if (projectData.projectStatus === "completed") {
            projectsCompleted.push(projectCardData)
        }
    })
    projectsPendingApproval.sort((a, b) => parseFloat(a.date) - parseFloat(b.date))
    projectsListed.sort((a, b) => parseFloat(a.date) - parseFloat(b.date))
    projectsPendingVolunteers.sort((a, b) => parseFloat(a.date) - parseFloat(b.date))
    projectsCompleted.sort((a, b) => parseFloat(a.date) - parseFloat(b.date))
    return res.json({
        projectsPendingApproval: projectsPendingApproval,
        projectsListed: projectsListed,
        projectsPendingVolunteers: projectsPendingVolunteers,
        projectsCompleted: projectsCompleted
    })
})


















module.exports = router