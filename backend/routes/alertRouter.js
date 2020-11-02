const router = require('express').Router();
const Task = require('../models/taskModel');
const User = require('../models/userModel');
const line = require('@line/bot-sdk');
const moment = require('moment');

const token = '3WcNc5j024zpczjSUm3LAuJaSB3IEFO9MOp/xVaqEBeygcTv2SrKrntJVDwkBRTrxyWOnhdVQnDb943T5uQjM6t2v2BSJq5Lh0fizYQnzGGdVYZ4WfqwEHLF9q1FnMi94ZvIfSEZIx5OHGa87B40vAdB04t89/1O/w1cDnyilFU=';
const channel = '4da3f7ca5c390bb696e5c707c87b94b9'

const client = new line.Client({
    channelAccessToken: token
  });

router.route('/').get( (req, res) => {
    console.log("alert")
    Task.aggregate([
        {
        $lookup: {
            from: "users", // collection name in db
            localField: "username",
            foreignField: "username",
            as: "userdetials"
        }
        },
        {
            $match: {"status" : 0},
        }
    
    ])
    .then((tasks) => {
        // console.log(`title = ${tasks[1].title}`)
        // console.log(`time = ${tasks[1].check} moment = ${moment(tasks[1].check).format()}`)
        // console.log(moment().format())
        // console.log(moment().isAfter(tasks[1].finish))
        tasks.forEach(async (task) => {
            if(task.status == 0 && moment().isAfter(task.finish))
            {
                console.log(task.userdetials[0].uid +' ' +task.title)
                sendTask(task._id, task.userdetials[0].uid, task.title, task.description, task.finish)
            }
        });
        res.sendStatus(200)
    })
    .catch( (err) => console.log(err))
});

async function sendTask(id, uid, title, desc, finish){
    if(desc.length > 30) {
      desc = desc.substring(0, 30) + '...'
    }
    if(title.length > 30) {
      title = title.substring(0, 30) + '...'
    }
    let  tomorrow = finish.setDate(finish.getDate() + 1);
    const message = {
        "type": "template",
        "altText": "this is a buttons template",
        "template": {
          "type": "buttons",
          "actions": [
            {
              "type": "message",
              "label": "เสร็จแล้ว",
              "text": "เสร็จแล้ว " + id
            },
            {
              "type": "message",
              "label": "ยังไม่เสร็จ",
              "text": "ยังไม่เสร็จ " + id
            },
            {
              "type": "message",
              "label": "รายละเอียด",
              "text": "รายละเอียด " + id
            },
            {
              "type": "message",
              "label": "ส่งงาน",
              "text": "ส่งงาน "
            }
          ],
          "title": title,
          "text": desc + '\r\nกำหนดส่งงาน : ' + formatDate(finish)
        }
    }

    await client.pushMessage(uid, message)
    .then(() => {
        console.log('Send task' + ' ' + uid)
    })
    .catch((err) => {
        console.log(err)
    });
}

function formatDate(date) {
    let monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม",
      "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม",
      "สิงหาคม", "กันยายน", "ตุลาคม",
      "พฤศจิกายน", "ธันวาคม"
    ];
  
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear() + 543;
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

module.exports = router;