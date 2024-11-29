const express=require('express')
const router=express.Router()

//imports
const{createCourse,getAllCourse,getCourseDetails}=require('../controllers/Course')

const {createCategory,showAllCategories,categoryPageDetails}=require('../controllers/Categories')
const {createSection,sectionUpdate,sectionDelete, getAllSection}=require('../controllers/Section')

const {createSubSection,subSectionUpdate,deleteSubSection}=require('../controllers/SubSection')

const { createRating, getAvgRating, getAllRating } = require('../controllers/RatingAndReviews')

//middlewares

const {auth,isAdmin,isInstructor,isStudent}=require('../middlewares/auth')
//course
router.post('/createCourse',auth,isInstructor,createCourse);
router.get('/getAllCourse',getAllCourse)
router.get('/getCourseDetails/:id',getCourseDetails)


// categories

router.get('/showAllCategories',showAllCategories)
router.post('/createCategory',auth,isAdmin,createCategory)
router.get('/categoryPageDetails',categoryPageDetails)

//subsection & section
router.get('/getAllSection',auth,isInstructor,getAllSection)
router.post('/createSection',auth,isInstructor,createSection)
router.post('/sectionUpdate',auth,isInstructor,sectionUpdate)
router.post('/createSubSection',auth,isInstructor,createSubSection)
router.post('/subSectionUpdate',auth,isInstructor,subSectionUpdate)
router.delete('/deleteSubSection/:id',auth,isInstructor,deleteSubSection)
router.delete('/deleteSection/:id',auth,isInstructor,sectionDelete)


//rating and reviews
router.post('/createRating',auth,isStudent,createRating)
router.get('/getAvgRating',getAvgRating)
router.get('/getAllRating',getAllRating)




module.exports=router