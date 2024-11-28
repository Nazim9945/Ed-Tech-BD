const express=require('express')
const router=express.Router()
console.log("ola")

//imports
const{createCourse,getAllCourse,getCourseDetails}=require('../controllers/Course')

const {createCategory,showAllCategories,categoryPageDetails}=require('../controllers/Categories')
const {createSection,sectionUpdate,sectionDelete}=require('../controllers/Section')

const {createSubSection,subSectionUpdate,deleteSubSection}=require('../controllers/SubSection')

const { createRating, getAvgRating, getAllRating } = require('../controllers/RatingAndReviews')

//middlewares

const {auth,isAdmin,isInstructor}=require('../middlewares/auth')
//course
console.log("ola2")
router.post('/createCourse',auth,isInstructor,createCourse);
router.get('/getAllCourse',getAllCourse)
router.get('/getCourseDetails/:id',getCourseDetails)


// categories

router.get('/showAllCategories',showAllCategories)
router.post('/createCategory',auth,isAdmin,createCategory)
router.get('/categoryPageDetails',categoryPageDetails)

//subsection & section

router.post('/createSection',createSection)
router.post('/sectionUpdate',sectionUpdate)
router.post('/createSubSection',createSubSection)
router.post('/subSectionUpdate',subSectionUpdate)
router.delete('/deleteSubSection/:id',deleteSubSection)
router.delete('/deleteSection/:id',sectionDelete)
console.log("ola2")


//rating and reviews
router.post('/createRating',createRating)
router.get('/getAvgRating',getAvgRating)
router.get('/getAllRating',getAllRating)




module.exports=router