const express = require('express')
const process = require('process');
const app = express()
const port = 3001
const sgMail = require('@sendgrid/mail')
const cors = require('cors')
const bodyparser = require('body-parser')
const compression = require('compression');
const fs = require('fs');
require('dotenv').config()

app.use(cors());
app.use(compression());
app.use(express.static('./public'));
app.use(bodyparser.json());

app.get('/api', (req, res) => {
    return res.status(200).send({ hello: "world" })
})


app.get('/api/registered', (req, res) => {
    let rawdata = fs.readFileSync('./registered.json');
    let jsonData = JSON.parse(rawdata)
    return res.status(200).send({ registered: jsonData.registered });
})

app.post('/api/registered', (req, res) => {
    let rawdata = fs.readFileSync('./registered.json');
    let jsonData = JSON.parse(rawdata)
    console.log(req.body.mail)
    if (jsonData.registered.find(e => e.mail == req.body.mail)) {
        return res.status(400).send({ message: "alredy registered" });
    }
    if (req.query.save) {
        jsonData.registered.push(req.body)
    }
    let data = JSON.stringify(jsonData);
    fs.writeFileSync('registered.json', data);
    return res.status(200).send({ jsonData });
})

app.post('/api/notification', (req, res) => {
    let email = req.body.mail
    let name = `${req.body.firstName} ${req.body.lastName}`
    sgMail.setApiKey(process.env.SENDGRID_KEY)
    const msg = {
        from: 'marketing@ceibo.digital',
        to: email,
        subject: 'Webinar Hyperpersonalization',
        html: html(email, name)
    }
    sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error("error", error.response)
        })
    return res.status(200).send({ exist: req.body });
})

