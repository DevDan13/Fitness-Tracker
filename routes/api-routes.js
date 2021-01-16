const router = require("express").Router();

const Workout = require("../model/workout-model");


router.get("/api/workouts", function (req, res) {
    console.log('hittt')
    Workout.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"
            }
        }
    }])
    .then((workout) => {
        console.log('workout', workout)
        res.json(workout);
    }).catch(err => {
        console.log(err);
    })
});

router.get("/api/workouts/range", function (req, res) {
    Workout.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"
            }
        }
    }])
    .sort({
        _id: -1
    })
    .limit(7)
    .then((workout) => {
        res.json(workout);
    }).catch(err => {
        console.log(err);
    })
});

//("/api/workouts")
router.post("/api/workouts", function(req,res){
    Workout.create({})
    .then(workout => {
        res.json(workout);
    }).catch(err => {
        console.log(err);
    })
})

//("/api/workouts:id")
router.put("/api/workouts/:id", function(req,res){
    Workout.findByIdAndUpdate(req.params.id, { $push: {exercises: req.body} }, 
        {new: true}
        )
    .then(workout => {
        res.json(workout);
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;
