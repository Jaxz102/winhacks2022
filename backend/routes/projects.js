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
    const {title, description, projectManagerId, permissionsArray, projectLength} = req.body
    const projectId = v4()
    const projectManager = await (await projectManagersDB.doc(projectManagerId).get()).data()
    const reqFields = {
        title: title,
        projectId: projectId,
        description: description,
        projectManagerId: projectManagerId,
        projectManagerFirstName: projectManager.firstName,
        projectManagerLastName: projectManager.lastName,
        projectManagerEmail: projectManager.email,
        projectManagerPrimaryAffiliation: projectManager.primaryAffiliation,
        projectLength: projectLength
    }
    const permissionsObject = Object.assign(...permissionsArray)
    const projectFields = Object.assign({}, reqFields, permissionsObject)
    console.log(projectFields)
    await projectsDB.doc(projectId).set(projectFields)
    return res.send(`Added project <${title}> into database as <${projectId}>`)
})














module.exports = router