const router = require('express').Router();
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const line = require('@line/bot-sdk');

const token = '3WcNc5j024zpczjSUm3LAuJaSB3IEFO9MOp/xVaqEBeygcTv2SrKrntJVDwkBRTrxyWOnhdVQnDb943T5uQjM6t2v2BSJq5Lh0fizYQnzGGdVYZ4WfqwEHLF9q1FnMi94ZvIfSEZIx5OHGa87B40vAdB04t89/1O/w1cDnyilFU=';
const channel = '4da3f7ca5c390bb696e5c707c87b94b9'

const client = new line.Client({
        channelAccessToken: token
    });

router.route('/').post( (req, res) => {
    let events = req.body.events[0];
    // console.log(events);

    if(events.type === 'follow') {
        saveUser(events)
    }

   else if(events.type === "message") {
        console.log(events.message.text)
        const text = events.message.text
        const command = text.substr(0,text.indexOf(' '))
        const id = text.substr(text.indexOf(' ')+1)

        console.log(id)
        if(command == "เสร็จแล้ว") {
            Task.findByIdAndUpdate(id, {status: 1})
            .then( (task) => {
                console.log('update');
                sendAccept(events.replyToken, task.title)
            })
            .catch( (err) => res.status(400).json('Error : ' + err))
        }
        else if(command == "ยังไม่เสร็จ") {
            Task.findByIdAndUpdate(id, {status: 0})
            .then( (task) => {
                console.log('update')
                sendAccept(events.replyToken, task.title)
            })
            .catch( (err) => res.status(400).json('Error : ' + err))
        }
        else if(command == "รายละเอียด") {
            sendDescription(events.replyToken, id);
        }
        else if(command == "ส่งงาน") {
            sendGdrive(events.replyToken, events.source.userId);
        }
    }
    res.sendStatus(200);
});

function saveUser(events) {
    console.log(events.source.userId)
        client.getProfile(events.source.userId)
        .then((profile) => {
            console.log(profile.displayName);
            User.countDocuments({uid: profile.userId}, function(err, count) {
                if(err) {
                    console.log(err)
                }
                else {
                    if(count == 0) {
                        const username = profile.displayName;
                        const uid = profile.userId;
                        const displayname = profile.displayName;
                        console.log(username)
                        console.log(uid)
                        console.log(displayname)
                        const newUser = new User({
                            username,
                            uid,
                            displayname,
                        })

                        newUser.save()
                        .then( () => console.log(`Save user ${profile.displayName}`))
                        .catch( (err) => console.log(err))
                     }
                    else {
                        console.log(`This Username have already in database`)
                    }
                }
            })
        })
        .catch((err) => {
            console.log(err);
        });
}

function sendAccept(replyToken, title) {

    const message = {
        type: 'text',
        text: 'บันทึกข้อมูลเรียบร้อย\r\n' + title
    };
    client.replyMessage(replyToken, message)
    .then(() => {
        console.log("send message")
    })
    .catch((err) => {
        console.log(err)
    });
}

function sendDescription(replyToken, id) {

    Task.findById(id)
    .then( (task) => {
        console.log('description')
        console.log(task)
        const message = {
            type: 'text',
            text: `${task.title}\r\n${task.description}\r\nกำหนดส่งงาน : ${formatDate(task.finish)}`
        };
        console.log(message)
        client.replyMessage(replyToken, message)
        .then(() => {
            console.log("send message")
        })
        .catch((err) => {
            console.log(err)
        });
    })
    .catch( (err) => console.log(err))

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

function sendGdrive(replyToken, uid) {
    User.findOne({ uid: uid})
    .then( task => {
        const message = {
            type: 'text',
            text: 'ส่งงาน GDrive\r\n' + task.gdrive
        };
        client.replyMessage(replyToken, message)
        .then(() => {
            console.log("send gdrive")
        })
        .catch((err) => {
            console.log(err)
        });
    })
    .catch(err => console.log(err));
}

module.exports = router;