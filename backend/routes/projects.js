const express = require("express")
const router = express.Router()
const {v4} = require("uuid")


var admin = require("firebase-admin");
const db = admin.firestore()
const { FieldValue } = require("firebase/firestore");
const { json } = require("express");
const projectsDB = db.collection("projects")
const projectManagersDB = db.collection("projectManagers")

router.post("/create", async (req, res) => {
    const {title, description, projectManagerId, permissionsArray, projectLength, projectMaxVolunteers} = req.body
    const projectId = v4()
    const date = new Date()
    const projectManager = await (await projectManagersDB.doc(projectManagerId).get()).data()
    const reqFields = {
        title: title,
        date: date,
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
        projectStatus: "pendingAdmingApproval"
    }
    const permissionsObject = Object.assign(...permissionsArray)
    const projectFields = Object.assign({}, reqFields, permissionsObject)
    console.log(projectFields)
    await projectsDB.doc(projectId).set(projectFields)
    return res.send(`Added project <${title}> into database as <${projectId}>`)
})














module.exports = router