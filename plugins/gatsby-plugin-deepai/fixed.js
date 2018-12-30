const fs = require(`fs-extra`)
var request = require('request-promise');
const _ = require(`lodash`)
const crypto = require(`crypto`)
const ProgressBar = require(`progress`)
const queue = require(`async/queue`)
const path = require(`path`)
const Promise = require(`bluebird`)
const { actions } = require(`gatsby/dist/redux/actions`)
const existsSync = require(`fs-exists-cached`).sync

const bar = new ProgressBar(
    `Generating image processed by deepai [:bar] :current/:total :elapsed secs :percent`,
    {
      total: 0,
      width: 30,
    }
  )

const reportError = (message, err, reporter) => {
    if (reporter) {
        reporter.error(message, err)
    } else {
        console.error(message, err)
    }

    if (process.env.gatsby_executing_command === `build`) {
        process.exit(1)
    }
}

  
let totalJobs = 0
const processFile = (file, jobs, cb, reporter) => {
  // //console.log("totalJobs", totalJobs)
  bar.total = totalJobs

  let imagesFinished = 0

  // Wait for each job promise to resolve.
  Promise.all(jobs.map(job => job.finishedPromise)).then(() => cb())

  jobs.forEach(async job => {
    const args = job.args

    const onFinish = err => {
      imagesFinished += 1
      bar.tick()
      actions.setJob(
        {
          id: `processing image ${job.file.absolutePath}`,
          imagesFinished,
        },
        { name: `gatsby-plugin-deepai` }
      )

      if (err) {
        reportError(`Failed to process image ${file}`, err, reporter)
        job.outsideReject(err)
      } else {
        job.outsideResolve()
      }
    }

    let response;
    request.post({
        url: 'https://api.deepai.org/api/deepdream',
        headers: {
            'Api-Key': '8563b301-091a-487e-9ab5-a80ec3727b76'
        },
        formData: {
            'content': fs.createReadStream(file),
        }
    })
    .catch(onFinish)
    .then(body => {
        response = JSON.parse(body);
        //console.log(response);
        var download = function(uri, filename, callback){
            request.head(uri, function(err, res, body){
              //console.log(file, uri, err)
              //console.log('content-type:', res.headers['content-type']);
              //console.log('content-length:', res.headers['content-length']);
              request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            }).catch(callback);
          };
    
        download(response["output_url"], job.outputPath, onFinish)
    });
  })
}

const toProcess = {}
const q = queue((task, callback) => {
  task(callback)
}, 1)

const queueJob = (job, reporter) => {
  const inputFileKey = job.file.absolutePath.replace(/\./g, `%2E`)
  const outputFileKey = job.outputPath.replace(/\./g, `%2E`)
  const jobPath = `${inputFileKey}.${outputFileKey}`

  // Check if the job has already been queued. If it has, there's nothing
  // to do, return.
  if (_.has(toProcess, jobPath)) {
    return
  }

  // Check if the output file already exists so we don't redo work.
  if (existsSync(job.outputPath)) {
    return
  }

  let notQueued = true
  if (toProcess[inputFileKey]) {
    notQueued = false
  }
  _.set(toProcess, jobPath, job)

  totalJobs += 1

  if (notQueued) {
    q.push(cb => {
      const jobs = _.values(toProcess[inputFileKey])
      // Delete the input key from the toProcess list so more jobs can be queued.
      delete toProcess[inputFileKey]
      actions.createJob(
        {
          id: `processing image ${job.file.absolutePath}`,
          imagesCount: _.values(toProcess[inputFileKey]).length,
        },
        { name: `gatsby-plugin-deepai` }
      )
      // We're now processing the file's jobs.
      processFile(
        job.file.absolutePath,
        jobs,
        () => {
          actions.endJob(
            {
              id: `processing image ${job.file.absolutePath}`,
            },
            { name: `gatsby-plugin-deepai` }
          )
          cb()
        },
        reporter
      )
    })
  }
}

