// think of these as imports
const express = require("express")
const router = express.Router()
const {v4} = require("uuid")
var admin = require("firebase-admin");

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
})

module.exports = router