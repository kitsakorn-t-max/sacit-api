// เพิ่มบรรทัดนี้ที่บรรทัดแรกสุดเลยครับ
require('dotenv').config() 

const express = require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors')

// middleware
app.use(morgan('dev'))
app.use(express.json({ limit: '20mb' }))
app.use(cors())

// การโหลด Routes อัตโนมัติ
readdirSync('./routes')
    .map((c) => app.use('/api', require('./routes/' + c)))

// Start Server
const PORT = process.env.PORT || 5001
app.listen(PORT,
    () => console.log(`Server is running on port ${PORT}`))