const AWS = require("aws-sdk")
const { env } = require('../constents/environment')
const fs= require('fs')
const s3 = new AWS.S3({
    credentials: {
        accessKeyId: env.AWS_ACCESS, // store it in .env file to keep it safe
        secretAccessKey: env.AWS_SECRET
    },
    region: "ap-south-1" // this is the region that you select in AWS account
})

const saveImageInS3 = async(content, fileName, contentType) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: 'interest/' + fileName, // File name you want to save as in S3
        Body: content,
        ContentEncoding: 'base64',
        ContentType: contentType ? contentType : 'application/octet-stream',
        ACL: 'public-read'
    };
    console.log("params===========================", params)
        // Uploading files to the bucket
    return new Promise((resolve) => {
        // s3.upload(params, (err, data) => {
        //     if (err) {
        //         console.error(err)
        //         resolve(err)
        //     } else {
        //         console.log("file uploaded successfully")
        //         resolve(data)
        //     }
        // })
    })
}

const saveMUltipleImageInS3 = async(file, imgRes) => {
            let data = await file.map(async(element, result) => {
            let ext = element[1].name.split('.').pop()
            let newFileName = Date.now() + '.' + ext
            const params = {
                Bucket: 'spbrother',
                Key:  newFileName, // File name you want to save as in S3
                Body: fs.createReadStream(element[1].path),
                ContentEncoding: 'base64',
                ContentType: element[1].type ,
                // ACL: 'public-read'
            };
            // Uploading files to the bucket
            console.log("params===========================", params)
            return new Promise((resolve) => {
                s3.upload(params, (err, data) => {
                    if (err) {
                        console.error(err)
                        resolve(err)
                    } else {
                        console.log("file uploaded successfully")
                        resolve(data)
                    }
                })
            })
        });
        imgRes = await Promise.all(data);
        return imgRes

    }

    module.exports={
        saveImageInS3,
        saveMUltipleImageInS3
    }