app.post('/api/notification/all', (req, res) => {
    let rawdata = fs.readFileSync('./registered.json');
    let jsonData = JSON.parse(rawdata)
    for (const item in jsonData.registered) {
        let email = jsonData.registered[item].mail
        let name = `${jsonData.registered[item].firstName} ${jsonData.registered[item].lastName}`

        sgMail.setApiKey(process.env.SENDGRID_KEY)
        const msg = {
            from: 'marketing@ceibo.digital',
            to: jsonData.registered[item].mail,
            subject: '¡Es hoy! Te compartimos el link de acceso al webinar de Hyperpersonalization',
            html: html(email, name)
        }
        sgMail
            .send(msg)
            .then((response) => {
                console.log(response[0].statusCode)
                console.log(response[0].headers)
            })
            .catch((error) => {
                console.error("error", error.response)
            })
    }

    return res.status(200).send({ exist: req.body });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const html = (email, name) => `
<table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#f2f4fb">
    <tr>
        <td valign="top" bgcolor="#f2f4fb" width="100%">
            <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0"
                border="0">
                <tr>
                    <td width="100%">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td>
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                        style="width:100%; max-width:600px;" align="center">
                                        <tr>
                                            <td role="modules-container"
                                                style="padding:0px 0px 0px 0px; color:#FFFFFF; text-align:left;"
                                                bgcolor="#ffffff" width="100%" align="left">
                                                <table class="module preheader preheader-hide" role="module"
                                                    data-type="preheader" border="0" cellpadding="0" cellspacing="0"
                                                    width="100%"
                                                    style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                                                    <tr>
                                                        <td role="module-content">
                                                            <p>No te lo pierdas</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table class="wrapper" role="module" data-type="image" border="0"
                                                    cellpadding="0" cellspacing="0" width="100%"
                                                    style="table-layout: fixed;" data-muid="98ndJyAY9BSGjoVqrr6FYx">
                                                    <tbody>
                                                        <tr>
                                                            <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;"
                                                                valign="top" align="left"><a
                                                                    href="https://www.ceibo.digital/?utm_medium=organico&utm_source=Mail&utm_campaign=logos&utm_term=30-Mar&utm_content=Click_Link"><img
                                                                        class="max-width" border="0"
                                                                        style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;"
                                                                        src="http://cdn.mcauto-images-production.sendgrid.net/719b09c9216578fc/b1873d93-43d5-4f06-a012-87d276aafbd1/600x110.jpg"
                                                                        alt="" width="600" data-responsive="true"
                                                                        data-proportionally-constrained="false"></a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table border="0" cellpadding="0" cellspacing="0" align="center"
                                                    width="100%" role="module" data-type="columns"
                                                    style="padding:20px 0px 15px 0px;" bgcolor="#FFFFFF"
                                                    data-distribution="1">
                                                    <tbody>
                                                        <tr role="module-content">
                                                            <td height="100%" valign="top">
                                                                <table width="580"
                                                                    style="width:580px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;"
                                                                    cellpadding="0" cellspacing="0" align="left"
                                                                    border="0" bgcolor="" class="column column-0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style="padding:0px;margin:0px;border-spacing:0;">
                                                                                <table class="module" role="module"
                                                                                    data-type="text" border="0"
                                                                                    cellpadding="0" cellspacing="0"
                                                                                    width="100%"
                                                                                    style="table-layout: fixed;"
                                                                                    data-muid="nSVYnVzPLnGZ4wUdynLiKo.1.1.1.3.1"
                                                                                    data-mc-module-version="2019-10-22">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style="padding:5px 5px 0px 5px; line-height:20px; text-align:inherit; background-color:#ffffff;"
                                                                                                height="100%"
                                                                                                valign="top"
                                                                                                bgcolor="#ffffff"
                                                                                                role="module-content">
                                                                                                <div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: justify">
                                                                                                        <span
                                                                                                            style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: -apple-system, system-ui, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Fira Sans&quot;, Ubuntu, Oxygen, &quot;Oxygen Sans&quot;, Cantarell, &quot;Droid Sans&quot;, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Lucida Grande&quot;, Helvetica, Arial, sans-serif; font-size: 13px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; text-align: start; color: rgba(0, 0, 0, 0.9); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; caret-color: rgba(0, 0, 0, 0.9); float: none; display: inline">¡Hola
                                                                                                            ::name!</span>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: justify">
                                                                                                        <br></div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: justify">
                                                                                                        <span
                                                                                                            style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: -apple-system, system-ui, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Fira Sans&quot;, Ubuntu, Oxygen, &quot;Oxygen Sans&quot;, Cantarell, &quot;Droid Sans&quot;, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Lucida Grande&quot;, Helvetica, Arial, sans-serif; font-size: 13px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; text-align: start; color: rgba(0, 0, 0, 0.9); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; caret-color: rgba(0, 0, 0, 0.9); float: none; display: inline">Te
                                                                                                            recordamos
                                                                                                            que hoy a
                                                                                                            las&nbsp;16hs
                                                                                                            (Mx) o 19hs (Arg)
                                                                                                            empieza el
                                                                                                            webinar
                                                                                                        </span><span
                                                                                                            style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: -apple-system, system-ui, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Fira Sans&quot;, Ubuntu, Oxygen, &quot;Oxygen Sans&quot;, Cantarell, &quot;Droid Sans&quot;, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Lucida Grande&quot;, Helvetica, Arial, sans-serif; font-size: 13px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; text-align: start; color: rgba(0, 0, 0, 0.9); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; caret-color: rgba(0, 0, 0, 0.9); float: none; display: inline"><strong> Hyperpersonalization: un enfoque data driven.&nbsp;</strong></span>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: justify">
                                                                                                        <br></div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: justify">
                                                                                                        <span
                                                                                                            style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: -apple-system, system-ui, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Fira Sans&quot;, Ubuntu, Oxygen, &quot;Oxygen Sans&quot;, Cantarell, &quot;Droid Sans&quot;, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Lucida Grande&quot;, Helvetica, Arial, sans-serif; font-size: 13px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; text-align: start; color: rgba(0, 0, 0, 0.9); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; caret-color: rgba(0, 0, 0, 0.9); float: none; display: inline">Podés
                                                                                                            acceder al
                                                                                                            evento desde
                                                                                                            LinkedIn
                                                                                                            Live a
                                                                                                            través del
                                                                                                            siguiente
                                                                                                            link:</span>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: justify">
                                                                                                        <br></div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: justify">
                                                                                                        <span
                                                                                                            style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: -apple-system, system-ui, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Fira Sans&quot;, Ubuntu, Oxygen, &quot;Oxygen Sans&quot;, Cantarell, &quot;Droid Sans&quot;, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Lucida Grande&quot;, Helvetica, Arial, sans-serif; font-size: 13px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; text-align: start; color: rgba(0, 0, 0, 0.9); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; caret-color: rgba(0, 0, 0, 0.9); float: none; display: inline">LinkedIn:
                                                                                                            https://www.linkedin.com/video/event/urn:li:ugcPost:6983491027160502272/</span>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: justify">
                                                                                                        <span
                                                                                                            style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: -apple-system, system-ui, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Fira Sans&quot;, Ubuntu, Oxygen, &quot;Oxygen Sans&quot;, Cantarell, &quot;Droid Sans&quot;, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Lucida Grande&quot;, Helvetica, Arial, sans-serif; font-size: 13px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; text-align: start; color: rgba(0, 0, 0, 0.9); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; caret-color: rgba(0, 0, 0, 0.9); float: none; display: inline"><br>
                                                                                                        </span></div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: justify">
                                                                                                        <span
                                                                                                            style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: -apple-system, system-ui, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Fira Sans&quot;, Ubuntu, Oxygen, &quot;Oxygen Sans&quot;, Cantarell, &quot;Droid Sans&quot;, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Lucida Grande&quot;, Helvetica, Arial, sans-serif; font-size: 13px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; text-align: start; color: rgba(0, 0, 0, 0.9); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; caret-color: rgba(0, 0, 0, 0.9); float: none; display: inline">Recordá
                                                                                                            que el
                                                                                                            webinar es
                                                                                                            en vivo y en
                                                                                                            ambas
                                                                                                            plataformas
                                                                                                            tendrás la
                                                                                                            oportunidad
                                                                                                            de
                                                                                                            hacerles&nbsp;</span><span
                                                                                                            style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: -apple-system, system-ui, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Fira Sans&quot;, Ubuntu, Oxygen, &quot;Oxygen Sans&quot;, Cantarell, &quot;Droid Sans&quot;, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Lucida Grande&quot;, Helvetica, Arial, sans-serif; font-size: 13px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; text-align: start; color: rgba(0, 0, 0, 0.9); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; caret-color: rgba(0, 0, 0, 0.9); float: none; display: inline"><strong>preguntas
                                                                                                                a los
                                                                                                                speakers</strong></span><span
                                                                                                            style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: -apple-system, system-ui, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Fira Sans&quot;, Ubuntu, Oxygen, &quot;Oxygen Sans&quot;, Cantarell, &quot;Droid Sans&quot;, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Lucida Grande&quot;, Helvetica, Arial, sans-serif; font-size: 13px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; text-align: start; color: rgba(0, 0, 0, 0.9); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; caret-color: rgba(0, 0, 0, 0.9); float: none; display: inline">.&nbsp;</span>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: justify">
                                                                                                        <br></div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: justify">
                                                                                                        <span
                                                                                                            style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: -apple-system, system-ui, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Fira Sans&quot;, Ubuntu, Oxygen, &quot;Oxygen Sans&quot;, Cantarell, &quot;Droid Sans&quot;, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Lucida Grande&quot;, Helvetica, Arial, sans-serif; font-size: 13px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; text-align: start; color: rgba(0, 0, 0, 0.9); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; caret-color: rgba(0, 0, 0, 0.9); float: none; display: inline">Ante
                                                                                                            cualquier
                                                                                                            inquietud,
                                                                                                            no dudes en
                                                                                                            contactarnos.</span>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: justify">
                                                                                                        <br></div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: justify">
                                                                                                        <span
                                                                                                            style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: -apple-system, system-ui, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Fira Sans&quot;, Ubuntu, Oxygen, &quot;Oxygen Sans&quot;, Cantarell, &quot;Droid Sans&quot;, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Lucida Grande&quot;, Helvetica, Arial, sans-serif; font-size: 13px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; text-align: start; color: rgba(0, 0, 0, 0.9); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; caret-color: rgba(0, 0, 0, 0.9); float: none; display: inline">¡Te
                                                                                                            esperamos!<br>
                                                                                                        </span></div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: justify">
                                                                                                        <br></div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: justify">
                                                                                                        <span
                                                                                                            style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: -apple-system, system-ui, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Fira Sans&quot;, Ubuntu, Oxygen, &quot;Oxygen Sans&quot;, Cantarell, &quot;Droid Sans&quot;, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Lucida Grande&quot;, Helvetica, Arial, sans-serif; font-size: 13px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; text-align: start; color: rgba(0, 0, 0, 0.9); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; caret-color: rgba(0, 0, 0, 0.9); float: none; display: inline">Saludos,</span><span
                                                                                                            style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: -apple-system, system-ui, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Fira Sans&quot;, Ubuntu, Oxygen, &quot;Oxygen Sans&quot;, Cantarell, &quot;Droid Sans&quot;, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Lucida Grande&quot;, Helvetica, Arial, sans-serif; font-size: 13px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; text-align: start; color: rgba(0, 0, 0, 0.9); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; caret-color: rgba(0, 0, 0, 0.9); float: none; display: inline"><strong>&nbsp;</strong></span>
                                                                                                    </div>
                                                                                                    <div></div>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table border="0" cellpadding="0" cellspacing="0" align="center"
                                                    width="100%" role="module" data-type="columns"
                                                    style="padding:0px 5px 0px 5px;" bgcolor="#FFFFFF"
                                                    data-distribution="1">
                                                    <tbody>
                                                        <tr role="module-content">
                                                            <td height="100%" valign="top">
                                                                <table width="570"
                                                                    style="width:570px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;"
                                                                    cellpadding="0" cellspacing="0" align="left"
                                                                    border="0" bgcolor="" class="column column-0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td
                                                                                style="padding:0px;margin:0px;border-spacing:0;">
                                                                                <table class="module" role="module"
                                                                                    data-type="text" border="0"
                                                                                    cellpadding="0" cellspacing="0"
                                                                                    width="100%"
                                                                                    style="table-layout: fixed;"
                                                                                    data-muid="23d86910-29fa-4c57-9d0b-d1292e69675a"
                                                                                    data-mc-module-version="2019-10-22">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style="padding:5px 0px 5px 0px; line-height:22px; text-align:inherit;"
                                                                                                height="100%"
                                                                                                valign="top" bgcolor=""
                                                                                                role="module-content">
                                                                                                <div>
                                                                                                    <div
                                                                                                        style="font-family: inherit; text-align: inherit">
                                                                                                        <span
                                                                                                            style="color: #b82837; font-family: arial, helvetica, sans-serif"><strong>Departamento
                                                                                                                de
                                                                                                                Marketing</strong></span><span
                                                                                                            style="color: #b82837; font-family: arial, helvetica, sans-serif"><br>
                                                                                                        </span><a
                                                                                                            href="mailto:+hernan@ceibo.digital"
                                                                                                            title="hernan@ceibo.digital"><span
                                                                                                                style="font-family: &quot;Titillium Web&quot;, sans-serif, Arial; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-weight: 300; font-size: 14px; color: #959799">marketing@ceibo.digital</span></a><br>
                                                                                                    </div>
                                                                                                    <div></div>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table class="module" role="module" data-type="divider" border="0"
                                                    cellpadding="0" cellspacing="0" width="100%"
                                                    style="table-layout: fixed;"
                                                    data-muid="mVyZz43HETwfwb72TGh4iy.1.1.1.1.1">
                                                    <tbody>
                                                        <tr>
                                                            <td style="padding:20px 0px 0px 0px;" role="module-content"
                                                                height="100%" valign="top" bgcolor="">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                    align="center" width="100%" height="5px"
                                                                    style="line-height:5px; font-size:5px;">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding:0px 0px 5px 0px;"
                                                                                bgcolor="#B72835"></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table class="wrapper" role="module" data-type="image" border="0"
                                                    cellpadding="0" cellspacing="0" width="100%"
                                                    style="table-layout: fixed;"
                                                    data-muid="5a884886-b82b-496c-a95b-e4500f8dd422">
                                                    <tbody>
                                                        <tr>
                                                            <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;"
                                                                valign="top" align="center"><a
                                                                    href="https://www.ceibo.digital/?utm_medium=organico&utm_source=Mail&utm_campaign=logos&utm_term=30-Mar&utm_content=Click_Link"><img
                                                                        class="max-width" border="0"
                                                                        style="display:block; color:#881922; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;"
                                                                        width="600" alt="Ceibo Digital"
                                                                        data-proportionally-constrained="true"
                                                                        data-responsive="true"
                                                                        src="http://cdn.mcauto-images-production.sendgrid.net/719b09c9216578fc/04b99df0-c504-414b-9864-8fa513503723/600x110.jpg"></a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table class="module" role="module" data-type="social" align="center"
                                                    border="0" cellpadding="0" cellspacing="0" width="100%"
                                                    style="table-layout: fixed;"
                                                    data-muid="87277ffe-54ed-4792-94f3-0a973b71c268">
                                                    <tbody>
                                                        <tr>
                                                            <td valign="top"
                                                                style="padding:10px 0px 10px 0px; font-size:6px; line-height:10px; background-color:#881922;"
                                                                align="center">
                                                                <table align="center"
                                                                    style="-webkit-margin-start:auto;-webkit-margin-end:auto;">
                                                                    <tbody>
                                                                        <tr align="center">
                                                                            <td style="padding: 0px 5px;"
                                                                                class="social-icon-column">
                                                                                <a role="social-icon-link"
                                                                                    href="https://www.instagram.com/ceibodigital/"
                                                                                    target="_blank" alt="Instagram"
                                                                                    title="Instagram"
                                                                                    style="display:inline-block; background-color:#6FC6B4; height:29px; width:29px; border-radius:6px; -webkit-border-radius:6px; -moz-border-radius:6px;">
                                                                                    <img role="social-icon"
                                                                                        alt="Instagram"
                                                                                        title="Instagram"
                                                                                        src="https://mc.sendgrid.com/assets/social/white/instagram.png"
                                                                                        style="height:29px; width:29px;"
                                                                                        height="29" width="29">
                                                                                </a>
                                                                            </td>
                                                                            <td style="padding: 0px 5px;"
                                                                                class="social-icon-column">
                                                                                <a role="social-icon-link"
                                                                                    href="https://www.linkedin.com/company/ceibodigital/"
                                                                                    target="_blank" alt="LinkedIn"
                                                                                    title="LinkedIn"
                                                                                    style="display:inline-block; background-color:#6FC6B4; height:29px; width:29px; border-radius:6px; -webkit-border-radius:6px; -moz-border-radius:6px;">
                                                                                    <img role="social-icon"
                                                                                        alt="LinkedIn" title="LinkedIn"
                                                                                        src="https://mc.sendgrid.com/assets/social/white/linkedin.png"
                                                                                        style="height:29px; width:29px;"
                                                                                        height="29" width="29">
                                                                                </a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table class="module" role="module" data-type="text" border="0"
                                                    cellpadding="0" cellspacing="0" width="100%"
                                                    style="table-layout: fixed;"
                                                    data-muid="nSVYnVzPLnGZ4wUdynLiKo.1.1.1.1"
                                                    data-mc-module-version="2019-10-22">
                                                    <tbody>
                                                        <tr>
                                                            <td style="padding:0px 20px 10px 20px; line-height:20px; text-align:inherit; background-color:#881922;"
                                                                height="100%" valign="top" bgcolor="#881922"
                                                                role="module-content">
                                                                <div>
                                                                    <div
                                                                        style="font-family: inherit; text-align: center">
                                                                        <span
                                                                            style="font-family: helvetica, sans-serif; font-size: 13px; background-color: rgb(136, 25, 34); color: #ffffff">CEIBO
                                                                            DIGITAL&nbsp;</span></div>
                                                                    <div
                                                                        style="font-family: inherit; text-align: center">
                                                                        <span
                                                                            style="font-family: helvetica, sans-serif; font-size: 13px; caret-color: rgb(255, 255, 255); color: #ffffff; font-style: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; text-indent: 0px; text-transform: none; white-space: normal; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-line: none; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: center; background-color: rgb(136, 25, 34)">Buenos
                                                                            Aires | Miami | Asu</span><span
                                                                            style="font-family: helvetica, sans-serif; font-size: 13px; caret-color: rgb(255, 255, 255); color: #ffffff; font-style: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; text-indent: 0px; text-transform: none; white-space: normal; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-line: none; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: center">nci</span><span
                                                                            style="font-family: &quot;trebuchet ms&quot;, helvetica, sans-serif; font-size: 13px; caret-color: rgb(183, 40, 55); color: #ffffff; font-style: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: -0.2px; text-indent: 0px; text-transform: none; white-space: normal; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-line: none; text-decoration-style: initial; text-decoration-color: initial; text-align: start; font-variant-ligatures: normal; orphans: 2; widows: 2; text-decoration-thickness: initial; float: none; display: inline">ó</span><span
                                                                            style="font-family: helvetica, sans-serif; font-size: 13px; caret-color: rgb(255, 255, 255); color: #ffffff; font-style: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; text-indent: 0px; text-transform: none; white-space: normal; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-line: none; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: center">n</span><br>
                                                                    </div>
                                                                   
                                                                    <div></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                              
                                            </td>
                                        </tr>
                                    </table>
                                    <!--[if mso]>
                          </td>
                        </tr>
                      </table>
                    </center>
                    <![endif]-->
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`.replace(':email', email).replace('::name', name)



