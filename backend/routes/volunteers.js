const express = require("express")
const router = express.Router()
const {v4} = require("uuid")


var admin = require("firebase-admin");
const db = admin.firestore()
const { FieldValue } = require("firebase/firestore");
const { json, query } = require("express");
const projectsDB = db.collection("projects")
const projectManagersDB = db.collection("projectManagers")
const volunteersDB = db.collection("volunteers")


router.get("/dashboard/:volunteerId", async (req, res) => {
    const volunteerId = req.params.volunteerId
    const projectsListed = []
    const projectsPendingVolunteerApproval = []
    const projectsInProgess = []
    const projectsCompleted = []
    var querySet = await projectsDB.where("projectStatus", "==", "listed").get()
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
    const volunteerData = await (await volunteersDB.doc(volunteerId).get()).data()
    console.log(volunteerData.projectsPendingApproval)
    volunteerData.projectsPendingApproval.forEach(async (projectId) => {
        const projectData = await (await projectsDB.doc(projectId).get()).data()
        console.log(projectData)
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
        projectsPendingVolunteerApproval.push(projectCardData)
    })
    volunteerData.projectsInProgress.forEach(async (projectId) => {
        const projectData = await (await projectsDB.doc(projectId).get()).data()
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
        projectsInProgess.push(projectCardData)
    })
    volunteerData.projectsCompleted.forEach(async (projectId) => {
        const projectData = await (await projectsDB.doc(projectId).get()).data()
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
        projectsCompleted.push(projectCardData)
    })
    res.json({
        projectsListed:projectsListed,
        projectsPendingVolunteerApproval:projectsPendingVolunteerApproval,
        projectsInProgess:projectsInProgess,
        projectsCompleted:projectsCompleted
    })
})


router.put('/apply/:volunteerId/:projectId', async (req, res) => {
    const volunteerId = req.params.volunteerId
    const projectId = req.params.projectId
    await projectsDB.doc(projectId).set({ //add voluteer id to params
        [volunteerId]: "applied",
    }, {merge: true})
    const projectDataInit = await (await projectsDB.doc(projectId).get()).data()
    await projectsDB.doc(projectId).update({ //update project with new volunteer pending
        projectCurrentVolunteerCount: projectDataInit.projectCurrentVolunteerCount+1,
        projectPendingVolunteers: admin.firestore.FieldValue.arrayUnion(volunteerId)
    })
    await volunteersDB.doc(volunteerId).update({ //add project id to volunteer's pending approval array
        projectsPendingApproval: admin.firestore.FieldValue.arrayUnion(projectId)
    })
    const projectData = await (await projectsDB.doc(projectId).get()).data()
    console.log(projectData)
    if (projectData.projectCurrentVolunteerCount == projectData.projectMaxVolunteers) {
        await projectsDB.doc(projectId).update({ //update project with new volunteer pending
            projectStatus: "pendingVolunteers"
        })
        return res.send("Pending volunteers are full, moved to admin pending")
    } else {
        return res.send("Added volunteer application to project")
    }
})


router.get("/getVolunteer/:volunteerId", async (req, res) => {
    const volunteerId = req.params.volunteerId
    const volunteerData = await (await volunteersDB.doc(volunteerId).get()).data()
    return res.json(volunteerData)
})


module.exports = router