function queueImageResizing({ file, args = {}, reporter }) {
    const options = healOptions(args, {})
    //const fileExtension = options.toFormat ? options.toFormat : file.extension
    const fileExtension = file.extension;

    // Filter out false args, and args not for this extension and put width at
    // end (for the file path)
    const pairedArgs = _.toPairs(args)
    let filteredArgs
    // Remove non-true arguments
    filteredArgs = _.filter(pairedArgs, arg => arg[1])
    // Remove pathPrefix
    filteredArgs = _.filter(filteredArgs, arg => arg[0] !== `pathPrefix`)
    filteredArgs = _.filter(filteredArgs, arg => {
        if (file.extension.match(/^jp*/)) {
        return !_.includes(arg[0], `png`)
        } else if (file.extension.match(/^png/)) {
        return !arg[0].match(/^jp*/)
        }
        return true
    })
    const sortedArgs = _.sortBy(filteredArgs, arg => arg[0] === `width`)
    
    const argsDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(sortedArgs))
    .digest(`hex`)

    const argsDigestShort = argsDigest.substr(argsDigest.length - 5)

    const imgSrc = `/${file.name}-ai.${fileExtension}`
    const dirPath = path.join(
      process.cwd(),
      `public`,
      `static`,
      file.internal.contentDigest,
      argsDigestShort
    )
    const filePath = path.join(dirPath, imgSrc)
    fs.ensureDirSync(dirPath)
  
    // Create function to call when the image is finished.
    let outsideResolve, outsideReject
    const finishedPromise = new Promise((resolve, reject) => {
      outsideResolve = resolve
      outsideReject = reject
    })  

    const originalName = file.base
    // Create job and process.
    const job = {
        file,
        args: options,
        finishedPromise,
        outsideResolve,
        outsideReject,
        inputPath: file.absolutePath,
        outputPath: filePath,
    }

    queueJob(job, reporter)

    // Prefix the image src.
    const digestDirPrefix = `${file.internal.contentDigest}/${argsDigestShort}`
    const prefixedSrc = options.pathPrefix + `/static/${digestDirPrefix}` + imgSrc

    return {
        src: prefixedSrc,
        absolutePath: filePath,
        finishedPromise,
        originalName: originalName,
    }
}

exports.fixed = async function fixed({ file, args = {}, reporter }) {
    const options = healOptions(args, {})

    const image = queueImageResizing({
        file,
        args: {},
        reporter,
    })

    const originalName = file.base

    return {
        src: image.src,
        originalName: originalName,
    }
}
  

const generalArgs = {
quality: 50,
jpegProgressive: true,
pngCompressionLevel: 9,
base64: false,
grayscale: false,
duotone: false,
pathPrefix: ``,
toFormat: ``,
sizeByPixelDensity: false,
}

const healOptions = (args, defaultArgs) => {
    let options = _.defaults({}, args, defaultArgs, generalArgs)
    options.quality = parseInt(options.quality, 10)
    options.pngCompressionLevel = parseInt(options.pngCompressionLevel, 10)
    options.toFormat = options.toFormat.toLowerCase()

    // only set width to 400 if neither width nor height is passed
    if (options.width === undefined && options.height === undefined) {
        options.width = 400
    } else if (options.width !== undefined) {
        options.width = parseInt(options.width, 10)
    } else if (options.height !== undefined) {
        options.height = parseInt(options.height, 10)
    }

    // only set maxWidth to 800 if neither maxWidth nor maxHeight is passed
    if (options.maxWidth === undefined && options.maxHeight === undefined) {
        options.maxWidth = 800
    } else if (options.maxWidth !== undefined) {
        options.maxWidth = parseInt(options.maxWidth, 10)
    } else if (options.maxHeight !== undefined) {
        options.maxHeight = parseInt(options.maxHeight, 10)
    }

    return options
}