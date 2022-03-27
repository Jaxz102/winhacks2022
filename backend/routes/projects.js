const express = require("express")
const router = express.Router()
const {v4} = require("uuid")


var admin = require("firebase-admin");
const db = admin.firestore()
const { FieldValue } = require("firebase/firestore");
const { json } = require("express");
const projectsDB = db.collection("projects")
const projectManagersDB = db.collection("projectManagers")
const volunteersDB = db.collection("volunteers")

router.get("/", async (req, res) => {
    const {projectId} = req.body
    const projectData = await (await projectsDB.doc(projectId).get()).data()
    const projectManagerData = await (await projectManagersDB.doc(projectData.projectManagerId).get()).data()
    const projectCurrentVolunteersData = []
    projectData.projectCurrentVolunteers.forEach(async (volunteerId) => {
        const volunteerData = await volunteersDB.doc(volunteerId).get().data()
        projectCurrentVolunteersData.push(volunteerData)
    })
    const projectPendingVolunteersData = []
    projectData.projectPendingVolunteers.forEach(async (volunteerId) => {
        const volunteerData = await volunteersDB.doc(volunteerId).get().data()
        projectPendingVolunteersData.push(volunteerData)
    })
    return res.json({
        projectData: projectData, 
        projectManagerData: projectManagerData,
        projectCurrentVolunteersData: projectCurrentVolunteersData,
        projectPendingVolunteersData: projectPendingVolunteersData
    })
})

router.post("/create", async (req, res) => {
    const {title, description, projectManagerId, permissionsArray, projectLength, projectMaxVolunteers} = req.body
    const projectId = v4()
    const date = new Date()
    const projectManager = await (await projectManagersDB.doc(projectManagerId).get()).data()
    const reqFields = {
        title: title,
        date: Date.now(),
        prettyDate: date.toDateString(),
        projectId: projectId,
        description: description,
        projectManagerId: projectManagerId,
        projectManagerFirstName: projectManager.firstName,
        projectManagerLastName: projectManager.lastName,
        projectManagerEmail: projectManager.email,
        projectManagerPrimaryAffiliation: projectManager.primaryAffiliation,
        projectLength: projectLength,
        projectCurrentVolunteerCount: 0,
        projectMaxVolunteers: projectMaxVolunteers,
        projectCurrentVolunteers: [],
        projectPendingVolunteers : [],
        projectStatus: "pendingAdminApproval" // can be "pendingAdminApproval", "listed", "pendingVolunteers", "inProgress", "completed"
    }
    const permissionsObject = Object.assign(...permissionsArray)
    const projectFields = Object.assign({}, reqFields, permissionsObject)
    console.log(projectFields)
    await projectsDB.doc(projectId).set(projectFields)
    // add to pm
    await projectManagersDB.doc(projectManagerId).update({
        projectsPendingApproval: admin.firestore.FieldValue.arrayUnion(projectId),
    })
    return res.send(`Added project <${title}> into database as <${projectId}>`)
})


router.put("/edit", async (req, res) => {
    const {title, description, projectManagerId, permissionsArray, projectLength, projectMaxVolunteers, projectCurrentVolunteers, projectStatus} = req.body
    const projectId = v4()
    const reqFields = {
        title: title,
        projectId: projectId,
        description: description,
        projectLength: projectLength,
        projectCurrentVolunteerCount: projectCurrentVolunteers.length,
        projectMaxVolunteers: projectMaxVolunteers,
        projectCurrentVolunteers: projectCurrentVolunteers,
        projectPendingVolunteers : [],
        projectStatus: projectStatus // can be "pendingAdminApproval", "listed", "pendingVolunteers", "inProgress", "completed"
    }
    const permissionsObject = Object.assign(...permissionsArray)
    const projectFields = Object.assign({}, reqFields, permissionsObject)
    console.log(projectFields)
    await projectsDB.doc(projectId).set(projectFields, {merge: true})
    return res.send(`Updated project <${title}> - <${projectId}>`)
})

// router.delete("/delete", async (req, res) => {
//     const { projectId } = req.body
//     const projectData = await projectsDB.doc(projectId).get().data()
//     const projectStatus = projectData.projectStatus
//     const projectManagerId = projectData.projectManagerId
//     const projectCurrentVolunteersIds = projectData.projectCurrentVolunteers
//     const projectPendingVolunteersIds = projectData.projectsPendingVolunteers
//     await projectsDB.doc(projectId).delete()
//     if (projectStatus === "pendingAdminApproval") {
//         await projectManagersDB.doc(projectManagerId).update({projectsPendingApproval: admin.firestore.FieldValue.arrayRemove(projectId)})
//         projectCurrentVolunteersIds.forEach((volunteerId) => {
//             await volunteersDB.doc(volunteerId).delete()
//         })
//         projectPendingVolunteersIds.forEach((volunteerId) => {
//             await volunteersDB.doc(volunteerId).delete()
//         })
//     } else if (projectStatus === "listed") {
//     } else if (projectStatus === "pendingVolunteers") {
//     } else if (projectStatus === "inProgress") {
//     } else { //completed
//     }
// })


router.post("/moveUp", async (req, res) => {
    const {projectId} = req.body
    const projectData = await (await projectsDB.doc(projectId).get()).data()
    const projectStatus = projectData.projectStatus
    const projectManagerId = projectData.projectManagerId
    if (projectStatus === "pendingAdminApproval") {
        await projectsDB.doc(projectId).update({projectStatus: "listed"})
    } else if (projectStatus === "listed") {
        await projectsDB.doc(projectId).update({projectStatus: "pendingVolunteers"})
    } else if (projectStatus === "pendingVolunteers") {
        await projectsDB.doc(projectId).update({projectStatus: "inProgress"})
    } else if (projectStatus === "inProgress") {
        await projectsDB.doc(projectId).update({projectStatus: "completed"})
    } else { //completed
        return res.send("This project is already completed. Cannot move up")
    }
    return res.send("moved project up")
})


router.post("/moveDown", async (req, res) => {
    const {projectId} = req.body
    const projectData = await (await projectsDB.doc(projectId).get()).data()
    const projectStatus = projectData.projectStatus
    const projectManagerId = projectData.projectManagerId
    if (projectStatus === "pendingAdminApproval") {
        return res.send("This project is already pending approval. Cannot move down")
    } else if (projectStatus === "listed") {
        await projectsDB.doc(projectId).update({projectStatus: "pendingAdminApproval"})
    } else if (projectStatus === "pendingVolunteers") {
        await projectsDB.doc(projectId).update({projectStatus: "listed"})
    } else if (projectStatus === "inProgress") {
        await projectsDB.doc(projectId).update({projectStatus: "pendingVolunteers"})
    } else { //completed
        await projectsDB.doc(projectId).update({projectStatus: "inProgress"})
    }
    return res.send("moved project down")
})






module.exports = router