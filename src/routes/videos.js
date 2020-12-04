const express = require('express')
const router = express.Router()

const videos = [
  {
    id: 1,
    name: "Random Video"
  },
  {
    id: 2,
    name: "Is this a video... yes!"
  },
  {
    id: 3,
    name: "Another one?!"
  },
  {
    id: 4,
    name: "Nuxt tuts videos..."
  },
]

router.post('/', (req, res, next) => {
  res.json({
    videos
  })
})

router.post('/video', (req, res, next) => {
  const videoID = req.body.videoID
  const video = videos.find(vid => videoID == vid.id)
  res.json({
    video
  })
})

module.exports = router