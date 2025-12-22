import express from 'express'
const router=express.Router()

//imports
import {createCourse,getAllCourse,getCourseDetail} from '../controllers/Course'

import {createCategory,showAllCategories,categoryPageDetails} from '../controllers/Categories'
import {createSection,sectionUpdate,sectionDelete, getAllSection} from '../controllers/Section'

import {createSubSection,subSectionUpdate,deleteSubSection} from '../controllers/SubSection'

import { createRating, getAvgRating, getAllRating }  from'../controllers/RatingAndReviews'

//middlewares

import {auth,isAdmin,isInstructor,isStudent} from '../middlewares/auth'
//course
router.post('/createCourse',auth,isInstructor,createCourse);
router.get('/getAllCourse',getAllCourse)
router.get('/getCourseDetail',getCourseDetail)


// categories

router.get('/showAllCategories',showAllCategories)
router.post('/createCategory',auth,isAdmin,createCategory)
router.get('/categoryPageDetails',categoryPageDetails)

//subsection & section
//needs--changes
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




export default router